# Magic FPV Studio - Dokumentacja Projektu

## 📋 Spis Treści
1. [Przegląd Projektu](#przegląd-projektu)
2. [Architektura i Technologie](#architektura-i-technologie)
3. [Struktura Projektu](#struktura-projektu)
4. [Wyjaśnienie Kluczowych Plików](#wyjaśnienie-kluczowych-plików)
5. [Konfiguracja Środowiska](#konfiguracja-środowiska)
6. [Optymalizacje SEO](#optymalizacje-seo)
7. [Best Practices](#best-practices)

---

## 🎬 Przegląd Projektu

**Magic FPV Studio** to strona internetowa dla profesjonalnego studia produkcji wideo FPV (First Person View) z dronów. Firma specjalizuje się w dynamicznych lotach FPV w połączeniu z kamerowaniem handheldowym na potrzeby brandów, eventów i klientów indywidualnych w Wielkiej Brytanii i poza jej granicami.

### Główne Cechy:
- 🚀 Portal prezentacyjny usług video produkcji
- 📧 Formularz kontaktowy do rezerwacji usług
- 🎨 Portfolio projektów realizowanych
- 📱 W pełni responsywna strona
- 🔍 Zoptymalizowana pod SEO (Search Engine Optimization)
- ⚡ Szybkie ładowanie dzięki Next.js

---

## 🏛️ Architektura i Technologie

### Stack Techniczny

```
┌─────────────────────────────────────┐
│  Frontend (React 19.2.3)            │
│  ├─ Components (JSX)                │
│  ├─ CSS (Responsive)                │
│  └─ Next.js 16.1.6 (Framework)      │
├─────────────────────────────────────┤
│  Backend                            │
│  ├─ Next.js API Routes              │
│  ├─ Database (lib/db.js)            │
│  └─ Form Processing                 │
├─────────────────────────────────────┤
│  DevOps & Build Tools               │
│  ├─ ESLint 9 (Code Quality)         │
│  └─ Next.js Build System            │
└─────────────────────────────────────┘
```

### Szczegółowe Objaśnienie Technologii

#### **Next.js 16.1.6** ⚡
Next.js to framework React umożliwiający:
- **Server-Side Rendering (SSR)**: Strony są renderowane na serwerze, co lepsze dla SEO
- **Static Generation**: Tworzenie statycznych plików HTML w fazie budowania
- **API Routes**: Possibility to create backend endpoints (`api/` folder)
- **Automatyczne routowanie**: Na podstawie struktury folderów
- **Optymalizacja obrazów**: Automatyczne kompresowanie i dostarczanie w odpowiednich formatach
- **Code Splitting**: Automatyczne podziały kodu na mniejsze bundle

**Jak działa w tym projekcie:**
```
src/app/page.jsx          → / (strona główna)
src/app/form/page.jsx     → /form (formularz kontaktowy)
src/app/services/page.jsx → /services (usługi)
```

#### **React 19.2.3** ⚛️
React to biblioteka do budowania interfejsów użytkownika za pomocą komponentów.

**Kluczowe koncepty w projekcie:**
- **Komponenty funkcyjne**: `Navbar.jsx`, `Hero.jsx`, `About.jsx` itd.
- **Hooks**: `useState` do zarządzania stanem formularza w `FormClient.jsx`
- **Props**: Przekazywanie danych między komponentami
- **JSX**: Składnia HTML-like wewnątrz JavaScript

#### **CSS3** 🎨
Projekt używa CSS do stylizacji z nowoczesnymi funkcjami:
- **Flexbox**: Do elastycznych układów (`display: flex`)
- **CSS Grid**: Do budowania siatek responsywnych
- **Media Queries**: Dla responsywności na różnych urządzeniach
- **Backdrop Filter**: Efekt rozmycia w tle (blur) w nawigacji

---

## 📁 Struktura Projektu

```
magic-fpv-studio/
├── 📄 Configuration Files
│   ├── package.json              # Definicja projektu i zależności
│   ├── next.config.js            # Konfiguracja Next.js
│   ├── jsconfig.json             # Konfiguracja ścieżek importu
│   ├── eslintrc.json             # Reguły lintowania kodu
│
├── 📁 lib/
│   └── db.js                     # Baza danych (mock data)
│
├── 📁 public/
│   ├── robots.txt                # Dla web crawlerów (SEO)
│   ├── sitemap.xml               # Mapa strony
│   ├── 📁 photos/                # Zdjęcia i media
│   │   ├── Logo.png
│   │   ├── Logo16x16.png
│   │   ├── background.jpg
│   │   └── ...
│   └── 📁 videos/                # Wideo z portfolio
│
├── 📁 src/
│   ├── 📁 app/                   # App Router (Next.js 13+)
│   │   ├── layout.jsx            # Layout główny
│   │   ├── page.jsx              # Strona główna (/)
│   │   ├── globals.css           # Style globalne
│   │   │
│   │   ├── 📁 form/
│   │   │   ├── FormClient.jsx    # Komponent formularza
│   │   │   └── page.jsx          # Strona formularza (/form)
│   │   │
│   │   └── 📁 services/
│   │       └── page.jsx          # Strona usług (/services)
│   │
│   └── 📁 components/            # Komponenty wielokrotnego użytku
│       ├── Navbar.jsx            # Nawigacja główna
│       ├── Hero.jsx              # Sekcja powitalna (hero section)
│       ├── About.jsx             # O nas
│       ├── Portfolio.jsx         # Portfolio prac
│       ├── Contact.jsx           # Sekcja kontaktu
│       ├── Socials.jsx           # Social media linki
│       └── Footer.jsx            # Footer
│
└── 📄 This File
    └── README.md
```

---

## 🔍 Wyjaśnienie Kluczowych Plików

### **1. `package.json` - Definicja Projektu**

```json
{
  "name": "magic-fpv-studio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",              // Uruchamia dev serwer (port 3000)
    "build": "next build",          // Buduje projekt do produkcji
    "start": "next start",          // Uruchamia produkcyjny serwer
    "lint": "eslint"                // Sprawdza jakość kodu
  },
  "dependencies": {
    "next": "16.1.6",               // Framework React (SSR + Routing)
    "react": "19.2.3",              // Biblioteka UI
    "react-dom": "19.2.3"           // Rendering do DOM
  },
  "devDependencies": {
    "eslint": "^9",                 // Weryfikacja kodu
    "eslint-config-next": "16.1.6"  // Reguły ESLint dla Next.js
  }
}
```

**Co to oznacza:**
- `private: true` - ten projekt nie będzie publikowany w npm
- `dependencies` - pakiety wymagane do działania aplikacji
- `devDependencies` - pakiety używane przy developmencie

---

### **2. `next.config.js` - Konfiguracja Next.js**

```javascript
const nextConfig = {
  // Konfiguracja obrazów
  images: {
    formats: ['image/avif', 'image/webp'],  // Nowoczesne formaty (mniejszy rozmiar)
  },
  // Włącza StrictMode - lepsze debugowanie
  reactStrictMode: true,
}

module.exports = nextConfig
```

**Wyjaśnienie:**
- `formats`: Next.js będzie dostarczać obrazy w formatach AVIF (najmniejszy) i WebP (mały), fallback do PNG/JPG dla starych przeglądarek
- `reactStrictMode: true`: Aktywuje dodatkowe sprawdzenia w React (dev mode), pomagające wyłapać problemy

---

### **3. `src/app/layout.jsx` - Layout Główny (Metadane i Struktura)**

```jsx
/**
 * Layout główny dla całej aplikacji
 * Wszystkie strony będą renderowane wewnątrz tego layoutu
 */

export const metadata = {
  // Konfiguracja SEO - co wyświetli się w Google
  metadataBase: new URL('https://magicfpvstudio.com'),
  
  title: {
    default: 'Magic FPV Studio | Professional FPV Video Production',
    template: '%s | Magic FPV Studio'  // %s zostanie zastąpione tytułem strony
  },
  
  description: 'Magic FPV Studio blends dynamic FPV flights...',
  
  // Słowa kluczowe dla SEO
  keywords: ['FPV video', 'drone videography', 'cinematic video production', ...],
  
  // Meta dane dla social media (Open Graph)
  openGraph: {
    type: 'website',
    url: 'https://magicfpvstudio.com',
    images: [{
      url: '/photos/Logo.png',
      width: 1200,
      height: 630,
      alt: 'Magic FPV Studio Logo',
    }]
  },
  
  // Meta dane dla Twittera
  twitter: {
    card: 'summary_large_image',
    images: ['/photos/Logo.png'],
  },
  
  // Ustawienia dla robotów wyszukiwarek
  robots: {
    index: true,          // Pozwól indexować tę stronę
    follow: true,         // Pozwól podążać za linkami
    googleBot: {
      index: true,
      'max-video-preview': -1,  // -1 = brak limitu
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - śledzi wizytujących */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');  // Wstaw swój ID
            `,
          }}
        />
      </head>
      <body>
        {children}  {/* Wszystkie strony będą renderowane tutaj */}
      </body>
    </html>
  );
}
```

**Jak to działa:**
1. `metadata` jest przetwarzana przez Next.js i dodawana do `<head>` każdej strony
2. Google Analytics śledzi aktywność użytkowników
3. `children` to placeholder na zawartość konkretnej strony

---

### **4. `src/app/page.jsx` - Strona Główna**

```jsx
import Navbar from '@/components/Navbar';  // @ = skrót do src/
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Structured Data (JSON-LD) dla lepszego SEO
 * Pozwala Google zrozumieć strukturę biznesu
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Magic FPV Studio',
  description: 'Professional FPV and cinematic video production',
  url: 'https://magicfpvstudio.com',
  telephone: '+447718330652',
  email: 'magicfpvstudio@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GB',
  },
  // Linki do social media
  sameAs: [
    'https://www.facebook.com/Magicfpvstudio',
    'https://www.instagram.com/magicfpvstudio/',
    'https://www.youtube.com/@Magicfpvstudio',
  ],
  priceRange: '$$',
  image: 'https://magicfpvstudio.com/photos/Logo.png',
};

export default function Home() {
  return (
    <>
      {/* Wstrzyknięcie JSON-LD do dokumentu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      <main id="top" className="container">
        <Hero title="From the first shot to the last emotion." />
        
        {/* Button do rezerwacji */}
        <Link href="/form" className="cta-button">
          Book Your FPV Video
        </Link>
        
        {/* Poszczególne sekcje strony */}
        <About />
        <Portfolio />
        
        {/* Grid layout - dwie kolumny */}
        <section className="grid">
          <Socials />
          <Contact />
        </section>
      </main>
      
      <Footer />
    </>
  );
}
```

**Struktura strony (seamless scrolling):**
```
┌─────────────────┐
│     Navbar      │  (fixed na górze)
├─────────────────┤
│      Hero       │  "From the first shot..."
├─────────────────┤
│   CTA Button    │  "Book Your FPV Video"
├─────────────────┤
│     About       │
├─────────────────┤
│   Portfolio     │
├─────────────────┤
│  Socials | Contact │  (grid - obok siebie)
├─────────────────┤
│     Footer      │
└─────────────────┘
```

---

### **5. `src/components/Navbar.jsx` - Nawigacja**

```jsx
'use client';  // Konieczne bo używa React Hooks (client-side)

import Link from 'next/link';  // Next.js Link (lepszy od HTML <a>)
import { usePathname } from 'next/navigation';  // Hook: pobiera aktualną ścieżkę

export default function Navbar() {
  // Pobiera aktualną ścieżkę URL (np. "/services" lub "/")
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';

  return (
    <nav className="nav">
      {/* Logo */}
      <Link href="/#top" className="logo">
        <img src="/photos/Logo.png" alt="Magic FPV Studio logo" />
      </Link>

      {/* Linki nawigacyjne */}
      <div className="nav-links">
        {/* 
          Logika: jeśli jesteśmy na /services, scroll to #about
          jeśli na stronie głównej, o scroll to #about
        */}
        <a href={isServicesPage ? "/#about" : "#about"}>About</a>
        <a href={isServicesPage ? "/#portfolio" : "#portfolio"}>Portfolio</a>
        <a href={isServicesPage ? "/#socials" : "#socials"}>Socials</a>
        
        {/* Link na pełną stronę */}
        <Link href="/services">Services</Link>
        
        <a href={isServicesPage ? "/#contact" : "#contact"}>Contact</a>
      </div>
    </nav>
  );
}
```

**Jak to działa:**
- `'use client'` mówi Next.js że ten komponent uruchamia się w przeglądarce (ma dostęp do document, window)
- `usePathname()` zwraca Current URL path (np. "/services")
- `Link from Next.js` — lepsze niż HTML `<a>` (preloading, mniejszy JavaScript)

---

### **6. `src/app/form/FormClient.jsx` - Formularz Kontaktowy**

```jsx
"use client";

import { useState } from "react";

export default function FormClient() {
  /**
   * useState - React Hook do zarządzania stanem komponentu
   * setFormData - funkcja do aktualizacji stanu
   */
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  /**
   * Obsługiwacz zmian w input polach
   * e.target.name - nazwa pola (z atrybutu name)
   * e.target.value - nowa wartość
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread operator (...) kopiuje poprzedni stan
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Obsługiwacz submitu formularza
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Zapobiega domyślnemu przeładowaniu strony
    console.log(formData);  // Tutaj wysłać na serwer (TODO)
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        {/* 
          Controlled component - React kontroluje wartość
          value={formData.name} - wyświetla wartość ze stanu
          onChange={handleChange} - aktualizuje stan przy zmianie
        */}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      {/* Pozostałe pola analogicznie... */}
    </form>
  );
}
```

**Jak działa state management:**
```
User pisze w input
           ↓
