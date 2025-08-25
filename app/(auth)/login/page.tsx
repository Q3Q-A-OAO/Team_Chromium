import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../../lib/roles';
import Button from '../../../components/ui/Button';
import { Rocket, School, User } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    // In a real app, you'd perform authentication here.
    // For this skeleton, we'll just set the role in localStorage.
    localStorage.setItem('userRole', role);
    window.dispatchEvent(new Event("storage")); // Notify App.tsx of role change
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="aurora flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="relative w-full max-w-md space-y-8 rounded-lg bg-surface p-8 shadow-soft ring-1 ring-[var(--ring)]">
            <div className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blue-500)]/10 ring-1 ring-[var(--ring)]">
                    <Rocket className="h-6 w-6 text-[var(--blue-500)]" />
                </div>
                <h1 className="h1 mt-4 text-text">Welcome to MoneyQuest</h1>
                <p className="small mt-2">Choose your role to begin your adventure.</p>
            </div>
            <div className="space-y-4">
                <div className="rounded-md">
                    <input id="email" type="email" placeholder="Email address (optional)" className="w-full rounded-md bg-muted p-3 text-sm placeholder-subtext ring-1 ring-inset ring-transparent focus:ring-[var(--blue-500)] focus:bg-surface focus:outline-none" />
                </div>
                <div className="rounded-md">
                    <input id="password" type="password" placeholder="Password (optional)" className="w-full rounded-md bg-muted p-3 text-sm placeholder-subtext ring-1 ring-inset ring-transparent focus:ring-[var(--blue-500)] focus:bg-surface focus:outline-none" />
                </div>
            </div>
            <div className="flex flex-col space-y-4">
                <Button onClick={() => handleLogin(Role.STUDENT)} variant="primary" className="flex w-full items-center justify-center gap-2">
                    <User size={16} /> Sign in as Student
                </Button>
                <Button onClick={() => handleLogin(Role.TEACHER)} variant="outline" className="flex w-full items-center justify-center gap-2">
                    <School size={16} /> Sign in as Teacher
                </Button>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;