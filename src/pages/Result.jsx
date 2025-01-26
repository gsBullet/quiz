import axios from "axios";
import React, { useEffect, useState } from "react";
import quizSubmitURL from "../api/quizSubmitURL";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Result = () => {
  const [result, setResult] = useState([]);
  const getResult = async () => {
    let response = await axios.post(`${quizSubmitURL}/result`, {
      branch_id: 1,
    });
    if (response.status === 200) {
      setResult(response.data.data);
    } else {
      console.error("Error fetching result:", response.data.message);
    }
    console.log(response.data);
  };

  useEffect(() => {
    getResult();
  }, []);

  const exportToExcel = () => {
    const formattedData = result.map((item, index) => ({
      No: index + 1,
      "Student ID": item.student_id,
      "Student Name": item.student_name,
      Branch: item.branch_id,
      Class: item.class,
      "Total Questions": item.question_answer,
      "Correct Answers": item.correct_answer,
      "Wrong Answers": item.wrong_answer,
      Marks: `${item.marks}/${item.total_marks}`,
      Percentage: Math.ceil((item.correct_answer / item.question_answer) * 100),
      Status:
        Math.ceil((item.correct_answer / item.question_answer) * 100) > 70
          ? "Pass"
          : "Fail",
    }));

    createAndDownloadExcel(formattedData, "Result.xlsx");
  };

  // Export only "Pass" data
  const exportPassOnly = () => {
    const filteredData = result
      .filter(
        (item) =>
          Math.ceil((item.correct_answer / item.question_answer) * 100) > 70
      )
      .map((item, index) => ({
        No: index + 1,
        "Student ID": item.student_id,
        "Student Name": item.student_name,
        Branch: item.branch_id,
        Class: item.class,
        "Total Questions": item.question_answer,
        "Correct Answers": item.correct_answer,
        "Wrong Answers": item.wrong_answer,
        Marks: `${item.marks}/${item.total_marks}`,
        Percentage: Math.ceil(
          (item.correct_answer / item.question_answer) * 100
        ),
        Status: "Pass",
      }));

    createAndDownloadExcel(filteredData, "Pass_Only_Result.xlsx");
  };

  // Helper function to create and download Excel
  const createAndDownloadExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Result");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>result</h2>
        </div>
        <div className="card-header">
          <div className="d-flex justify-content-end gap-3">
            <button onClick={exportToExcel} className="btn btn-primary">
              Export to Excel
            </button>
            <button onClick={exportPassOnly} className="btn btn-success">
              Export Pass Only to Excel
            </button>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-responsive table-hover table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Student id</th>
                <th>Student Name</th>
                <th>Branch</th>
                <th>Class</th>
                <th>Total Quiz</th>
                <th>Correct Quiz</th>
                <th>Wrong Quiz</th>
                <th>Quiz Marks</th>
                <th>Written Marks</th>
                <th>Total Marks</th>
                <th>Percentage</th>
                {/* <th>Date</th> */}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data */}
              {result?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.student_id}</td>
                  <td>{item.student_name}</td>
                  <td>{item.branch_id}</td>
                  <td>{item.class}</td>
                  <td>{item.question_answer}</td>
                  <td>{item.correct_answer}</td>
                  <td>{item.wrong_answer}</td>
                  <td>
                    {item.quiz_mark}/{item.total_quiz_marks}
                  </td>
                  <td>
                    {item.written_mark}/{item.total_written_marks}
                  </td>
                  <td>
                    {item.quiz_mark + item.written_mark}/{item.total_marks}
                  </td>
                  <td>
                    {Math.ceil(
                      ((item.quiz_mark + item.written_mark) /
                        item.total_marks) *
                        100
                    )}
                  </td>
                  {/* <td>{item.given_admission_date}</td> */}
                  <td>
                    {Math.ceil(
                      ((item.quiz_mark + item.written_mark) /
                        item.total_marks) *
                        100
                    ) > 70
                      ? "Pass"
                      : "Fail"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
