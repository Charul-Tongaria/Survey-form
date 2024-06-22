import React from 'react';

const TechnologySection = ({ formValues, handleInputChange }) => {
    return (
        <div>
            <label>
                Favorite Programming Language:
                <select name="favoriteProgrammingLanguage" value={formValues.favoriteProgrammingLanguage} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C#">C#</option>
                </select>
            </label>
            <label>
                Years of Experience:
                <input type="number" name="yearsOfExperience" value={formValues.yearsOfExperience} onChange={handleInputChange} />
            </label>
        </div>
    );
};

export default TechnologySection;
