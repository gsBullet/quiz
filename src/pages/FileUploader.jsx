import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import quizURL from "../api/quizURL";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import quizSubmitURL from "../api/quizSubmitURL";

const FileUploader = () => {
  const { isAuth } = useContext(AuthContext);
  // console.log(isAuth);
  // console.log(isAuth);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // formData.append("student_id", 1);

    try {
      const response = await axios.post(`${quizSubmitURL}/file-upload`, formData);

      if (response.status === 200) {
        console.log("Quiz submitted successfully");
        console.error("Error submitting quiz:", response.data.message);
      }
    } catch (error) {
      console.error("Submission failed:", error);
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
                  <h3>{"file uploader"}</h3>
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      name={"file_upload"}
                      id={"file_upload"}
                      multiple
                      accept=".pdf,.docx,.jpg,.png"
                    />
                  </div>

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

export default FileUploader;
