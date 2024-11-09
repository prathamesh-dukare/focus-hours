import "./App.css";
import { useEffect, useState } from "react";
import Block from "./components/Block";
import Redirect from "./components/Redirect";
import ToggleMode from "./components/ToggleMode";

const App = () => {
  const [isFocusModeOn, setIsFocusModeOn] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="app main_app">
      <h2 className="app__heading">Focus Hours</h2>
      <ToggleMode />
      <Block />
      <Redirect />
      <p className="app__footer">version 1.0</p>
    </div>
  );
};

export default App;
