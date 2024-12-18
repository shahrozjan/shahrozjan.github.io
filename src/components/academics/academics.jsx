import React from 'react';
import styles from './academics.module.css'; // Import CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faGraduationCap, faUniversity } from '@fortawesome/free-solid-svg-icons';
import useBackButtonHandler from '../hooks/useBackButtonHandler';

// Import college emblems (transparent images)
import mastersEmblem from '../../images/emblems/rutgers.png';
import bachelorsEmblem from '../../images/emblems/ramaiah.png';

export default function Academics(props) {
    useBackButtonHandler(props.exitfn);

    return (
        <div className={styles.stackContainer}>
            {/* Back Button */}
            <button className={styles.closeButton} onClick={props.exitfn}>
                <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>

            <div className={styles.academicsSection}>
                <h2 className={styles.academicsHeader}>Academic History</h2>

                {/* Master's Degree */}
                <div className={styles.degreeCard}>
                    <img src={mastersEmblem} alt="Master's Emblem" className={styles.inlineEmblem} />
                    <div className={styles.degreeContent}>
                        <h3>Master of Science in Computer Science</h3>
                        <p><strong>Rutger's University</strong> - Sep 2022 to Jun 2024</p>
                        <p><strong>Location:</strong> New Brunswick, NJ</p>
                        <p><strong>GPA:</strong> 3.88/4.0</p>
                        <p><strong>Relevant Courses:</strong> Algorithms, Computer Networks, Operating Systems, DBMS, Machine Learning.</p>
                    </div>
                </div>

                {/* Bachelor's Degree */}
                <div className={styles.degreeCard}>
                    <img src={bachelorsEmblem} alt="Bachelor's Emblem" className={styles.inlineEmblem} />
                    <div className={styles.degreeContent}>
                        <h3>Bachelor of Engineering in Computer Science</h3>
                        <p><strong>Ramaiah Institute of Technology</strong> - Aug 2015 to Aug 2019</p>
                        <p><strong>Location:</strong> Bengaluru, India</p>
                        <p><strong>GPA:</strong> 8.41/10</p>
                        <p><strong>Relevant Courses:</strong> Data Structures, Cloud Computing, Software Engineering, Databases.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
