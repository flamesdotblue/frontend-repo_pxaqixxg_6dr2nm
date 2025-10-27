import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function SplashOnboarding({ onContinue }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onContinue?.();
    }, 1500);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#E53935] flex items-center justify-center">
          <span className="text-white font-bold text-3xl">NQ</span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#111111] tracking-tight">NoQ</h1>
          <p className="text-sm text-[#111111]/70 mt-1">Appointments. Without the Wait.</p>
        </div>
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 bg-[#E53935] text-white px-5 py-3 rounded-xl text-sm font-medium"
        >
          Get Started
          <ArrowRight size={18} />
        </button>
        <div className="text-[11px] text-[#111111]/50">Fast • Reliable • Smart</div>
      </div>
    </div>
  );
}
