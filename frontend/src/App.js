import Legend from "./components/Legend";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";
import React, { useState, useEffect } from "react";
import { GridProvider } from "./contexts/GridContext";
import Popup from "./components/Modal";

export default function App() {
  const [timedPopup, setTimedPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);
  return (
    <GridProvider>
      {/* <Popup trigger={timedPopup} setTrigger={setTimedPopup} /> */}
      <NavBar />
      <Legend />
      <Grid />
    </GridProvider>
  );
}
