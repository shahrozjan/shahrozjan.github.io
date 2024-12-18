import React, { useEffect } from "react";
import styles from './about.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import UISwitch from "./switch";
import Box from '@mui/material/Box';
import me from './me.jpg';
import useBackButtonHandler from '../hooks/useBackButtonHandler';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SocialButtons from "./SocialButtons"; 

export default function About(props) {
  useBackButtonHandler(props.exitfn);
  const [lang, setLang] = React.useState("Eng");

  // Handler to switch between "Eng" and "Kmr"
  const handleLangChange = (event) => {
    setLang(event.target.checked ? "Kmr" : "Eng");
  };

  useEffect(() => {
    const handleBackButtonEvent = (event) => {
      event.preventDefault();
      props.exitfn(); // Trigger exit function when back button is pressed
    };

    window.addEventListener("popstate", handleBackButtonEvent);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleBackButtonEvent);
    };
  }, [props]);

  return (
    <div className={styles.aboutContainer}>
      <button className={styles.closeButton} onClick={props.exitfn}>
        <FontAwesomeIcon icon={faChevronLeft} /> Back
      </button>
      
      {/* Language Switch */}
      <div className={styles.switchContainer} onClick={handleLangChange}>
        <UISwitch/>
      </div>

      {/* Experience Item */}
      <div className={styles.aboutItem}>
        <div className={styles.aboutContent}>
          <Box
            component="img"
            sx={{
              height: 350,
              width: 350,
            }}
            alt="ME"
            src={me}
          />
          <h1>Hello!</h1>
          <h2>
            I'm Shahroz Jan, a Software Engineer with over 3 years of experience in software engineering, 
            ranging from backend API development to cloud automation and mobile app projects. 
            I graduated with a Master's degree in Computer Science from Rutgers University-New Brunswick with a 3.88 GPA in May 2024. 
            I thrive on creating solutions that serve thousands of users, and on learning new technologies with every project. 
            On the personal side, my hobbies include hiking, going to rock concerts, and playing video games. 
            I was also (almost) a semi-professional gamer and won a CSGO College National championship.
            By the way, I built this site using React and all the images were taken by me!
          </h2>
            <SocialButtons/>
          <div className={styles.images}></div>
        </div>
      </div>
    </div>
  );
}
