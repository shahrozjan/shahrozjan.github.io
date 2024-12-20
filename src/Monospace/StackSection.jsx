import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./stacksection.module.css";

function StackSection({ content }) {
  const logoFiles = [
    "/markdowns/stacklogo/csharp.md",
    "/markdowns/stacklogo/html.md",
    "/markdowns/stacklogo/reactjs.md",
    "/markdowns/stacklogo/dotnet.md",
    "/markdowns/stacklogo/xaml.md",
    "/markdowns/stacklogo/python.md",
  ]; // Add paths to your Markdown files

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fetchLogo = async (index) => {
      try {
        const response = await fetch(logoFiles[index]);
        if (!response.ok) {
          throw new Error(`Could not fetch ${logoFiles[index]}`);
        }
        const text = await response.text();
        setMarkdownContent(text);
        
      } catch (err) {
        console.error("Error loading markdown file:", err);
      }
    };

    fetchLogo(currentLogoIndex);

    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logoFiles.length);
    }, 4000); // 4 seconds per logo (matches animation duration)

    return () => clearInterval(interval); // Cleanup
  }, [currentLogoIndex]);

  return (
    <div>
    <ReactMarkdown>{content}</ReactMarkdown>
    <div className={styles.stackLogo}>
      <div className={styles.logoContainer}>
        <ReactMarkdown className={styles.logo}>{markdownContent}</ReactMarkdown>
      </div>
    </div>
    </div>
  );
}

export default StackSection;
