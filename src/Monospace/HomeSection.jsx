import React from "react";
import ReactMarkdown from "react-markdown";
import SocialButtons from "./components/SocialButtons";


function HomeSection({ content }) {
  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
      <SocialButtons/>
    </div>
  );
}

export default HomeSection;
