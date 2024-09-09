import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Breeds from "./pages/Breeds";
import Favorites from "./pages/Favorites";
import { routing } from "./config/routing";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path={routing.home()} element={<Home />} />
          {/* Home with cat modal */}
          <Route path={routing.cat()} element={<Home />} />
          <Route path={routing.breeds()} element={<Breeds />} />
          {/* Breeds with breed modal */}
          <Route path={routing.breed()} element={<Breeds />} />
          <Route path={routing.favorites()} element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
