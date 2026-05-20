# magicfpv backend

Minimal Express backend for MagicFPV.

## Setup

1. Copy `.env.example` to `.env` and fill in values.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start server:

```bash
npm start
```

## API
- `POST /auth/register` { username, password } -> { token }
- `POST /auth/login` { username, password } -> { token }
- `GET /orders` -> list of orders
- `POST /orders` { name, surname, company, phone, email, message } -> created order
- `GET /orders/:id` -> single order
- `PUT /orders/:id` { status: boolean } -> updated order
