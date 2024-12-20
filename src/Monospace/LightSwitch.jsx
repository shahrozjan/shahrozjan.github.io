import React, { useState } from "react";
import styles from "./lightswitch.module.css";

function LightSwitch({ click }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return; 
    setIsDisabled(true);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    click();
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <div className={styles.lightSwitchContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 300"
        className={`${styles.lightSwitchSVG} ${isAnimating ? styles.clicked : ""}`}
        onClick={handleClick}
      >
        {/* Wire */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="250"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Switch */}
        <path
          d="M40 250
             C40 270, 60 270, 60 250
             C60 230, 40 230, 40 250
             Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default LightSwitch;
