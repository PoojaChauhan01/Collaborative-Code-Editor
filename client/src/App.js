import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:4000");

function App() {
  const [code, setCode] = useState("");

  useEffect(() => {
    socket.on("code-change", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("code-change", newCode);
  };

  return (
    <div className="App">
      <h1>Collaborative Code Editor</h1>
      <textarea
        value={code}
        onChange={handleChange}
        placeholder="Start typing code..."
        rows="20"
        cols="80"
      />
    </div>
  );
}

export default App;
