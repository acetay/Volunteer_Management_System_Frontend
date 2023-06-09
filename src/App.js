import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './Layouts/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import ProgrammeListing from './Pages/ProgrammeListing';
import Donate from './Pages/Donate';
import VolunteerSignUp from './Pages/Volunteer/VolunteerSignUp';
import VolunteerSignIn from './Pages/Volunteer/VolunteerSignIn';
import VolunteerProfileFull from './Pages/Volunteer/VolunteerProfileFull';
import VolunteerProfileEdit from './Pages/Volunteer/VolunteerProfileEdit';
import AdminSignIn from './Pages/Admin/AdminSignIn';
import AdminMainPanel from './Pages/Admin/AdminMainPanel';
import AdminVolunteerManagement from './Pages/Admin/AdminVolunterMgt';
import SignUpPageContainer from './Pages/Volunteer/VolSignUpPageContainer';
import PasswordAndUsername from './Pages/Volunteer/PasswordAndUsername';
import ResetPassword from './Pages/Volunteer/ResetPassword';
import ProtectedRoute from './AuthRoutes/ProtectedRoute';
import ProtectedRouteAdmin from './AuthRoutes/ProtectedRouteAdmin';
import Volunteer from './Components/AdminVolunteerAndProgMgt_Components/Volunteer';
import VolunteerEdit from './Components/AdminVolunteerAndProgMgt_Components/VolunteerEdit';
import VolunteerProgramsSelect from './Components/AdminVolunteerAndProgMgt_Components/VolunteerProgramSelect';
import AdminPrograms from './Pages/Admin/AdminPrograms';
import ProgramKickstarter from './Pages/Admin/ProgramKickstarter';
import NotFound from './Pages/NotFound';
import AdminProgramEditPage from './Pages/Admin/AdminProgramEditPage';
import AdminProgramInfoPage from './Pages/Admin/AdminProgramInfoPage';
import NotAuthourised from './Pages/NotAuthorised';

import EmailTest from './Pages/emailtest';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programmes" element={<ProgrammeListing />} />
            <Route path="/donate" element={<Donate />} />
            {/* Nested Routes */}
            <Route path="/volunteers/signup" element={<SignUpPageContainer />}>
              <Route index element={<VolunteerSignUp />} />
              <Route path="password" element={<PasswordAndUsername />} />
            </Route>

            <Route path="/volunteers/signin" element={<VolunteerSignIn />} />
            <Route
              path="/volunteers/passwordreset/:id"
              element={<ResetPassword />}
            />
            <Route path="/notauth" element={<NotAuthourised />} />

            <Route path="/emailtest" element={<EmailTest />} />

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

            <Route
              path="/admin/main/editvolunteer"
              element={
                <ProtectedRouteAdmin>
                  <AdminVolunteerManagement />
                </ProtectedRouteAdmin>
              }
            />
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route
              path="/admin/main"
              element={
                <ProtectedRouteAdmin>
                  <AdminMainPanel />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/admin/programs"
              element={
                <ProtectedRoute>
                  <AdminPrograms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/programs/:id"
              element={
                <ProtectedRoute>
                  <AdminProgramInfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/programs/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminProgramEditPage />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/singlevolunteer/:id" element={<Volunteer />} />
            <Route
              path="/admin/programkickstarter"
              element={
                <ProtectedRoute>
                  <ProgramKickstarter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/singlevolunteer/:id/programselect/:date/:timeslot/:name"
              element={
                <ProtectedRoute>
                  <VolunteerProgramsSelect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/singlevolunteer/edit/:id"
              element={
                <ProtectedRoute>
                  <VolunteerEdit />
                </ProtectedRoute>
              }
            />

            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
