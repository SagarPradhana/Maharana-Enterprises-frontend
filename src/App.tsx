import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import './styles/global.scss';
import Lenis from '@studio-freight/lenis';

function App() {
  useEffect(() => {
    // @ts-ignore
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="app-container min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
      <AppRoutes />
    </div>
  );
}

export default App;
