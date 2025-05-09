const DATE_FORMAT_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
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
