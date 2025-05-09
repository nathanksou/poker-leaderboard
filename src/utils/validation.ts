import { ValidationError, GameFormData } from "@/types";

export const validateGame = (data: GameFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.firstPlace) {
    errors.push({
      field: "firstPlace",
      message: "First place player is required",
    });
  }

  if (!data.secondPlace) {
    errors.push({
      field: "secondPlace",
      message: "Second place player is required",
    });
  }

  if (data.firstPlace === data.secondPlace) {
    errors.push({
      field: "secondPlace",
      message: "Second place player must be different from first place",
    });
  }

  if (!data.players || data.players.length < 2) {
    errors.push({
      field: "players",
      message: "At least two players are required",
    });
  }

  data.players.forEach((player, index) => {
    if (!player.slackId) {
      errors.push({
        field: `players[${index}].slackId`,
        message: "Player is required",
      });
    }

    if (!player.buyIns || player.buyIns < 1) {
      errors.push({
        field: `players[${index}].buyIns`,
        message: "Buy-ins must be at least 1",
      });
    }
  });

  return errors;
};
