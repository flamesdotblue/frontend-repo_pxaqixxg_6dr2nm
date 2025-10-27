import { useState } from 'react';
import { Activity, Clock, Users, CheckCircle2, SkipForward, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [currentToken, setCurrentToken] = useState(24);
  const [waiting, setWaiting] = useState(8);

  const callNext = () => {
    setCurrentToken((t) => t + 1);
    setWaiting((w) => Math.max(0, w - 1));
  };

  const skip = () => setCurrentToken((t) => t + 1);
  const done = () => setCurrentToken((t) => t + 1);

  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAFA] p-4 gap-4">
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={Users} label="Active queues" value="3" />
        <StatCard icon={Activity} label="Avg wait" value="17m" />
        <StatCard icon={Clock} label="Now serving" value={`A-${currentToken}`} />
      </div>

      <div className="p-4 rounded-2xl bg-white border border-black/5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-[#111111]">Queue manager</div>
          <div className="text-xs text-[#111111]/60">Waiting: {waiting}</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={callNext} className="px-3 py-2 rounded-xl bg-[#E53935] text-white text-xs inline-flex items-center justify-center gap-1"><ArrowRight size={16}/> Call next</button>
          <button onClick={skip} className="px-3 py-2 rounded-xl border border-[#111111]/20 text-[#111111] text-xs inline-flex items-center justify-center gap-1"><SkipForward size={16}/> Skip</button>
          <button onClick={done} className="px-3 py-2 rounded-xl bg-[#111111] text-white text-xs inline-flex items-center justify-center gap-1"><CheckCircle2 size={16}/> Done</button>
        </div>
        <div className="mt-4">
          <div className="text-xs text-[#111111]/60 mb-2">Tokens</div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {Array.from({ length: 12 }).map((_, i) => {
              const num = currentToken + i;
              return (
                <div key={num} className={`px-3 py-2 rounded-xl text-xs border ${i === 0 ? 'bg-[#111111] text-white border-transparent' : 'bg-white text-[#111111] border-black/10'}`}>A-{num}</div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-black/5">
        <div className="text-sm font-semibold text-[#111111] mb-3">Today's appointments</div>
        <div className="space-y-2">
          {[
            { time: '09:30', name: 'Alex Johnson' },
            { time: '10:00', name: 'Priya Sharma' },
            { time: '10:30', name: 'Daniel Lee' },
          ].map((a) => (
            <div key={a.time} className="flex items-center justify-between text-sm">
              <span className="text-[#111111]/70">{a.time}</span>
              <span className="text-[#111111]">{a.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-black/5">
        <div className="text-sm font-semibold text-[#111111] mb-3">Analytics</div>
        <div className="grid grid-cols-3 gap-3">
          <ChartBar label="Customers" values={[7,9,6,11,12,8]} accent="#E53935" />
          <ChartBar label="Avg time" values={[12,14,10,18,16,13]} accent="#111111" />
          <ChartBar label="No-show %" values={[3,5,2,4,6,3]} accent="#888" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="p-3 rounded-2xl bg-white border border-black/5">
      <div className="text-[11px] text-[#111111]/60">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <Icon size={16} className="text-[#111111]" />
        <div className="text-sm font-semibold text-[#111111]">{value}</div>
      </div>
    </div>
  );
}

function ChartBar({ label, values, accent }) {
  const max = Math.max(...values, 1);
  return (
    <div>
      <div className="text-xs text-[#111111]/60 mb-1">{label}</div>
      <div className="h-24 flex items-end gap-1">
        {values.map((v, i) => (
          <div key={i} className="flex-1 bg-[#111111]/10 rounded">
            <div
              className="w-full rounded"
              style={{ height: `${(v / max) * 100}%`, backgroundColor: accent }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
