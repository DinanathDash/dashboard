# Modern React Dashboard

A sophisticated dashboard built with React, TypeScript, and Vite, featuring a clean and modern UI with comprehensive analytics and management tools.

![Dashboard Preview](https://placeholder-for-dashboard-screenshot.png)

## ✨ Features

- **Interactive Dashboard** - View key metrics, statistics, and performance indicators
- **Data Visualization** - Charts and graphs powered by Recharts
- **Task Management** - Add, edit, and track tasks
- **Calendar View** - Schedule and manage events
- **Kanban Board** - Visual project management
- **Tables** - Interactive data tables with MUI X Data Grid
- **Settings** - Customize your experience
- **Dark/Light Mode** - Toggle between dark and light themes

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router 7
- **Styling**: TailwindCSS 4
- **UI Components**: 
  - Radix UI Primitives
  - Custom-built components
  - Material UI components
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Drag and Drop**: Hello Pangea DND
- **Date Handling**: date-fns and React Day Picker
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📋 Project Structure

```
src/
  ├── assets/         # Static assets
  ├── components/     # Reusable UI components
  │   ├── dashboard/  # Dashboard-specific components
  │   └── ui/         # UI primitives and base components
  ├── contexts/       # React context providers
  ├── layouts/        # Layout components
  ├── lib/            # Utility functions
  ├── pages/          # Page components
  └── types/          # TypeScript type definitions
```

## 🛠️ Development

This project uses ESLint for code linting. Run the linter with:

```bash
npm run lint
```

## 📱 Responsive Design

The dashboard is fully responsive and optimized for desktop, tablet, and mobile devices.

## 🔄 State Management

The application uses React's Context API for state management, with specific contexts for theme handling and other global states.

## 🎨 Theming

The application supports both light and dark modes through a custom theme context provider.
