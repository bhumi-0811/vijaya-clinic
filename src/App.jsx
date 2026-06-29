import { useState } from 'react';
import { CasesProvider } from './context/CasesContext.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const [view, setView] = useState('home');

  return (
    <CasesProvider>
      <div className="min-h-screen bg-cyan-50">
        <Header
          activeView={view === 'home' ? 'patient' : 'admin'}
          onViewChange={(nextView) => {
            setView(nextView === 'patient' ? 'home' : 'admin');
          }}
        />

        {view === 'home' ? <Home /> : <Admin />}
      </div>
    </CasesProvider>
  );
}