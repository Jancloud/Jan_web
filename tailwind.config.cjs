module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA',
        surface: '#FFFFFF',
        text: '#1A1A1A',
        accent: '#4A90E2',
        muted: '#6B7280'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
      },
      lineHeight: {
        relaxedReading: '1.75'
      }
    }
  },
  plugins: []
};