import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/home";
import { io } from "socket.io-client";

const App = () => {
  const IO = io("http://localhost:3002");

  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
