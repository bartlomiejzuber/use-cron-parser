const allowedValues = {
  seconds: /^(\*|(?<![6-9])[0-5][0-9]|[0-9]|(\*\/((?<![6-9])[0-5][0-9]|[0-9])))$/gi,
  minutes: /^(\*|(?<![6-9])[0-5][0-9]|[0-9]|(\*\/((?<![6-9])[0-5][0-9]|[0-9])))$/gi,
  hours: /^(\*|((?<![3-9])[0-2]((?<!2)[0-9]|[0-3])|[0-9])|\*\/((?<![3-9])[0-2]((?<!2)[0-9]|[0-3])|[0-9]))$/gi,
  dayMonth: /^(\*|((?<![4-9])[0-3]((?<!3)[0-9]|[0-1])|[0-9])|\*\/((?<![4-9])[0-3]((?<!3)[0-9]|[0-1])|[0-9]))$/gi,
  month: /^(\*|((?<![3-9])[0-1]((?<!1)[0-9]|[0-2])|[0-9])|\*\/((?<![3-9])[0-1]((?<!1)[0-9]|[0-2])|[0-9]))$/gi,
};

export const validate = (cronExpressionParts: string[]) => {
  let res = true;

  if (
    !cronExpressionParts ||
    !cronExpressionParts.length ||
    cronExpressionParts.length !== 5
  ) {
    res = false;
  }

  const [seconds, minutes, hours, dayMonth, month] = cronExpressionParts;

  if (!allowedValues.seconds.test(seconds)) {
    res = false;
  }

  if (!allowedValues.minutes.test(minutes)) {
    res = false;
  }

  if (!allowedValues.hours.test(hours)) {
    res = false;
  }

  if (!allowedValues.dayMonth.test(dayMonth)) {
    res = false;
  }

  if (!allowedValues.month.test(month)) {
    res = false;
  }

  return res;
};
