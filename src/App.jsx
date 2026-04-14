import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="min-h-screen bg-white font-roboto">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;