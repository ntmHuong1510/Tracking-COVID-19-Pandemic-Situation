import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
