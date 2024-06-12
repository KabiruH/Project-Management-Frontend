
import './App.css';
import Sidebar from './components/sidebar.js';
import CalendarPage from './pages/calendar.js'
import Institutions from './pages/insititutions.js'
import DashboardStatsGrid from './pages/dashboard.js'
import Footer from './components/footer.js'
import Participants from './pages/participants.js'

function App() {
  return (
    <div>
      <DashboardStatsGrid/>
       <Sidebar/>
      <CalendarPage/>
      <Institutions/>
      <Participants/>
      <Footer/>
      
 
    </div>
  );
}

export default App;
