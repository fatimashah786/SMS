import { configureStore } from "@reduxjs/toolkit";
import Studentslice from "./components/students/Studentslice";

const store = configureStore({
  reducer: {
    students: Studentslice,
  },
});

export default store;
 