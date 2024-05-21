import React from "react";
import ProjectForm from "./ProjectForm";

const AddProject = ({ closeEvent }) => {
  return <ProjectForm closeEvent={closeEvent} isEditMode={false} />;
};

export default AddProject;
