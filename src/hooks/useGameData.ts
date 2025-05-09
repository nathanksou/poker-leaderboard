import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameFormData } from "@/types";

export const useGameData = () => {
  const queryClient = useQueryClient();

  const { data: players = {}, isLoading: isLoadingPlayers } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await fetch("/api/players");
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      return response.json();
    },
  });

  const { data: games = [], isLoading: isLoadingGames } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await fetch("/api/games");
      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }
      return response.json();
    },
  });

  const addGameMutation = useMutation({
    mutationFn: async (formData: GameFormData) => {
      const gameData: Omit<Game, "id" | "date"> = {
        firstPlace: formData.firstPlace,
        secondPlace: formData.secondPlace,
        players: formData.players.map((player) => ({
          ...player,
          placement:
            player.slackId === formData.firstPlace
              ? "first"
              : player.slackId === formData.secondPlace
              ? "second"
              : "other",
        })),
      };

      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error("Failed to add game");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });

  const editGameMutation = useMutation({
    mutationFn: async ({
      gameId,
      formData,
    }: {
      gameId: string;
      formData: GameFormData;
    }) => {
      const gameData: Omit<Game, "id" | "date"> = {
        firstPlace: formData.firstPlace,
        secondPlace: formData.secondPlace,
        players: formData.players.map((player) => ({
          ...player,
          placement:
            player.slackId === formData.firstPlace
              ? "first"
              : player.slackId === formData.secondPlace
              ? "second"
              : "other",
        })),
      };

      const response = await fetch(`/api/games/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error("Failed to edit game");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });

  const deleteGameMutation = useMutation({
    mutationFn: async (gameId: string) => {
      const response = await fetch(`/api/games/${gameId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete game");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });

  const error =
    addGameMutation.error || editGameMutation.error || deleteGameMutation.error;

  return {
    players,
    games,
    isLoading:
      isLoadingPlayers ||
      isLoadingGames ||
      addGameMutation.isPending ||
      editGameMutation.isPending ||
      deleteGameMutation.isPending,
    error,
    addGame: addGameMutation.mutateAsync,
    editGame: editGameMutation.mutateAsync,
    deleteGame: deleteGameMutation.mutateAsync,
  };
};
