import React, { useEffect } from "react";
import StudentForm from "./StudentForm";

const AddProject = ({ closeEvent, docId }) => {
  useEffect(() => {}, [docId]);

  return (
    <StudentForm closeEvent={closeEvent} isEditMode={false} docId={docId} />
  );
};

export default AddProject;
