import { useState } from 'react';
import { ImageUp, Send } from 'lucide-react';
import { useCases } from '../context/CasesContext.jsx';

const initialForm = {
  fullName: '',
  contact: '',
  concern: '',
  description: '',
  imageName: '',
  imageData: '',
};

export default function PatientForm() {
  const { addCase } = useCases();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        imageName: file.name,
        imageData: reader.result,
      }));

      setMessage('');
    };

    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();

    if (
      !form.fullName ||
      !form.contact ||
      !form.concern ||
      !form.description ||
      !form.imageData
    ) {
      setMessage('Please fill all fields and upload a skin image.');
      return;
    }

    const saved = addCase(form);

    setForm(initialForm);
    event.currentTarget.reset();
    setMessage(`Case submitted for ${saved.fullName}. Doctor can review it now.`);
  };

  return (
    <section id="booking-form" className="bg-white px-4 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] bg-slate-950 p-8 text-white shadow-clinical">
          <h2 className="text-4xl font-black">Diagnostic Consultation Intake</h2>

          <p className="mt-4 leading-7 text-cyan-50/80">
            Submit your concern, contact details, and a clear skin image. The case instantly
            appears in the dermatologist admin dashboard.
          </p>

          <div className="mt-8 grid gap-4">
            {['Clinical intake', 'Skin image upload', 'Doctor review'].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 font-black text-slate-950">
                  {index + 1}
                </span>
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="glass-panel rounded-[30px] p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="text"
              className="h-12 rounded-2xl border border-cyan-100 px-4 outline-none focus:ring-4 focus:ring-cyan-100"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(event) => update('fullName', event.target.value)}
            />

            <input
              type="text"
              className="h-12 rounded-2xl border border-cyan-100 px-4 outline-none focus:ring-4 focus:ring-cyan-100"
              placeholder="Phone or Email"
              value={form.contact}
              onChange={(event) => update('contact', event.target.value)}
            />
          </div>

          <input
            type="text"
            className="mt-5 h-12 w-full rounded-2xl border border-cyan-100 px-4 outline-none focus:ring-4 focus:ring-cyan-100"
            placeholder="Skin Concern: Acne, Mole, Rash, Pigmentation"
            value={form.concern}
            onChange={(event) => update('concern', event.target.value)}
          />

          <textarea
            className="mt-5 min-h-32 w-full rounded-2xl border border-cyan-100 px-4 py-3 outline-none focus:ring-4 focus:ring-cyan-100"
            placeholder="Describe symptoms, duration, itching, pain, color change, or medication history."
            value={form.description}
            onChange={(event) => update('description', event.target.value)}
          />

          <label className="mt-5 flex cursor-pointer flex-col items-center rounded-[26px] border-2 border-dashed border-cyan-200 bg-cyan-50 p-6 text-center">
            <ImageUp className="text-cyan-700" size={32} />

            <span className="mt-3 font-black text-slate-800">
              {form.imageName || 'Upload skin image'}
            </span>

            <span className="text-sm font-semibold text-slate-500">PNG, JPG, WebP</span>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="sr-only"
            />
          </label>

          {form.imageData && (
            <img
              src={form.imageData}
              alt="Uploaded skin concern"
              className="mt-5 h-56 w-full rounded-[24px] object-cover shadow"
            />
          )}

          {message && (
            <p className="mt-5 rounded-2xl bg-cyan-50 px-4 py-3 font-bold text-cyan-800">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-700 px-5 py-4 font-black text-white shadow-glow hover:bg-cyan-800"
          >
            <Send size={19} />
            Submit Diagnostic Case
          </button>
        </form>
      </div>
    </section>
  );
}