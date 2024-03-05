import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import './index.css'


function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signup />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

      

    </>
  );
}

export default App;
