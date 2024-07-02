import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import CalendarPage from './pages/calendar';
import AddInstitution from './pages/institutions/addInstitutions';
import AddCounty from './pages/institutions/addCounties';
import AddStatus from './pages/institutions/institutionstatus';
import AddStages from './pages/institutions/institutionstages';
import AddParticipant from './pages/participants/participant';
import AddLevels from './pages/participants/participantLevels';
import AddHelper from './pages/helpers/helper';
import AddHelperTypes from './pages/helpers/helperType';
import DashboardStatsGrid from './pages/dashboard';
import Footer from './components/footer';
import Project from './pages/project/project';
import ProjectStatus from './pages/project/projectStatus'
import Trainings from './pages/training';
import AddBudget from './pages/financials/budget';
import AddFundingType from './pages/financials/fundingtype';
import AddPartnership from './pages/partnership/partnership';
import AddPartnerTypes from './pages/partnership/partnertype';
import AddFeedback from './pages/research/feedback';
import SignIn from './pages/signin';
import Signup from './pages/signup'
import Home from './pages/homepage';
import Navbar from './components/navbar';
import { DarkModeProvider } from './components/darkMode';

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
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<DashboardStatsGrid />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/institutions/addInstitutions" element={<AddInstitution />} />
          <Route path="/institutions/addCounties" element={<AddCounty />} />
          <Route path='/institutions/institutionStages' element={<AddStages />} />
          <Route path='/institutions/institutionStatus' element={<AddStatus />} />
          <Route path="/participants/participant" element={<AddParticipant />} />
          <Route path="/participants/participantLevels" element={<AddLevels />} />
          <Route path="/helpers/helper" element={<AddHelper />} />
          <Route path="/helpers/helperType" element={<AddHelperTypes />} />
          <Route path="/partnership/partnership" element={<AddPartnership />} />
          <Route path="/partnership/partnertype" element={<AddPartnerTypes />} />
          <Route path="/project" element={<Project />} />
          <Route path="/financials/budget" element={<AddBudget />} />
          <Route path="/financials/fundingtype" element={<AddFundingType />} />
          <Route path="/training" element={<Trainings />} />
          <Route path="/research/feedback" element={<AddFeedback />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
