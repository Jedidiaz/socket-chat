import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
