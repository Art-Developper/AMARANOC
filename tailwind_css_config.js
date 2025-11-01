module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': 'rgb(16, 22, 35)', 
      },
      screens: {
        'custom-md': '900px', 
        'custom-footer-md': '1280px',
      },
    },
  },
  plugins: [],
}