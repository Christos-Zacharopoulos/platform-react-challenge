import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Home with cat modal */}
        <Route path="/cat/:catId" element={<Home />} />
        <Route path="/breeds" element={<Breeds />} />
        {/* Breeds with breed modal */}
        <Route path="/breeds/:breedId" element={<Breeds />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
