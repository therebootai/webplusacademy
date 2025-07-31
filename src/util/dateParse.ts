import { isValid, parse } from "date-fns";

/**
 * Parses a date string in "DD/MM/YYYY" format and returns a localized date string.
 * Uses date-fns for robust parsing and formatting.
 *
 * @param {string | null | undefined} dateString The date string to parse (e.g., "29/05/2025").
 * @returns {string} The localized date string (e.g., "29/5/2025" or "5/29/2025" depending on locale),
 * or "None" if the input is invalid or cannot be parsed.
 */
export function getFormattedDate(dateString: string) {
  // 1. Basic validation: Check if input is a non-empty string
  if (typeof dateString !== "string" || dateString.trim() === "") {
    return "None";
  }

  // 2. Define the expected format of the input string
  const inputFormat = "dd/MM/yyyy";

  // 3. Parse the date string using date-fns's parse function
  //    The third argument is a reference date, typically new Date(), but can be any date.
  //    It's used when the input format is incomplete (e.g., just 'MM/dd')
  const parsedDate = parse(dateString, inputFormat, new Date());

  // 4. Check if the parsed date is valid
  if (!isValid(parsedDate)) {
    return "None";
  }

  // 5. Format the date into a more user-friendly localized string.
  //    toLocaleDateString() is still generally preferred for true localization
  //    as format() requires you to explicitly define the output format string
  //    or use a locale-specific format if you load locales.
  //    However, if you want a consistent format like "yyyy-MM-dd", date-fns format is great.
  //    For "DD/MM/YYYY" output, you'd use 'dd/MM/yyyy' again.
  //    For a US-like "MM/DD/YYYY", you'd use 'MM/dd/yyyy'.
  //    For this example, let's stick to the browser's locale-specific date string.
  return parsedDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // If you wanted a specific format like "YYYY-MM-DD" regardless of locale, you could do:
  // return format(parsedDate, 'yyyy-MM-dd');
}
