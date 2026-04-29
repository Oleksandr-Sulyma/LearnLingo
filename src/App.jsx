import { Routes, Route, Link } from 'react-router-dom';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import Favorites from './pages/Favorites';

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white font-roboto">
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#121417',
            borderRadius: '12px',
            border: '1px solid rgba(18, 20, 23, 0.1)',
          },
        }} 
      />
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