import { Activity, LockKeyhole } from 'lucide-react';

export default function Header({ activeView, onViewChange }) {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => onViewChange('patient')}
          className="flex items-center gap-3"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Vijaya Clinics Logo"
            className="h-14 w-14 rounded-full object-contain shadow-md"
          />

          <span className="text-left">
            <span className="block text-xl font-black tracking-tight text-slate-950">
              VIJAYA CLINICS
            </span>
            <span className="block text-xs font-bold uppercase tracking-widest text-cyan-700">
              Dermatology Diagnostics
            </span>
          </span>
        </button>

        <nav className="flex gap-2 rounded-full bg-cyan-50 p-1">
          <button
            type="button"
            onClick={() => onViewChange('patient')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${activeView === 'patient'
                ? 'bg-white text-cyan-800 shadow'
                : 'text-slate-600 hover:text-cyan-800'
              }`}
          >
            <Activity size={17} />
            Patient
          </button>

          <button
            type="button"
            onClick={() => onViewChange('admin')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${activeView === 'admin'
                ? 'bg-white text-cyan-800 shadow'
                : 'text-slate-600 hover:text-cyan-800'
              }`}
          >
            <LockKeyhole size={17} />
            Doctor
          </button>
        </nav>
      </div>
    </header>
  );
}