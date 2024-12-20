import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Chip, Box, Typography } from "@mui/material";
import projectsData from "./projectsData.json";

const generateMarkdown = (projectsData) => {
  let markdownContent = `# Projects\n\n`;

  projectsData.forEach((project) => {
    markdownContent += `
![${project.name}](markdowns/projectlogo/${project.image}) **${project.name}**
- **Description**: ${project.description}
- **Tags**: ${project.tags.join(", ")}
- **Date**: ${project.date}

`;
  });
  markdownContent += `---\n\n`;

  return markdownContent; // Return the generated markdown content
};

function ProjectSection() {
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract unique tags from all projects
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  );

  // Filter projects based on selected tags
  const filteredProjects = selectedTags.length
    ? projectsData.filter((project) =>
        project.tags.some((tag) => selectedTags.includes(tag))
      )
    : projectsData; // Show all projects if no tags are selected

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div>

      {/* Tag Filter Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          marginBottom: 3,
        }}
      >
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            color="default"
            variant={selectedTags.includes(tag) ? "filled" : "filled"}
            clickable
            sx={{
              fontFamily: "JetBrains Mono, monospace",
              borderRadius: "0px",
              fontSize: "0.9rem",
              padding: "0.2rem 0.5rem", // Ensure consistent padding
              width: "auto", // Flexible width
              textAlign: "center",
              backgroundColor: selectedTags.includes(tag) ? "var(--text-color)" : "inherit",
              color: selectedTags.includes(tag) ? "var(--background-color)" : "var(--text-color)",
              border: "1px solid", // Consistent border thickness
              borderColor: selectedTags.includes(tag) ? "#000" : "#ccc",
              boxSizing: "border-box", // Include border in size calculation
              transition: "all 0.2s ease", // Smooth transitions
              "&:hover": {
                backgroundColor: selectedTags.includes(tag) ? "var(--background-color-alt2)" : "var(--background-color-alt)",
              },
            }}
          />
        ))}
      </Box>

      {/* Render Filtered Markdown */}
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              alt={props.alt}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover", // Ensures aspect ratio is maintained
                display: "inline-block",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
            />
          ),
          strong: ({ node, ...props }) => (
            <span
              {...props}
              style={{
                display: "inline-block",
                fontWeight: "bold",
                verticalAlign: "middle",
              }}
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} style={{ marginTop: "0.5rem", marginBottom: "1rem" }} />
          ),
        }}
      >{generateMarkdown(filteredProjects)}</ReactMarkdown>
    </div>
  );
}

export default ProjectSection;
