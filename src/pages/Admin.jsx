import { useState } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';

export default function Admin() {
  const [doctorLoggedIn, setDoctorLoggedIn] = useState(false);

  return doctorLoggedIn ? (
    <AdminDashboard onLogout={() => setDoctorLoggedIn(false)} />
  ) : (
    <AdminLogin onLogin={() => setDoctorLoggedIn(true)} />
  );
}