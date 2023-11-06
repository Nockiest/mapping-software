import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         inder: ['Inder', 'sans-serif'],
//         inika: ['Inika', 'sans-serif'],
//         nunito: ['Nunito', 'sans-serif'],
//       },
//       rounded: {
//         'lg': '0.5rem',
//       },
//       colors: {
//         "primary-color": "var(--primary-color)",
//         "primary-color-80": "var(--primary-color-80)",
//         "primary-color-60": "var(--primary-color-60)",
//         "primary-color-40": "var(--primary-color-40)",
//         "primary-color-20": "var(--primary-color-20)",
        
//         "secondary-color": "var(--secondary-color)",
//         "secondary-color-80": "var(--secondary-color-80)",
//         "secondary-color-60": "var(--secondary-color-60)",
//         "secondary-color-40": "var(--secondary-color-40)",
//         "secondary-color-20": "var(--secondary-color-20)",
        
//         "ternary-color": "var(--ternary-color)",
//         "ternary-color-80": "var(--ternary-color-80)",
//         "ternary-color-60": "var(--ternary-color-60)",
//         "ternary-color-40": "var(--ternary-color-40)",
//         "ternary-color-20": "var(--ternary-color-20)",
        
//         "error-color": "var(--error-color)",
//         "error-color-80": "var(--error-color-80)",
//         "error-color-60": "var(--error-color-60)",
//         "error-color-40": "var(--error-color-40)",
//         "error-color-20": "var(--error-color-20)",
        
//         "text-color": "var(--text-color)",
//         "text-color-80": "var(--text-color-80)",
//         "text-color-60": "var(--text-color-60)",
//         "text-color-40": "var(--text-color-40)",
//         "text-color-20": "var(--text-color-20)",

//         "neutral": "#F5F5F5",
//         "leden-color": "#ead6e5",
//         "leden-color-2": "#893a5d",
//         "březen-color": "#efffe0",
//         "březen-color-2": "#486d03",
//         "květen-color":"#fffaf5",
//         "květen-color-2":"#8a2717",
//       },
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//       botderRadius:{
//         '10': '10px'
//       },
//       inset: {
//         '0': 0,
//        '64': '16rem',
//        '1/5': '20%',
//        '2/5': '40%',
//        '3/7': '45%',
//        "1/8": "12%",
//        "1/16": "6%",
//        "500": 500,
//       }
//     },
//   },
//   plugins: [],
// }
