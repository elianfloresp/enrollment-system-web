import { useState } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CoursesList";

const Courses = () => {
  const [refresh, setRefresh] = useState(false);

  const handleCourseAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Cursos</h1>
      <CourseForm onCourseAdded={handleCourseAdded} />
      <CourseList refresh={refresh} />
    </div>
  );
};

export default Courses;