import "./App.css";
import Clients from "./components/Clients/Clients";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/clients" element={<Clients />}></Route>
      </Routes>
    </div>
  );
}

export default App;
