# Pokémon Manager

A modern web application for managing your Pokémon collection using the Pokédex API.

## Features

- **Pokémon Collection**: Browse through Pokémon with visually distinct type-based cards
- **Seeding System**: Add new Pokémon to your collection with batch processing
- **Type Categorization**: View Pokémon grouped by their elemental types
- **Dark/Light Mode**: Toggle between themes with persistent user preferences

## Technologies

- **Frontend**: Next.js 15 (App Router), TypeScript, Shadcn/UI
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Validation**: Zod for API response validation
- **Styling**: CSS Modules with dark/light theme support

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/pokemon-manager.git
   cd pokemon-manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - You will receive the `.env` file with database connection string via email
   - Place the `.env` file in the project root directory

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note**: The application is pre-configured to connect to a database that already has Pokémon data, so you can immediately browse the collection without additional setup.

## Usage

### Adding Pokémon to Your Collection

1. Click the "Add Pokémon" button in the header
2. Enter a starting ID and the number of Pokémon to add
3. Click "Seed Pokémon" to start the process
4. View the results showing how many were added, skipped, or failed

### Switching Themes

Click the sun/moon icon in the header to toggle between light and dark mode. Your preference will be saved and applied on future visits.

## Troubleshooting

### Database Connection Issues

This application uses Neon's PostgreSQL service in the US-East-1 region. If you encounter a database connection error, it may be due to:

1. Temporary Neon service disruptions (check [status.neon.tech](https://status.neon.tech))
2. Database connection string issues in your .env file
3. Network connectivity problems

The application will display a user-friendly error message if it cannot connect to the database. You can click "Try Again" to attempt reconnection.

### Running With a Different Database

If Neon is experiencing issues, you can set up an alternative database:

1. Create a free PostgreSQL database on another service (Supabase, Railway, etc.)
2. Update your `.env` file with the new connection string
3. Initialize the database schema:
   ```
   npx prisma db push
   ```
4. Use the application's "Add Pokémon" feature to populate the database

## Project Structure

```
pokemon-manager/
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── src/
│   ├── app/            # App router pages and layouts
│   │   ├── actions/    # Server actions for data operations
│   │   ├── api/        # API routes
│   ├── components/     # UI components
│   ├── context/        # React context providers
│   ├── lib/            # Utility functions and shared code
│   ├── styles/         # CSS modules
│   ├── types/          # TypeScript type definitions
├── .env                # Environment variables (will be provided via email)
└── README.md           # This file
```

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for the Pokémon data
- [Next.js](https://nextjs.org/) for the application framework
- [Shadcn/UI](https://ui.shadcn.com/) for the component library
- [Neon](https://neon.tech/) for the PostgreSQL database service
