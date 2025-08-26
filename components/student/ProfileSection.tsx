import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { demoStudent, demoPrefs, progressSummaryData, demoJournalTop3 } from '../../lib/demoData';
import MascotSticker from './MascotSticker';
import { Camera, Users } from 'lucide-react';

// Util for GBP currency formatting
const formatGBP = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount);
};

const ProfileSection = () => {
    // TODO: swap chip badges for square image badges when assets are ready

    // Determine mascot state based on demo data
    // TODO: add threshold map for celebrations: [£10, £50, £100, £250].
    const moneySavedHigh = demoStudent.moneySaved >= 100;
    const hasRecentFail = demoJournalTop3.some(e => e.result === 'Fail' && e.ts.startsWith('Today'));
    const hasGoodStreak = progressSummaryData.currentStreak >= 7;

    let mascotState: 'default' | 'celebrate' | 'streak' | 'encourage' = 'default';
    if (moneySavedHigh) {
        mascotState = 'celebrate';
    } else if (hasRecentFail) {
        mascotState = 'encourage';
    } else if (hasGoodStreak) {
        mascotState = 'streak';
    }

    return (
        <Card className="p-4 md:p-6 h-full flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            
            <div className="flex items-center gap-4 mb-6">
                <button className="relative group flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                    <img
                        src={demoPrefs.avatarUrl}
                        alt="Student Avatar"
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-surface shadow-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                        <Camera size={24} />
                        <span className="text-xs font-semibold mt-1">Change</span>
                    </div>
                </button>
                
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-text">{demoStudent.name}</h2>
                    <p className="small mt-1">
                        {demoStudent.year} &bull; {demoStudent.school} &bull; {demoStudent.id}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-baseline text-body">
                {[
                    { label: 'Year group', value: demoStudent.year },
                    { label: 'School', value: demoStudent.school },
                    { label: 'District', value: demoStudent.district },
                    { label: 'Student ID', value: demoStudent.id },
                ].map(({ label, value }) => (
                    <React.Fragment key={label}>
                        <p className="font-semibold text-subtext">{label}</p>
                        <p className="text-text">{value}</p>
                    </React.Fragment>
                ))}
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-muted p-4 rounded-xl border min-h-[84px] shadow-sm">
                    <p className="text-xl font-semibold text-text">{formatGBP(demoStudent.moneySaved)}</p>
                    <p className="text-xs text-subtext">Money Saved</p>
                </div>
                <div className="bg-muted p-4 rounded-xl border min-h-[84px] shadow-sm">
                    <p className="text-xl font-semibold text-text">#{demoStudent.rank}</p>
                    <p className="text-xs text-subtext">Class rank</p>
                </div>
            </div>

             <div className="mt-3 bg-muted/40 text-sm px-3 py-2 rounded-lg flex items-center gap-2 ring-1 ring-inset ring-[var(--ring)]">
                <Users size={16} className="text-subtext flex-shrink-0" />
                <p className="text-subtext truncate">
                    <span className="font-semibold text-text">{demoStudent.socialActivity.peerName}</span> is also learning{' '}
                    <Link to="/student/play" className="font-semibold text-text hover:underline" title={demoStudent.socialActivity.activity}>
                        {demoStudent.socialActivity.activity}
                    </Link>
                </p>
            </div>

            <div className="flex-grow min-h-[8rem] md:min-h-0"></div>
            
            <div className="md:absolute md:bottom-4 md:right-4 mt-3 md:mt-0 flex justify-center md:block opacity-90">
                <MascotSticker initialState={mascotState} />
            </div>
        </Card>
    );
};

export default ProfileSection;
