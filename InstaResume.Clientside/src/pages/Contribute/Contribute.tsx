import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, { ChangeEvent } from "react";
import { domainName } from "../../API";
import saveAs from "file-saver";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(`${domainName}/Template/upload`, {
    method: "POST",
    body: formData,
  });
}

const Contribute: React.FC = () => {
  const DownloadExampleTemplate = async () => {
    fetch(`${domainName}/Template/download-example`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download file");
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, "template-example.hbs");
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await uploadFile(file);
      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Failed to upload file: " + response.statusText);
      }
    } catch (error) {
      alert("An error occurred while uploading the file: " + error);
    }
  };
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Contribute&nbsp;
          </Typography>
          <Grid container spacing={12} justifyContent="center">
            <Grid item xs={4}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload File
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={DownloadExampleTemplate}
              >
                Example
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contribute;
