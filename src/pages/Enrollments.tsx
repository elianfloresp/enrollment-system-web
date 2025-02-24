import { useState } from "react";
import EnrollmentList from "../components/EnrollmentList";
import EnrollmentForm from "../components/EnrollmentForm";

const Enrollments = () => {
  const [refresh, setRefresh] = useState(false);

  const handleEnrollmentAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h1>Matrículas</h1>
      <EnrollmentForm onEnrollmentAdded={handleEnrollmentAdded} />
      <EnrollmentList refresh={refresh} />
    </div>
  );
};

export default Enrollments;