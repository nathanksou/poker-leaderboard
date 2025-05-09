import { SortOrder } from "@/types";

export const compareValues = <T>(a: T, b: T, order: SortOrder): number => {
  if (a === b) return 0;
  return order === "asc" ? (a > b ? 1 : -1) : b > a ? 1 : -1;
};

export const compareDates = (
  a: string,
  b: string,
  order: SortOrder = "desc"
): number => {
  return compareValues(new Date(a).getTime(), new Date(b).getTime(), order);
};
