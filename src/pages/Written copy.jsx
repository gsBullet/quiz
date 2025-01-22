import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import quizURL from "../api/quizURL";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import quizSubmitURL from "../api/quizSubmitURL";

const Written = () => {
  const { isAuth } = useContext(AuthContext);
  // console.log(isAuth);
  // console.log(isAuth);

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);

  // get quiz
  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.post(`${quizURL}/quiz-by-branch-class`, {
          branch_id: 1,
          class: "3",
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
    const formData = new FormData(e.target);
    // console.log(formData);

    const response = await axios.post(
      `${quizSubmitURL}/written`,

      {
        formData,
        // branch_id: 1,
        // class: "3",
        // student_id: 5,
        // is_pass: false,
        // given_admission_date: new Date(),
        // comment: "",
      }
    );
    if (response.status === 200) {
      console.log("Quiz submitted successfully");
      // navigate("/result");
    } else {
      console.error("Error submitting quiz:", response.data.message);
    }
  };
  return (
    <>
      {isAuth.checkAuth ? (
        <div className="container">
          <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xxl-6 m-auto">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">Welcome to writting part</h2>
              </div>
              <form
                action=""
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <div className="card-body">
                  {quiz?.map((question, questionIndex) => (
                    <div
                      key={question.id}
                      className={`${
                        question.question_type === "written"
                          ? "d-block"
                          : "d-none"
                      } mb-3`}
                    >
                      <h3>{question.question_title}</h3>
                      <p>{question.question_written}</p>
                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          id="file"
                          multiple
                          accept=".pdf,.docx,.jpg,.png"
                          // onChange={(e) => {
                          //   handleChange(e, questionIndex, question.id);
                          // }}
                        />
                        {/* <div>
                          {answer
                            .filter((item) => item.question_id === question.id)
                            .map((item, index) => (
                              <div
                                key={index}
                                className="d-flex gap-1 flex-wrap mt-3"
                              >
                                {item.files.map((file, fileIndex) => (
                                  <>
                                    {file.file_type === "image/png" ||
                                    file.file_type === "image/jpg" ||
                                    file.file_type === "image/jpeg" ? (
                                      <img
                                        key={fileIndex}
                                        src={file.url}
                                        // target="_blank"
                                        // rel="noreferrer"
                                        alt="img"
                                        width="80"
                                        height="80"
                                      />
                                    ) : (
                                      <iframe
                                        src={file.url}
                                        width="100"
                                        height="100px"
                                        title="PDF Preview"
                                      ></iframe>
                                    )}
                                  </>
                                ))}
                              </div>
                            ))}
                        </div> */}
                      </div>
                    </div>
                  ))}
                  <div className="text-end me-3">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Written;
