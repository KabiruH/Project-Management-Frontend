import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar.js';
import CalendarPage from './pages/calendar.js';
import Institutions from './pages/insititutions.js';
import DashboardStatsGrid from './pages/dashboard.js';
import Footer from './components/footer.js';
import Participants from './pages/participants.js';
import Project from './pages/project.js';
import Helper from './pages/helpers.js';
import Trainings from './pages/training.js';
import Financial from './pages/financial.js';
import Partnership from './pages/partnerships.js';
import Research from './pages/research.js';
import SignIn from './pages/signin.js';
import Home from './pages/homepage.js';
import Navbar from './components/navbar.js';
import { DarkModeProvider } from './components/darkMode.js';

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
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/participants" element={<Participants />} />
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
