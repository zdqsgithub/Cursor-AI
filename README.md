# vAmicus

vAmicus ("True Friend" in Latin) is a content subscription platform that allows creators to monetize their content directly from their audience using cryptocurrency payments.

## Features

- Content subscription platform with cryptocurrency payments
- Monetization tools for creators
- Modern, intuitive interface
- Privacy-focused payment system
- Global accessibility with no banking restrictions

## Tech Stack

- **Frontend**: React.js with Next.js, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain Integration**: Web3.js/Ethers.js
- **Content Storage**: AWS S3 + IPFS

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Metamask or compatible Web3 wallet (for testing)

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/vAmicus.git
cd vAmicus
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
```
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

4. Start development servers
```
npm run dev
```

## Testing

### Frontend Testing

1. Navigate to the frontend directory:
```
cd frontend
```

2. Start the development server:
```
npm run dev
```

3. Open your browser and visit `http://localhost:3000` to access the application.

4. Test the following user flows:
   - Signup: Visit `http://localhost:3000/signup` to create a new account
   - Login: Visit `http://localhost:3000/login` to sign in with existing credentials
   - Discover: Visit `http://localhost:3000/discover` to browse creators
   - Dashboard: Visit `http://localhost:3000/dashboard` (requires login)

5. For blockchain features testing:
   - Install MetaMask browser extension
   - Connect your wallet to the application
   - Test subscription payments or content purchases

### Backend Testing

1. Navigate to the backend directory:
```
cd backend
```

2. Start the backend server:
```
npm run dev
```

3. The API server will be running at `http://localhost:5000`.

4. Test API endpoints using tools like Postman or curl:
   - User Authentication: `POST /api/auth/login` and `POST /api/auth/register`
   - Creator Profiles: `GET /api/creators` and `GET /api/creators/:id`
   - Content: `GET /api/content` and `POST /api/content`
   - Subscriptions: `POST /api/subscriptions`

5. For automated tests:
```
npm test
```

## Project Structure

```
vAmicus/
├── frontend/         # Next.js frontend application
├── backend/          # Node.js Express backend API
└── package.json      # Root package.json for workspace configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 