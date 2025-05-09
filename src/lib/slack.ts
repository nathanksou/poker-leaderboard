import { App } from "@slack/bolt";
import { WebClient } from "@slack/web-api";
import {
  addGame,
  readData,
  updateLastGameBuyins,
  updatePlayerName,
} from "./storage";
import { GamePlayer } from "@/types";

const app = new App({
  token: process.env.SLACK_APP_BOT_TOKEN,
  signingSecret: process.env.SLACK_APP_SIGNING_SECRET,
});

const web = new WebClient(process.env.SLACK_APP_BOT_TOKEN);

// Helper to get user info from Slack
async function getUserInfo(userId: string): Promise<string> {
  try {
    const result = await web.users.info({ user: userId });
    return result.user?.real_name || result.user?.name || userId;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return userId;
  }
}

// Command to show the leaderboard
app.command("/poker-leaderboard", async ({ ack, say }) => {
  await ack();

  try {
    const data = await readData();
    const players = Object.values(data.players).sort(
      (a, b) => b.firstPlace - a.firstPlace
    );

    const leaderboardText = players
      .map(
        (player) =>
          `${player.name}: ${player.gamesPlayed} games, ${player.firstPlace} 1st, ${player.secondPlace} 2nd, ${player.buyIns} buy-ins`
      )
      .join("\n");

    await say({
      text: `*Poker Leaderboard*\n\`\`\`\n${leaderboardText}\n\`\`\``,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    await say("Sorry, there was an error fetching the leaderboard.");
  }
});

// Command to add a game result
app.command("/poker-game", async ({ command, ack, say }) => {
  await ack();

  const text = command.text.trim();
  const parts = text.split(" ");

  // Parse command format: @winner @second buyins:@player1=2 @player2 @player3=3
  const firstPlace = parts[0];
  const secondPlace = parts[1];
  const buyinsPart = parts.slice(2).join(" ");

  if (!firstPlace || !secondPlace) {
    await say("Please provide both first and second place players.");
    return;
  }

  try {
    // Parse buy-ins
    const buyinsMatch = buyinsPart.match(/buyins:(.+)/);
    const buyinsText = buyinsMatch ? buyinsMatch[1] : "";
    const buyinsEntries = buyinsText.split(" ").filter(Boolean);

    const players = new Map<string, number>();

    // Add first and second place with default 1 buy-in
    players.set(firstPlace, 1);
    players.set(secondPlace, 1);

    // Parse additional buy-ins
    buyinsEntries.forEach((entry) => {
      if (entry.includes("=")) {
        // Handle explicit buy-in value
        const [player, count] = entry.split("=");
        if (player && count) {
          players.set(player, parseInt(count, 10));
        }
      } else {
        // Handle player without explicit buy-in (default to 1)
        players.set(entry, 1);
      }
    });

    // Convert to GamePlayer array
    const gamePlayers: GamePlayer[] = Array.from(players.entries()).map(
      ([slackId, buyIns]) => ({
        slackId,
        buyIns,
        placement:
          slackId === firstPlace
            ? "first"
            : slackId === secondPlace
            ? "second"
            : "other",
      })
    );

    // Update player names
    for (const player of gamePlayers) {
      const name = await getUserInfo(player.slackId);
      await updatePlayerName(player.slackId, name);
    }

    await addGame(firstPlace, secondPlace, gamePlayers);
    await say(
      `Game recorded! ${firstPlace} won, ${secondPlace} came in second.`
    );
  } catch (error) {
    console.error("Error recording game:", error);
    await say("Sorry, there was an error recording the game.");
  }
});

// Command to update buy-ins for the last game
app.command("/poker-buyins", async ({ command, ack, say }) => {
  await ack();

  const [player, buyinsStr] = command.text.trim().split(" ");
  const buyins = parseInt(buyinsStr, 10);

  if (!player || isNaN(buyins)) {
    await say("Please provide a player and number of buy-ins.");
    return;
  }

  try {
    await updateLastGameBuyins(player, buyins);
    await say(`Updated ${player}'s buy-ins to ${buyins} in the last game.`);
  } catch (error) {
    console.error("Error updating buy-ins:", error);
    await say("Sorry, there was an error updating the buy-ins.");
  }
});

export default app;
