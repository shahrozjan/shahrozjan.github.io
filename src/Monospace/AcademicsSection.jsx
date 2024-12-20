import React from "react";
import ReactMarkdown from "react-markdown";

function AcademicsSection({ content }) {
  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default AcademicsSection;
