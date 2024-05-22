import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import React from "react";
export default function ProjectForm({
  closeEvent,
  isEditMode,
  docId,
  refreshTable,
}) {
  const [formData, setFormData] = useState({
    project_name: "",
    expected_budget: "",
    description: "",
    project_type: "",
    stuname: "",
  });
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  //const notify = () => toast("Wow so easy!");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
        // Handle error gracefully, e.g., show a toast notification
      }
    };

    if (!students.length) {
      fetchStudents();
    }
  }, [students]);

  useEffect(() => {
    if (isEditMode && docId) {
      const fetchProjectDetails = async () => {
        try {
          const docRef = doc(db, "projects", docId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const projectData = docSnap.data();
            setFormData(projectData);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching project details:", error);
          // Handle error gracefully, e.g., show a toast notification
        }
      };
      fetchProjectDetails();
    }
  }, [isEditMode, docId]);

  const handleClose = () => {
    setFormData({
      project_name: "",
      expected_budget: "",
      description: "",
      project_type: "",
      stuname: "",
    });
    setErrors({});
    closeEvent();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let prj_name;
    if (isEditMode) {
      // Pass the docId to checknameUnique when in edit mode
      prj_name = await checknameUnique(formData.project_name, docId);
    } else {
      prj_name = await checknameUnique(formData.project_name);
    }

    if (!prj_name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        project_name: "This name is already in use",
      }));
      return;
    }

    let valid = true;
    const newErrors = {};

    if (!formData.project_name.trim()) {
      newErrors.project_name = "Project name is required";
      valid = false;
    }

    if (!formData.stuname.trim()) {
      newErrors.stuname = "Student name is required";
      valid = false;
    }

    if (
      !formData.expected_budget.trim() ||
      parseInt(formData.expected_budget) <= 2000
    ) {
      newErrors.expected_budget = "Expected budget must be greater than 2000";
      valid = false;
    }

    if (!formData.description.trim() || formData.description.length <= 20) {
      newErrors.description = "Description must be at least 20 characters";
      valid = false;
    }

    if (!formData.project_type.trim()) {
      newErrors.project_type = "Project type is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const projectData = { ...formData };

      if (isEditMode && docId) {
        const docRef = doc(db, "projects", docId);
        await updateDoc(docRef, projectData);
        toast.success("Project details updated successfully"); // Display success toast
      } else {
        console.log("Adding new project...");
        await addDoc(collection(db, "projects"), projectData);
        toast.success("New project added successfully");

        // await addDoc(collection(db, "projects"), projectData);
        //toast.success("New project added successfully"); // Display success toast
      }
      refreshTable();
      handleClose();
    } catch (error) {
      console.error("Error adding/updating project: ", error);
      toast.error("Error occurred while adding/updating project");
    }
  };

  const checknameUnique = async (project_name, docId) => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const existingNames = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().project_name,
      }));

      // Exclude the current record being edited from the check
      const filteredNames = existingNames.filter(
        (record) => record.name === project_name && record.id !== docId
      );

      return filteredNames.length === 0; // If no other record with the same name (excluding current record), return true
    } catch (error) {
      console.error("Error checking name uniqueness:", error);
      return true; // Assume name is unique to prevent form submission blocking
    }
  };

  return (
    <>
      {/* Add the ToastContainer here */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" gutterBottom>
        {isEditMode ? "Edit Project" : "Add Project"}
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6} tyle={{ margin: 0 }}>
            {/* First field */}
            <TextField
              margin="normal"
              fullWidth
              label="Project Name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              error={!!errors.project_name}
              helperText={errors.project_name}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              label="Expected Budget"
              name="expected_budget"
              type="number"
              value={formData.expected_budget}
              onChange={handleChange}
              error={!!errors.expected_budget}
              helperText={errors.expected_budget}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={!!errors.project_type}>
              <InputLabel id="project-type-label">Project</InputLabel>
              <Select
                labelId="project-type-label"
                id="project_type"
                label="project"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="App">App</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            {errors.project_type && (
              <Typography variant="caption" color="error">
                {errors.project_type}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} tyle={{ margin: 0 }} s>
            {/* Second field */}

            <FormControl fullWidth error={!!errors.stuname}>
              <InputLabel id="stuname-label">Student </InputLabel>
              <Select
                labelId="stuname-label"
                id="stuname"
                name="stuname"
                label="student"
                value={formData.stuname}
                onChange={handleChange}
              >
                <MenuItem value="">Select</MenuItem>
                {/* Dynamically generate MenuItem components for each student */}
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.name}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.stuname && (
                <Typography variant="caption" color="error">
                  {errors.stuname}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{ bgcolor: "red", "&:hover": { bgcolor: "darkred" } }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </>
  );
}
