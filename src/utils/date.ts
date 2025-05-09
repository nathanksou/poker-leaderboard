export const formatGameDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-AU", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Australia/Sydney",
  });
};
