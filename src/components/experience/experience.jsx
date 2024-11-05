import React from 'react';
import styles from './experience.module.css'; 
import tonDoneLogo from '../../images/logos/tondone.png'; 
import honeywellLogo from '../../images/logos/resideo.png';
import beawareLogo from '../../images/logos/beaware.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import useBackButtonHandler from '../hooks/useBackButtonHandler'; 

export default function Experience(props) {
    useBackButtonHandler(props.exitfn);

    return (
        <div className={styles.experienceOverlay}>
        <div className={styles.experienceContainer}>
            <button className={styles.closeButton} onClick={props.exitfn}>
            <FontAwesomeIcon icon={faChevronLeft} /> Back
            </button>
            <div className={styles.experienceItem}>
                <img src={beawareLogo} alt="BeAware" className={styles.companyLogo} />
                <div className={styles.experienceContent}>
                    <h3 className={styles.companyName+" "+styles.beaware}>BeAware</h3>
                    <p className={styles.companyIntro}>
                    BeAware is committed to making events accessible for the deaf community. 
                    Known for their award-winning Deaf Assistant app, they now bring inclusive live captioning to conferences with ConfCap, empowering everyone to participate fully.
                    </p>
                    <h4 className={styles.jobTitle+" "+styles.beaware}>Full Stack Developer <span className={styles.jobDates}>Sep 2024 – Present</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Developed a React.js website for BeAware's conference captioning service 
                            that leverages AI for real-time translation, enhancing accessibility and engagement 
                            for global audiences.</li>
                    </ul>
                </div>
            </div>
            <div className={styles.experienceItem}>
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
            </div>

            <div className={styles.experienceItem}>
                <img src={honeywellLogo} alt="Honeywell-Home" className={styles.companyLogo} />
                <div className={styles.experienceContent}>
                    <h3 className={styles.companyName+" "+styles.resideo}>Honeywell-Home (Resideo Technologies)</h3>
                    <p className={styles.companyIntro}>
                        Honeywell's Home Division (which was later spun off as Resideo Technologies) provides innovative home automation solutions including smart thermostats and security systems.
                    </p>
                    <h4 className={styles.jobTitle+" "+styles.resideo}>Software Developer <span className={styles.jobDates}>Jun 2019 – Feb 2021</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Developed and deployed a modified open-source Mass Device Simulator deployed in Docker capable of simulating up to 10,000 smart thermostats in parallel on the cloud for testing home automation.</li>
                        <li>Spearheaded the Mass Device Registration and Data Generation projects, achieving a 97% reduction in registration time by automating the process to register 100,000 devices across multiple databases in just one day, down from two months.</li>
                        <li>Implemented SignalR as part of the SignalR-GRPC Message Reader project to handle concurrent reading and sending of messages from more than 10 smart thermostats, with scalability for additional devices.</li>
                    </ul>
                    <h4 className={styles.jobTitle+" "+styles.resideo}>Software Developer Intern <span className={styles.jobDates}>Apr 2019 – Jun 2019</span></h4>
                    <ul className={styles.jobDescription}>
                        <li>Delivered the Employee Management System, including the frontend, database, and .NET APIs.</li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}
