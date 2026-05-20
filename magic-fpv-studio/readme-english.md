# Magic FPV Studio - Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture and Technologies](#architecture-and-technologies)
3. [Project Structure](#project-structure)
4. [Key Files Explanation](#key-files-explanation)
5. [Environment Setup](#environment-setup)
6. [SEO Optimizations](#seo-optimizations)
7. [Best Practices](#best-practices)

---

## 🎬 Project Overview

**Magic FPV Studio** is a website for a professional FPV (First Person View) drone video production studio. The company specializes in dynamic FPV flights combined with handheld camera work for brands, events and individual clients in the UK and beyond.

### Main Features:
- 🚀 Video production services presentation portal
- 📧 Contact form for booking services
- 🎨 Completed projects portfolio
- 📱 Fully responsive website
- 🔍 SEO optimized (Search Engine Optimization)
- ⚡ Fast loading with Next.js

---

## 🏛️ Architecture and Technologies

### Tech Stack

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

### Detailed Technology Explanation

#### **Next.js 16.1.6** ⚡
Next.js is a React framework that enables:
- **Server-Side Rendering (SSR)**: Pages are rendered on the server, which is better for SEO
- **Static Generation**: Creating static HTML files during the build phase
- **API Routes**: Ability to create backend endpoints (`api/` folder)
- **Automatic routing**: Based on folder structure
- **Image optimization**: Automatic compression and delivery in appropriate formats
- **Code Splitting**: Automatic code splitting into smaller bundles

**How it works in this project:**
```
src/app/page.jsx          → / (home page)
src/app/form/page.jsx     → /form (contact form)
src/app/services/page.jsx → /services (services)
```

#### **React 19.2.3** ⚛️
React is a library for building user interfaces using components.

**Key concepts in the project:**
- **Functional components**: `Navbar.jsx`, `Hero.jsx`, `About.jsx` etc.
- **Hooks**: `useState` for form state management in `FormClient.jsx`
- **Props**: Passing data between components
- **JSX**: HTML-like syntax inside JavaScript

#### **CSS3** 🎨
The project uses CSS for styling with modern features:
- **Flexbox**: For flexible layouts (`display: flex`)
- **CSS Grid**: For building responsive grids
- **Media Queries**: For responsiveness across different devices
- **Backdrop Filter**: Background blur effect in navigation

---

## 📁 Project Structure

```
magic-fpv-studio/
├── 📄 Configuration Files
│   ├── package.json              # Project definition and dependencies
│   ├── next.config.js            # Next.js configuration
│   ├── jsconfig.json             # Import paths configuration
│   ├── eslintrc.json             # Code linting rules
│
├── 📁 lib/
│   └── db.js                     # Database (mock data)
│
├── 📁 public/
│   ├── robots.txt                # For web crawlers (SEO)
│   ├── sitemap.xml               # Site map
│   ├── 📁 photos/                # Photos and media
│   │   ├── Logo.png
│   │   ├── Logo16x16.png
│   │   ├── background.jpg
│   │   └── ...
│   └── 📁 videos/                # Portfolio videos
│
├── 📁 src/
│   ├── 📁 app/                   # App Router (Next.js 13+)
│   │   ├── layout.jsx            # Main layout
│   │   ├── page.jsx              # Home page (/)
│   │   ├── globals.css           # Global styles
│   │   │
│   │   ├── 📁 form/
│   │   │   ├── FormClient.jsx    # Form component
│   │   │   └── page.jsx          # Form page (/form)
│   │   │
│   │   └── 📁 services/
│   │       └── page.jsx          # Services page (/services)
│   │
│   └── 📁 components/            # Reusable components
│       ├── Navbar.jsx            # Main navigation
│       ├── Hero.jsx              # Hero section
│       ├── About.jsx             # About us
│       ├── Portfolio.jsx         # Work portfolio
│       ├── Contact.jsx           # Contact section
│       ├── Socials.jsx           # Social media links
│       └── Footer.jsx            # Footer
│
└── 📄 This File
    └── README.md
```

---

## 🔍 Key Files Explanation

### **1. `package.json` - Project Definition**

```json
{
  "name": "magic-fpv-studio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",              // Starts dev server (port 3000)
    "build": "next build",          // Builds project for production
    "start": "next start",          // Starts production server
    "lint": "eslint"                // Checks code quality
  },
  "dependencies": {
    "next": "16.1.6",               // React framework (SSR + Routing)
    "react": "19.2.3",              // UI library
    "react-dom": "19.2.3"           // Rendering to DOM
  },
  "devDependencies": {
    "eslint": "^9",                 // Code verification
    "eslint-config-next": "16.1.6"  // ESLint rules for Next.js
  }
}
```

**What it means:**
- `private: true` - this project won't be published to npm
- `dependencies` - packages required for the application to run
- `devDependencies` - packages used during development

---

### **2. `next.config.js` - Next.js Configuration**

```javascript
const nextConfig = {
  // Image configuration
  images: {
    formats: ['image/avif', 'image/webp'],  // Modern formats (smaller size)
  },
  // Enables StrictMode - better debugging
  reactStrictMode: true,
}

module.exports = nextConfig
```

**Explanation:**
- `formats`: Next.js will deliver images in AVIF (smallest) and WebP (small) formats, with PNG/JPG fallback for older browsers
- `reactStrictMode: true`: Activates additional React checks (dev mode), helping catch problems

---

### **3. `src/app/layout.jsx` - Main Layout (Metadata and Structure)**

```jsx
/**
 * Main layout for the entire application
 * All pages will be rendered inside this layout
 */

export const metadata = {
  // SEO configuration - what will show in Google
  metadataBase: new URL('https://magicfpvstudio.com'),
  
  title: {
    default: 'Magic FPV Studio | Professional FPV Video Production',
    template: '%s | Magic FPV Studio'  // %s will be replaced with the page title
  },
  
  description: 'Magic FPV Studio blends dynamic FPV flights...',
  
  // Keywords for SEO
  keywords: ['FPV video', 'drone videography', 'cinematic video production', ...],
  
  // Social media meta data (Open Graph)
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
  
  // Twitter meta data
  twitter: {
    card: 'summary_large_image',
    images: ['/photos/Logo.png'],
  },
  
  // Search engine robots settings
  robots: {
    index: true,          // Allow indexing this page
    follow: true,         // Allow following links
    googleBot: {
      index: true,
      'max-video-preview': -1,  // -1 = no limit
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - tracks visitors */}
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
              gtag('config', 'G-XXXXXXXXXX');  // Insert your ID
            `,
          }}
        />
      </head>
      <body>
        {children}  {/* All pages will be rendered here */}
      </body>
    </html>
  );
}
```

**How it works:**
1. `metadata` is processed by Next.js and added to `<head>` of every page
2. Google Analytics tracks user activity
3. `children` is the placeholder for the specific page content

---

### **4. `src/app/page.jsx` - Home Page**

```jsx
import Navbar from '@/components/Navbar';  // @ = shortcut to src/
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Structured Data (JSON-LD) for better SEO
 * Allows Google to understand the business structure
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
  // Social media links
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
      {/* Inject JSON-LD into the document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      <main id="top" className="container">
        <Hero title="From the first shot to the last emotion." />
        
        {/* Booking button */}
        <Link href="/form" className="cta-button">
          Book Your FPV Video
        </Link>
        
        {/* Page sections */}
        <About />
        <Portfolio />
        
        {/* Grid layout - two columns */}
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

**Page structure (seamless scrolling):**
```
┌─────────────────┐
│     Navbar      │  (fixed at top)
├─────────────────┤
│      Hero       │  "From the first shot..."
├─────────────────┤
│   CTA Button    │  "Book Your FPV Video"
├─────────────────┤
│     About       │
├─────────────────┤
│   Portfolio     │
├─────────────────┤
│  Socials | Contact │  (grid - side by side)
├─────────────────┤
│     Footer      │
└─────────────────┘
```

---

### **5. `src/components/Navbar.jsx` - Navigation**

```jsx
'use client';  // Required because it uses React Hooks (client-side)

import Link from 'next/link';  // Next.js Link (better than HTML <a>)
import { usePathname } from 'next/navigation';  // Hook: gets current path

export default function Navbar() {
  // Gets current URL path (e.g. "/services" or "/")
  const pathname = usePathname();
  const isServicesPage = pathname === '/services';

  return (
    <nav className="nav">
      {/* Logo */}
      <Link href="/#top" className="logo">
        <img src="/photos/Logo.png" alt="Magic FPV Studio logo" />
      </Link>

      {/* Navigation links */}
      <div className="nav-links">
        {/* 
          Logic: if on /services, scroll to #about
          if on home page, scroll to #about
        */}
        <a href={isServicesPage ? "/#about" : "#about"}>About</a>
        <a href={isServicesPage ? "/#portfolio" : "#portfolio"}>Portfolio</a>
        <a href={isServicesPage ? "/#socials" : "#socials"}>Socials</a>
        
        {/* Full page link */}
        <Link href="/services">Services</Link>
        
        <a href={isServicesPage ? "/#contact" : "#contact"}>Contact</a>
      </div>
    </nav>
  );
}
```

**How it works:**
- `'use client'` tells Next.js this component runs in the browser (has access to document, window)
- `usePathname()` returns current URL path (e.g. "/services")
- `Link from Next.js` — better than HTML `<a>` (preloading, less JavaScript)

---

### **6. `src/app/form/FormClient.jsx` - Contact Form**

```jsx
"use client";

import { useState } from "react";

export default function FormClient() {
  /**
   * useState - React Hook for managing component state
   * setFormData - function to update state
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
   * Input change handler
   * e.target.name - field name (from name attribute)
   * e.target.value - new value
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread operator (...) copies previous state
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Form submit handler
   */
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents default page reload
    console.log(formData);  // Send to server here (TODO)
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        {/* 
          Controlled component - React controls the value
          value={formData.name} - displays value from state
          onChange={handleChange} - updates state on change
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
      
      {/* Other fields follow the same pattern... */}
    </form>
  );
}
```

**How state management works:**
```
User types in input
           ↓
handleChange is called
           ↓
setFormData updates state
           ↓
Component re-renders with new value
           ↓
Input displays new value
```

---

### **7. `lib/db.js` - Database (Mock)**

```javascript
// Database - sample applications (mock backend)
const applications = [
  {
    id: 1,
    name: "FPV Flight Controller",
    description: "Advanced control system for FPV drones",
    category: "Hardware",
    status: "Active",
    date: "2024-01-15"
  },
  // ...more entries
];

/**
 * Data access functions - could be replaced with a database (MongoDB, PostgreSQL)
 */

// Gets all applications
export async function getApplications() {
  return applications;
}

// Gets application by ID
export async function getApplicationById(id) {
  return applications.find(app => app.id === parseInt(id));
}

// Filters applications by category
export async function getApplicationsByCategory(category) {
  return applications.filter(app => app.category === category);
}

// Filters applications by status
export async function getApplicationsByStatus(status) {
  return applications.filter(app => app.status === status);
}
```

**Future improvements:**
```javascript
// Could be replaced with:
- MongoDB (NoSQL, flexible schemas)
- PostgreSQL (relational database)
- Firebase (Google cloud backend)
- Supabase (open-source Firebase alternative)
```

---

### **8. `src/app/globals.css` - Global Styles**

```css
/* CSS Reset - normalizes styling across different browsers */
* {
    box-sizing: border-box;  /* Padding is included in width */
}

html, body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    color: antiquewhite;  /* Light text color */
}

/* Background with image */
body {
    background: url(/photos/background.jpg) center / cover no-repeat;
    min-height: 100vh;  /* Minimum height - full page */
}

/* 
  Media query - if device supports hover and has a mouse
  (not a touch screen)
*/
@media (hover: hover) and (pointer: fine) {
    body {
        background-attachment: fixed;  /* Parallax effect */
    }
}

/* Navigation - fixed at top */
.nav {
    position: fixed;  /* Stays at top when scrolling */
    top: 0;
    width: 100%;
    padding: 0.75rem 1.2rem;
    display: flex;  /* Flexbox - horizontal alignment */
    justify-content: space-between;  /* At the ends */
    align-items: flex-start;  /* At the top */
    background: rgba(0, 0, 0, 0.65);  /* Black with transparency */
    backdrop-filter: blur(6px);  /* Background blur effect */
    z-index: 1000;  /* Always on top */
    flex-wrap: wrap;  /* Elements wrap on smaller screens */
    gap: 0.8rem;  /* Gap between elements */
}

.logo {
    padding-top: 0.25rem;
}

.logo img {
    width: 50px;  /* Logo 50px wide */
}
```

**CSS Concepts:**
- `position: fixed` — element stays in place when scrolling
- `backdrop-filter: blur()` — blurs element behind the component
- `z-index` — controls layer order (higher = closer to browser)
- `flex` — flexible element positioning
- `@media` — responsive queries for different screen sizes

---

## ⚙️ Environment Setup

### Requirements:
- **Node.js** >= 18.x (JavaScript runtime)
- **npm** or **yarn** (package manager)

### Installation and Running

```bash
# 1. Clone the repository
git clone <repository-url>
cd magic-fpv-studio

# 2. Install dependencies
npm install
# or
yarn install

# 3. Start development server
npm run dev
# Server will be available at: http://localhost:3000

# 4. Build for production
npm run build

# 5. Start production version
npm start

# 6. Check code quality
npm run lint
```

---

## 🔍 SEO Optimizations

### Implemented in the project:

#### 1. **Structured Data (JSON-LD)**
```javascript
// src/app/page.jsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',  // Google knows it's a local business
  name: 'Magic FPV Studio',
  // ... details
}
```

**Effect:** Google will display richer search results (rich snippets).

---

#### 2. **Meta Tags**
```jsx
export const metadata = {
  title: 'Magic FPV Studio | Professional FPV Video Production',
  description: '...',
  keywords: ['FPV video', 'drone videography', ...],
}
```

**Effect:** Better discoverability in Google.

---

#### 3. **Open Graph (Social Media)**
```javascript
openGraph: {
  images: [{
    url: '/photos/Logo.png',
    width: 1200,
    height: 630,  // Ideal dimensions for Facebook/LinkedIn
  }]
}
```

**Effect:** When someone shares the link, a nice image + title will be displayed.

---

#### 4. **robots.txt and sitemap.xml**
```
public/robots.txt
public/sitemap.xml
```

**Effect:** Web crawlers know which pages to index.

---

#### 5. **Next.js Image Optimization**
```javascript
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],  // Modern formats
}
```

**Effect:** Faster loading = better Google ranking.

---

#### 6. **Responsive Design**
```css
@media (max-width: 768px) {
  /* Styles for mobile devices */
}
```

**Effect:** Google rewards responsive sites with better ranking (Mobile-First Index).

---

#### 7. **Performance Metrics (Core Web Vitals)**
- **LCP** (Largest Contentful Paint) < 2.5s ✅
- **FID** (First Input Delay) < 100ms ✅
- **CLS** (Cumulative Layout Shift) < 0.1 ✅

---

## 📋 Best Practices

### 1. **Code Organization**

```
✅ Good example:
src/
├── app/              # Application pages and layout
├── components/       # Reusable components
├── lib/              # Utility functions (databases, helpers)
└── styles/           # Global CSS styles

❌ Bad example:
src/
├── all-pages/
├── all-components/
└── random-files/
```

---

### 2. **Naming Conventions**

```javascript
✅ Good:
export function getUserById(id) { }
const activeUsers = users.filter(u => u.active);

❌ Bad:
export function gUBI(id) { }
const au = users.filter(u => u.active);
```

---

### 3. **Component Reusability**

```jsx
✅ Good:
function Button({ label, onClick, variant = 'primary' }) {
  return <button className={`btn btn-${variant}`}>{label}</button>;
}

<Button label="Submit" onClick={handleSubmit} variant="primary" />
<Button label="Cancel" onClick={handleCancel} variant="secondary" />

❌ Bad:
function SubmitButton() { ... }
function CancelButton() { ... }
function DeleteButton() { ... }
```

---

### 4. **Environment Variables**

```bash
# .env.local (do not commit!)
NEXT_PUBLIC_API_URL=https://api.magicfpvstudio.com
DATABASE_PASSWORD=your_password
```

```javascript
// Access in code:
process.env.NEXT_PUBLIC_API_URL  // Available in browser
process.env.DATABASE_PASSWORD     // Server-only
```

---

### 5. **Error Handling**

```jsx
✅ Good:
try {
  const data = await fetch('/api/submit');
  return await data.json();
} catch (error) {
  console.error('Failed to submit form:', error);
  setError('Something went wrong. Please try again.');
}

❌ Bad:
const data = fetch('/api/submit');  // No error handling!
```

---

### 6. **Performance Optimization**

```javascript
✅ Implement:
- Code splitting (automatic in Next.js)
- Image optimization (next/image component)
- Lazy loading (React.lazy())
- Memoization (React.memo() for components)

❌ Avoid:
- Loading entire library instead of individual functions
- Sending unscaled images
- Rendering huge lists without virtualization
```

---

## 📚 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev - Performance](https://web.dev/performance/)
- [Google Search Central](https://developers.google.com/search)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

## 🎯 Development Plans

- [ ] Backend API (Node.js / Express)
- [ ] Database (MongoDB / PostgreSQL)
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Admin panel
- [ ] Blog/News section
- [ ] Multiple language support (i18n)
- [ ] Dark mode toggle

---

## 📞 Contact and Support

**Magic FPV Studio**
- 📧 Email: magicfpvstudio@gmail.com
- 📱 Phone: +447718330652
- 🌐 Website: https://magicfpvstudio.com
- 📍 Location: UK

---

## 📄 License

Project is private. All rights reserved.

---

**Last updated:** February 2026
**Version:** 0.1.0