handleChange zostaje wywołany
           ↓
setFormData aktualizuje stan
           ↓
Komponent re-renders z nową wartością
           ↓
Input wyświetla nową wartość
```

---

### **7. `lib/db.js` - Baza Danych (Mock)**

```javascript
// Baza danych - przykładowe aplikacje (pozorny backend)
const applications = [
  {
    id: 1,
    name: "FPV Flight Controller",
    description: "Zaawansowany system sterowania dla dronów FPV",
    category: "Hardware",
    status: "Active",
    date: "2024-01-15"
  },
  // ...więcej wpisów
];

/**
 * Funkcje dostępu do danych - można by to zastąpić bazą danych (MongoDB, PostgreSQL)
 */

// Pobiera wszystkie aplikacje
export async function getApplications() {
  return applications;
}

// Pobiera aplikację po ID
export async function getApplicationById(id) {
  return applications.find(app => app.id === parseInt(id));
}

// Filtruje aplikacje po kategorii
export async function getApplicationsByCategory(category) {
  return applications.filter(app => app.category === category);
}

// Filtruje aplikacje po statusie
export async function getApplicationsByStatus(status) {
  return applications.filter(app => app.status === status);
}
```

**Przyszłe usprawnienia:**
```javascript
// Może być zastąpione przez:
- MongoDB (NoSQL, flexibilne schematy)
- PostgreSQL (relacyjna baza danych)
- Firebase (cloud backend Google)
- Supabase (open-source Firebase alternative)
```

---

### **8. `src/app/globals.css` - Style Globalne**

```css
/* Reset CSS - normalizuje stylowanie na różnych przeglądarkach */
* {
    box-sizing: border-box;  /* Padding wlicza się w szerokość */
}

