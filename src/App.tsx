import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Enrollments from "./pages/Enrollments";
import CoursesByStudent from "./components/CoursesByStudent";
import StudentsByCourse from "./components/StudentsByCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/courses" />} />
          <Route path="courses" element={<Courses />} />
          <Route path="students" element={<Students />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="students/:studentId/courses" element={<CoursesByStudent />} />
          <Route path="courses/:courseId/students" element={<StudentsByCourse />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
