import React from "react";
import { Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router";
import Creation from "./Creation";
import Print from "./Print";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Creation />} />
        <Route path={"/print"} element={<Print />} />
      </Routes>
    </div>
  );
}

export default App;
