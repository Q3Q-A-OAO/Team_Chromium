
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { demoStudent, demoPrefs, progressSummaryData, demoJournalTop3, demoClassActivity, dailyActivity } from '../../lib/demoData';
import MascotSticker from './MascotSticker';
import { Camera, Eye } from 'lucide-react';

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

    const tickerItems = [...demoClassActivity, ...demoClassActivity]; // Duplicate for seamless loop

    const stats = useMemo(() => {
        return {
            episodesCompleted: dailyActivity.reduce((sum, day) => sum + day.pass, 0),
            timeSpent: dailyActivity.reduce((sum, day) => sum + day.time, 0),
            activeDays: dailyActivity.filter(day => day.attempts > 0).length
        };
    }, []);

    return (
        <Card className="p-5 h-full flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-3">Profile</h3>
            
            <div className="flex items-center gap-4 mb-3">
                <button className="relative group flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                    <img
                        src={demoPrefs.avatarUrl}
                        alt="Student Avatar"
                        className="w-24 h-24 rounded-full ring-4 ring-surface shadow-md object-cover"
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

            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 items-baseline mb-4">
                {[
                    { label: 'Year group', value: demoStudent.year },
                    { label: 'School', value: demoStudent.school },
                    { label: 'District', value: demoStudent.district },
                    { label: 'Student ID', value: demoStudent.id },
                ].map(({ label, value }) => (
                    <React.Fragment key={label}>
                        <p className="font-semibold text-sm text-subtext">{label}</p>
                        <p className="text-base font-medium text-text">{value}</p>
                    </React.Fragment>
                ))}
            </div>

            <div className="border-t border-muted pt-3 mt-4 mb-4">
                <div className="flex justify-around items-center text-center">
                    <div>
                        <p className="font-bold text-lg text-text">{stats.episodesCompleted}</p>
                        <p className="text-sm text-subtext">Episodes passed</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg text-text">{Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m</p>
                        <p className="text-sm text-subtext">Time spent</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg text-text">{stats.activeDays}</p>
                        <p className="text-sm text-subtext">Active days</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-muted p-3 rounded-xl border flex flex-col items-center justify-center gap-2 shadow-sm">
                    <img src="/assets/placeholders/money-saved-64.png" alt="Money Saved icon" className="w-12 h-12 rounded-md bg-white object-contain p-1" />
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <p className="font-semibold text-lg text-text">{formatGBP(demoStudent.moneySaved)}</p>
                        <p className="text-sm text-subtext">Money Saved</p>
                    </div>
                </div>
                <div className="bg-muted p-3 rounded-xl border flex flex-col items-center justify-center gap-2 shadow-sm">
                    <img src="/assets/placeholders/class-rank-64.png" alt="Class Rank icon" className="w-12 h-12 rounded-md bg-white object-contain p-1" />
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <p className="font-semibold text-lg text-text">#{demoStudent.rank}</p>
                        <p className="text-sm text-subtext">Class rank</p>
                    </div>
                </div>
            </div>

            <div className="h-12 w-full overflow-hidden relative group">
                <div 
                    className="absolute top-0 left-0 w-full animate-[vertical-ticker-scroll_12s_linear_infinite] group-hover:[animation-play-state:paused]"
                >
                    {tickerItems.map((activity, index) => (
                        <Link to={activity.link} key={`${activity.id}-${index}`} className="h-12 flex w-full items-center gap-3 rounded-lg transition-colors text-sm">
                            <img src={activity.avatarUrl} alt={activity.peerName} className="w-8 h-8 rounded-full flex-shrink-0" />
                            <p className="text-subtext text-left truncate">
                                <span className="font-semibold text-text">{activity.peerName}</span> {activity.text}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
            
            <div className="flex-grow min-h-[4rem] md:min-h-0"></div>
            
            <div className="absolute bottom-3 left-3 z-10 transform scale-200 origin-bottom-left">
                <MascotSticker initialState={mascotState} />
            </div>
        </Card>
    );
};

export default ProfileSection;
