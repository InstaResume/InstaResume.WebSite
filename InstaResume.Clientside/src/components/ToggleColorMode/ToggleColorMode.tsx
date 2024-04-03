import { ModeNightRounded, WbSunnyRounded } from "@mui/icons-material";
import { Box, Button, PaletteMode } from "@mui/material";
import React from "react";

interface ToggleColorModeProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ToggleColorMode: React.FC<ToggleColorModeProps> = ({
  mode,
  toggleColorMode,
}) => {
  return (
    <Box sx={{ maxWidth: "32px" }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: "32px", height: "32px", p: "4px" }}
      >
        {mode === "dark" ? (
          <ModeNightRounded fontSize="small" />
        ) : (
          <WbSunnyRounded fontSize="small" />
        )}
      </Button>
    </Box>
  );
};

export default ToggleColorMode;
