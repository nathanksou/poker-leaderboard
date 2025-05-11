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

      // Handle string values (name)
      if (orderBy === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      // Handle numeric values (gamesPlayed, firstPlace, secondPlace, buyIns)
      const numA =
        a[
          orderBy as keyof Pick<
            Player,
            "gamesPlayed" | "firstPlace" | "secondPlace" | "buyIns"
          >
        ];
      const numB =
        b[
          orderBy as keyof Pick<
            Player,
            "gamesPlayed" | "firstPlace" | "secondPlace" | "buyIns"
          >
        ];
      return order === "asc" ? numA - numB : numB - numA;
    });
  }, [items, order, orderBy]);

  return {
    orderBy,
    order,
    handleSort,
    sortedItems,
  };
};
