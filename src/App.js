import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Layouts/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import ProgrammeListing from './Pages/ProgrammeListing';
import Contact from './Pages/Contact';
import VolunteerSignUp from './Pages/VolunteerSignUp/VolunteerSignUp';
import VolunteerSignIn from './Pages/VolunteerSignIn';
import VolunteerProfileFull from './Pages/VolunteerProfileFull';
import VolunteerProfileEdit from './Pages/VolunteerProfileEdit';
import AdminSignIn from './Pages/AdminSignIn';
import AdminMainPanel from './Pages/AdminMainPanel';
import AdminVolProfileEdit from './Pages/AdminVolProfileEdit';
import SignUpPageContainer from './Pages/VolunteerSignUp/VolSignUpPageContainer';
import PasswordAndUsername from './Pages/VolunteerSignUp/PasswordAndUsername';
import ProtectedRoute from './Auth/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programmes" element={<ProgrammeListing />} />
            <Route path="/contact" element={<Contact />} />
            {/* Nested Routes */}
            <Route path="/volunteers/signup" element={<SignUpPageContainer />}>
              <Route index element={<VolunteerSignUp />} />
              <Route path="password" element={<PasswordAndUsername />} />
            </Route>

            <Route path="/volunteers/signin" element={<VolunteerSignIn />} />

            <Route
              path="/volunteers/profile/:id"
              element={
                <ProtectedRoute>
                  <VolunteerProfileFull />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteers/profile/:id/edit"
              element={
                <ProtectedRoute>
                  <VolunteerProfileEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteers/programmes"
              element={<ProgrammeListing />}
            />
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/main" element={<AdminMainPanel />} />
            <Route
              path="/admin/main/editvolunteer"
              element={
                <ProtectedRoute>
                  <AdminVolProfileEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
