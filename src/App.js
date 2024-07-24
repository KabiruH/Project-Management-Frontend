import './App.css';
import { AuthProvider } from './hooks/authContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AddDonor from './pages/project/donors';
import AddProject from './pages/project/project';
import AddProjectStatus from './pages/project/projectStatus';
import AddTestimonial from './pages/project/testimonials';
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
import UsersReport from './pages/Reports/UsersReport';
import { DarkModeProvider } from './components/darkMode';
import ProtectedRoute from './services/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute element={DashboardStatsGrid} />} />
          <Route path="/calendar" element={<ProtectedRoute element={CalendarPage}/>} />
          <Route path="/institutions/addInstitutions" element={<ProtectedRoute element={AddInstitution} />} />
          <Route path="/institutions/addCounties" element={<ProtectedRoute element={AddCounty} />} />
          <Route path='/institutions/institutionStages' element={<ProtectedRoute element={AddStages} />} />
          <Route path='/institutions/institutionStatus' element={<ProtectedRoute element={AddStatus} />} />
          <Route path="/participants/participant" element={<ProtectedRoute element={AddParticipant} />} />
          <Route path="/participants/participantLevels" element={<ProtectedRoute element={AddLevels} />} />
          <Route path="/helpers/helper" element={<ProtectedRoute element={AddHelper} />} />
          <Route path="/helpers/helperType" element={<ProtectedRoute element={AddHelperTypes} />} />
          <Route path="/partnership/partnership" element={<ProtectedRoute element={AddPartnership} />} />
          <Route path="/partnership/partnertype" element={<ProtectedRoute element={AddPartnerTypes} />} />
          <Route path="/project/project" element={<ProtectedRoute element={AddProject} />} />
          <Route path="/project/projectstatus" element={<ProtectedRoute element={AddProjectStatus} />} />
          <Route path="/project/donors" element={<ProtectedRoute element={AddDonor} />} />
          <Route path="/project/testimonials" element={<ProtectedRoute element={AddTestimonial} />} />
          <Route path="/program/program" element={<ProtectedRoute element={AddProgram} />} />
          <Route path="/financials/budget" element={<ProtectedRoute element={AddBudget} />} />
          <Route path="/financials/fundingtype" element={<ProtectedRoute element={AddFundingType} />} />
          <Route path="/training/training" element={<ProtectedRoute element={AddTraining} />} />
          <Route path="/training/trainingType" element={<ProtectedRoute element={AddTrainingType} />} />
          <Route path="/training/trainingLevel" element={<ProtectedRoute element={AddTrainingLevel} />} />
          <Route path="/training/trainingCategory" element={<ProtectedRoute element={AddTrainingCategory} />} />
          {/* reports */}
          <Route path="/reports/users" element={<ProtectedRoute element={UsersReport} />} />

          {/* reports end */}
          <Route path="/research/feedback" element={<ProtectedRoute element={AddFeedback} />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
