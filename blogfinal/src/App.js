import "./App.css";
import DisplayPosts from "./components/DisplayPosts";
import Createpost from "./components/CreatePost";

function App() {
  return (
    <div className="App">
      <Createpost />
      <DisplayPosts />
    </div>
  );
}

export default App;
