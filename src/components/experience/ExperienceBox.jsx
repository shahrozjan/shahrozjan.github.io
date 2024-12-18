import React from 'react';
import styles from './ExperienceBox.module.css';
import tonDoneLogo from '../../images/logos/tondone.png';
import honeywellLogo from '../../images/logos/resideo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import useBackButtonHandler from '../hooks/useBackButtonHandler';

// Component for rendering individual positions
function Positions({ position,companyName }) {
    return (
        <>
            <h4 className={styles.jobTitle + " " + styles[companyName]}>
                {position.JobTitle} <span className={styles.jobDates}>{position.Span}</span>
            </h4>
            <ul className={styles.jobDescription}>
                {position.Work.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </>
    );
}

// Main ExperienceBox Component
export default function ExperienceBox({ data }) {
    return (
        <>
            {data.map((company, index) => (
                <div className={styles.experienceItem} key={index}>
                    <img src={ require(`../../images/logos/${company.imageURL}`)}  alt={company.CompanyName} className={styles.companyLogo} />
                    <div className={styles.experienceContent}>
                        <h3 className={styles.companyName+ " " + styles[company.CompanyName.toLowerCase()]}>{company.CompanyName}</h3>
                        <p className={styles.companyIntro}>{company.Description}</p>
                        {company.Positions.map((position, idx) => (
                            <Positions position={position} companyName={company.CompanyName.toLowerCase()} key={idx} />
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