html, body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    color: antiquewhite;  /* Jasny kolor tekstu */
}

/* Tło z obrazkiem */
body {
    background: url(/photos/background.jpg) center / cover no-repeat;
    min-height: 100vh;  /* Minimum wysokość - cała strona */
}

/* 
  Media query - jeśli urządzenie obsługuje hover i ma mysz
  (nie dotykowy screen)
*/
@media (hover: hover) and (pointer: fine) {
    body {
        background-attachment: fixed;  /* Parallax effect */
    }
}

/* Nawigacja - fixed na górze */
.nav {
    position: fixed;  /* Zostaje na górze przy scrollowaniu */
    top: 0;
    width: 100%;
    padding: 0.75rem 1.2rem;
    display: flex;  /* Flexbox - wyrównanie horyzontalnie */
    justify-content: space-between;  /* Na końcach */
    align-items: flex-start;  /* U góry */
    background: rgba(0, 0, 0, 0.65);  /* Czarny z przezroczystością */
    backdrop-filter: blur(6px);  /* Rozmycie tła za nim */
    z-index: 1000;  /* Zawsze na wierzchu */
    flex-wrap: wrap;  /* Elementy zawijają się na mniejszych ekranach */
    gap: 0.8rem;  /* Odstęp między elementami */
}

.logo {
    padding-top: 0.25rem;
}

