# magicfpv backend

Minimalny backend Express dla MagicFPV.

## Konfiguracja

1. Skopiuj `.env.example` do `.env` i uzupełnij wartości.
2. Zainstaluj zależności:

```bash
cd backend
npm install
```

3. Uruchom serwer:

```bash
npm start
```

## API
- `POST /auth/register` { username, password } -> { token }
- `POST /auth/login` { username, password } -> { token }
- `GET /orders` -> lista zamówień
- `POST /orders` { name, surname, company, phone, email, message } -> utworzone zamówienie
- `GET /orders/:id` -> pojedyncze zamówienie
- `PUT /orders/:id` { status: boolean } -> zaktualizowane zamówienie
