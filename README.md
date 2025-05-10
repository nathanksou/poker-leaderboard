# Poker Leaderboard

A web application for tracking poker game results and player statistics. Built with Next.js, TypeScript, and Material-UI.

## Features

- Track poker game results
- View player statistics and rankings
- Admin panel for managing games and players
- Responsive design for all devices
- Password-protected admin access

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query, Recoil
- **Styling**: MUI's `sx` prop, styled-components
- **Data Storage**: Local storage (can be extended to use a database)

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:nathanksou/poker-leaderboard.git
   cd poker-leaderboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:

   ```
   NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── admin/       # Admin-related components
│   ├── gamehistory/ # Game history components
│   ├── layout/      # Layout components
│   └── player/      # Player-related components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── styles/          # Global styles and theme
└── types/           # TypeScript type definitions
```

## Development

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Follow the established component structure

### Component Guidelines

- Use TypeScript for all components
- Implement proper prop typing
- Use MUI components for UI elements
- Follow responsive design principles
- Implement error boundaries where needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- Next.js team for the amazing framework
- All contributors who help improve this project
