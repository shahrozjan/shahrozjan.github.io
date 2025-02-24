import React from "react";
import ReactMarkdown from "react-markdown";
import SocialButtons from "./components/SocialButtons";
import TerminalChat from "./components/TerminalChat";

// Updated handleQuery returns the fetched data so we can update state


function HomeSection({ content }) {
  return (
    <div>
      {/* Render Markdown content */}
      <ReactMarkdown>{content}</ReactMarkdown>
      <SocialButtons />
      <TerminalChat />     
    </div>
  );
}

export default HomeSection;
