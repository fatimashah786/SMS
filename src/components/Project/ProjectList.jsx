import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import ProjectForm from "./ProjectForm"; // Import the StudentForm component
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const StudentList = ({ closeEvent }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [originalRows, setOriginalRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [loading, setLoading] = useState(true); // State to track loading state
  const [noData, setNoData] = useState(false); // State to track if no data is found

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await getDocs(collection(db, "projects"));
      const fetchedRows = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setOriginalRows(fetchedRows);
      setFilteredRows(fetchedRows);
      setLoading(false); // Set loading to false when data is fetched

      // Check if no data is found
      if (fetchedRows.length === 0) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const deleteUser = async (id) => {
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
      try {
        await deleteDoc(doc(db, "projects", id));
        toast.success("Record has been deleted");
        getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting record");
      }
    }
  };

  const filterData = (value) => {
    if (value) {
      const filtered = originalRows.filter((row) =>
        row.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(originalRows);
    }
  };

  const editUser = (id) => {
    setSelectedRowId(id);
    handleEditOpen();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            <ProjectForm closeEvent={handleClose} refreshTable={getUsers} />
          </Box>
        </Modal>
        <Modal
          open={editOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ProjectForm
              closeEvent={handleEditClose}
              docId={selectedRowId}
              isEditMode={true}
              refreshTable={getUsers}
            />
          </Box>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px", color: "blue", fontFamily: "verdana" }}
        >
          Project List
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
                bgcolor: "teal",
              },
            }}
            endIcon={<AddCircleIcon />}
          >
            Add
          </Button>
        </Stack>
        <Box height={10} />

        {loading ? ( // Display loading indicator if still loading
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        ) : noData ? ( // Display "No data available" message if no data present
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
        ) : (
          // Render table if there is data
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "100px",
                      color: "teal",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                    }}
                  >
                    Project_Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "100px",
                      color: "teal",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                    }}
                  >
                    stu_name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "100px",
                      color: "teal",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                    }}
                  >
                    Budget
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "100px",
                      color: "teal",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "100px",
                      color: "teal",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "100px",
                      color: "teal",
                      fontFamily: "verdana",
                      fontWeight: "bold",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell
                        align="left"
                        style={{
                          minWidth: "100px",
                          color: "black",
                          fontFamily: "verdana",
                          fontSize: 15,
                        }}
                      >
                        {row.project_name}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          minWidth: "100px",
                          color: "black",
                          fontFamily: "verdana",
                          fontSize: 15,
                        }}
                      >
                        {row.stuname}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          minWidth: "100px",
                          color: "black",
                          fontFamily: "verdana",
                          fontSize: 15,
                        }}
                      >
                        {row.expected_budget}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          minWidth: "100px",
                          color: "black",
                          fontFamily: "verdana",
                          fontSize: 15,
                        }}
                      >
                        {row.project_type}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          minWidth: "100px",
                          color: "black",
                          fontFamily: "verdana",
                          fontSize: 15,
                          wordWrap: "break-word", // Ensure long words wrap to next line
                          whiteSpace: "pre-wrap", // Preserve line breaks and wraps
                          overflowWrap: "break-word", // Ensure content breaks correctly
                          maxWidth: "300px",
                        }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          minWidth: "100px",
                          color: "black",
                          fontFamily: "verdana",
                          fontSize: 15,
                        }}
                      >
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "#0d6efd",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            onClick={() => editUser(row.id)}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteUser(row.id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!loading &&
          !noData && ( // Display pagination only if not loading and data is available
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
      </Paper>
    </>
  );
};

export default StudentList;
