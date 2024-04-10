import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React, {
  ChangeEvent,
  SetStateAction,
  useRef,
  useState,
  Dispatch,
} from "react";
import { domainName } from "../../API";
import saveAs from "file-saver";

const Contribute: React.FC = () => {
  const [file1Name, setFile1Name] = useState("");
  const [file2Name, setFile2Name] = useState("");
  const fileInput1 = useRef<HTMLInputElement>(null);
  const fileInput2 = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!fileInput1.current?.files || !fileInput2.current?.files) {
      alert("Please select .hbs and image file to upload");
      return;
    }
    if (!fileInput1.current?.files[0] || !fileInput2.current?.files[0]) {
      alert("Please select .hbs and image file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file1", fileInput1.current.files[0]);
    formData.append("file2", fileInput2.current.files[0]);
    // Send formData to .NET
    const response = await fetch(`${domainName}/Template/upload`, {
      method: "POST",
      body: formData,
    });
    try {
      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Failed to upload file: " + response.statusText);
      }
    } catch (error) {
      alert("An error occurred while uploading the file: " + error);
    }
  };

  const handleFileChanges = (
    event: ChangeEvent<HTMLInputElement>,
    setFileName: Dispatch<SetStateAction<string>>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFileName(file.name);
  };

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
            <Grid item xs={4} className="grid gap-y-2">
              <input
                type="file"
                accept=".hbs"
                style={{ display: "none" }}
                ref={fileInput1}
                onChange={(e) => handleFileChanges(e, setFile1Name)}
              />
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                ref={fileInput2}
                onChange={(e) => handleFileChanges(e, setFile2Name)}
              />
              <Button
                variant="contained"
                onClick={() => fileInput1.current?.click()}
              >
                Select Template File
              </Button>
              <span>{file1Name}</span>
              <Button
                variant="contained"
                onClick={() => fileInput2.current?.click()}
              >
                Select Thumbnail File
              </Button>
              <span>{file2Name}</span>
              <br />
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={handleUpload}
              >
                Submit
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
