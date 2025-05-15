/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		colors: {
		  primary: "#00040f", // ← isso define o bg-primary como preto
		  dimWhite: "rgba(255, 255, 255, 0.7)", // opcional se usar
		  dimBlue: "rgba(9, 151, 124, 0.1)", // idem
		},
	  },
	},
	plugins: [],
  };
  