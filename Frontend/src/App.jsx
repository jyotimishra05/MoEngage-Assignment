import React from "react";
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Search from "./components/Search";
import BreweryDetail from "./components/BreweryDetail";


const App = () => {
  // const [token, setToken] = useState(null);

  return (
    <Router>
      <h1 className="flex justify-center bg-gray-100 p-4 font-extrabold text-2xl md:text-4xl">
        Bewery Review System
      </h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/breweries/:id" element={<BreweryDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
