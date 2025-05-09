import { useState, useMemo } from "react";
import { SortField, SortOrder, Player } from "@/types";
import { calculateScore } from "@/utils/scores";

type UseSortingProps = {
  items: Player[];
  defaultOrderBy: SortField;
};

export const useSorting = ({ items, defaultOrderBy }: UseSortingProps) => {
  const [orderBy, setOrderBy] = useState<SortField>(defaultOrderBy);
  const [order, setOrder] = useState<SortOrder>("desc");

  const handleSort = (property: SortField) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (orderBy === "performance") {
        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);
        return order === "asc" ? scoreA - scoreB : scoreB - scoreA;
      }

      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return order === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [items, order, orderBy]);

  return {
    orderBy,
    order,
    handleSort,
    sortedItems,
  };
};
