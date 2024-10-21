import React from 'react';
import styles from './experience.module.css'; // Use lowercase for the CSS import
import tonDoneLogo from '../../images/logos/tondone.png'; // Import the company logos
import honeywellLogo from '../../images/logos/resideo.png';

export default function Experience() {
    return (
        <div className={styles.experienceContainer}>
            <div className={styles.experienceItem}>
                <img src={tonDoneLogo} alt="TonDone" className={styles.companyLogo} />
                <div className={styles.experienceContent}>
                    <h3 className={styles.companyName}>TonDone</h3>
                    <p className={styles.companyIntro}>
                        TonDone is a productivity-focused app, enabling efficient management of contracts and projects for hundreds of clients.
                    </p>
                    <h4 className={styles.jobTitle}>Software Engineer <span className={styles.jobDates}>Jun 2024 – Present</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Built .NET APIs for the contract-based TonDone app on a MariaDB backend serving hundreds of clients and thousands of users.</li>
                        <li>Migrated the Xamarin-based TonDone app to MAUI.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.experienceItem}>
                <img src={tonDoneLogo} alt="TonDone" className={styles.companyLogo} />
                <div className={styles.experienceContent}>
                    <h3 className={styles.companyName}>TonDone</h3>
                    <p className={styles.companyIntro}>
                        Internship focused on integrating and expanding functionality for a mobile productivity app.
                    </p>
                    <h4 className={styles.jobTitle}>Software Engineer Intern <span className={styles.jobDates}>May 2023 – May 2024</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Integrated Swagger for the backend web APIs and created API connections for the cross-platform mobile application.</li>
                        <li>Developed new features including frontend on the cross-platform TonDone app and Push Notifications API.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.experienceItem}>
                <img src={honeywellLogo} alt="Honeywell-Home" className={styles.companyLogo} />
                <div className={styles.experienceContent}>
                    <h3 className={styles.companyName}>Honeywell-Home (Resideo Technologies)</h3>
                    <p className={styles.companyIntro}>
                        Resideo Technologies provides innovative home automation solutions including smart thermostats and security systems.
                    </p>
                    <h4 className={styles.jobTitle}>Software Developer <span className={styles.jobDates}>Jun 2019 – Feb 2021</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Developed and deployed a modified open-source Mass Device Simulator in Docker capable of simulating up to 10,000 smart thermostats in parallel on the cloud for testing home automation.</li>
                        <li>Spearheaded projects such as the Mass Device Registration and Data Generation, automating registration of up to 100,000 devices on multiple databases in a single day.</li>
                        <li>Implemented SignalR in the SignalR-GRPC .NET Message Reader to handle concurrent reading and sending of messages from more than 10 smart thermostats, with scalability for additional devices.</li>
                    </ul>
                </div>
            </div>

            <div className={styles.experienceItem}>
                <img src={honeywellLogo} alt="Honeywell-Home" className={styles.companyLogo} />
                <div className={styles.experienceContent}>
                    <h3 className={styles.companyName}>Honeywell-Home (Resideo Technologies)</h3>
                    <p className={styles.companyIntro}>
                        Delivered a comprehensive employee management system, integrating both backend and frontend technologies.
                    </p>
                    <h4 className={styles.jobTitle}>Software Developer Intern <span className={styles.jobDates}>Apr 2019 – Jun 2019</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Delivered the Employee Management System, including the frontend, database, and .NET APIs.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
