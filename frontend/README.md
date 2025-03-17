# vAmicus Frontend

This is the frontend application for the vAmicus platform, a content subscription platform with cryptocurrency payments.

## Tech Stack

- **React.js** with **Next.js** for the UI framework
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Ethers.js** for blockchain integration
- **Socket.io** for real-time features

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Metamask or compatible Web3 wallet (for testing)

### Installation

1. Install dependencies:
```
npm install
```

2. Set up environment variables:
```
cp .env.example .env.local
```
Then edit the `.env.local` file with your configuration.

3. Start the development server:
```
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
frontend/
├── public/             # Static files
├── src/
│   ├── app/            # Next.js app router
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── redux/          # Redux store and slices
│   ├── services/       # API services
│   └── utils/          # Utility functions
├── .env.local          # Environment variables (not in repo)
├── .env.example        # Example environment variables
└── package.json        # Dependencies and scripts
```

## Features

### For Creators
- Profile customization
- Content management (photos, videos, text)
- Subscription tier management
- Direct messaging with subscribers
- Content scheduling
- Analytics dashboard
- Cryptocurrency wallet integration
- Tipping and pay-per-view content

### For Subscribers
- Discovery feed for finding creators
- Subscription management
- Secure cryptocurrency payment processing
- Bookmarking favorite content
- Direct messaging with creators
- Content notifications

## Pages

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/discover` - Discover creators
- `/dashboard` - Creator dashboard
- `/profile/:username` - User profile
- `/content/:contentId` - Content view
- `/messages` - Messaging center
- `/settings` - User settings 