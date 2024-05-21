import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import { toast } from "react-toastify"; // Removed unused import
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { connect } from "react-redux";
import { addStudent, editStudent, retrieveStudents } from "./Studentslice";
import React from "react";

const ProjectForm = ({
  closeEvent,
  isEditMode,
  docId,
  addStudent,
  editStudent, //  editStudent
  students, // Added students prop
  retrieveStudents, // Added retrieveStudents prop
}) => {
  const [formData, setFormData] = useState({
    enroll: "",
    name: "",
    email: "",
    phone: "",
    department: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch student details if in edit mode and docId is available
    if (isEditMode && docId) {
      // Dispatch an action to retrieve all students
      retrieveStudents();
    }
  }, [isEditMode, docId, retrieveStudents]);

  useEffect(() => {
    // Update form data with student details when students data changes
    if (isEditMode && docId && students.length > 0) {
      const student = students.find((student) => student.id === docId);
      if (student) {
        setFormData({
          enroll: student.enroll,
          name: student.name,
          email: student.email,
          phone: student.phone,
          department: student.department,
        });
      } else {
        console.error("Student not found with id: ", docId);
      }
    }
  }, [isEditMode, docId, students]);

  const handleClose = () => {
    // Reset form data and errors, and close the modal
    setFormData({
      enroll: "",
      name: "",
      email: "",
      phone: "",
      department: "",
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

    // Form validation
    let valid = true;
    const newErrors = {};

    if (!formData.enroll.trim()) {
      newErrors.enroll = "ID is required";
      valid = false;
    } else if (!/^[0-9]+$/.test(formData.enroll.trim())) {
      newErrors.enroll = "ID should contain only digits";
      valid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Improved email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.phone.trim() || formData.phone.trim().length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditMode && docId) {
        // Dispatch an action to update student data if in edit mode
        editStudent(docId, formData); //  to editStudent
        toast.success("Student details updated successfully");
      } else {
        // Dispatch an action to add new student data if in add mode
        addStudent(formData);
        toast.success("New student added successfully");
      }

      handleClose();
    } catch (error) {
      console.error("Error adding/updating student: ", error);
      toast.error("Error occurred while adding/updating student");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={closeEvent}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" gutterBottom>
        {isEditMode ? "Edit Student" : "Add Student"}
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              label="ID"
              name="enroll"
              value={formData.enroll}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.which < 48 || e.which > 57) {
                  e.preventDefault();
                }
              }}
              error={!!errors.enroll}
              helperText={errors.enroll}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={(e) => {
                // Check if the pressed key is a digit (0-9)
                if (/\d/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          inputProps={{ maxLength: 10 }}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (/[a-zA-Z]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <FormControl fullWidth error={!!errors.department}>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            label="Department"
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="computer">Computer</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Electronic">Electronic</MenuItem>
            <MenuItem value="Civil">Civil</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ bgcolor: "green", "&:hover": { bgcolor: "darkgreen" } }}
          >
            Submit
          </Button>
          {!isEditMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              sx={{ bgcolor: "red", "&:hover": { bgcolor: "darkred" } }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  students: state.students.students,
});

const mapDispatchToProps = {
  addStudent,
  editStudent, //  editStudent
  retrieveStudents, // Added retrieveStudents
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
