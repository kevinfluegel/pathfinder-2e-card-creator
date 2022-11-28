import React from "react";
import { Link, Routes } from "react-router-dom";
import "./App.css";
import { Route } from "react-router";
import Creation from "./Creation";
import Print from "./Print";
import { Button } from "./Button";

function App() {
  return (
    <div className="App">
      <nav className="bg-gray-800">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 my-2">
              <Link
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                to={"/"}
              >
                Create Cards
              </Link>
              <Link
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                to={"/print"}
              >
                Printable Cards
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path={"/"} element={<Creation />} />
        <Route path={"/print"} element={<Print />} />
      </Routes>
    </div>
  );
}

export default App;
