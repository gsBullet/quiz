import axios from "axios";
import React, { useEffect, useState } from "react";
import quizURL from "../api/quizURL";

const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const options = ["options1", "options2", "options3", "options4"];
  // console.log(quiz);
  const getQuiz = async () => {
    try {
      const response = await axios.get(`${quizURL}`);
      // console.log(response);

      if (response.status === 200) {
        setQuiz(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };
  useEffect(() => {
    getQuiz();
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Start your Quiz Now</h2>
        </div>
        <div className="card-body">
          {quiz?.data?.map((question, index) => (
            <div key={index}>
              <h3>{question.question_title}</h3>
              {/* {question.question_type === "written" && (
                <div>
                  <p>{question.question_written}</p>
                </div>
              )} */}
              {question.question_type === "quiz" && (
                <div className="form-group">
                  {options.map((optionKey, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value={question[optionKey]} // Display the option text dynamically
                        name="question" // Ensure all radio buttons share the same name for grouping
                        id={`option_${index}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`option_${index}`}
                      >
                        {question[optionKey]}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
