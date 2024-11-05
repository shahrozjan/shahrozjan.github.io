import React, { useEffect, useState } from 'react';
import styles from './project.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import projectsData from "./projectsData.json";
import TagFilter from './components/TagFilter'; // Import the TagFilter component
import useBackButtonHandler from '../hooks/useBackButtonHandler';

const Projects = (props) => {
    useBackButtonHandler(props.exitfn);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const [selectedProject, setSelectedProject] = useState(null);
    const [first, setFirst] = useState(false);

    // Effect to filter projects based on selected tags
    useEffect(() => {
        if (selectedTags.length === 0) {
            // Show all projects if no tags are selected
            setFilteredProjects(projectsData);
        } else {
            // Filter projects that contain at least one of the selected tags
            const filtered = projectsData.filter(project =>
                project.tags.some(tag => selectedTags.includes(tag))
            );
            setFilteredProjects(filtered);
        }
    }, [selectedTags]); // Trigger re-run when selectedTags changes

    // Effect to animate project cards
    useEffect(() => {
        const projectNodes = [...document.querySelectorAll(`.${styles.project}`)];
        projectNodes.forEach((node, index) => {
            if (!first) {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.top = '0';
                }, 500 * (index + 1));
                setFirst(true);
            } else {
                node.style.opacity = '1';
                node.style.top = '0';
            }
        });
    }, [filteredProjects,selectedProject]); // Trigger re-run when filteredProjects changes

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleBackClick = () => {
        setSelectedProject(null);
    };

    const handleTagChange = (tags) => {
        setSelectedTags(tags);
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
                    <TagFilter 
                        tags={[...new Set(projectsData.flatMap(project => project.tags))]} 
                        selectedTags={selectedTags} 
                        onChange={handleTagChange} 
                    />
                    <div className={styles.parent}>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
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
                            ))
                        ) : (
                            <p className={styles.noProjects}>No projects match the selected tags.</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Projects;
