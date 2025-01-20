import React, { useState } from "react";
import SweetAlert from "./SweetAlert";
import baseUrl from "../api/baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    branch: "",
    section: "",
    class: "",
    email: "",
    password: "",
    registration_date: new Date(),
  });

  const branches = ["1", "2", "3", "4"];
  const sections = ["1", "2", "3", "4"];
  const classes = ["1","2", "3", "4", "5", "6"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/store`, {
        id: 1,
        full_name: formData.fullName,
        branch_id: formData.branch,
        section: formData.section,
        class: formData.class,
        email: formData.email,
        password: formData.password,
        registration_date: formData.registration_date,
      });

      console.log("Response:", response);

      // Check if response status is 200 (success)
      if (response.status === 200) {
        SweetAlert({
          icon: "success",
          message: "Registration Successful! You can now log in.",
        });
        reset();
        navigate("/login");
      } else {
        SweetAlert({
          icon: "error",
          message:
            "There was an issue with your registration. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      SweetAlert({
        icon: "error",
        message:
          "An error occurred while submitting your registration. Please try again later.",
      });
    }
  };
  const reset = () => {
    setFormData({
      fullName: "",
      branch: "",
      section: "",
      class: "",
      email: "",
      password: "",
      registration_date: new Date(),
    });
  };

  return (
    <div className="container mt-5">
      <div className="col-xxl-6 col-lg-6 col-md-8 col-sm-12 m-auto">
        <div className="card shadow">
          <div className="card-header shadow">
            <h2 className="text-center mb-4">Registration Form</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Branch */}
              <div className="mb-3">
                <label htmlFor="branch" className="form-label">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="form-select"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section */}
              <div className="mb-3">
                <label htmlFor="section" className="form-label">
                  Section
                </label>
                <select
                  id="section"
                  name="section"
                  className="form-select"
                  value={formData.section}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>

              {/* Class */}
              <div className="mb-3">
                <label htmlFor="class" className="form-label">
                  Class
                </label>
                <select
                  id="class"
                  name="class"
                  className="form-select"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
