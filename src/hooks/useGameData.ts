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
      const now = new Date();
      const gameData: Game = {
        id: `game_${now.getTime()}`,
        date: now.toISOString(),
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add game");
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
      console.log("Starting edit game mutation for:", gameId);
      console.log("Form data:", formData);

      // Fetch the latest game data
      const response = await fetch(`/api/games/${gameId}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to fetch game:", errorData);
        throw new Error(errorData.error || "Failed to fetch game data");
      }
      const existingGame: Game = await response.json();
      console.log("Existing game:", existingGame);

      const gameData: Game = {
        id: existingGame.id,
        date: existingGame.date,
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
      console.log("Sending updated game data:", gameData);

      const updateResponse = await fetch(`/api/games/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error("Failed to update game:", errorData);
        throw new Error(errorData.error || "Failed to edit game");
      }

      const updatedGame = await updateResponse.json();
      console.log("Game updated successfully:", updatedGame);
      return updatedGame;
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete game");
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
