/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        tiffany: {
          50: '#f0fffe',
          100: '#c9fffe',
          200: '#94fffe',
          300: '#52fbfe',
          400: '#0de9f4',
          500: '#00cbd9',  // Base Tiffany Blue
          600: '#00a3b5',
          700: '#008192',
          800: '#006775',
          900: '#065561',
        },
        luxury: {
          gold: '#D4AF37',
          silver: '#C0C0C0',
          platinum: '#E5E4E2',
          champagne: '#F7E7CE',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      },
      fontFamily: {
        sans: [
          'Noto Sans JP',
          'M PLUS Rounded 1c',
          'Meiryo',
          'メイリオ',
          'Hiragino Kaku Gothic ProN',
          'ヒラギノ角ゴ ProN W3',
          'YuGothic',
          '游ゴシック',
          'Yu Gothic',
          'sans-serif'
        ],
        display: [
          'M PLUS Rounded 1c',
          'Noto Sans JP',
          'Meiryo',
          'メイリオ',
          'sans-serif'
        ],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(0, 203, 217, 0.2)',
        'luxury-lg': '0 20px 60px -15px rgba(0, 203, 217, 0.3)',
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-tiffany': 'linear-gradient(135deg, #00cbd9 0%, #0de9f4 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #00cbd9 0%, #D4AF37 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
