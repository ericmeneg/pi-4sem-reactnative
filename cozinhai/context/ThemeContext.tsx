import { createContext } from "react";

export const themeContext = createContext({
  colors: {
    headerBackground: "#edf2f4",
    darkBlue: "#22577A",
    text: "#333333",
    secondaryText: "#666666",
    cardBackground: "#FFFFFF",
    primary: "#007BFF",
    inactiveIcon: "#FFFFFF",
    background: "#edf2f4",
  },

  logoStyle: {
    logo: {
      width: 200,
      height: 200,
    },
  },
});
