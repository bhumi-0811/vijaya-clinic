export default function MedicalVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute inset-10 rounded-[48px] bg-cyan-300/40 blur-3xl" />

      <div className="glass-panel relative h-full overflow-hidden rounded-[44px] p-8">
        <div className="absolute left-10 top-10 h-24 w-24 animate-float rounded-full cell-orb shadow-glow" />
        <div className="absolute bottom-12 right-10 h-32 w-32 animate-float rounded-full cell-orb shadow-glow" />
        <div className="absolute right-24 top-32 h-14 w-14 rounded-full bg-white/70 shadow-glow" />

        <div className="grid h-full grid-cols-2 gap-5">
          <div className="rounded-[30px] bg-white/80 p-5 shadow">
            <div className="h-4 rounded-full bg-cyan-300" />
            <div className="mt-4 h-32 rounded-3xl bg-gradient-to-br from-cyan-100 to-teal-200" />
            <div className="mt-4 h-16 rounded-2xl border border-white bg-white/70" />
          </div>

          <div className="rounded-[30px] bg-slate-950 p-5 shadow">
            <div className="h-20 w-20 rounded-full cell-orb" />
            <div className="mt-8 h-28 rounded-3xl bg-cyan-300/30" />
          </div>

          <div className="col-span-2 rounded-[30px] bg-white/80 p-6 shadow">
            <div className="flex items-end gap-4">
              <div className="h-20 flex-1 rounded-t-3xl bg-sky-200" />
              <div className="h-32 flex-1 rounded-t-3xl bg-cyan-500" />
              <div className="h-24 flex-1 rounded-t-3xl bg-teal-300" />
              <div className="h-28 flex-1 rounded-t-3xl bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}