import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Typography, Divider, Button, Box, Stack, Modal } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import StudentForm from "./StudentForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { deleteStudent, editStudent, retrieveStudents } from "./Studentslice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StudentList = ({
  closeEvent,
  students,
  retrieveStudents,
  deleteStudent,
}) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = () => setEditOpen(true);

  const handleEditClose = () => setEditOpen(false);

  useEffect(() => {
    retrieveStudents().then(() => setLoading(false));
  }, [retrieveStudents]);

  const handleDeleteClick = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      deleteStudent(id);
      toast.success("student deleted successfully");
    }
  };

  const handleEditClick = (id) => {
    setSelectedRowId(id);
    handleEditOpen();
  };

  if (loading) {
    return (
      <Typography variant="body1" align="center" sx={{ color: "red" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />

      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StudentForm closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <StudentForm
              closeEvent={handleEditClose}
              docId={selectedRowId}
              isEditMode={true}
            />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px", color: "blue", fontFamily: "cursive" }}
        >
          Student List
        </Typography>
        <Divider />

        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              bgcolor: "teal",
              "&:hover": {
                bgcolor: "blue",
              },
            }}
            endIcon={<AddCircleIcon />}
          >
            Add
          </Button>
        </Stack>
        <Box height={10} />
        {students.length > 0 ? (
          <center>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: "100px",
                        color: "teal",
                        fontFamily: "cursive",
                        fontWeight: "bold",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: "100px",
                        color: "teal",
                        fontFamily: "cursive",
                        fontWeight: "bold",
                      }}
                    >
                      Id
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: "100px",
                        color: "teal",
                        fontFamily: "cursive",
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: "100px",
                        color: "teal",
                        fontFamily: "cursive",
                        fontWeight: "bold",
                      }}
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: "100px",
                        color: "teal",
                        fontFamily: "cursive",
                        fontWeight: "bold",
                      }}
                    >
                      Department
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        minWidth: "100px",
                        color: "teal",
                        fontFamily: "cursive",
                        fontWeight: "bold",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.enroll}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.department}</TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "#0d6efd",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => handleEditClick(row.id)}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteClick(row.id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </center>
        ) : (
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontSize: 20,
              color: "red",
              marginLeft: 10,
              marginRight: 10,
              padding: 10,
            }}
          >
            No Data Available !!
          </Typography>
        )}
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({
  students: state.students.students,
});

const mapDispatchToProps = {
  retrieveStudents,
  deleteStudent,
  editStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
