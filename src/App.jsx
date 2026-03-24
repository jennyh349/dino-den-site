import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import IsleHome from './pages/the-isle/IsleHome.jsx';
import Encyclopedia from './pages/the-isle/Encyclopedia.jsx';
import Timers from './pages/the-isle/Timers.jsx';
import DietFinder from './pages/the-isle/DietFinder.jsx';
import SurvivalGuide from './pages/the-isle/SurvivalGuide.jsx';
import Roster from './pages/the-isle/Roster.jsx';
import Leaderboard from './pages/the-isle/Leaderboard.jsx';
import Events from './pages/the-isle/Events.jsx';
import Tickets from './pages/the-isle/Tickets.jsx';
import Apply from './pages/the-isle/Apply.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/the-isle" element={<IsleHome />} />
          <Route path="/the-isle/encyclopedia" element={<Encyclopedia />} />
          <Route path="/the-isle/timers" element={<Timers />} />
          <Route path="/the-isle/diet" element={<DietFinder />} />
          <Route path="/the-isle/survival" element={<SurvivalGuide />} />
          <Route path="/the-isle/roster" element={<Roster />} />
          <Route path="/the-isle/leaderboard" element={<Leaderboard />} />
          <Route path="/the-isle/events" element={<Events />} />
          <Route path="/the-isle/tickets" element={<Tickets />} />
          <Route path="/the-isle/apply" element={<Apply />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
