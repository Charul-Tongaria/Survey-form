import React from 'react';

const EducationSection = ({ formValues, handleInputChange }) => {
    return (
        <div>
            <label>
                Highest Qualification:
                <select name="highestQualification" value={formValues.highestQualification} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="PhD">PhD</option>
                </select>
            </label>
            <label>
                Field of Study:
                <input type="text" name="fieldOfStudy" value={formValues.fieldOfStudy} onChange={handleInputChange} />
            </label>
        </div>
    );
};

export default EducationSection;
