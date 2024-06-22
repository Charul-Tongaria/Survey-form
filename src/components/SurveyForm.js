import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import useFetch from '../hooks/useFetch';
import TechnologySection from './TechnologySection';
import HealthSection from './HealthSection';
import EducationSection from './EducationSection';
import axios from 'axios';

const SurveyForm = () => {
    const initialState = {
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteProgrammingLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: ''
    };

    const {
        formValues,
        errors,
        handleInputChange,
        validate
    } = useForm(initialState);

    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (formValues.surveyTopic) {
            const fetchAdditionalQuestions = async () => {
                try {
                    const response = await axios.get(`https://api.example.com/survey-questions/${formValues.surveyTopic}`);
                    setAdditionalQuestions(response.data.questions);
                } catch (err) {
                    console.error("Error fetching additional questions", err);
                }
            };

            fetchAdditionalQuestions();
        }
    }, [formValues.surveyTopic]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (validate()) {
            // Fetch additional questions based on the survey topic
            const fetchAdditionalQuestions = async () => {
                try {
                    const response = await axios.get(`https://api.example.com/survey-questions/${formValues.surveyTopic}`);
                    setAdditionalQuestions(response.data.questions);
                } catch (err) {
                    console.error("Error fetching additional questions", err);
                }
            };

            await fetchAdditionalQuestions();

            // Display the summary
            setSummary(formValues);
            setIsSubmitted(true);
        } else {
            console.log("Validation failed");
        }
    };

    return (
        <div>
            {isSubmitted ? (
                <div>
                    <h2>Summary of Your Submission</h2>
                    <p><strong>Full Name:</strong> {summary.fullName}</p>
                    <p><strong>Email:</strong> {summary.email}</p>
                    <p><strong>Survey Topic:</strong> {summary.surveyTopic}</p>
                    {summary.surveyTopic === 'Technology' && (
                        <>
                            <p><strong>Favorite Programming Language:</strong> {summary.favoriteProgrammingLanguage}</p>
                            <p><strong>Years of Experience:</strong> {summary.yearsOfExperience}</p>
                        </>
                    )}
                    {summary.surveyTopic === 'Health' && (
                        <>
                            <p><strong>Exercise Frequency:</strong> {summary.exerciseFrequency}</p>
                            <p><strong>Diet Preference:</strong> {summary.dietPreference}</p>
                        </>
                    )}
                    {summary.surveyTopic === 'Education' && (
                        <>
                            <p><strong>Highest Qualification:</strong> {summary.highestQualification}</p>
                            <p><strong>Field of Study:</strong> {summary.fieldOfStudy}</p>
                        </>
                    )}
                    <p><strong>Feedback:</strong> {summary.feedback}</p>

                    {additionalQuestions.length > 0 && (
                        <div>
                            <h3>Additional Questions</h3>
                            {additionalQuestions.map((question, index) => (
                                <div key={index}>
                                    <label>{question.text}</label>
                                    <input type="text" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Full Name:
                        <input type="text" name="fullName" value={formValues.fullName} onChange={handleInputChange} />
                        {errors.fullName && <span>{errors.fullName}</span>}
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formValues.email} onChange={handleInputChange} />
                        {errors.email && <span>{errors.email}</span>}
                    </label>
                    <label>
                        Survey Topic:
                        <select name="surveyTopic" value={formValues.surveyTopic} onChange={handleInputChange}>
                            <option value="">Select</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                        </select>
                        {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
                    </label>

                    {formValues.surveyTopic === 'Technology' && (
                        <TechnologySection formValues={formValues} handleInputChange={handleInputChange} />
                    )}

                    {formValues.surveyTopic === 'Health' && (
                        <HealthSection formValues={formValues} handleInputChange={handleInputChange} />
                    )}

                    {formValues.surveyTopic === 'Education' && (
                        <EducationSection formValues={formValues} handleInputChange={handleInputChange} />
                    )}

                    <label>
                        Feedback:
                        <textarea name="feedback" value={formValues.feedback} onChange={handleInputChange}></textarea>
                        {errors.feedback && <span>{errors.feedback}</span>}
                    </label>

                    <button type="submit">Submit</button>

                    {additionalQuestions.length > 0 && (
                        <div>
                            <h3>Additional Questions</h3>
                            {additionalQuestions.map((question, index) => (
                                <div key={index}>
                                    <label>{question.text}</label>
                                    <input type="text" />
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
};

export default SurveyForm;
