import { CalendarCheck, ShieldCheck } from 'lucide-react';
import MedicalVisual from './MedicalVisual.jsx';

export default function Hero({ onBookClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-teal-50 px-4 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-cyan-800 shadow">
            Advanced Dermatology Intake
          </p>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-950 md:text-7xl">
            Precision skin diagnostics for modern dermatology.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Patients can submit symptoms and skin images, while the dermatologist reviews,
            writes remarks, and updates diagnostic status from a secure admin panel.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-700 px-6 py-4 font-black text-white shadow-glow hover:bg-cyan-800"
            >
              <CalendarCheck size={20} />
              Book Diagnostic Consultation
            </button>

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-4 font-bold text-slate-700 shadow">
              <ShieldCheck size={20} className="text-teal-600" />
              Local private case storage
            </span>
          </div>
        </div>

        <MedicalVisual />
      </div>
    </section>
  );
}