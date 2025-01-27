import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import quizURL from "../api/quizURL";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import quizSubmitURL from "../api/quizSubmitURL";
import SweetAlert from "../components/SweetAlert";

const Quiz = () => {
  const { isAuth } = useContext(AuthContext);
  // console.log(isAuth);
  // console.log(isAuth);

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [answer, setAnswer] = useState([]);

  const handleChange = ({ options, user_answer, question_id }) => {
    const updatedAnswer = [...answer];

    // Find if an answer for this question_id already exists
    const existingAnswerIndex = updatedAnswer.findIndex(
      (item) => item.question_id === question_id
    );

    if (existingAnswerIndex !== -1) {
      // Update the existing answer
      const existingAnswer = updatedAnswer[existingAnswerIndex];

      // Check if the option is already selected
      const optionIndex = existingAnswer.user_answer.findIndex(
        (answerIndex) => answerIndex === user_answer
      );

      if (optionIndex !== -1) {
        // If the option is already selected, remove it (deselect)
        existingAnswer.user_answer.splice(optionIndex, 1);
        existingAnswer.options = existingAnswer.options.filter(
          (opt) => opt !== options
        );
      } else {
        // Otherwise, add the new option
        existingAnswer.user_answer.push(user_answer);
        existingAnswer.options.push(options);
      }

      updatedAnswer[existingAnswerIndex] = existingAnswer;
    } else {
      // Add a new answer for the question
      updatedAnswer.push({
        question_id,
        user_answer: [user_answer], // Store indices of selected options
        options: [options], // Store selected options as an array
      });
    }

    setAnswer(updatedAnswer);
  };

  console.log(answer);

  // get quiz
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.post(`${quizURL}/quiz-by-branch-class`, {
          branch_id: 1,
          class: "4",
          question_type: "quiz",
        });
        // console.log(response);

        if (response.status === 200) {
          setQuiz(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    getQuiz();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${quizSubmitURL}/store`, {
      user_answer: answer,
      branch_id: 1,
      class: "4",
      student_id: 3,
      is_pass: false,
      total_question_answer: answer.length,
      given_admission_date: new Date(),
      comment: "",
    });
    if (response.status === 200) {
      SweetAlert({
        icon: "success",
        message: "Quiz submitted successfully",
      });
      e.target.reset();
      navigate("/");
    } else {
      console.error("Error submitting quiz:", response.data.message);
    }
  };
  return (
    <>
      {isAuth.checkAuth ? (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2>Start your Quiz Now</h2>
            </div>
            <form action="" onSubmit={submitHandler}>
              <div className="card-body">
                {quiz?.map((question, questionIndex) => (
                  <div
                    key={question.id}
                    className={`${
                      question.question_type === "quiz" ? "d-block" : "d-none"
                    } mb-3`}
                  >
                    <h3>{question.question_title}</h3>
                    {Object.keys(question)
                      .filter((key) => key.startsWith("options")) // Filter keys that start with "options"
                      .map((optionKey, optionIndex) => (
                        <div key={optionIndex} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={question[optionKey]}
                            name={`question_${questionIndex}`}
                            id={`question_${questionIndex}_option_${optionIndex}`}
                            onChange={() =>
                              handleChange({
                                options: question[optionKey],
                                user_answer: optionIndex + 1,
                                question_id: question.id,
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`question_${questionIndex}_option_${optionIndex}`}
                          >
                            {question[optionKey]}
                          </label>
                        </div>
                      ))}
                  </div>
                ))}

                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Quiz;
