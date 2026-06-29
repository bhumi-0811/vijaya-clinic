import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();

    if (password === 'derma123') {
      setError('');
      onLogin();
      return;
    }

    setError('Incorrect password. Demo password: derma123');
  };

  return (
    <section className="min-h-[calc(100vh-78px)] bg-gradient-to-br from-white via-cyan-50 to-teal-50 px-4 py-16">
      <form onSubmit={submit} className="mx-auto max-w-md rounded-[30px] bg-white p-8 shadow-clinical">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-cyan-300">
          <LockKeyhole size={28} />
        </div>

        <h2 className="mt-6 text-3xl font-black text-slate-950">Doctor Access</h2>
        <p className="mt-3 text-slate-600">Enter password to open the dermatologist dashboard.</p>

        <input
          type="password"
          className="mt-6 h-12 w-full rounded-2xl border border-cyan-100 bg-cyan-50 px-4 outline-none focus:ring-4 focus:ring-cyan-100"
          placeholder="derma123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mt-3 font-bold text-red-600">{error}</p>}

        <button className="mt-5 w-full rounded-2xl bg-slate-950 px-5 py-4 font-black text-white hover:bg-cyan-800">
          Open Dashboard
        </button>
      </form>
    </section>
  );
}