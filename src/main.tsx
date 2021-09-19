import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ScopedCssBaseline } from "@mui/material";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ScopedCssBaseline>
      <App />
    </ScopedCssBaseline>
  </React.StrictMode>,
  document.getElementById("root")
);
