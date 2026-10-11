import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeStyle = "obsidian" | "champagne" | "indigo" | "emerald" | "rose";

interface ThemeContextType {
  theme: ThemeStyle;
  setTheme: (theme: ThemeStyle) => void;
  accentHex: string;
  themeMeta: {
    name: string;
    description: string;
    primaryColor: string;
  };
}

const THEME_DATA: Record<ThemeStyle, { name: string; description: string; primaryColor: string }> = {
  obsidian: {
    name: "Obsidian Amber",
    description: "Deep luxury automotive dark mode with rich gold & amber accents (Original Vehicular Media style)",
    primaryColor: "#f59e0b",
  },
  champagne: {
    name: "Champagne Gold",
    description: "Opulent brass & warm ivory tones tailored for fine dining, jewelry, and luxury hospitality",
    primaryColor: "#eab308",
  },
  indigo: {
    name: "Cyber Indigo",
    description: "Futuristic neon violet & indigo for modern SaaS, tech platforms, and high-velocity digital tools",
    primaryColor: "#6366f1",
  },
  emerald: {
    name: "Deep Emerald",
    description: "Organic forest deep greens & mint glows for eco-conscious brands, finance, and wellness",
    primaryColor: "#10b981",
  },
  rose: {
    name: "Vibrant Rose",
    description: "High-fashion punchy ruby & coral highlights for creator economies, social apps, and boutiques",
    primaryColor: "#f43f5e",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeStyle>(() => {
    const saved = localStorage.getItem("shared-ui-theme") as ThemeStyle;
    return saved && THEME_DATA[saved] ? saved : "obsidian";
  });

  useEffect(() => {
    localStorage.setItem("shared-ui-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accentHex: THEME_DATA[theme].primaryColor,
        themeMeta: THEME_DATA[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
