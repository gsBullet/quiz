import { HashRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import FrontendLayout from "./layouts/FrontendLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import AuthContextProvider from "./context/AuthContext";
import Result from "./pages/Result";
import Written from "./pages/Written";
import FileUploader from "./pages/FileUploader";

function App() {
  return (
    <>
      <AuthContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<FrontendLayout />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="written" element={<Written />} />
              <Route path="file-uploader" element={<FileUploader />} />
              <Route path="login" element={<Login />} />
              <Route path="result" element={<Result />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
