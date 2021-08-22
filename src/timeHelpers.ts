export const getDaysAmountInMonth = (date: Date) => {
  // date.getMonth() will return a month between 0 - 11
  // we add one to get to the last day of the month
  // so that when getDate() is called it will return the last day of the month
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return new Date(year, month, 0).getDate();
};

export const findMonthWithMaxDays = (date: Date, numberOfDays: number) => {
  let currentMonth = date.getMonth();
  while(true) {
    currentMonth++;

    const daysInMonth = getDaysAmountInMonth(new Date(date.getFullYear(), currentMonth, 5));
    if (daysInMonth === numberOfDays) {
      break;
    }
  }

  return new Date(date.getFullYear(), currentMonth, date.getDate());
};
