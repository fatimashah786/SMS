import React, { useEffect } from "react";
import StudentForm from "./StudentForm";

const EditProject = ({ closeEvent, docId }) => {
  useEffect(() => {
    console.log("isEditMode:", true);
    console.log("docId:", docId);
  }, [docId]);

  return (
    <StudentForm closeEvent={closeEvent} isEditMode={true} docId={docId} />
  );
};

export default EditProject;
