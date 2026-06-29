import { CheckCircle2, ClipboardList, Clock3, LogOut, Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCases } from '../context/CasesContext.jsx';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));

export default function AdminDashboard({ onLogout }) {
  const { cases, metrics, updateCase } = useCases();
  const [selectedId, setSelectedId] = useState(cases[0]?.id || '');

  const selected = useMemo(() => {
    return cases.find((item) => item.id === selectedId) || cases[0];
  }, [cases, selectedId]);

  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (!selectedId && cases[0]) setSelectedId(cases[0].id);
  }, [cases, selectedId]);

  useEffect(() => {
    setRemarks(selected?.remarks || '');
  }, [selected]);

  const saveRemarks = () => {
    if (!selected) return;
    updateCase(selected.id, { remarks });
  };

  const markReviewed = () => {
    if (!selected) return;
    updateCase(selected.id, { remarks, status: 'Reviewed' });
  };

  return (
    <section className="min-h-[calc(100vh-78px)] bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-black uppercase tracking-widest text-cyan-700">
              Dermatologist Admin Panel
            </p>
            <h2 className="mt-2 text-4xl font-black text-slate-950">Diagnostic Case Manager</h2>
          </div>

          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-black shadow"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Metric icon={<ClipboardList />} label="Total Cases" value={metrics.total} />
          <Metric icon={<Clock3 />} label="Pending Reviews" value={metrics.pending} />
          <Metric icon={<CheckCircle2 />} label="Completed Diagnostics" value={metrics.completed} />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-clinical">
            <h3 className="text-xl font-black">Patient Cases</h3>

            {cases.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-cyan-50 p-6 font-bold text-slate-600">
                No submitted cases yet.
              </p>
            ) : (
              <div className="mt-5 grid gap-3">
                {cases.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`rounded-2xl p-4 text-left transition ${
                      selected?.id === item.id ? 'bg-cyan-100' : 'bg-slate-50 hover:bg-cyan-50'
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <strong>{item.fullName}</strong>
                      <Status status={item.status} />
                    </div>
                    <p className="mt-1 font-semibold text-slate-600">{item.concern}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-400">
                      {formatDate(item.submittedAt)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[28px] bg-white p-6 shadow-clinical">
            {!selected ? (
              <p className="font-bold text-slate-500">Select a case to review.</p>
            ) : (
              <>
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black">{selected.fullName}</h3>
                    <p className="font-semibold text-slate-500">{selected.contact}</p>
                  </div>
                  <Status status={selected.status} />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Info label="Concern" value={selected.concern} />
                  <Info label="Submitted" value={formatDate(selected.submittedAt)} />
                </div>

                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Patient Description
                  </p>
                  <p className="mt-2 whitespace-pre-wrap font-semibold leading-7 text-slate-700">
                    {selected.description}
                  </p>
                </div>

                <img
                  src={selected.imageData}
                  alt="Uploaded skin concern"
                  className="mt-5 h-72 w-full rounded-[26px] object-cover shadow"
                />

                <textarea
                  className="mt-5 min-h-36 w-full rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100"
                  placeholder="Prescription / Doctor's Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={saveRemarks}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-200 px-5 py-4 font-black text-cyan-800"
                  >
                    <Save size={19} />
                    Save Remarks
                  </button>

                  <button
                    onClick={markReviewed}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-4 font-black text-white shadow-glow"
                  >
                    <CheckCircle2 size={19} />
                    Mark Reviewed
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="rounded-[26px] bg-white p-6 shadow-clinical">
      <div className="flex items-center justify-between">
        <div className="text-cyan-700">{icon}</div>
        <span className="text-4xl font-black">{value}</span>
      </div>
      <p className="mt-4 font-black uppercase tracking-widest text-slate-500">{label}</p>
    </div>
  );
}

function Status({ status }) {
  const reviewed = status === 'Reviewed';

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black ${
        reviewed ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
      }`}
    >
      {reviewed ? 'Reviewed' : 'Pending'}
    </span>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-cyan-50 p-4">
      <p className="text-xs font-black uppercase tracking-widest text-cyan-700">{label}</p>
      <p className="mt-1 font-black text-slate-900">{value}</p>
    </div>
  );
}