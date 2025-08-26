
import React, { useState, useMemo, useEffect } from 'react';
import { allBadges, allStreaks } from '../../../lib/demoData';
import type { Badge as BadgeType, Streak as StreakType, BadgeCategory, Tier } from '../../../types';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Search, Lock, Award, Flame, Star, Zap, Gem, Shield, ChevronDown, Trophy } from 'lucide-react';
import UIBadge from '../../../components/ui/Badge';

// --- PERSISTENT STATE HOOK ---
function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
      } catch (error) {
        console.warn(`Error reading localStorage key “${key}”:`, error);
        return defaultValue;
      }
    });
  
    useEffect(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    }, [key, state]);
  
    return [state, setState];
}


// --- HELPER FUNCTIONS & COMPONENTS ---

const formatShortDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const badgeFunCopy: Record<string, { title: string; description: string }> = {
    first_pound: { title: "Ka-ching!", description: "You passed your first episode and banked your first £." },
    level_up: { title: "Level-Up Learner", description: "10 passes! You’re levelling up faster than interest compounds." },
    marathon: { title: "Marathon Learner", description: "Keep going! Pass 25 episodes." },
    value_detective: { title: "Value Detective", description: "You sniffed out the best unit price. Grocery stores fear you now." },
    paycheck_pro: { title: "Paycheck Pro", description: "Decode a full payslip (gross, net, NI, tax code)." },
    apr_unmasker: { title: "APR Unmasker", description: "Pick the cheaper plan when APR/fees are hiding (3×)." },
    risk_ranger: { title: "Risk Ranger", description: "Diversified like a pro in Stock Market Maze. Yee-haw!" },
    goal_setter: { title: "Goal Setter", description: "Set a weekly goal and actually hit it. Consistency FTW." },
    comeback_kid: { title: "Comeback Kid", description: "Pass an episode you previously failed. Bounce back!" },
    latte_factor: { title: "Latte Factor", description: "Oops—little treats add up. You spotted the drip-drip spend." },
    lemonade_tycoon: { title: "Lemonade Tycoon", description: "Citrus CEO! You squeezed ≥£X profit from Lemonade Stand." },
    bogof_boss: { title: "BOGOF Boss", description: "Win big using multi-buy/unit-price logic." },
};

const BadgePopover: React.FC<{ badge: BadgeType }> = ({ badge }) => {
    const copy = badgeFunCopy[badge.id] || { title: badge.name, description: badge.unlockHint };

    return (
        <div className="absolute bottom-full mb-2 w-60 rounded-lg bg-surface p-3 shadow-lg ring-1 ring-ring text-left opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none z-10">
            <h4 className="font-bold text-sm text-text">{copy.title}</h4>
            <p className="text-xs text-subtext mt-1">{badge.state === 'earned' ? copy.description : `How to unlock: ${badge.unlockHint}`}</p>
            {badge.state === 'earned' && badge.contextStat && (
                 <p className="text-xs font-semibold text-blue-500 mt-2">{badge.contextStat}</p>
            )}
             {badge.state === 'earned' && badge.earnedAt && (
                 <p className="text-xs text-subtext mt-2">Earned: {formatShortDate(badge.earnedAt)}</p>
            )}
            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-surface rotate-45" />
        </div>
    );
};

const categoryColorMap: Record<BadgeCategory, 'blue' | 'teal' | 'mint' | 'muted'> = {
  Milestone: 'blue',
  Skill: 'teal',
  Habit: 'mint',
  Fun: 'muted'
};

const tierColorMap: Record<Tier, 'blue' | 'teal' | 'mint' | 'muted'> = {
    none: 'muted',
    bronze: 'muted',
    silver: 'muted',
    gold: 'blue'
};

