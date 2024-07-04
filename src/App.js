import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import CalendarPage from './pages/calendar';
import AddInstitution from './pages/institutions/addInstitutions';
import AddCounty from './pages/institutions/addCounties';
import AddStatus from './pages/institutions/institutionStatus';
import AddStages from './pages/institutions/institutionStages';
import AddParticipant from './pages/participants/participant';
import AddLevels from './pages/participants/participantLevels';
import AddHelper from './pages/helpers/helper';
import AddHelperTypes from './pages/helpers/helperType';
import DashboardStatsGrid from './pages/dashboard';
import Footer from './components/footer';
import AddDonor from './pages/project/donors';
import AddProject from './pages/project/project';
import AddProjectStatus from './pages/project/projectStatus';
import AddTestimonial from './project/testimonials';
import AddProgram from './pages/program/program';
import AddTraining from './pages/training/training';
import AddTrainingType from './pages/training/trainingType';
import AddTrainingLevel from './pages/training/trainingLevel';
import AddTrainingCategory from './pages/training/trainingCategory';
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
          <Route path="/project/project" element={<AddProject />} />
          <Route path="/project/projectstatus" element={<AddProjectStatus />} />
          <Route path="/project/donors" element={<AddDonor />} />
          <Route path="/project/testimonials" element={<AddTestimonial />} />
          <Route path="/program/program" element={<AddProgram />} />
          <Route path="/financials/budget" element={<AddBudget />} />
          <Route path="/financials/fundingtype" element={<AddFundingType />} />
          <Route path="/training/training" element={<AddTraining />} />
          <Route path="/training/trainingType" element={<AddTrainingType />} />
          <Route path="/training/trainingLevel" element={<AddTrainingLevel />} />
          <Route path="/training/trainingCategory" element={<AddTrainingCategory />} />
          <Route path="/research/feedback" element={<AddFeedback />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
