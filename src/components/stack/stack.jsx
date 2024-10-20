import React, { useState } from 'react';
import StackAnimation from './stack-animation.jsx'; // Import your animation component
import styles from './stack.module.css'; // Use lowercase for the CSS import

export default function Stack() {
    // State to track active tab
    const [activeTab, setActiveTab] = useState('Specs');

    // Handle tab click
    const handleTabClick = (tabName) => {
        console.log(`Tab clicked: ${tabName}`); // Log to verify click
        setActiveTab(tabName);
    };

    return (
        <div className={styles.stackContainer}>
            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    onClick={() => handleTabClick('Specs')}
                    className={`${styles.tab} ${activeTab === 'Specs' ? styles.active : ''}`}
                >
                    Specs
                </button>
                <button
                    onClick={() => handleTabClick('Animation')}
                    className={`${styles.tab} ${activeTab === 'Animation' ? styles.active : ''}`}
                >
                    Animation
                </button>
            </div>

            {/* Tab Content */}
            <div className={styles.tabContent}>
                {activeTab === 'Specs' && (
                    <div className={styles.specs}>
                        <h2 className={styles.specsHeader}>Technical Specifications</h2>
                        <div className={styles.specsContent}>
                            <ul className={styles.specsList}>
                                <li>
                                    <span className={styles.specIcon}>💻</span>
                                    <strong>Programming Languages:</strong> Python, C#, Java, C, C++
                                </li>
                                <li>
                                    <span className={styles.specIcon}>⚙️</span>
                                    <strong>Frameworks:</strong> .NET Core, .NET Framework, MAUI, Xamarin, IoTHub, SignalR
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
                )}
                {activeTab === 'Animation' && (
                    <div className={styles.animation}>
                        <StackAnimation />
                    </div>
                )}
            </div>
        </div>
    );
}
