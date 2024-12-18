import React, { useState } from 'react';
import { Button, ButtonGroup, Tooltip, Snackbar, Alert } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import styles from './about.module.css';

export default function SocialButtons() {
    const [open, setOpen] = useState(false); 

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("shahroz.jan@rutgers.edu").then(() => {
            setOpen(true); 
        }).catch(err => {
            console.error("Failed to copy email: ", err);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return; 
        setOpen(false);
    };

    return (
        <div className={styles.centeredButtons}>
            <ButtonGroup 
                className={styles.buttonGroup} 
                variant="outlined" 
                aria-label="Social button group"
            >
                <Button 
                    className={styles.aboutButton} 
                    href="https://www.linkedin.com/in/shahrozjan" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Tooltip title="LinkedIn">
                        <LinkedInIcon fontSize="large" />
                    </Tooltip>
                </Button>
                <Button 
                    className={styles.aboutButton} 
                    href="https://www.github.com/shahrozjan" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Tooltip title="GitHub">
                        <GitHubIcon fontSize="large" />
                    </Tooltip>
                </Button>

                <Button 
                    className={styles.aboutButton} 
                    onClick={handleCopyEmail}
                >
                    <Tooltip title="Copy Email">
                        <EmailIcon fontSize="large" />
                    </Tooltip>
                </Button>
            </ButtonGroup>

            <Snackbar
                open={open}
                autoHideDuration={3000} // Close in 3 seconds
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Email copied to clipboard!
                </Alert>
            </Snackbar>
        </div>
    );
}
