import React, { useState, useContext, useRef } from "react";
import { ThemeContext } from "../StartPage"; // Adjust the import path as needed
import styles from "./terminalchat.module.css"; // Import the CSS module

// Helper function to strip out basic Markdown formatting.
function stripMarkdown(text) {
  if (!text) return "";
  return text
    // Remove bold and italic markers
    .replace(/(\*\*|__)/g, "")
    .replace(/(\*|_)/g, "")
    // Remove inline code markers
    .replace(/`+/g, "")
    // Remove heading markers (e.g., #, ##, etc.)
    .replace(/#+\s/g, "")
    // Optionally, remove other tokens if needed
    .trim();
}

const TerminalChat = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [QuestionNotAsked, setQuestionNotAsked] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Terminal RESPONDING.");
  const loadingIntervalRef = useRef(null);
  const { isDarkMode } = useContext(ThemeContext);

  // Choose the container class based on the current theme.
  const containerClass = isDarkMode
    ? styles.terminalChatContainerDark
    : styles.terminalChatContainerLight;

  // Start the loading animation: cycle through messages every 500ms.
  const startLoadingAnimation = () => {
    const messages = [
      "Terminal RESPONDING.",
      "Terminal RESPONDING..",
      "Terminal RESPONDING...",
      "Terminal RESPONDING...."
    ];
    let index = 0;
    loadingIntervalRef.current = setInterval(() => {
      setLoadingMessage(messages[index]);
      index = (index + 1) % messages.length;
    }, 500);
  };

  // Stop the loading animation.
  const stopLoadingAnimation = () => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
      setLoadingMessage("Terminal RESPOND.");
    }
  };

  // Helper function to send the query to your Vercel endpoint.
  async function sendQuery(query) {
    setQuestionNotAsked(false)
    try {
      const response = await fetch(
        "https://ai-portfolio-assistant-six.vercel.app/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ prompt: query })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error from server:", errorText);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  }

  // When the user presses Enter, send the query and update the chat history.
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !isLoading) {
      e.preventDefault();
      if (input.trim() === "") return;

      // Store the user's query in a temporary variable.
      const queryText = input;

      // Set loading state and start the loading animation.
      setIsLoading(true);
      startLoadingAnimation();

      // Send the query to the API endpoint.
      const result = await sendQuery(queryText);

      // Stop the loading animation and disable the loading state.
      stopLoadingAnimation();
      setIsLoading(false);

      let responseText = "";
      if (result) {
        responseText =
          result.answer
      } else {
        responseText = "Error getting response.";
      }

      // Remove Markdown formatting from the response text.
      const plainResponse = stripMarkdown(responseText);

      // Add a combined message to history that includes both the query and the response.
      setHistory((prev) => [
        ...prev,
        { type: "combined", query: queryText, response: plainResponse }
      ]);

      // Clear the input field.
      setInput("");
    }
  };

  return (
    <div className={containerClass}>
      <h1 className={styles.title}>The Terminal</h1>
      {QuestionNotAsked && <h2 className={styles.title}>Ask me a question about Shahroz's professional experience</h2>}
      {history.map((entry, index) => {
        if (entry.type === "combined") {
          return (
            <div key={index} className={styles.terminalChatMessage}>
              <div className={styles.userMessage}>{"> " + entry.query}</div>
              <div
                className={styles.responseMessage}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {entry.response}
              </div>
            </div>
          );
        } else {
          // Fallback (should not be needed)
          return (
            <div key={index} className={styles.terminalChatMessage}>
              {entry.type === "user" ? (
                <div className={styles.userMessage}>{"> " + entry.text}</div>
              ) : (
                <div
                  className={styles.responseMessage}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {entry.text}
                </div>
              )}
            </div>
          );
        }
      })}
      {isLoading && (
        <div className={styles.terminalChatMessage}>
          <div
            className={styles.responseMessage}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {loadingMessage}
          </div>
        </div>
      )}
      <div className={styles.terminalChatInputWrapper}>
        <span className={styles.prompt}>&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.terminalChatInput}
          disabled={isLoading}
          placeholder={isLoading ? "Waiting for response..." : ""}
        />
      </div>
    </div>
  );
};

export default TerminalChat;
