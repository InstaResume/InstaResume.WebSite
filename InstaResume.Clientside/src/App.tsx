import React from "react";
import Home from "./pages/Home/Home";
import NavigationBar from "./components/NavBar/NavBar";
import {
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const App = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationBar />
        <Home />
      </ThemeProvider>
    </>
  );
};

export default App;
