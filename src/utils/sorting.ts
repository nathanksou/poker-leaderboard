import { SortOrder } from "@/types";

const SORT_ORDERS = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const compareValues = <T extends string | number>(
  a: T,
  b: T,
  order: SortOrder
): number => {
  if (a === b) return 0;
  return order === SORT_ORDERS.ASC ? (a > b ? 1 : -1) : a > b ? -1 : 1;
};

export const compareDates = (
  a: string,
  b: string,
  order: SortOrder = SORT_ORDERS.DESC
): number => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
    console.error("Invalid date string in comparison:", { a, b });
    return 0;
  }

  // For debugging
  console.log("Comparing dates:", {
    a,
    b,
    dateA: dateA.toISOString(),
    dateB: dateB.toISOString(),
    order,
    result: compareValues(dateA.getTime(), dateB.getTime(), order),
  });

  return compareValues(dateA.getTime(), dateB.getTime(), order);
};
