import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./Store";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
