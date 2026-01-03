import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#b5651d" },     // ocre/marron médina
    secondary: { main: "#1a73e8" },   // bleu Majorelle
    success: { main: "#2e7d32" },     // vert zellige
    background: { default: "#faf7f2" }
  },
  typography: {
    fontFamily: "Tajawal, Arial, sans-serif",
    h6: { fontWeight: 700 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 }
      }
    }
  }
});

export default theme;