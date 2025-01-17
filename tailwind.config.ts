import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          purple: "#8B5CF6",
          pink: "#D946EF"
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(217, 70, 239, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.7), 0 0 40px rgba(217, 70, 239, 0.5)'
          }
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        shine: 'shine 3s linear infinite',
        glow: 'glow 2s ease-in-out infinite'
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(139, 92, 246, 0.2), 0 0 30px rgba(217, 70, 239, 0.1)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(217, 70, 239, 0.2)',
        'glow-lg': '0 0 25px rgba(139, 92, 246, 0.4), 0 0 50px rgba(217, 70, 239, 0.3)',
      }
    },
  },
  plugins: [],
} satisfies Config;