.logo img {
    width: 50px;  /* Logo 50px szerokości */
}
```

**Pojęcia CSS:**
- `position: fixed` — element pozostaje na miejscu przy scrollowaniu
- `backdrop-filter: blur()` — rozmywa element za komponentem
- `z-index` — kontroluje kolejność warstw (większa = bliżej przeglądarki)
- `flex` — elastyczne rozmieszczanie elementów
- `@media` — responsywne zapytania dla różnych rozmiarów ekranu

---

## ⚙️ Konfiguracja Środowiska

### Wymagania:
- **Node.js** >= 18.x (JavaScript runtime)
- **npm** lub **yarn** (package manager)

### Instalacja i Uruchomienie

```bash
# 1. Klonowanie repozytorium
git clone <repository-url>
cd magic-fpv-studio

# 2. Instalacja zależności
npm install
# lub
yarn install

# 3. Uruchomienie serwera deweloperskim
npm run dev
# Serwer będzie dostępny na: http://localhost:3000

# 4. Budowanie do produkcji
npm run build

# 5. Uruchomienie wersji produkcyjnej
npm start

# 6. Sprawdzenie jakości kodu
npm run lint
```

---

---

## 🔍 Optymalizacje SEO

### Implementowane w projekcie:

#### 1. **Structured Data (JSON-LD)**
```javascript
// src/app/page.jsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',  // Google wie, że to lokal biznes
  name: 'Magic FPV Studio',
  // ... szczegóły
}
```

**Efekt:** Google wyświetli bogatsze wyniki w wyszukiwaniu (rich snippets).

---

#### 2. **Meta Tags**
```jsx
export const metadata = {
  title: 'Magic FPV Studio | Professional FPV Video Production',
  description: '...',
  keywords: ['FPV video', 'drone videography', ...],
}
```

**Efekt:** Lepsze znalezienie w Google.

---

#### 3. **Open Graph (Social Media)**
```javascript
openGraph: {
  images: [{
    url: '/photos/Logo.png',
    width: 1200,
    height: 630,  // Idealne wymiary dla Facebooka/LinkedIna
  }]
}
```

**Efekt:** Gdy ktoś udostępni link, wyświetli się ładne zdjęcie + tytuł.

---

#### 4. **robots.txt i sitemap.xml**
```
public/robots.txt
public/sitemap.xml
```

**Efekt:** Web crawlers wiedzą, jakie strony zindeksować.

---

#### 5. **Next.js Image Optimization**
```javascript
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],  // Nowoczesne formaty
}
```

**Efekt:** Szybsze ładowanie = lepszy ranking w Google.

---

#### 6. **Responsive Design**
```css
@media (max-width: 768px) {
  /* Style dla urządzeń mobilnych */
}
```

**Efekt:** Google nagradza responsywne strony lepszym rankingiem (Mobile-First Index).

---

#### 7. **Performance Metrics (Core Web Vitals)**
- **LCP** (Largest Contentful Paint) < 2.5s ✅
- **FID** (First Input Delay) < 100ms ✅
- **CLS** (Cumulative Layout Shift) < 0.1 ✅

---

## 📋 Best Practices

### 1. **Code Organization**

```
✅ Dobry przykład:
src/
├── app/              # Strony i layout aplikacji
├── components/       # Komponenty wielokrotnego użytku
├── lib/              # Utility functions (bazy danych, helpers)
└── styles/           # Globalne style CSS

