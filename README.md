# Poker Leaderboard Slack App

A Slack application that tracks poker game results and displays a leaderboard.

## Features

- Track poker game results with first and second place winners
- Record buy-ins for each player in each game
- Display a leaderboard showing:
  - Number of games played
  - Number of first place wins
  - Number of second place wins
  - Number of buy-ins
- Web interface to view the leaderboard
- Slack commands for easy interaction

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:

   ```
   SLACK_BOT_TOKEN="xoxb-your-bot-token"
   SLACK_SIGNING_SECRET="your-signing-secret"
   ```

4. Create a Slack app at https://api.slack.com/apps

   - Add the following bot token scopes:
     - `commands`
     - `chat:write`
     - `users:read` (to get player names)
   - Create three slash commands:
     - `/poker-leaderboard`: Shows the current leaderboard
     - `/poker-game`: Records a game result
     - `/poker-buyins`: Updates buy-ins for the last game

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Slack Commands

1. View the leaderboard:

   ```
   /poker-leaderboard
   ```

2. Record a game result:

   ```
   /poker-game @winner @second buyins:@player1=2 @player2=1 @player3=3
   ```

   - First two mentions are required (winner and runner-up)
   - Buy-ins are optional, default is 1 per player
   - Example: `/poker-game @john @jane buyins:@john=2 @jane=1 @bob=3`

3. Update buy-ins for the last game:
   ```
   /poker-buyins @player 2
   ```
   - Updates the number of buy-ins for a player in the most recent game
   - Can only modify the most recent game for safety

### Web Interface

Visit `http://localhost:3000` to view the leaderboard in your browser.

## Development

- Built with Next.js and TypeScript
- Uses Material-UI for the web interface
- Slack Bolt framework for Slack integration
- Data stored in a JSON file for simplicity

## License

MIT
