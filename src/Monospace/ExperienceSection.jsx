import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import experienceData from "./experienceData.json";
import { ThemeContext } from "./StartPage";

const generateWorkExperienceMarkdown = (experienceData, theme) => {
  let markdownContent = `# Work Experience\n\n`;

  experienceData.forEach((company) => {
    // Add theme-specific suffix to the image URL
    const imageUrl = `${company.imageURL}-${theme ? "light" : "dark"}.png`;

    markdownContent += `## ${company.CompanyName}\n`;
    markdownContent += `![${company.CompanyName}](${imageUrl})\n\n`;
    markdownContent += `${company.Description}\n\n`;
    markdownContent += `### Positions\n\n`;

    company.Positions.forEach((position) => {
      markdownContent += `#### ${position.JobTitle}  \n`;
      markdownContent += `**Span:** ${position.Span}\n\n`;

      position.Work.forEach((task) => {
        markdownContent += `- ${task}\n`;
      });

      markdownContent += `\n`;
    });

    markdownContent += `---\n\n`;
  });

  return markdownContent;
};

function ExperienceSection() {
  const { isDarkMode } = useContext(ThemeContext); // Access the theme context

  return (
    <div>
      <ReactMarkdown>
        {generateWorkExperienceMarkdown(experienceData, isDarkMode)}
      </ReactMarkdown>
    </div>
  );
}

export default ExperienceSection;
