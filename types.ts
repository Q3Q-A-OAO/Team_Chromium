
export interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  streak: number;
  lastActivity: string;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'concept' | 'effort' | 'streak';
}

export interface Episode {
  id: string;
  title: string;
  concepts: string[];
  status: 'Not started' | 'In progress' | 'Completed' | 'Failed';
}

export interface Attempt {
  id: string;
  episodeTitle: string;
  date: string;
  summary: string;
}
