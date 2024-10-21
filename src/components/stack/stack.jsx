import React from 'react';
import StackAnimation from './stack-animation.jsx'; // Import your animation component
import styles from './stack.module.css'; // Use lowercase for the CSS import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function Stack(props) {
    return (
        
        <div className={styles.stackContainer}>
            <button className={styles.closeButton} onClick={props.exitfn}>
            <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
            {/* Technical Specifications Section */}
            <div className={styles.specs}>
                <h2 className={styles.specsHeader}>Stack Specifications</h2>
                <div className={styles.specsContent}>
                    <ul className={styles.specsList}>
                        <li>
                            <span className={styles.specIcon}>💻</span>
                            <strong>Programming Languages:</strong> C#, Python, Javascript, C++, HTML, XAML
                        </li>
                        <li>
                            <span className={styles.specIcon}>⚙️</span>
                            <strong>Frameworks:</strong> .NET Core, ReactJS, MAUI, Xamarin, IoTHub, SignalR
                        </li>
                        <li>
                            <span className={styles.specIcon}>🗄️</span>
                            <strong>Database:</strong> MySQL, MariaDB, MongoDB
                        </li>
                        <li>
                            <span className={styles.specIcon}>🔧</span>
                            <strong>Others:</strong> Git, Jira, Confluence, Microsoft Azure, Docker, Pandas, Tableau
                        </li>
                    </ul>
                </div>
            </div>

            {/* Animation Section */}
            <div className={styles.animation}>
                <StackAnimation />
            </div>
        </div>
    );
}
