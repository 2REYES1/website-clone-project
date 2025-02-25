## Next.js Application

This is a modern web application built with Next.js 13, featuring:

- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui components
- 🌙 Dark mode support
- 📱 Responsive design
- 🎯 TypeScript support

### Prerequisites

- Node.js 16.8.0 or newer
- npm (comes with Node.js)

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm start` - Runs the built application
- `npm run lint` - Runs the linter

### Project Structure

```
├── app/                 # App router directory
├── components/         # React components
│   └── ui/            # UI components from shadcn/ui
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── public/            # Static files
└── styles/            # Global styles
```

### Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)