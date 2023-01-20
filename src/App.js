import './App.css';
import {Route,Routes} from "react-router-dom";
import EditResume from "./EditResume";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/editResume" element={<EditResume/>}/>
      </Routes>
    </div>
  );
}

export default App;
