import { useState } from 'react';
import { Home, Calendar, User, Activity, Search, MapPin, Star, Clock, Bell, QrCode, ArrowRight } from 'lucide-react';

const theme = {
  red: '#E53935',
  black: '#111111',
};

function CategoryChip({ label, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111111]/5">
      <Icon size={16} className="text-[#111111]" />
      <span className="text-xs text-[#111111]">{label}</span>
    </div>
  );
}

function ProviderCard({ name, distance, rating, onJoin, onBook }) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-black/5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="">
          <div className="text-sm font-semibold text-[#111111]">{name}</div>
          <div className="text-xs text-[#111111]/60 flex items-center gap-1"><MapPin size={14} /> {distance} km • <Star size={14} className="text-yellow-500"/> {rating}
          </div>
        </div>
        <div className="text-[11px] text-[#111111]/60">Open • 9:00–20:00</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={onJoin} className="px-3 py-2 rounded-xl border border-[#E53935] text-[#E53935] text-xs font-medium">Join Queue</button>
        <button onClick={onBook} className="px-3 py-2 rounded-xl bg-[#E53935] text-white text-xs font-medium">Book Appointment</button>
      </div>
    </div>
  );
}

function QueueTracker({ token = 'A-17', position = 5, eta = '18 min' }) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-black/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#E53935] text-white flex flex-col items-center justify-center">
          <div className="text-[10px] opacity-80">Token</div>
          <div className="text-sm font-semibold">{token}</div>
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-[#111111]">Your position: {position}</div>
          <div className="text-xs text-[#111111]/60 flex items-center gap-1"><Clock size={14}/> ETA {eta}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <QrCode size={22} className="text-[#111111]"/>
        <button className="px-3 py-2 rounded-xl bg-[#111111] text-white text-xs">Notify me</button>
      </div>
    </div>
  );
}

function TabBar({ current, onChange }) {
  const tabs = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'queue', label: 'Queue', icon: Activity },
    { key: 'bookings', label: 'Bookings', icon: Calendar },
    { key: 'profile', label: 'Profile', icon: User },
  ];
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-black/5">
      <div className="grid grid-cols-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`flex flex-col items-center justify-center gap-1 py-3 ${current === t.key ? 'text-[#E53935]' : 'text-[#111111]/60'}`}
          >
            <t.icon size={20} />
            <span className="text-[11px]">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function UserApp() {
  const [tab, setTab] = useState('home');

  return (
    <div className="w-full h-full flex flex-col bg-[#FAFAFA]">
      <div className="flex-1 overflow-y-auto p-4 pt-2">
        {tab === 'home' && (
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                placeholder="Search hospitals, salons, diagnostics"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-black/5 text-sm outline-none"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111111]/60" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <CategoryChip label="Hospitals" icon={Activity} />
              <CategoryChip label="Salons" icon={User} />
              <CategoryChip label="Diagnostics" icon={Calendar} />
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#111111]">Nearby providers</h3>
                <button className="text-xs text-[#E53935]">View all</button>
              </div>
              <div className="flex flex-col gap-3">
                <ProviderCard name="CityCare Hospital" distance={1.2} rating={4.6} onJoin={()=>setTab('queue')} onBook={()=>setTab('bookings')} />
                <ProviderCard name="Glow Salon" distance={0.8} rating={4.8} onJoin={()=>setTab('queue')} onBook={()=>setTab('bookings')} />
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-sm font-semibold text-[#111111] mb-2">Active booking</h3>
              <QueueTracker />
            </div>
          </div>
        )}

        {tab === 'queue' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[#111111]">Queue tracker</h2>
            <QueueTracker />
            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <div className="text-sm font-medium text-[#111111] mb-2">Live updates</div>
              <ul className="space-y-2 text-xs text-[#111111]/70">
                <li>• 2 customers served in the last 5 minutes</li>
                <li>• Average wait time trending down</li>
                <li>• You will receive a notification when next</li>
              </ul>
              <button className="mt-3 inline-flex items-center gap-2 text-[#E53935] text-xs font-medium">Notification settings <ArrowRight size={16}/></button>
            </div>
          </div>
        )}

        {tab === 'bookings' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[#111111]">My bookings</h2>
            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#111111]">Consultation • CityCare</div>
                  <div className="text-xs text-[#111111]/60 flex items-center gap-1"><Calendar size={14}/> Today, 4:30 PM</div>
                </div>
                <button className="px-3 py-2 rounded-xl bg-[#E53935] text-white text-xs">Reschedule</button>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#111111]">Haircut • Glow Salon</div>
                  <div className="text-xs text-[#111111]/60 flex items-center gap-1"><Calendar size={14}/> Thu, 11:00 AM</div>
                </div>
                <button className="px-3 py-2 rounded-xl border border-[#111111]/20 text-[#111111] text-xs">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-white border border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center">U</div>
                <div>
                  <div className="text-sm font-semibold text-[#111111]">Alex Johnson</div>
                  <div className="text-xs text-[#111111]/60">alex@example.com</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#111111]">Saved places</div>
                <button className="text-xs text-[#E53935]">Manage</button>
              </div>
              <div className="text-xs text-[#111111]/60">• Home • Work</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[#111111]"><Bell size={16}/> Notifications</div>
              <span className="text-xs text-[#111111]/60">Enabled</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[#111111]"><SettingsIcon/> Settings</div>
              <ArrowRight size={18} className="text-[#111111]/60"/>
            </div>
          </div>
        )}
      </div>
      <TabBar current={tab} onChange={setTab} />
    </div>
  );
}

function SettingsIcon() {
  // minimal inline icon if lucide Settings is already imported elsewhere
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#111111]"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 3.7l.06.06c.5.5 1.23.65 1.88.39.6-.23 1.02-.8 1.02-1.46V3a2 2 0 1 1 4 0v.09c0 .66.41 1.23 1.02 1.46.65.26 1.38.11 1.88-.39l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.5.5-.65 1.23-.39 1.88.23.6.8 1.02 1.46 1.02H21a2 2 0 1 1 0 4h-.09c-.66 0-1.23.41-1.46 1.02Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
