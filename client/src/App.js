import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartDiscussionDetails from './components/StartDiscussionDetails';
import Teams from './components/Teams';
import RegisterTeam from './components/RegisterTeam';
import DiscussionPage from './components/DiscussionPage';
import Matches from './components/Matches';
import CreateMatch from './components/CreateMatch';
import TossDetails from './components/TossDetails';
import MatchHandler from './components/MatchHandler';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/StartDiscussionDetails' element={<StartDiscussionDetails />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/registerTeam' element={<RegisterTeam />} />
        <Route path='/discussionPage' element={<DiscussionPage />} />
        <Route path='/matches' element={<Matches />} />
        <Route path='/createMatch' element={<CreateMatch />} />
        <Route path='/tossDetails' element={<TossDetails />} />
        <Route path='/matchHandler' element={<MatchHandler />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
