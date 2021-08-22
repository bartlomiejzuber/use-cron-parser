import { findMonthWithMaxDays } from "../timeHelpers";
import { CronValue, TimeType } from "../types";

interface TimeRulesInput extends CronValue {
  nextOccurrence: Date;
}

export const applyTimeRules = (
  timeType: TimeType,
  cronValue: TimeRulesInput
) => {
  switch (timeType) {
    // case TimeType.Second:
    // case TimeType.Minute:
    // case TimeType.Hour:
    //     throw Error('implement');
    case TimeType.DayMonth:
      if (cronValue.value > cronValue.maxValue) {
          // it means that given month doesn't have enough days
          // finding matching one is required
          const dateWithAdjustedMonth = findMonthWithMaxDays(cronValue.nextOccurrence, cronValue.value);
          cronValue.nextOccurrence.setMonth(dateWithAdjustedMonth.getMonth());
      }
      break;
  }
};
