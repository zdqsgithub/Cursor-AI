# vAmicus Backend

This is the backend API for the vAmicus platform, a content subscription platform with cryptocurrency payments.

## Tech Stack

- **Node.js** with **Express** for the API
- **TypeScript** for type safety
- **PostgreSQL** with **Prisma ORM** for database
- **JWT** for authentication
- **Socket.io** for real-time features
- **Ethers.js** for blockchain integration

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Installation

1. Install dependencies:
```
npm install
```

2. Set up environment variables:
```
cp .env.example .env
```
Then edit the `.env` file with your configuration.

3. Set up the database:
```
npx prisma migrate dev --name init
```

4. Start the development server:
```
npm run dev
```

## Project Structure

```
backend/
├── prisma/             # Prisma schema and migrations
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── index.ts        # Entry point
├── .env                # Environment variables (not in repo)
├── .env.example        # Example environment variables
└── package.json        # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/verify-email/:token` - Verify email

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `GET /api/users/:userId` - Get user by ID
- `GET /api/users/:userId/content` - Get user's content

### Content
- `POST /api/content` - Create content
- `GET /api/content/:contentId` - Get content by ID
- `PUT /api/content/:contentId` - Update content
- `DELETE /api/content/:contentId` - Delete content
- `GET /api/content/feed` - Get content feed

### Subscriptions
- `POST /api/subscriptions` - Create subscription
- `GET /api/subscriptions` - Get user's subscriptions
- `GET /api/subscriptions/:subscriptionId` - Get subscription by ID
- `PUT /api/subscriptions/:subscriptionId/cancel` - Cancel subscription

### Subscription Tiers
- `POST /api/subscription-tiers` - Create subscription tier
- `GET /api/creators/:creatorId/subscription-tiers` - Get creator's subscription tiers
- `PUT /api/subscription-tiers/:tierId` - Update subscription tier
- `DELETE /api/subscription-tiers/:tierId` - Delete subscription tier

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get user's transactions
- `GET /api/transactions/:transactionId` - Get transaction by ID
- `POST /api/transactions/verify/:transactionId` - Verify transaction

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages` - Get user's messages
- `GET /api/messages/:conversationId` - Get conversation
- `PUT /api/messages/:messageId/read` - Mark message as read

### Blockchain
- `POST /api/blockchain/connect-wallet` - Connect wallet
- `GET /api/blockchain/wallet-status` - Get wallet status
- `POST /api/blockchain/verify-signature` - Verify signature 