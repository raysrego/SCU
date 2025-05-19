/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EDF5FF',
          100: '#DBE8FF',
          200: '#B7D1FF',
          300: '#93B9FF',
          400: '#6F9FFF',
          500: '#4B86FF',
          600: '#0F52BA', // Primary brand blue
          700: '#0A3F8C',
          800: '#072B5D',
          900: '#03162F',
        },
        secondary: {
          50: '#E6F7F7',
          100: '#CDEFEF',
          200: '#9CDFDF',
          300: '#6BCFCF',
          400: '#3ABFBF',
          500: '#20B2AA', // Soothing teal
          600: '#198F88',
          700: '#136C66',
          800: '#0C4844',
          900: '#062422',
        },
        accent: {
          50: '#FFF2EE',
          100: '#FFE5DD',
          200: '#FFCCBB',
          300: '#FFB299',
          400: '#FF9977',
          500: '#FF7F55',
          600: '#FF6347', // Accent orange/coral
          700: '#CC4F39',
          800: '#993B2B',
          900: '#66271D',
        },
        success: {
          500: '#10B981', // Success green
        },
        warning: {
          500: '#F59E0B', // Warning amber
        },
        error: {
          500: '#EF4444', // Error red
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '2.5': '20px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
};