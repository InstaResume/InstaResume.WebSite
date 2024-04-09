import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface TextEditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor: React.FC<TextEditorProps> = ({
  content: professionalSummary,
  setContent: setProfessionalSummary,
}) => {
  const handleProfessionalSummaryChange = (value: string) => {
    setProfessionalSummary(value);
  };
  return (
    <ReactQuill
      theme="snow"
      value={professionalSummary}
      onChange={handleProfessionalSummaryChange}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ],
      }}
    />
  );
};

export default TextEditor;
