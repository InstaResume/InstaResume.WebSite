import React from "react";
import NavigationBar from "./components/NavBar/NavBar";
import {
  CircularProgress,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { getTheme } from "./utils/ThemeProvider";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { lazyLoadRoutes } from "./routes/lazyLoadRoute";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const theme = createTheme(getTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const AppLayout = () => (
    <>
      <NavigationBar mode={mode} toggleColorMode={toggleColorMode} />
      <Outlet />
    </>
  );

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={lazyLoadRoutes("Home")} />
        <Route path="/templates" element={lazyLoadRoutes("Templates")} />
        <Route
          path="/resume-creation"
          element={lazyLoadRoutes("ResumeCreation")}
        />
        <Route path="/contribute" element={lazyLoadRoutes("Contribute")} />
        <Route path="/login" element={lazyLoadRoutes("Login")}/>
        <Route path="/signup" element={lazyLoadRoutes("SignUp")}/>
      </Route>
    )
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <RouterProvider
            router={routes}
            fallbackElement={<CircularProgress />}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
