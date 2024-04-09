import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Menu,
  MenuItem,
  PaletteMode,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import ToggleColorMode from "../ToggleColorMode/ToggleColorMode";
import { Link, useNavigate } from "react-router-dom";
import LogoLight from "../../assets/logos/logo-light.svg";
import LogoDark from "../../assets/logos/logo-dark.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import {
  Archive,
  Edit,
  FileCopy,
  KeyboardArrowDown,
  Logout,
  MoreHoriz,
} from "@mui/icons-material";
import { logout } from "../../redux/action/authActions";

interface NavigationBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  mode,
  toggleColorMode,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userName = useSelector((state: RootState) => state.auth.userName);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const logoStyle = {
    width: "140px",
    height: "auto",
    cursor: "pointer",
    padding: "4px",
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isDropdownOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("x-token");
    dispatch(logout());
    navigate(0);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <header>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 2,
              }}
            >
              <Link to="/">
                <img
                  src={mode === "light" ? LogoLight : LogoDark}
                  style={logoStyle}
                  alt="InstaResume Logo"
                />
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => scrollToSection("templates")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Link to="templates">
                    <Typography variant="body2" color="text.primary">
                      Templates
                    </Typography>
                  </Link>
                </MenuItem>
                <Link to="contribute">
                  <MenuItem
                    onClick={() => scrollToSection("contribute")}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Contribute
                    </Typography>
                  </MenuItem>
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {isAuthenticated ? (
                <div>
                  <Button
                    id="demo-customized-button"
                    aria-controls={
                      isDropdownOpen ? "demo-customized-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen ? "true" : undefined}
                    variant="text"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDown />}
                  >
                    Hi, {userName}
                  </Button>
                  <Menu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={isDropdownOpen}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      <FileCopy />
                      My Resume
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleLogout} disableRipple>
                      <Logout />
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/login"
                >
                  Login
                </Button>
              )}

              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/resume-creation"
              >
                Create Resume
              </Button>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <Link to="templates">
                    <MenuItem>Templates</MenuItem>
                  </Link>
                  <Link to="contribute">
                    <MenuItem>Contribute</MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/login"
                      sx={{ width: "100%" }}
                    >
                      Login
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/resume-creation"
                      sx={{ width: "100%" }}
                    >
                      Create Resume
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default NavigationBar;
