import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
  },
  reducers: {
    addStudentSuccess: (state, action) => {
      state.students.push(action.payload);
    },
    editStudentSuccess: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.students.findIndex((student) => student.id === id);
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...updatedData };
      }
    },
    deleteStudentSuccess: (state, action) => {
      const { id } = action.payload;
      state.students = state.students.filter((student) => student.id !== id);
    },
    //  reducer for retrieving students
    retrieveStudentsSuccess: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const {
  addStudentSuccess,
  editStudentSuccess,
  deleteStudentSuccess,
  retrieveStudentsSuccess,
} = studentSlice.actions;

//  retrieve students from Firestore
export const retrieveStudents = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = [];
    querySnapshot.forEach((doc) => {
      students.push({ ...doc.data(), id: doc.id });
    });
    // Dispatch the retrieveStudentsSuccess action with the fetched students
    dispatch(retrieveStudentsSuccess(students));
  } catch (error) {
    console.error("Error retrieving students:", error);
  }
};

export const addStudent = (studentData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "students"), studentData);
    const newStudent = { ...studentData, id: docRef.id };
    dispatch(addStudentSuccess(newStudent));
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

export const editStudent = (id, updatedData) => async (dispatch) => {
  try {
    await updateDoc(doc(db, "students", id), updatedData);
    dispatch(editStudentSuccess({ id, updatedData }));
  } catch (error) {
    console.error("Error updating student:", error);
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "students", id));
    dispatch(deleteStudentSuccess({ id }));
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

export default studentSlice.reducer;
