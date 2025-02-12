// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'theconsultingdetectivesblog.com',
      'd28hgpri8am2if.cloudfront.net',
      'images.squarespace-cdn.com',
      'i.etsystatic.com',
      'm.media-amazon.com',
      'static.toiimg.com',
      'media.vanityfair.com',
      'resizing.flixster.com',
      'encrypted-tbn0.gstatic.com',
      'res.cloudinary.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/horizon-code-academy/fake-movies-api/**',
      },
    ],
  },
}

module.exports = nextConfig