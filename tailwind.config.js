/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': {'max':'640px'},
      // => @media (min-width: 640px) { ... } 
  
      'md': '768px',
      // => @media (min-width: 768px) { ... }
  
      'lg': {'max':'1024px'},
      // => @media (min-width: 1024px) { ... }
  
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  variants: {
    extend: {
      opacity: ['hover']
    }
  },
  plugins: [],
}