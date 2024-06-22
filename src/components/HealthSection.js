import React from 'react';

const HealthSection = ({ formValues, handleInputChange }) => {
    return (
        <div>
            <label>
                Exercise Frequency:
                <select name="exerciseFrequency" value={formValues.exerciseFrequency} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Rarely">Rarely</option>
                </select>
            </label>
            <label>
                Diet Preference:
                <select name="dietPreference" value={formValues.dietPreference} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
            </label>
        </div>
    );
};

export default HealthSection;
