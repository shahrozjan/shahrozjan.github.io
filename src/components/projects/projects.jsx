import React, { useEffect, useState } from 'react';
import styles from './project.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import projectsData from "./projectsData.json";
import { Autocomplete, TextField, Checkbox, Paper } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 }]
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
                    <Autocomplete
      multiple
      className={styles.checky}
      id="checkboxes-tags-demo"
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li
            key={key}
            {...optionProps}
            style={{
              backgroundColor: "#333333", // Set the background color of each option
              color: "whitesmoke", // Set the text color of each option
            }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ color: "whitesmoke", marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        );
      }}
      PaperComponent={({ children }) => (
        <Paper style={{ backgroundColor: "#222", color: "whitesmoke" }}>
          {children}
          <style>
            {`
              .MuiAutocomplete-noOptions {
                color: whitesmoke !important;
              }
            `}
          </style>
        </Paper>
      )}
      ChipProps={{
        sx: {
          backgroundColor: "#f16529", // A contrasting background color
          color: "whitesmoke", // Text color
          fontWeight: "bold",
        },
      }}
      sx={{
        width: 500,
        "& .MuiInputLabel-root": {
          color: "whitesmoke", // Label text color
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderRadius: 30,
            borderColor: "whitesmoke", // Input field border color
          },
          "&:hover fieldset": {
            borderRadius: 30,
            borderColor: "#F16529", // Input field border color on hover
          },
          "& input": {
            color: "whitesmoke", // Input text color
          },
          
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Checkboxes"
          placeholder="Favorites"
          sx={{
            backgroundColor: "#333333",
            borderRadius: 30,
            "& .MuiInputBase-input": {
              color: "whitesmoke", // Input text color
            },
          }}
        />
      )}
    />
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
