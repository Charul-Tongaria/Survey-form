import { useState } from 'react';

const useForm = (initialState) => {
    const [formValues, setFormValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = formValues) => {
        let temp = { ...errors };

        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "Full Name is required.";
        if ('email' in fieldValues)
            temp.email = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fieldValues.email)) ? "" : "Email is not valid.";
        if ('surveyTopic' in fieldValues)
            temp.surveyTopic = fieldValues.surveyTopic ? "" : "Survey Topic is required.";
        if ('feedback' in fieldValues)
            temp.feedback = fieldValues.feedback.length >= 50 ? "" : "Feedback must be at least 50 characters.";

        setErrors({
            ...temp
        });

        if (fieldValues === formValues)
            return Object.values(temp).every(x => x === "");
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
        validate({ [name]: value });
    };

    return {
        formValues,
        setFormValues,
        errors,
        setErrors,
        handleInputChange,
        validate
    };
};

export default useForm;
