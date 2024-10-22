import React, { useEffect, useState } from 'react';
import styles from './project.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import projectsData from "./projectsData.json";

const Projects = (props) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [closeBtnClassname, setCloseBtnClassname] = useState(styles.closeButton);
    const [first, setFirst] = useState(false);

    useEffect(() => {
        const projectnodes = [...document.querySelectorAll(`.${styles.project}`)];
        projectnodes.map((node, index) => {
            if(!first)
            {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.top = '0';
                }, 500 * (index + 1));
                setFirst(true)
            }
            else{
                    node.style.opacity = '1';
                    node.style.top = '0';
            }
            
        });
    }, [selectedProject]);

    // useEffect(() => {
    //     const projectnodes = [...document.querySelectorAll(`.${styles.project}`)];
    //     projectnodes.map((node, index) => {
    //         setTimeout(() => {
    //             node.style.opacity = '1';
    //             node.style.top = '0';
    //         }, 500 * (index + 1));
    //     });
    // }, [selectedProject]);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleBackClick = () => {
        setSelectedProject(null);
    };

    return (
        <>
            {selectedProject ? (
                <div className={styles.projectDetails}>
                    <button className={styles.closeButton} onClick={handleBackClick}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Close
                    </button>
                    <div className={styles.projectContent}>
                        <img 
                            src={require(`./images/${selectedProject.image}`)}
                            alt={`${selectedProject.name} logo`}
                            className={styles.projectImage}
                        />
                        <h2>{selectedProject.name}</h2>
                        <p>{selectedProject.description}</p>
                        <p><strong>Completion Date:</strong> {selectedProject.date}</p>
                        <div className={styles.tags}>
                            {selectedProject.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <button className={styles.closeButton} onClick={props.exitfn}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Back
                    </button>
                    <div className={styles.parent}>
                        {projectsData.map((project, index) => (
                            <div
                                key={index}
                                className={styles.project}
                                onClick={() => handleProjectClick(project)}
                            >
                                <img 
                                    src={require(`./images/${project.image}`)}
                                    alt={project.name}
                                    className={styles.projectThumbnail}
                                />
                                <h3>{project.name}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Projects;
