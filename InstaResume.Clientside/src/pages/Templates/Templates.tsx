import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect } from "react";
import { TemplateData } from "../../API/generated";
import { templateApi } from "../../API";
import { Link } from "react-router-dom";

const jobPositions = [
  "Web Developer",
  "Software Developer",
  "Data Science",
  "Systems Analyst",
  "UX Designer",
  "Data Analyst",
  "Full Stack Developer",
  "Project Manager",
  "Software Engineer",
  "Cloud Engineer",
];

const companies = [
  "Agoda",
  "LSEG",
  "LINE MAN Wongnai",
  "IBM",
  "Shopee",
  "Google",
  "Microsoft",
  "Grab",
  "Apple",
  "Roblox",
];

const Contribute: React.FC = () => {
  const [job, setJob] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [templates, setTemplates] = React.useState<TemplateData[]>([]);

  useEffect(() => {
    templateApi.templateGet().then((res) => {
      setTemplates(res.data);
    });
  }, []);

  const jobHandleChange = (event: SelectChangeEvent) => {
    setJob(event.target.value);
  };

  const companyHandleChange = (event: SelectChangeEvent) => {
    setCompanyName(event.target.value);
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
          gap: 4,
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
              fontSize: "clamp(3rem, 10vw, 3rem)",
            }}
          >
            Resume Examples & Templates&nbsp;
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Increase your chances of finding a job and create your Resume with
            one of our professionally designed Resume templates. Curious to find
            out how these templates can work for you? Scroll down and check out
            the different resume examples we've made to inspire you.
          </Typography>
          <Grid container spacing={12} justifyContent="center">
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 350 }} size="medium">
                <InputLabel id="job-label">Job Position</InputLabel>
                <Select
                  labelId="job-label"
                  id="job"
                  value={job}
                  onChange={jobHandleChange}
                  label="Job Position"
                >
                  {jobPositions.map((jobPosition) => (
                    <MenuItem key={jobPosition} value={jobPosition}>
                      {jobPosition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ m: 1, minWidth: 350 }} size="medium">
                <InputLabel id="company-label">Company</InputLabel>
                <Select
                  labelId="company-label"
                  id="companyName"
                  value={companyName}
                  onChange={companyHandleChange}
                  fullWidth
                  label="Job Position"
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
        <Grid container justifyContent="flex-start" spacing={12}>
          {templates.map((t, index) => (
            <Grid key={index} item>
              <Paper
                sx={{
                  height: 280,
                  width: 200,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              />
              <Link to={`/resume-creation?templateId=${t.id}`}>
                <Button>Use</Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Contribute;
