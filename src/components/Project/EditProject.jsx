import React, { useEffect } from "react";
import ProjectForm from "./ProjectForm";

const EditProject = ({ closeEvent, docId }) => {
  useEffect(() => {
    console.log("isEditMode:", true);
    console.log("docId:", docId);
  }, [docId]);

  return (
    <ProjectForm closeEvent={closeEvent} isEditMode={true} docId={docId} />
  );
};

export default EditProject;
