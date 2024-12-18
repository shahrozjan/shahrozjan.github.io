import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from './startpage.module.css';


function StartPage() {
  const [activeSection, setActiveSection] = useState("academics");
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    // Ensure the markdown file is in the public directory
    fetch(`/${activeSection}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not fetch ${activeSection}.md`);
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((err) =>
        console.error("Error loading markdown file:", err)
      );
  }, [activeSection]);

  return (
    <div className={styles.otrmkdwn}>
      <h1>Shahroz Jan</h1>
      <nav>
        {["about","academics", "stack", "experience"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </nav>
      <div className={styles.mkdwn}>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
      
    </div>
  );
}

export default StartPage;
