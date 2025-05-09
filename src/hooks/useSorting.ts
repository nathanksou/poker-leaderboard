import { useState, useMemo } from "react";
import { SortField, SortOrder, Player } from "@/types";
import { compareValues } from "@/utils/sorting";
import { calculateScore } from "@/utils/leaderboard";

type UseSortingProps = {
  items: Player[];
  defaultOrderBy: SortField;
  defaultOrder?: SortOrder;
};

export const useSorting = ({
  items,
  defaultOrderBy,
  defaultOrder = "desc",
}: UseSortingProps) => {
  const [orderBy, setOrderBy] = useState<SortField>(defaultOrderBy);
  const [order, setOrder] = useState<SortOrder>(defaultOrder);

  const handleSort = (property: SortField) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (orderBy === "performance") {
        return compareValues(calculateScore(a), calculateScore(b), order);
      }
      return compareValues(a[orderBy], b[orderBy], order);
    });
  }, [items, orderBy, order]);

  return {
    orderBy,
    order,
    handleSort,
    sortedItems,
  };
};
