import {
  Add,
  ArrowBack,
  Download,
  ExpandMore,
  GridView,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TextEditor from "../../components/TextEditor/TextEditor";
import { WorkExperience } from "../../models/WorkExperience";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Education } from "../../models/Education";
import { Project } from "../../models/Project";
import { Certificate } from "../../models/Certificates";
import { domainName, resumeCreationApi } from "../../API";
import Handlebars from "handlebars";
import {
  convertRtfToHtml,
  convertToMonthYear,
} from "../../utils/handlebarsUtil";

const ResumeCreation: React.FC = () => {
  const navigate = useNavigate();
  const [resumeFilename] = useState("Untitled");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [professionalSummary, setProfessionalSummary] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProject] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  useEffect(() => {
    if (!resumeId) return;
    console.log(resumeId);
  }, [resumeId]);

  useEffect(() => {
    setAllSkills([
      "Python",
      "Java",
      "JavaScript",
      "React",
      "Angular",
      "Vue",
      "NodeJS",
    ]);
  }, []);

  const DownloadResume = async () => {
    fetch(`${domainName}/ResumeCreation/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        replacements: {
          firstName,
          lastName,
          email,
          phone,
          country,
          city,
          professionalSummary,
          skills: selectedSkills,
          workExperiences,
          education,
          projects,
          certificates,
          socialLinks,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download file");
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, "resume.pdf");
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const addWorkExperience = () => {
    const newWorkExperiences = [...workExperiences];
    newWorkExperiences.push({
      jobTitle: "",
      employer: "",
      startDate: undefined,
      endDate: undefined,
      description: "",
      position: "",
      isCurrentlyWorking: false,
      city: "",
    });
    setWorkExperiences(newWorkExperiences);
  };

  const addEducation = () => {
    const newEducation = [...education];
    newEducation.push({
      major: "",
      degree: "",
      school: "",
      startDate: undefined,
      endDate: undefined,
      description: "",
      isCurrentlyStudying: false,
    });
    setEducation(newEducation);
  };

  const addProject = () => {
    const newProjects = [...projects];
    newProjects.push({
      title: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      links: [],
    });
    setProject(newProjects);
  };

  const addCertificate = () => {
    const newCertificates = [...certificates];
    newCertificates.push({
      title: "",
      credentialURL: "",
      description: "",
      skills: [],
    });
    setCertificates(newCertificates);
  };

  const addSocialLink = () => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks.push("");
    setSocialLinks(newSocialLinks);
  };

  const [compiledTemplate, setCompiledTemplate] =
    useState<HandlebarsTemplateDelegate | null>(null);
  const [source, setSource] = useState<string>(
    "<div><h1>{{firstName}}</h1><p>{{lastName}}</p></div>"
  );

  Handlebars.registerHelper("splitWithComma", function (input) {
    return input.join(", ");
  });
  Handlebars.registerHelper("rtfToHtml", function (rtf) {
    return new Handlebars.SafeString(convertRtfToHtml(rtf));
  });
  Handlebars.registerHelper("toMonthYear", function (date) {
    return convertToMonthYear(date);
  });

  const [data, setData] = useState({
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    professionalSummary,
    skills: selectedSkills,
    workExperiences,
    education,
    projects,
    certificates,
    socialLinks,
  });

  useEffect(() => {
    setData({
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      professionalSummary,
      skills: selectedSkills,
      workExperiences,
      education,
      projects,
      certificates,
      socialLinks,
    });
  }, [
    certificates,
    city,
    country,
    education,
    email,
    firstName,
    lastName,
    phone,
    professionalSummary,
    projects,
    selectedSkills,
    socialLinks,
    workExperiences,
  ]);

  useEffect(() => {
    resumeCreationApi.resumeCreationTemplateSourceGet("test").then((res) => {
      setSource(res.data.source ?? "");
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const template = Handlebars.compile(source);
      setCompiledTemplate(() => template);
    }, 200);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [data, source]);

  return (
    <div className="grid grid-cols-2 w-full">
      <div
        aria-label="editor-section"
        className="grid px-8 gap-y-3 pt-32 pb-24"
      >
        <div>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
        <div className="flex justify-center gap-x-2 text-2xl font-bold">
          {resumeFilename}
        </div>
        {/* <div className="flex flex-col items-center">
          <div>
            <Button>Sign in with LinkedIn</Button>
          </div>
        </div> */}
        <div className="grid gap-y-10">
          <div className="grid gap-y-4">
            <Typography variant="h6">Personal Information</Typography>
            <div className="grid grid-cols-2 gap-y-3">
              <div>
                <label htmlFor="firstName">First Name</label>
                <br />
                <TextField
                  id="firstName"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <br />
                <TextField
                  id="lastName"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <TextField
                  id="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <br />
                <TextField
                  id="phone"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <br />
                <TextField
                  id="country"
                  variant="outlined"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <br />
                <TextField
                  id="city"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <Typography variant="h6">Professional Highlights</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              Write 2-4 brief and dynamic sentences to engage the reader!
              Highlight your position, background, and, most significantly, your
              major accomplishments, finest attributes, and skills.
            </Typography>
            <div className="grid gap-y-3 mt-4">
              <TextEditor
                content={professionalSummary}
                setContent={setProfessionalSummary}
              />
            </div>
          </div>
          <div className="grid gap-y-4">
            <Typography variant="h6">Social Links</Typography>
            {socialLinks.map((link, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {link ? link : "(Not Specified)"}
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    variant="outlined"
                    value={link}
                    onChange={(e) => {
                      const newSocialLinks = [...socialLinks];
                      newSocialLinks[index] = e.target.value;
                      setSocialLinks(newSocialLinks);
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
            <div>
              <Button startIcon={<Add />} onClick={addSocialLink}>
                Add
              </Button>
            </div>
          </div>
          <div className="grid gap-y-4">
            <Typography variant="h6">Technical Skills</Typography>
            <Autocomplete
              multiple
              id="tags-filled"
              options={allSkills}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} variant="filled" />
              )}
              value={selectedSkills}
              onChange={(event, newValue) => {
                event.preventDefault();
                setSelectedSkills(newValue);
              }}
            />
          </div>
          <div className="grid gap-y-4">
            <Typography variant="h6">Work Experience</Typography>
            {workExperiences.map((workExperience, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {workExperience.jobTitle || workExperience.employer
                    ? `${workExperience.jobTitle && workExperience.jobTitle} ${
                        workExperience.employer &&
                        "at " + workExperience.employer
                      }`
                    : "(Not Specified)"}
                </AccordionSummary>
                <AccordionDetails className="grid gap-y-2">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>
                      <label htmlFor={`workExperience${index}`}>
                        Job Title
                      </label>
                      <br />
                      <TextField
                        id={`workExperience${index}`}
                        variant="outlined"
                        value={workExperience.jobTitle}
                        onChange={(e) => {
                          const newWorkExperiences = [...workExperiences];
                          newWorkExperiences[index].jobTitle = e.target.value;
                          setWorkExperiences(newWorkExperiences);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`position${index}`}>Position</label>
                      <br />
                      <TextField
                        id={`position${index}`}
                        variant="outlined"
                        value={workExperience.position}
                        onChange={(e) => {
                          const newWorkExperiences = [...workExperiences];
                          newWorkExperiences[index].position = e.target.value;
                          setWorkExperiences(newWorkExperiences);
                        }}
                        className="border-2 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="colspan-2">Start Date</label>
                      <br />
                      <DatePicker
                        views={["month", "year"]}
                        value={dayjs(workExperience.startDate)}
                        onChange={(date) => {
                          const newWorkExperiences = [...workExperiences];
                          newWorkExperiences[index].startDate = date?.toDate();
                          setWorkExperiences(newWorkExperiences);
                        }}
                      />
                    </div>
                    <div>
                      <label className="colspan-2">End Date</label>
                      <br />
                      <DatePicker
                        views={["month", "year"]}
                        value={dayjs(workExperience.endDate)}
                        onChange={(date) => {
                          const newWorkExperiences = [...workExperiences];
                          newWorkExperiences[index].endDate = date?.toDate();
                          setWorkExperiences(newWorkExperiences);
                        }}
                        disabled={workExperience.isCurrentlyWorking}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={workExperience.isCurrentlyWorking}
                            onChange={(e) => {
                              const newWorkExperiences = [...workExperiences];
                              newWorkExperiences[index].isCurrentlyWorking =
                                e.target.checked;
                              setWorkExperiences(newWorkExperiences);
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Currently working here"
                      />
                    </div>
                    <div>
                      <label htmlFor={`employer${index}`}>Employer</label>
                      <br />
                      <TextField
                        id={`employer${index}`}
                        variant="outlined"
                        value={workExperience.employer}
                        onChange={(e) => {
                          const newWorkExperiences = [...workExperiences];
                          newWorkExperiences[index].employer = e.target.value;
                          setWorkExperiences(newWorkExperiences);
                        }}
                        className="border-2 border-gray-200"
                      />
                    </div>
                    <div>
                      <label htmlFor={`city${index}`}>City</label>
                      <br />
                      <TextField
                        id={`city${index}`}
                        variant="outlined"
                        value={workExperience.city}
                        onChange={(e) => {
                          const newWorkExperiences = [...workExperiences];
                          newWorkExperiences[index].city = e.target.value;
                          setWorkExperiences(newWorkExperiences);
                        }}
                        className="border-2 border-gray-200"
                      />
                    </div>
                  </div>
                  <div className="colspan-2">
                    <label className="colspan-2">Description</label>
                    <br />
                    <TextEditor
                      content={workExperience.description}
                      setContent={(value) => {
                        const newWorkExperiences = [...workExperiences];
                        newWorkExperiences[index].description =
                          value.toString();
                        setWorkExperiences(newWorkExperiences);
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
            <div>
              <Button startIcon={<Add />} onClick={addWorkExperience}>
                Add
              </Button>
            </div>
          </div>
          <div className="grid gap-y-4">
            <Typography variant="h6">Education</Typography>
            {education.map((edu, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {edu.major || edu.school
                    ? `${edu.major && edu.major} ${
                        edu.school && "at " + edu.school
                      }`
                    : "(Not Specified)"}
                </AccordionSummary>
                <AccordionDetails className="grid gap-y-2">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>
                      <label htmlFor={`major${index}`}>Major</label>
                      <br />
                      <TextField
                        id={`major${index}`}
                        variant="outlined"
                        value={edu.major}
                        onChange={(e) => {
                          const newEducation = [...education];
                          newEducation[index].major = e.target.value;
                          setEducation(newEducation);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`school${index}`}>School</label>
                      <br />
                      <TextField
                        id={`school${index}`}
                        variant="outlined"
                        value={edu.school}
                        onChange={(e) => {
                          const newEducation = [...education];
                          newEducation[index].school = e.target.value;
                          setEducation(newEducation);
                        }}
                        className="border-2 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="colspan-2">Start Date</label>
                      <br />
                      <DatePicker
                        views={["month", "year"]}
                        value={dayjs(edu.startDate)}
                        onChange={(date) => {
                          const newEducation = [...education];
                          newEducation[index].startDate = date?.toDate();
                          setEducation(newEducation);
                        }}
                      />
                    </div>
                    <div>
                      <label className="colspan-2">End Date</label>
                      <br />
                      <DatePicker
                        views={["month", "year"]}
                        value={dayjs(edu.endDate)}
                        onChange={(date) => {
                          const newEducation = [...education];
                          newEducation[index].endDate = date?.toDate();
                          setEducation(newEducation);
                        }}
                        disabled={edu.isCurrentlyStudying}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={edu.isCurrentlyStudying}
                            onChange={(e) => {
                              const newEducation = [...education];
                              newEducation[index].isCurrentlyStudying =
                                e.target.checked;
                              setEducation(newEducation);
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Currently studying here"
                      />
                    </div>
                  </div>
                  <div className="colspan-2">
                    <label className="colspan-2">Description</label>
                    <br />
                    <TextEditor
                      content={edu.description}
                      setContent={(value) => {
                        const newEducation = [...education];
                        newEducation[index].description = value.toString();
                        setEducation(newEducation);
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
            <div>
              <Button startIcon={<Add />} onClick={addEducation}>
                Add
              </Button>
            </div>
          </div>
          <div className="grid gap-y-4">
            <Typography variant="h6">Projects</Typography>
            {projects.map((project, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {project.title ? project.title : "(Not Specified)"}
                </AccordionSummary>
                <AccordionDetails className="grid gap-y-2">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>
                      <label htmlFor={`title${index}`}>Project Title</label>
                      <br />
                      <TextField
                        id={`title${index}`}
                        variant="outlined"
                        value={project.title}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index].title = e.target.value;
                          setProject(newProjects);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`links${index}`}>Link</label>
                      <br />
                      {project.links.map((link, linkIndex) => (
                        <TextField
                          id={`${index}link${linkIndex}`}
                          variant="outlined"
                          value={link}
                          onChange={(e) => {
                            const newProjects = [...projects];
                            newProjects[index].links[linkIndex] =
                              e.target.value;
                            setProject(newProjects);
                          }}
                          className="border-2 border-gray-200"
                        />
                      ))}
                      <Button
                        startIcon={<Add />}
                        onClick={() => {
                          const newProjects = [...projects];
                          newProjects[index].links.push("");
                          setProject(newProjects);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="colspan-2">
                    <label className="colspan-2">Description</label>
                    <br />
                    <TextEditor
                      content={project.description}
                      setContent={(value) => {
                        const newProjects = [...projects];
                        newProjects[index].description = value.toString();
                        setProject(newProjects);
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
            <div>
              <Button startIcon={<Add />} onClick={addProject}>
                Add
              </Button>
            </div>
          </div>
          <div className="grid gap-y-4">
            <Typography variant="h6">Competitions & Certificates</Typography>
            {certificates.map((cert, index) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {cert.title ? cert.title : "(Not Specified)"}
                </AccordionSummary>
                <AccordionDetails className="grid gap-y-2">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>
                      <label htmlFor={`title${index}`}>Certificate Title</label>
                      <br />
                      <TextField
                        id={`title${index}`}
                        variant="outlined"
                        value={cert.title}
                        onChange={(e) => {
                          const newCertificates = [...certificates];
                          newCertificates[index].title = e.target.value;
                          setCertificates(newCertificates);
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`link${index}`}>Link</label>
                      <br />
                      <TextField
                        id={`link${index}`}
                        variant="outlined"
                        value={cert.credentialURL}
                        onChange={(e) => {
                          const newCertificates = [...certificates];
                          newCertificates[index].credentialURL = e.target.value;
                          setCertificates(newCertificates);
                        }}
                      />
                    </div>
                  </div>
                  <div className="colspan-2">
                    <label className="colspan-2">Description</label>
                    <br />
                    <TextEditor
                      content={cert.description}
                      setContent={(value) => {
                        const newCertificates = [...certificates];
                        newCertificates[index].description = value.toString();
                        setCertificates(newCertificates);
                      }}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
            <div>
              <Button startIcon={<Add />} onClick={addCertificate}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-label="preview-section"
        className="h-full bg-gray-500 pt-32 px-10 flex flex-col gap-y-4"
      >
        <div className="flex justify-between">
          <div>
            <Link to="/templates">
              <Button startIcon={<GridView />}>Select Template</Button>
            </Link>
          </div>
          <div>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={DownloadResume}
            >
              Download
            </Button>
          </div>
        </div>
        <div className="bg-white w-full p-5">
          {compiledTemplate && (
            <div dangerouslySetInnerHTML={{ __html: compiledTemplate(data) }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeCreation;
