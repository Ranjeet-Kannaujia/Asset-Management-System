import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import LayOut from "./LayOut";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const App = () => {
  const theme = {
    colors: {},
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <LayOut />
      </div>
    </ThemeProvider>
  );
};

export default App;
