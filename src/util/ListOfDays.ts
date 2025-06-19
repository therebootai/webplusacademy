export function getDaysCountInMonth(dateString: string) {
  try {
    const date = new Date(dateString);

    // Check if the date is valid.
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided.");
    }

    const year = date.getFullYear();
    const month = date.getMonth();

    const nextMonthFirstDay = new Date(year, month + 1, 1);
    const lastDayOfMonth = new Date(nextMonthFirstDay.getTime() - 1);

    return lastDayOfMonth.getDate();
  } catch (error: any) {
    console.error(`Error getting days count in month: ${error.message}`);
    return 0; // Return null on error
  }
}
