import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import quizSubmitURL from "../api/quizSubmitURL";

const WrittenMark = () => {
  const { isAuth } = useContext(AuthContext);
  // console.log(isAuth);
  // console.log(isAuth);

  const navigate = useNavigate();
  const [getWrittenFile, setgetWrittenFile] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFile, setCurrentFile] = useState(null); // Stores the file being viewed
  const [fileType, setFileType] = useState(""); // Stores the file type
  const [userMark, setUserMark] = useState(null); // Stores the file
  // console.log(userMark);

  const openModal = (fileUrl, type) => {
    setCurrentFile(fileUrl);
    setFileType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentFile(null);
    setFileType("");
  };

  // get quiz

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await axios.post(`${quizSubmitURL}/get-written-data`, {
          branch_id: 1,
          class: "3",
          question_type: "written",
          student_id: 1,
        });
        // console.log(response);

        if (response.status === 200) {
          setgetWrittenFile(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    getQuiz();
  }, []);

  const handleSave = async (e, question) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log(question, "q");
      const response = await axios.post(`${quizSubmitURL}/store-written-mark`, {
        question,
        userMark,
      });
      if (response.status === 200) {
        console.log("Quiz submitted successfully");
        // navigate("/result");
      } else {
        console.error("Error submitting quiz:", response.data.message);
      }
    }
  };

  return (
    <>
      {isAuth.checkAuth ? (
        <div className="container">
          <div className="col-12  m-auto">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">Welcome to writting part</h2>
              </div>

              <div className="card-body">
                <table className="table table-bordered table-responsive">
                  <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Branch ID</th>
                      <th>Class</th>
                      <th>Question Type</th>
                      <th>Question ID</th>
                      <th>Question title</th>
                      <th>Question Marks</th>
                      <th>Answer Marks</th>
                      <th>img/file</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getWrittenFile?.map((question, questionIndex) => {
                      // Render rows only for questions of type 'written'
                      if (question.question_type === "written") {
                        return (
                          <tr key={questionIndex}>
                            <td>{question.student_id}</td>
                            <td>{question.branch_id}</td>
                            <td>{question.class}</td>
                            <td>{question.question_type}</td>
                            <td>{question.question_id}</td>
                            <td>{question.question_title}</td>
                            <td>{question.question_marks}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="marks"
                                id="marks"
                                defaultValue={question.answer_marks}
                                onChange={(e) => setUserMark(e.target.value)}
                                onKeyDown={(e) => handleSave(e, question)}
                              />
                            </td>
                            <td>
                              <div>
                                {/* File List */}
                                <div className="d-flex gap-1 flex-wrap">
                                  {question.user_answer_files?.map(
                                    (file, indexFile) => {
                                      const fileUrl = `http://127.0.0.1:5002/${file}`;
                                      const fileExtension = file
                                        .split(".")
                                        .pop()
                                        .toLowerCase();

                                      if (
                                        ["png", "jpg", "jpeg", "gif"].includes(
                                          fileExtension
                                        )
                                      ) {
                                        return (
                                          <img
                                            key={indexFile}
                                            title="Image File"
                                            width="100"
                                            height="100"
                                            src={fileUrl}
                                            alt="file"
                                            onClick={() =>
                                              openModal(fileUrl, "image")
                                            }
                                            style={{ cursor: "pointer" }}
                                          />
                                        );
                                      } else if (fileExtension === "pdf") {
                                        return (
                                          <div
                                            key={indexFile}
                                            style={{
                                              width: "100px",
                                              height: "100px",
                                              cursor: "pointer",
                                              position: "relative",
                                            }}
                                            onClick={() =>
                                              openModal(fileUrl, "pdf")
                                            }
                                          >
                                            <iframe
                                              title="PDF File"
                                              width="100px"
                                              height="100px"
                                              src={`${fileUrl}`}
                                              style={{
                                                pointerEvents: "none", // Prevent interactions inside the iframe
                                              }}
                                            />
                                            <span
                                              style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                              }}
                                            >
                                              {/* Optional overlay for clickable area */}
                                            </span>
                                          </div>
                                        );
                                      } else {
                                        return (
                                          <a
                                            key={indexFile}
                                            href={fileUrl}
                                            download
                                            className="btn btn-link"
                                          >
                                            Download{" "}
                                            {fileExtension.toUpperCase()} File
                                          </a>
                                        );
                                      }
                                    }
                                  )}
                                </div>

                                {/* Modal */}
                                {showModal && (
                                  <div
                                    className="modal-overlay"
                                    style={{
                                      position: "fixed",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      backgroundColor:
                                        "rgba(123, 122, 122, 0.43)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      zIndex: 1000,
                                    }}
                                  >
                                    <div
                                      className="modal-content"
                                      style={{
                                        position: "relative",
                                        backgroundColor: "#fff",
                                        padding: "5px",
                                        borderRadius: "8px",
                                        maxWidth: "90%",
                                        maxHeight: "90%",
                                        overflow: "auto",
                                      }}
                                    >
                                      <button
                                        onClick={closeModal}
                                        style={{
                                          position: "absolute",
                                          top: "50px",
                                          right: "5px",
                                          background: "gray",
                                          border: "none",
                                          fontSize: "30px",
                                          cursor: "pointer",
                                          transform: "translate(-50%, -50%)",
                                          color: "red",
                                          borderRadius: "50%",
                                          padding: "0px 12px",
                                        }}
                                      >
                                        &times;
                                      </button>
                                      {fileType === "image" && (
                                        <img
                                          src={currentFile}
                                          alt="file"
                                          style={{
                                            width: "100%",
                                            height: "auto",
                                          }}
                                        />
                                      )}
                                      {fileType === "pdf" && (
                                        <iframe
                                          src={currentFile}
                                          title="PDF Viewer"
                                          style={{
                                            width: "100%",
                                            height: "80vh",
                                          }}
                                        ></iframe>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      }
                      return null; // Skip rendering for non-written questions
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default WrittenMark;
