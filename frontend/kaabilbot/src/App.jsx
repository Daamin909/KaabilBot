import React from "react";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import ChatInterface from "./Components/ChatInterface/ChatInterface";
const App = () => {
  return (
    <div className="app">
      <NavBar />
      <ChatInterface />
    </div>
  );
};

export default App;
