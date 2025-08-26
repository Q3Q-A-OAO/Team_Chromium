import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import UIBadge from '../ui/Badge';
import { dailyActivity as rawDailyActivity, progressSummaryData, demoBadgesMonth } from '../../lib/demoData';
import type { DailyActivity } from '../../lib/demoData';
import { Flame, Clock, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- DATA TRANSFORMATION ---
// Remap demo data to be in August 2025 to match the visual spec
const dailyActivity = rawDailyActivity.map(d => {
    const activityDate = new Date(d.date);
    const dayOfMonth = activityDate.getDate(); // Use day of the month as an offset
    const newDate = new Date(2025, 7, dayOfMonth); // August is month 7
    return { ...d, date: newDate.toISOString().split('T')[0] };
});

// --- HELPER FUNCTIONS & COMPONENTS ---

const Tooltip = ({ activity, position }: { activity: DailyActivity; position: { top: number; left: number } }) => {
    if (!activity || activity.attempts === 0) return null;
    const conceptEntries = Object.entries(activity.concepts).filter(([, count]) => count > 0);

    return (
        <div 
            className="absolute z-10 w-48 rounded-md bg-surface p-3 shadow-soft ring-1 ring-blue800/50 text-left pointer-events-none"
            style={{ top: position.top, left: position.left, transform: 'translate(-50%, calc(-100% - 8px))' }}
        >
            <p className="font-semibold text-sm text-text">{new Date(activity.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            <p className="small mt-1">Attempts: {activity.attempts} (Pass {activity.pass} / Fail {activity.fail})</p>
            <p className="small">Time: {activity.time}m</p>
            {conceptEntries.length > 0 && (
                <div className="mt-2 pt-2 border-t border-muted">
                    <p className="small font-semibold text-text mb-1">Concepts Covered:</p>
                    {conceptEntries.map(([concept, count]) => (
                        <p key={concept} className="small text-subtext">{concept} (x{count})</p>
                    ))}
                </div>
            )}
        </div>
    );
};

const getIntensityClass = (attempts: number) => {
    if (attempts === 0) return 'bg-muted/50';
    if (attempts <= 2) return 'bg-[#d6e9fb]';
    if (attempts <= 4) return 'bg-[#a9d2f5]';
    if (attempts <= 6) return 'bg-[#6bb5ea]';
    return 'bg-[#338aca]';
};

const generateMonthGrid = (date: Date) => {
    const grid = [];
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday is 0

    for (let i = 0; i < startDayOfWeek; i++) {
        grid.push(null);
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        grid.push(new Date(year, month, i));
    }
    return grid;
};

// --- RIGHT PANEL COMPONENTS ---

const MonthSummary = ({ activity }: { activity: DailyActivity[] }) => {
    const stats = useMemo(() => {
        return {
            episodesCompleted: activity.reduce((sum, day) => sum + day.pass, 0),
            timeSpent: activity.reduce((sum, day) => sum + day.time, 0),
            activeDays: activity.filter(day => day.attempts > 0).length
        };
    }, [activity]);

    return (
        <div className="flex flex-col h-full">
            <h4 className="font-semibold text-text mb-3">This Month</h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                    <Flame className="text-orange-500" size={24} />
                    <div>
                        <p className="font-bold text-xl">{progressSummaryData.currentStreak}</p>
                        <p className="text-xs text-subtext">Current streak</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                    <Flame className="text-subtext" size={24} />
                    <div>
                        <p className="font-bold text-xl">{progressSummaryData.longestStreak}</p>
                        <p className="text-xs text-subtext">Longest streak</p>
                    </div>
                </div>
            </div>

            <h4 className="font-semibold text-text mb-2">Badges earned</h4>
            <div className="flex flex-wrap gap-1.5 mb-4 min-h-[52px]">
                {demoBadgesMonth.length > 0 ? (
                    <>
                        {demoBadgesMonth.slice(0, 4).map(b => <UIBadge key={b.id} variant="mint">{b.name}</UIBadge>)}
                        {demoBadgesMonth.length > 4 && <UIBadge variant="muted">+{demoBadgesMonth.length - 4}</UIBadge>}
                    </>
                ) : <p className="small">No new badges this month.</p>}
            </div>

            <div className="mt-auto border-t border-muted pt-3">
                <h4 className="font-semibold text-text mb-3">Totals</h4>
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <p className="font-bold text-xl text-text">{stats.episodesCompleted}</p>
                        <p className="small">Episodes passed</p>
                    </div>
                     <div className="text-center">
                        <p className="font-bold text-xl text-text">{Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m</p>
                        <p className="small">Time spent</p>
                    </div>
                     <div className="text-center">
                        <p className="font-bold text-xl text-text">{stats.activeDays}</p>
                        <p className="small">Active days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DayDetail = ({ activity }: { activity: DailyActivity }) => {
    const date = new Date(activity.date + 'T00:00:00');
    return (
        <div className="flex flex-col h-full">
             <h4 className="font-semibold text-text mb-3">
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} — Activity
            </h4>
            <div className="space-y-3 flex-grow overflow-y-auto pr-2 -mr-2">
                {activity.details.slice(0, 3).map((attempt, i) => (
                    <div key={i} className="text-sm">
                        <div className="flex items-center gap-2">
                            <UIBadge variant={attempt.result === 'Pass' ? 'mint' : attempt.result === 'Fail' ? 'muted' : 'teal'}>{attempt.result}</UIBadge>
                            <p className="font-medium text-text truncate">{attempt.episode}</p>
                            {attempt.result === 'In progress' && <Link to="/student/play" className="ml-auto text-xs font-semibold text-blue-500 hover:underline">Resume</Link>}
                        </div>
                        <div className="flex items-center gap-4 pl-2 mt-1.5 small">
                            <span><Clock size={12} className="inline mr-1" />{attempt.time}m</span>
                             <div className="flex items-center gap-1.5 truncate">
                                <BookOpen size={12} />
                                <span className="truncate">{attempt.concepts.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-auto border-t border-muted pt-3 space-y-2">
                <div className="bg-blue-800/20 text-blue-500 p-2 rounded-md text-xs font-medium text-center">
                    Mentor Tip: You're doing great on Budgeting!
                </div>
                 <Link to="/student/journal" className="inline-flex items-center justify-center w-full gap-1 text-sm font-medium text-blue-500 hover:underline">
                    Open full Journal <ArrowRight size={14} />
                </Link>
            </div>
        </div>
    );
}


// --- MAIN COMPONENT ---

const ProgressSummary = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1));
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [hoveredDay, setHoveredDay] = useState<DailyActivity | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const gridRef = useRef<HTMLDivElement>(null);
    const dayRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const activityMap = useMemo(() => new Map(dailyActivity.map(d => [d.date, d])), []);
    const calendarGrid = useMemo(() => generateMonthGrid(currentDate), [currentDate]);
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const activityForMonth = useMemo(() => {
        const month = currentDate.getMonth();
        return dailyActivity.filter(d => new Date(d.date).getMonth() === month);
    }, [currentDate]);

    const selectedDayActivity = selectedDay ? activityMap.get(selectedDay) : null;
    
    const handleMonthChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
        setSelectedDay(null);
    };
    
    const handleMouseEnter = (day: Date, e: React.MouseEvent<HTMLButtonElement>) => {
        const activity = activityMap.get(day.toISOString().split('T')[0]);
        if (activity) {
            setHoveredDay(activity);
            const rect = e.currentTarget.getBoundingClientRect();
            const containerRect = gridRef.current?.getBoundingClientRect();
            if(containerRect){
                setTooltipPos({
                    top: rect.top - containerRect.top,
                    left: rect.left - containerRect.left + rect.width / 2
                });
            }
        }
    };

    return (
        <Card className="p-4 md:p-5">
            <header className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Progress — {monthName}</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => handleMonthChange('prev')} className="p-1 text-subtext hover:text-text disabled:opacity-50" aria-label="Previous month"><ChevronLeft size={20}/></button>
                    <button onClick={() => handleMonthChange('next')} className="p-1 text-subtext hover:text-text disabled:opacity-50" aria-label="Next month"><ChevronRight size={20} /></button>
                </div>
            </header>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left Panel: Calendar */}
                <div className="flex-grow">
                    <div className="relative" ref={gridRef}>
                        {hoveredDay && <Tooltip activity={hoveredDay} position={tooltipPos} />}
                        <div className="grid grid-cols-7 gap-x-2 text-center small mb-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day}>{day}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {calendarGrid.map((day, index) => {
                                if (!day) return <div key={`empty-${index}`} />;
                                const dateStr = day.toISOString().split('T')[0];
                                const activity = activityMap.get(dateStr);
                                const isSelected = selectedDay === dateStr;
                                const attempts = activity?.attempts || 0;
                                const ariaLabel = `${day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}: ${attempts} attempts${attempts > 0 ? ` (${activity?.pass} pass, ${activity?.fail} fail), ${activity?.time} minutes.` : '.'}`;
                                
                                return (
                                    <button
                                        key={dateStr}
                                        ref={el => { dayRefs.current[dateStr] = el; }}
                                        onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                                        onMouseLeave={() => setHoveredDay(null)}
                                        onFocus={(e) => handleMouseEnter(day, e as any)}
                                        onBlur={() => setHoveredDay(null)}
                                        aria-label={ariaLabel}
                                        className={`aspect-square w-full rounded-md text-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500 ${getIntensityClass(attempts)} ${isSelected ? 'ring-2 ring-blue-800 ring-offset-1' : ''}`}
                                    >
                                        {day.getDate()}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                     <div className="flex items-center justify-center gap-2 mt-3 small">
                        <span>Low</span>
                        <div className="w-4 h-4 rounded-sm bg-muted/50" />
                        <div className="w-4 h-4 rounded-sm bg-[#d6e9fb]" />
                        <div className="w-4 h-4 rounded-sm bg-[#a9d2f5]" />
                        <div className="w-4 h-4 rounded-sm bg-[#6bb5ea]" />
                        <div className="w-4 h-4 rounded-sm bg-[#338aca]" />
                        <span>High</span>
                    </div>
                </div>

                {/* Right Panel: Summary/Details */}
                <div className="md:w-[340px] flex-shrink-0 md:border-l md:pl-6 lg:pl-8 border-muted min-h-[300px]">
                    {selectedDayActivity && selectedDayActivity.attempts > 0
                        ? <DayDetail activity={selectedDayActivity} />
                        : <MonthSummary activity={activityForMonth} />
                    }
                </div>
            </div>
        </Card>
    );
};

export default ProgressSummary;