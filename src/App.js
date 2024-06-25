import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import CalendarPage from './pages/calendar';
import AddInstitution from './pages/institutions/addInstitutions';
import DashboardStatsGrid from './pages/dashboard';
import Footer from './components/footer';
import Participants from './pages/participants';
import Project from './pages/project';
import Helper from './pages/helpers';
import Trainings from './pages/training';
import Financial from './pages/financial';
import Partnership from './pages/partners';
import Research from './pages/research';
import SignIn from './pages/signin';
import Home from './pages/homepage';
import Navbar from './components/navbar';
import { DarkModeProvider } from './components/darkMode';
import PartnerType from './pages/partnertype';

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-grow p-5 bg-gray-100 dark:bg-gray-800 min-h-screen">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route exact path="/dashboard" element={<DashboardStatsGrid />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/institutions/addInstitutions" element={<AddInstitution />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/partnertypes" element={<PartnerType />} />
          <Route path="/project" element={<Project />} />
          <Route path="/helpers" element={<Helper />} />
          <Route path="/training" element={<Trainings />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/partnerships" element={<Partnership />} />
          <Route path="/research" element={<Research />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
