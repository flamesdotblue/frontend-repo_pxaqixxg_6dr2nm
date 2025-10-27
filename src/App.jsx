import { useState } from 'react';
import SplashOnboarding from './components/SplashOnboarding';
import RoleSwitcher from './components/RoleSwitcher';
import UserApp from './components/UserApp';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [role, setRole] = useState('user');

  return (
    <div className="min-h-screen w-full bg-white text-[#111111] flex items-center justify-center">
      <div className="w-full max-w-md h-[780px] max-h-[92vh] bg-white rounded-3xl border border-black/5 overflow-hidden shadow-[0_1px_0_#0000000f]">
        {showSplash ? (
          <SplashOnboarding onContinue={() => setShowSplash(false)} />
        ) : (
          <div className="flex flex-col h-full">
            <RoleSwitcher role={role} onChange={setRole} />
            <div className="flex-1 overflow-hidden">
              {role === 'user' ? <UserApp /> : <AdminDashboard />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
