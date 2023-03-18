import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import About from './Pages/About';
import VolunteerSignUp from './Pages/VolunteerSignUp';
import VolunteerSignIn from './Pages/VolunteerSignIn';
import VolunteerProfileFull from './Pages/VolunteerProfileFull';
import VolunteerProfileEdit from './Pages/VolunteerProfileEdit';
import AdminSignIn from './Pages/AdminSignIn';
import AdminMainPanel from './Pages/AdminMainPanel';
import AdminVolProfileEdit from './Pages/AdminVolProfileEdit';
import ProgrammeListing from './Pages/ProgrammeListing';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Routes>
      </Router>
    </>
  );
}

export default App;
