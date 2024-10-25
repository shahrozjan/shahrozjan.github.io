import React from 'react';
import { Autocomplete, Checkbox, TextField, Paper } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TagFilter = ({ tags, selectedTags, onChange }) => {
    return (
        <Autocomplete
            multiple
            className="checky"
            id="checkboxes-tags-demo"
            options={tags}
            value={selectedTags}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
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
                        {option}
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
                    backgroundColor: "#f16529", // Chip background color
                    color: "whitesmoke", // Text color of chip
                    fontWeight: "bold",
                },
            }}
            sx={{
                width: {
                    xs: '100%', // Take full width on smaller screens
                    md: '500px' // Set a fixed width of 500px on medium and larger screens
                },
                maxWidth: '400px', // Ensure it doesn't exceed 500px width
                margin: {
                    xs: 'auto', // Set top/bottom margin to 10px and left/right margin to 20px for smaller screens
                    md: '0 20px' // Set left/right margin to 20px for larger screens, no top margin
                },
                //maxWidth: "500px", // Ensure the input doesn't exceed 500px in width
                "& .MuiInputLabel-root": {
                    color: "whitesmoke", // Label text color
                    "&.Mui-focused": {
                        color: "#F16529", // Label text color when focused
                    },
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
                    "&.Mui-focused fieldset": {
                        borderRadius: 30,
                        borderColor: "#F16529", // Input field border color when focused
                    },
                    "& input": {
                        color: "whitesmoke", // Input text color
                    },
                },
                "& .MuiAutocomplete-endAdornment": {
                    color: "whitesmoke", // Color for the dropdown arrow
                },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tags"
                    placeholder="Select Tags"
                    sx={{
                        width: "100%", // Set width to be responsive
                        backgroundColor: "#333333",
                        borderRadius: 30,
                        marginTop: 4,
                        "& .MuiInputBase-input": {
                            color: "whitesmoke", // Input text color
                        },
                    }}
                />
            )}
        />
    );
};

export default TagFilter;