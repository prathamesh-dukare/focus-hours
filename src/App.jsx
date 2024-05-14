import "./app.css";
import Block from "./components/Block";
import Redirect from "./components/Redirect";

const App = () => {
  return (
    <div className="app">
      <h2 className="app__heading">Focus Hours</h2>
      <Block />
      <Redirect />
      <p className="app__footer">version 1.0</p>
    </div>
  );
};

export default App;
