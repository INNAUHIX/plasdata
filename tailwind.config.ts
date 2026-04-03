import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F65201",
          light: "#ff8a3d",
          soft: "#fff4ed"
        },
        surface: {
          page: "#f5f7fb",
          card: "#ffffff",
          soft: "#f8fafc"
        },
        txt: {
          strong: "#1f2937",
          body: "#475467",
          muted: "#667085"
        },
        line: {
          DEFAULT: "#e9edf3",
          soft: "#f3f5f8"
        },
        success: "#11a66f"
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "\"PingFang SC\"",
          "\"Microsoft YaHei\"",
          "sans-serif"
        ]
      },
      boxShadow: {
        card: "0 10px 30px rgba(31, 41, 55, 0.06)",
        soft: "0 6px 18px rgba(31, 41, 55, 0.04)",
        brand: "0 14px 30px rgba(246, 82, 1, 0.24), 0 4px 10px rgba(246, 82, 1, 0.16)"
      },
      borderRadius: {
        panel: "12px",
        xl2: "18px",
        hero: "26px"
      },
      maxWidth: {
        shell: "1420px"
      }
    }
  },
  plugins: []
};

export default config;
