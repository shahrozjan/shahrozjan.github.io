import React from 'react';
import styles from './experience.module.css'; 
import tonDoneLogo from '../../images/logos/tondone.png'; 
import honeywellLogo from '../../images/logos/resideo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import useBackButtonHandler from '../hooks/useBackButtonHandler'; 

export default function ExperienceBox(){
    return ( <div className={styles.experienceItem}>
        <img src={tonDoneLogo} alt="TonDone" className={styles.companyLogo} />
        <div className={styles.experienceContent}>
            <h3 className={styles.companyName+" "+styles.tondone}>TonDone</h3>
            <p className={styles.companyIntro}>
            TonDone is the business operating system for your building and facility service company serving hundreds of clients.
            </p>
            <h4 className={styles.jobTitle+" "+styles.tondone}>Software Engineer <span className={styles.jobDates}>Jun 2024 – Present</span></h4>
            <ul className={styles.jobDescription}>
                <li>Migrated the Xamarin-based TonDone app to MAUI.</li>
                <li>Implemented integrated GPS features, including Nearby Users and Nearby Locations, enhancing user connectivity and location-based interactions.</li>
            </ul>
            <h4 className={styles.jobTitle+" "+styles.tondone}>Software Engineer Intern <span className={styles.jobDates}>May 2023 – May 2024</span></h4>
            <ul className={styles.jobDescription}>
                <li>Integrated Swagger for the backend web APIs and created API connections for the cross-platform mobile application.</li>
                <li>Developed new features including the xaml frontend for Quick Actions and Create Work Order features on the TonDone app</li>
                <li>Integrated OneSignal and Push Notifications API in the app</li>
            </ul>
        </div>
    </div>)
}