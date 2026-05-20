/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kompresja obrazów
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Strict mode dla lepszego kodu
  reactStrictMode: true,
}

module.exports = nextConfig