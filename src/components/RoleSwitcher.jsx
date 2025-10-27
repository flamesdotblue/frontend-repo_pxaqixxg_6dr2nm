import { User, Settings } from 'lucide-react';

export default function RoleSwitcher({ role, onChange }) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-[#E53935] text-white flex items-center justify-center text-sm font-semibold">NQ</div>
        <div className="leading-tight">
          <div className="text-xs text-[#111111]/60">Welcome to</div>
          <div className="text-sm font-semibold text-[#111111]">NoQ</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs ${role === 'user' ? 'text-[#111111]' : 'text-[#111111]/50'}`}>User</span>
        <button
          onClick={() => onChange(role === 'user' ? 'admin' : 'user')}
          className="relative inline-flex h-8 w-14 items-center rounded-full bg-[#111111]"
          aria-label="Toggle role"
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
              role === 'admin' ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-xs ${role === 'admin' ? 'text-[#111111]' : 'text-[#111111]/50'}`}>Admin</span>
        <Settings size={18} className="text-[#111111]/60" />
      </div>
    </div>
  );
}
