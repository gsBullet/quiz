import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center">Welcome to Our Website</h1>
      <p className="text-center">
        {/* Create and manage quizzes for your students. */}
      </p>

      <section>
        <RegistrationForm />
      </section>
    </div>
  );
};

export default Home;
