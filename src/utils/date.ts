const DATE_FORMAT_OPTIONS = {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Australia/Sydney",
} as const;

export const formatGameDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString);
    return "Invalid Date";
  }
  return date.toLocaleString("en-AU", DATE_FORMAT_OPTIONS);
};
