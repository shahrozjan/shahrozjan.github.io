import React, { useState, useEffect, useRef, createContext } from "react";
import styles from "./startpage.module.css";
import HomeSection from "./HomeSection";
import AcademicsSection from "./AcademicsSection";
import StackSection from "./StackSection";
import ExperienceSection from "./ExperienceSection";
import ProjectSection from "./ProjectSection";
import LightSwitch from "./LightSwitch";

const ThemeContext = createContext();

function StartPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [markdownContent, setMarkdownContent] = useState("");
  const contentRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const touchStart = useRef(0); // To track touch start position

  const toggleDarkMode = () => {
    startRain();
    setTimeout(() => {
      setIsDarkMode((prevMode) => !prevMode);
    }, 3000);
  };

  const startRain = () => {
    const container = document.querySelector(".rain-container");
    container.innerHTML = ""; // Clear any existing raindrops

    for (let i = 0; i < 200; i++) {
      const raindrop = document.createElement("div");
      raindrop.classList.add("raindrop");
      raindrop.style.left = Math.random() * 100 + "vw";
      raindrop.style.animationDuration = 1.5 + Math.random() * 0.5 + "s";
      raindrop.style.animationDelay = Math.random() * 0.5 + "s";
      container.appendChild(raindrop);
    }

    // Stop rain after the animation duration
    setTimeout(() => {
      container.innerHTML = "";
    }, 3000);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("lightMode");
    } else {
      html.classList.remove("lightMode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetch(`/markdowns/${activeSection}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not fetch ${activeSection}.md`);
        }
        return response.text();
      })
      .then((text) => setMarkdownContent(text))
      .catch((err) => console.error("Error loading markdown file:", err));
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (contentRef.current) {
        contentRef.current.scrollTop += event.deltaY;
        event.preventDefault();
      }
    };

    const handleTouchStart = (event) => {
      touchStart.current = event.touches[0].clientY; // Record the initial touch position
    };

    const handleTouchMove = (event) => {
      if (contentRef.current) {
        const touchDelta = touchStart.current - event.touches[0].clientY; // Calculate movement
        contentRef.current.scrollTop += touchDelta; // Update scroll position
        touchStart.current = event.touches[0].clientY; // Update for the next move
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Reset scroll position when activeSection changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0; // Reset to top
    }
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection content={markdownContent} />;
      case "academics":
        return <AcademicsSection content={markdownContent} />;
      case "stack":
        return <StackSection content={markdownContent} />;
      case "experience":
        return <ExperienceSection />;
      case "projects":
        return <ProjectSection content={markdownContent} />;
      default:
        return null;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      <div className={styles.container}>
        <div className="rain-container"></div>
        <LightSwitch click={toggleDarkMode} />
        <header className={styles.header}>
          <h1 className={styles.title}>Shahroz Jan</h1>
          <nav className={styles.navbar}>
            {["home", "projects", "experience", "stack", "academics"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={
                    activeSection === section ? styles.activeButton : ""
                  }
                >
                  {section.toUpperCase()}
                </button>
              )
            )}
          </nav>
        </header>
        <main className={styles.content} ref={contentRef}>
          {renderSection()}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export { StartPage, ThemeContext };
