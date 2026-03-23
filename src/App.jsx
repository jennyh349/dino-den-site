import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Encyclopedia from './pages/Encyclopedia.jsx';
import Timers from './pages/Timers.jsx';
import DietFinder from './pages/DietFinder.jsx';
import SurvivalGuide from './pages/SurvivalGuide.jsx';
import Roster from './pages/Roster.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Events from './pages/Events.jsx';
import Tickets from './pages/Tickets.jsx';
import Apply from './pages/Apply.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/timers" element={<Timers />} />
          <Route path="/diet" element={<DietFinder />} />
          <Route path="/survival" element={<SurvivalGuide />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/apply" element={<Apply />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