❌ Zły przykład:
src/
├── all-pages/
├── all-components/
└── random-files/
```

---

### 2. **Naming Conventions**

```javascript
✅ Dobro:
export function getUserById(id) { }
const activeUsers = users.filter(u => u.active);

❌ Źle:
export function gUBI(id) { }
const au = users.filter(u => u.active);
```

---

### 3. **Component Reusability**

```jsx
✅ Dobro:
function Button({ label, onClick, variant = 'primary' }) {
  return <button className={`btn btn-${variant}`}>{label}</button>;
}

<Button label="Submit" onClick={handleSubmit} variant="primary" />
<Button label="Cancel" onClick={handleCancel} variant="secondary" />

❌ Źle:
function SubmitButton() { ... }
function CancelButton() { ... }
function DeleteButton() { ... }
```

---

### 4. **Environment Variables**

```bash
# .env.local (nie commituj!)
NEXT_PUBLIC_API_URL=https://api.magicfpvstudio.com
DATABASE_PASSWORD=secret123
```

```javascript
// Dostęp w kodzie:
process.env.NEXT_PUBLIC_API_URL  // Dostępne w przeglądarce
process.env.DATABASE_PASSWORD     // Tylko na serwerze
```

---

### 5. **Error Handling**

```jsx
✅ Dobro:
try {
  const data = await fetch('/api/submit');
  return await data.json();
} catch (error) {
  console.error('Failed to submit form:', error);
  setError('Something went wrong. Please try again.');
}

