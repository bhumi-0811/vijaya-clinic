import Hero from '../components/hero.jsx';
import PatientForm from '../components/PatientForm.jsx';

export default function Home() {
  const scrollToBooking = () => {
    const formSection = document.getElementById('booking-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Hero onBookClick={scrollToBooking} />
      <PatientForm />
    </main>
  );
}