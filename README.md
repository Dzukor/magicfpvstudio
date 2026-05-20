# magicfpv

Przenośny projekt web/mobile do zarządzania zamówieniami (Next.js + Express + React Native/Expo).

## Spis treści

1. [Opis projektu](#opis-projektu)
2. [Architektura](#architektura)
3. [Backend](#backend)
4. [Frontend web (studio)](#frontend-web-studio)
5. [Aplikacja mobilna](#aplikacja-mobilna)
6. [Uruchomienie](#uruchomienie)
7. [Główne scenariusze techniczne](#główne-scenariusze-techniczne)
8. [Typowe błędy i sposoby naprawy](#typowe-błędy-i-sposoby-naprawy)
9. [Porady](#porady)

## Opis projektu

`magicfpv` to system do:
- recepcji zamówień (formularze zleceń),
- listy aktywnych zamówień,
- archiwizacji zakończonych zleceń,
- przenoszenia zleceń między aktywnymi i archiwum,
- zmiany hasła i prostego zabezpieczenia API.

## Architektura

- `backend/` - serwer Express + MySQL
- `magic-fpv-studio/` - panel webowy Next.js z klientem React (desktop)
- `mobile-magicfpv/` - aplikacja Expo React Native (mobilna)

## Backend

### Struktura (istotne pliki)
- `backend/index.js` - punkt wejścia serwera
- `backend/routes/orders.js` - API dla zamówień (`GET`, `POST`, `PUT`, `GET /:id`)
- `backend/routes/auth.js` - logowanie / rejestracja / zmiana hasła
- `backend/db.js` - konfiguracja bazy MySQL
- `backend/db-init/init.sql` - tabela `orders`

### Schemat tabeli `orders`:
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200),
  surname VARCHAR(200),
  company VARCHAR(255),
  phone VARCHAR(100),
  email VARCHAR(255),
  message TEXT,
  status TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP NULL
);
```

### Endpointy
- `GET /orders` - lista wszystkich zleceń
- `GET /orders/:id` - pojedyncze zamówienie
- `POST /orders` - tworzenie zamówienia
- `PUT /orders/:id` - aktualizacja statusu i ended_at

#### WALIDACJA statusu
W `PUT /orders/:id` w `backend/routes/orders.js`:
- `status` musi być `boolean` (true/false);
- jeśli `true` -> `ended_at = CURRENT_TIMESTAMP`;
- jeśli `false` -> `ended_at = NULL`.

## Frontend web (studio)

Folder: `magic-fpv-studio/`
- Next.js + komponenty React w `src/components`
- rejestracja/zalogowanie, lista zleceń, szczegóły, formularz (nie są kluczowe dla tego tasku)
- klient API w `magic-fpv-studio/src/lib/api.js`.

## Aplikacja mobilna

Folder: `mobile-magicfpv/`
- ekrany:
  - `app/main/index.tsx` - aktywne zamówienia, checkbox do zakończenia,
  - `app/archive/index.tsx` - archiwalne zamówienia, checkbox do przywrócenia,
  - `app/login`, `app/passchange` etc.
- usługa API: `mobile-magicfpv/services/api.ts`:
  - `getOrders`, `updateOrder`, `postOrder`, `login`, `register`, `changePassword`.

### Kluczowe fragmenty

#### `mobile-magicfpv/app/main/index.tsx`
```ts
const [orders, setOrders] = React.useState<any[]>([]);

const handleToggleStatus = async (orderId:number) => {
  try {
    await updateOrder(orderId, { status: true });
    setOrders(prev => prev.filter(o => o.id !== orderId));
  } catch (err) {
    Alert.alert("Error", "Failed to archive order");
  }
};
```

#### `mobile-magicfpv/app/archive/index.tsx`
```ts
const [orders, setOrders] = React.useState<any[]>([]);

const handleRestore = async (orderId:number) => {
  try {
    await updateOrder(orderId, { status: false });
    setOrders(prev => prev.filter(o => o.id !== orderId));
  } catch (err) {
    Alert.alert("Error", "Failed to restore order");
  }
};
```

#### `mobile-magicfpv/services/api.ts`
```ts
export async function updateOrder(id:number, body:any) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body)
  });
  return res.json();
}
```

## Uruchomienie

1. Wymagania: Node.js, npm/yarn, MySQL.
2. Uruchom backend:
   - `cd backend`.
   - `npm install`.
   - Stwórz bazę MySQL i uruchom `db-init/init.sql`.
   - `npm start` (domyślnie 3001).

3. Uruchom web front:
   - `cd magic-fpv-studio`.
   - `npm install`.
   - `npm run dev` (domyślnie 3000).

4. Uruchom mobilnie:
   - `cd mobile-magicfpv`.
   - `npm install`.
   - `npx expo start`.

5. Połączenie kontraktów:
   - W `mobile-magicfpv/services/api.ts`, `API_URL` powinien wskazywać na backend np. `http://10.0.2.2:3001` (Android emulator), `http://localhost:3001` (web/Expo Go z lokalnego hosta zależnie od konfiguracji).

## Główne scenariusze techniczne

1. Załaduj listę zamówień (status 0 i 1) w obu ekranach.
2. `main`:
   - `status: true` i usuwanie z widoku.
3. `archive`:
   - `status: false` i usuwanie z widoku.
4. Przywróć / odśwież.

## Typowe błędy i sposoby naprawy

### 400 Bad Request przy PUT /orders/:id
- Przyczyna: `status` nie jest boolean w body. Wysyłasz liczby `0/1` zamiast `true/false`.
- Fix: `await updateOrder(id,{ status: true })` lub `...{ status: false }`.

### Invalid hook call
- Przyczyna: `React.useState` wywoływany wewnątrz `handleX`.
- Fix: hooki tylko w root funkcjonalnej komponentu.

### Czarne / niewidoczne daty (ended_at)
- W stylach komponentu `archive` dodaj `completedText` i stosuj kolor kontrastowy.

### Brak danych w mobilnej aplikacji
- Sprawdź `API_URL` (emulator vs urządzenie fizyczne): użyj IP hosta.
- Sprawdź, czy backend jest osiągalny i w konsoli Fetch nie ma błędów CORS.

### Nieaktualny widok po zmianie statusu
- Upewnij się, że po `updateOrder()` odświeżasz stan:
  - `setOrders(prev=>prev.filter(...))` lub reload `getOrders()`.
- W trybie bezpośredniej zmiany trzeba wywołać `loadOrders()` lub `loadArchive()` po operacji.

## Porady / ulepszenia

- Użyj silnych typów TS zamiast `any` (typ `Order`).
- Wprowadź obsługę błędów HTTP kodów (400/401/500) i komunikaty UI.
- W `GET /orders` możesz dołożyć backendowe filtrowanie.
- Dodaj wskaźnik ładowania i potwierdzenie (toast) dla sukcesu.

---

## Wzorzec implementacji w jednym pliku serwera (z przykładami)

### backend/routes/orders.js
```js
router.put('/:id', async (req,res)=>{
  try {
    const { status } = req.body;
    if (typeof status !== 'boolean') return res.status(400).json({ error:'status boolean required'});
    let query='UPDATE orders SET status=?';
    const params=[status?1:0];
    if(status) { query += ', ended_at = CURRENT_TIMESTAMP'; }
    else { query += ', ended_at = NULL'; }
    query+=' WHERE id=?'; params.push(req.params.id);
    await pool.query(query, params);
    const [rows] =await pool.query('SELECT * FROM orders WHERE id=?',[req.params.id]);
    return res.json(rows[0]);
  } catch(e){ console.error(e); return res.status(500).json({error:'server error'}); }
});
```

---

## Kontakt i test

1. Przez Postman lub curl możesz sprawdzić API:
   - `curl http://localhost:3001/orders`
   - `curl -X PUT http://localhost:3001/orders/1 -d '{"status":true}' -H 'Content-Type: application/json'`
2. W mobilnej konsoli wpisz `console.log` w `handleToggleStatus` i `handleRestore`.

Powodzenia! Jeśli chcesz, dodam jeszcze osobny rozdział o testach, lint i prettier w tym README.