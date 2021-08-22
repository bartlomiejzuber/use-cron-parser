import { useEffect, useMemo } from "react";
import { add } from "date-fns";
import { getDaysAmountInMonth } from "./timeHelpers";
import { validate } from "./validator";
import { applyTimeRules } from "./rules/apply";
import { useCronParserOptions, CronInput, CronValue, TimeType, MaxTimeValues } from "./types";

export const defaultOptions: useCronParserOptions = {
  skipValidation: false,
};

function getCronValue({
  nextOccurrence,
  type,
  expression,
  current,
  maxValue,
  prevCronVal,
}: CronInput) {
  const cronValue: CronValue = {
    every: expression === "*",
    incrementor: expression === "*" ? 1 : 0,
    value: current,
    timePassed: false,
    maxValue,
  };
  if (/^\d+$/.test(expression)) {
    // specific value
    cronValue.value = parseInt(/^\d+$/.exec(expression)![0]);
    cronValue.timePassed = current > cronValue.value;
  } else if (expression === "*" && !prevCronVal?.every) {
    // every
    if (prevCronVal && !prevCronVal.timePassed) {
      cronValue.value = current;
    } else {
      cronValue.value = current + 1;
    }
  } else if (expression.includes("/")) {
    // has step values
    const stepValue = /^\d+$/.exec(expression)![0];
    cronValue.value = maxValue / parseInt(stepValue);
  }

  applyTimeRules(type, { ...cronValue, nextOccurrence });

  return cronValue;
}

function* cronParser([
  seconds,
  minutes,
  hours,
  dayMonth,
  month,
]: string[]): Generator<Date, Date, Date> {
  const nextOccurrence = new Date();

  const nextSecond = getCronValue({
    nextOccurrence,
    type: TimeType.Second,
    expression: seconds,
    current: nextOccurrence.getSeconds(),
    maxValue: MaxTimeValues.Seconds,
  });
  const nextMinute = getCronValue({
    nextOccurrence,
    type: TimeType.Minute,
    expression: minutes,
    current: nextOccurrence.getMinutes(),
    maxValue: MaxTimeValues.Minutes,
    prevCronVal: nextSecond,
  });
  const nextHour = getCronValue({
    nextOccurrence,
    type: TimeType.Hour,
    expression: hours,
    current: nextOccurrence.getHours(),
    maxValue: MaxTimeValues.Hours,
    prevCronVal: nextMinute,
  });
  const nextDayMonth = getCronValue({
    nextOccurrence,
    type: TimeType.DayMonth,
    expression: dayMonth,
    current: nextOccurrence.getDate(),
    maxValue: getDaysAmountInMonth(nextOccurrence),
    prevCronVal: nextHour,
  });

  nextOccurrence.setSeconds(nextSecond.value);
  nextOccurrence.setMinutes(nextMinute.value);
  nextOccurrence.setHours(nextHour.value);
  nextOccurrence.setDate(nextDayMonth.value);

  yield nextOccurrence;

  while (true) {
    const next = add(nextOccurrence, {
      seconds: nextSecond.incrementor,
      minutes: nextMinute.incrementor,
      hours: nextHour.incrementor,
      days: nextDayMonth.incrementor,
    });
    
    applyTimeRules(TimeType.DayMonth, { nextOccurrence: next, ...nextDayMonth });

    yield next;
  }
}

export const useCronParser = (
  cronExpression: string,
  options?: useCronParserOptions
) => {
  const generator = useMemo(() => {
    const cronExpressionParts = cronExpression.split(" ");
    if (!options?.skipValidation) {
      validate(cronExpressionParts);
    }

    return cronParser(cronExpressionParts);
  }, [cronExpression]);

  return generator.next;
};