const BadgeTile: React.FC<{ badge: BadgeType }> = ({ badge }) => {
  const isLocked = badge.state === 'locked';
  const isNew = badge.earnedAt ? (new Date().getTime() - new Date(badge.earnedAt).getTime()) < 7 * 24 * 60 * 60 * 1000 : false;

  const tierRingColorMap: Record<Tier, string> = {
    none: 'ring-transparent',
    bronze: 'ring-[#CD7F32]',
    silver: 'ring-[#C0C0C0]',
    gold: 'ring-[#FFD700]',
  };
  const tierRingClass = badge.tier && badge.tier !== 'none' ? `ring-2 ${tierRingColorMap[badge.tier]}` : '';

  return (
    <div tabIndex={0} className="relative group flex flex-col items-center justify-start text-center p-4 rounded-lg transition-all duration-150 ease-out bg-muted hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
      <BadgePopover badge={badge} />
      
      {/* Tags */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          <UIBadge variant={categoryColorMap[badge.category]} className="!text-[10px] !px-1.5 !py-0.5">{badge.category}</UIBadge>
          {badge.tier && badge.tier !== 'none' && <UIBadge variant={tierColorMap[badge.tier]} className="!text-[10px] !px-1.5 !py-0.5 capitalize">{badge.tier}</UIBadge>}
          {isNew && !isLocked && <UIBadge variant={'mint'} className="!text-[10px] !px-1.5 !py-0.5">New</UIBadge>}
      </div>

      {/* Square Image Slot */}
      <div className={`relative mt-4 w-[72px] h-[72px] sm:w-[96px] sm:h-[96px] lg:w-[120px] lg:h-[120px] flex-shrink-0 transition-all rounded-lg ${tierRingClass} ring-offset-2 ring-offset-muted ${isLocked ? 'grayscale' : ''}`}>
        <div className={`w-full h-full rounded-lg bg-surface flex items-center justify-center p-1 shadow-inner`}>
           {/* Placeholder */}
           <div className="w-full h-full rounded-md border border-dashed border-slate-300 flex items-center justify-center">
             <Trophy className="text-slate-300" size={32}/>
           </div>
        </div>
        {isLocked && (
          <div className="absolute top-1 right-1 bg-surface/50 rounded-full p-1">
            <Lock size={14} className="text-subtext" />
          </div>
        )}
      </div>
      <p className="text-[10px] text-subtext/70 mt-1.5">Badge art coming soon</p>
      
      {/* Title & Subline */}
      <div className="flex-grow flex flex-col justify-center mt-3">
          <p className={`font-semibold text-sm ${isLocked ? 'text-subtext' : 'text-text'}`}>{badge.name}</p>
          <p className="text-xs text-subtext mt-1 leading-tight">
            {isLocked ? `How to unlock: ${badge.unlockHint}` : `Earned: ${formatShortDate(badge.earnedAt!)}`}
          </p>
      </div>

    </div>
  );
};


const StreakCard: React.FC<{ streak: StreakType }> = ({ streak }) => {
    const tierColorMap: Record<Tier, string> = { none: 'text-subtext', bronze: 'text-orange-500', silver: 'text-slate-400', gold: 'text-yellow-500' };
    const progressPercent = streak.nextThreshold ? (streak.currentCount / streak.nextThreshold) * 100 : 0;

    return (
        <Card className="p-4 flex items-center gap-4">
            <div className={`flex-shrink-0 ${tierColorMap[streak.currentTier]}`}><Flame size={32} /></div>
            <div className="flex-grow">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-text">{streak.name}</h3>
                    <div className="flex items-center gap-3">
                        {streak.bestCount && <div className="flex items-center gap-1 text-xs text-subtext font-medium"><Trophy size={12} /><span>Best: {streak.bestCount}</span></div>}
                        {streak.currentTier !== 'none' && <span className="text-xs font-medium uppercase">{streak.currentTier}</span>}
                    </div>
                </div>
                <p className="small mt-1">{streak.description}</p>
                {streak.nextThreshold && streak.currentTier !== 'gold' && (
                     <div className="mt-2">
                        <div className="flex justify-between small mb-1">
                            <span>Progress</span>
                            <span>{streak.currentCount} / {streak.nextThreshold}</span>
                        </div>
                        <div className="w-full bg-surface rounded-full h-2 ring-1 ring-inset ring-ring"><div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div></div>
                    </div>
                )}
            </div>
        </Card>
    );
};

// --- MAIN PAGE COMPONENT ---

const StudentAchievements: React.FC = () => {
  const [activeTab, setActiveTab] = usePersistentState<'badges' | 'streaks'>('mq-achievements-tab', 'badges');
  const [badgeFilter, setBadgeFilter] = usePersistentState<'all' | 'earned' | 'locked'>('mq-achievements-filter', 'all');
  
  const badgeCategories: BadgeCategory[] = ['Milestone', 'Skill', 'Habit', 'Fun'];
  const [selectedTags, setSelectedTags] = usePersistentState<BadgeCategory[]>('mq-achievements-tags', [...badgeCategories]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = usePersistentState('mq-achievements-sort', 'newest');

  const handleTagToggle = (tag: BadgeCategory) => {
    setSelectedTags(prev => 
        prev.includes(tag) 
            ? prev.filter(t => t !== tag) 
            : [...prev, tag]
    );
  };

  const processedBadges = useMemo(() => {
    let badges = [...allBadges];
    
    // 1. Filter by earned state
    if (badgeFilter !== 'all') {
      badges = badges.filter(b => b.state === badgeFilter);
    }
    
    // 2. Filter by selected tags (only if not all are selected)
    if (selectedTags.length > 0 && selectedTags.length < badgeCategories.length) {
      badges = badges.filter(b => selectedTags.includes(b.category));
    } else if (selectedTags.length === 0) {
      badges = [];
    }
    
    // 3. Filter by search term
    if (searchTerm) {
      badges = badges.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.unlockHint.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 4. Sort
    switch (sortBy) {
        case 'newest':
            badges.sort((a, b) => {
                if (a.state === 'locked' && b.state === 'earned') return 1;
                if (b.state === 'locked' && a.state === 'earned') return -1;
                if (a.state === 'locked' && b.state === 'locked') return a.name.localeCompare(b.name);
                return new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime();
            });
            break;
        case 'rarest':
            const categoryOrder: Record<BadgeCategory, number> = { 'Milestone': 1, 'Skill': 2, 'Habit': 3, 'Fun': 4 };
            badges.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category] || a.name.localeCompare(b.name));
            break;
        case 'category':
            badges.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
            break;
        case 'az':
            badges.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'progress':
            // TODO: Implement sorting by progress when data is available
            badges.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    return badges;
  }, [badgeFilter, selectedTags, searchTerm, sortBy]);
  
  return (
    <div>
      <div className="flex border-b border-ring mb-6">
        <button onClick={() => setActiveTab('badges')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'badges' ? 'text-text border-b-2 border-blue-500' : 'text-subtext'}`}>Badges</button>
        <button onClick={() => setActiveTab('streaks')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'streaks' ? 'text-text border-b-2 border-blue-500' : 'text-subtext'}`}>Streaks</button>
      </div>

      {activeTab === 'badges' && (
        <div>
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 rounded-full bg-muted p-1">
                        {(['all', 'earned', 'locked'] as const).map(f => (
                            <Button key={f} variant={badgeFilter === f ? 'primary' : 'ghost'} onClick={() => setBadgeFilter(f)} className="!rounded-full !px-3 !py-1 !text-xs capitalize">{f}</Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtext" />
                            <input placeholder="Search badges..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-48 rounded-md bg-muted py-2 pl-9 pr-3 text-sm" />
                        </div>
                        <div className="relative">
                            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-48 appearance-none rounded-md bg-muted py-2 pl-3 pr-8 text-sm font-medium text-subtext focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="newest">Sort: Newest earned</option>
                                <option value="rarest">Sort: Rarest first</option>
                                <option value="category">Sort: Category</option>
                                <option value="az">Sort: A → Z</option>
                                <option value="progress">Sort: Progress to next</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-subtext pointer-events-none" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-subtext mr-2">Filter by Category:</span>
                    {badgeCategories.map(tag => (
                        <Button 
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                            variant={selectedTags.includes(tag) ? 'primary' : 'outline'}
                            className="!rounded-full !px-3 !py-1 !text-xs"
                        >
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>
            
            {processedBadges.length === 0 ? (
                 <div className="text-center py-10 rounded-lg bg-muted"><p className="text-subtext">No badges match your filters.</p></div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {processedBadges.map(badge => <BadgeTile key={badge.id} badge={badge} />)}
                </div>
            )}
        </div>
      )}

      {activeTab === 'streaks' && (
        <div className="space-y-4">{allStreaks.map(streak => <StreakCard key={streak.id} streak={streak} />)}</div>
      )}
    </div>
  );
};

export default StudentAchievements;
