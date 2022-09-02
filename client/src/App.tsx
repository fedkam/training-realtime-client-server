import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

const Test = styled.div`
  width: 100px;
  height: 100px;
  background: red;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Test>sldfjlkds</Test>
      </header>
    </div>
  );
}

export default App;
