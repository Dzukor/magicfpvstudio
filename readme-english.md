# magicfpv

Portable web/mobile project for order management (Next.js + Express + React Native/Expo).

## Table of Contents

1. [Project Description](#project-description)
2. [Architecture](#architecture)
3. [Backend](#backend)
4. [Web Frontend (studio)](#web-frontend-studio)
5. [Mobile Application](#mobile-application)
6. [Running the Project](#running-the-project)
7. [Main Technical Scenarios](#main-technical-scenarios)
8. [Common Errors and Fixes](#common-errors-and-fixes)
9. [Tips](#tips)

## Project Description

`magicfpv` is a system for:
- receiving orders (order forms),
- listing active orders,
- archiving completed orders,
- moving orders between active and archive,
- password change and simple API security.

## Architecture

- `backend/` - Express server + MySQL
- `magic-fpv-studio/` - Next.js web panel with React client (desktop)
- `mobile-magicfpv/` - Expo React Native application (mobile)

## Backend

### Structure (key files)
- `backend/index.js` - server entry point
- `backend/routes/orders.js` - Orders API (`GET`, `POST`, `PUT`, `GET /:id`)
- `backend/routes/auth.js` - login / registration / password change
- `backend/db.js` - MySQL database configuration
- `backend/db-init/init.sql` - `orders` table

### `orders` Table Schema:
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

### Endpoints
- `GET /orders` - list all orders
- `GET /orders/:id` - single order
- `POST /orders` - create order
- `PUT /orders/:id` - update status and ended_at

#### Status Validation
In `PUT /orders/:id` in `backend/routes/orders.js`:
- `status` must be `boolean` (true/false);
- if `true` -> `ended_at = CURRENT_TIMESTAMP`;
- if `false` -> `ended_at = NULL`.

## Web Frontend (studio)

Folder: `magic-fpv-studio/`
- Next.js + React components in `src/components`
- registration/login, order list, details, form (not key for this task)
- API client in `magic-fpv-studio/src/lib/api.js`.

## Mobile Application

Folder: `mobile-magicfpv/`
- screens:
  - `app/main/index.tsx` - active orders, checkbox to complete,
  - `app/archive/index.tsx` - archived orders, checkbox to restore,
  - `app/login`, `app/passchange` etc.
- API service: `mobile-magicfpv/services/api.ts`:
  - `getOrders`, `updateOrder`, `postOrder`, `login`, `register`, `changePassword`.

### Key Fragments

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

## Running the Project

1. Requirements: Node.js, npm/yarn, MySQL.
2. Start backend:
   - `cd backend`.
   - `npm install`.
   - Create MySQL database and run `db-init/init.sql`.
   - `npm start` (default port 3001).

3. Start web frontend:
   - `cd magic-fpv-studio`.
   - `npm install`.
   - `npm run dev` (default port 3000).

4. Start mobile:
   - `cd mobile-magicfpv`.
   - `npm install`.
   - `npx expo start`.

5. API connection:
   - In `mobile-magicfpv/services/api.ts`, `API_URL` should point to backend e.g. `http://10.0.2.2:3001` (Android emulator), `http://localhost:3001` (web/Expo Go from local host depending on configuration).

## Main Technical Scenarios

1. Load order list (status 0 and 1) on both screens.
2. `main`:
   - `status: true` and remove from view.
3. `archive`:
   - `status: false` and remove from view.
4. Restore / refresh.

## Common Errors and Fixes

### 400 Bad Request on PUT /orders/:id
- Cause: `status` is not boolean in body. You're sending numbers `0/1` instead of `true/false`.
- Fix: `await updateOrder(id,{ status: true })` or `...{ status: false }`.

### Invalid hook call
- Cause: `React.useState` called inside `handleX`.
- Fix: hooks only in root of functional component.

### Black / invisible dates (ended_at)
- In archive component styles add `completedText` and use a contrasting color.

### No data in mobile application
- Check `API_URL` (emulator vs physical device): use host IP.
- Check if backend is reachable and there are no CORS errors in Fetch console.

### Outdated view after status change
- Make sure you refresh state after `updateOrder()`:
  - `setOrders(prev=>prev.filter(...))` or reload `getOrders()`.
- In stateless change mode, call `loadOrders()` or `loadArchive()` after operation.

## Tips / Improvements

- Use strong TS types instead of `any` (type `Order`).
- Implement HTTP error code handling (400/401/500) and UI messages.
- In `GET /orders` you can add backend-side filtering.
- Add loading indicator and confirmation (toast) for success.

---

## Implementation Pattern in a Single Server File (with examples)

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

## Contact and Testing

1. You can test the API via Postman or curl:
   - `curl http://localhost:3001/orders`
   - `curl -X PUT http://localhost:3001/orders/1 -d '{"status":true}' -H 'Content-Type: application/json'`
2. In the mobile console, add `console.log` in `handleToggleStatus` and `handleRestore`.

Good luck! If you'd like, I can add a separate chapter on tests, lint, and prettier to this README.