❌ Źle:
const data = fetch('/api/submit');  // Brak error handling!
```

---

### 6. **Performance Optimization**

```javascript
✅ Implementuj:
- Code splitting (automatyczne w Next.js)
- Image optimization (next/image component)
- Lazy loading (React.lazy())
- Memoization (React.memo() dla komponentów)

❌ Unikaj:
- Loadowania całej biblioteki zamiast pojedynczej funkcji
- Wysyłania unskalowanych obrazów
- Renderowania ogromnych list bez virtualizacji
```

---

## 📚 Przydatne Linki

- [Next.js Dokumentacja](https://nextjs.org/docs)
- [React Dokumentacja](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev - Performance](https://web.dev/performance/)
- [Google Search Central](https://developers.google.com/search)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🎯 Plany Rozwoju

- [ ] Backend API (Node.js / Express)
- [ ] Baza danych (MongoDB / PostgreSQL)
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Admin panel
- [ ] Blog/News section
- [ ] Multiple language support (i18n)
- [ ] Dark mode toggle

---

## 📞 Kontakt i Wsparcie

**Magic FPV Studio**
- 📧 Email: magicfpvstudio@gmail.com
- 📱 Telefon: +447718330652
- 🌐 Website: https://magicfpvstudio.com
- 📍 Lokacja: UK

---

## 📄 Licencja

Projekt jest prywatny. Wszelkie prawa zastrzeżone.

---

**Ostatnia aktualizacja:** Luty 2026
**Wersja:** 0.1.0
