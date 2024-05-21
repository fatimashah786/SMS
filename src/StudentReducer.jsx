// Import action types
{
  /** import {
  FETCH_STUDENTS_SUCCESS,
  ADD_STUDENT_SUCCESS,
  UPDATE_STUDENT_SUCCESS,
  DELETE_STUDENT_SUCCESS,
} from "./components/students/StudentAction";
// Adjust the path as needed

// Initial state
const initialState = {
  students: [],
};

// Reducer function
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default studentReducer;*/
}
