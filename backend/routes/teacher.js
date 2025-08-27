import express from 'express';

const router = express.Router();

// Get all students for a teacher
router.get('/students', async (req, res) => {
  try {
    // For MVP, return mock student list
    // In production, this would query a database
    const students = [
      {
        id: '1',
        name: 'Alex Johnson',
        avatarUrl: '/avatars/student1.png',
        streak: 7,
        lastActivity: '2024-01-20T15:30:00Z',
        progress: {
          episodesCompleted: 5,
          totalEpisodes: 12,
          currentStreak: 7,
          bestStreak: 14
        },
        badges: [
          { id: '1', name: 'Budget Master', type: 'concept' },
          { id: '2', name: 'Weekly Warrior', type: 'streak' }
        ]
      },
      {
        id: '2',
        name: 'Sam Wilson',
        avatarUrl: '/avatars/student2.png',
        streak: 3,
        lastActivity: '2024-01-19T10:15:00Z',
        progress: {
          episodesCompleted: 3,
          totalEpisodes: 12,
          currentStreak: 3,
          bestStreak: 8
        },
        badges: [
          { id: '3', name: 'First Steps', type: 'concept' }
        ]
      }
    ];

    res.json({ students });
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ error: 'Failed to get students' });
  }
});

// Get detailed student progress
router.get('/students/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // For MVP, return mock detailed student data
    const student = {
      id: studentId,
      name: 'Alex Johnson',
      avatarUrl: '/avatars/student1.png',
      email: 'alex.johnson@school.edu',
      joinDate: '2024-01-01',
      lastActivity: '2024-01-20T15:30:00Z',
      progress: {
        episodesCompleted: 5,
        totalEpisodes: 12,
        currentStreak: 7,
        bestStreak: 14,
        totalTimeSpent: '12h 30m',
        averageScore: 85
      },
      episodes: [
        {
          id: '1',
          title: 'Saving for a Spaceship',
          status: 'Completed',
          score: 90,
          timeSpent: '45m',
          completedAt: '2024-01-20T14:45:00Z'
        },
        {
          id: '2',
          title: 'Lemonade Stand Economics',
          status: 'Completed',
          score: 85,
          timeSpent: '38m',
          completedAt: '2024-01-19T16:20:00Z'
        },
        {
          id: '3',
          title: 'Compound Interest Adventure',
          status: 'In Progress',
          score: null,
          timeSpent: '15m',
          completedAt: null
        }
      ],
      achievements: {
        badges: [
          { id: '1', name: 'Budget Master', category: 'Skill', tier: 'gold' },
          { id: '2', name: 'Weekly Warrior', category: 'Habit', tier: 'silver' }
        ],
        streaks: [
          { id: 'daily_play', name: 'Daily Play Streak', currentCount: 7, currentTier: 'silver' }
        ]
      }
    };

    res.json(student);
  } catch (error) {
    console.error('Error getting student details:', error);
    res.status(500).json({ error: 'Failed to get student details' });
  }
});

// Get teacher dashboard analytics
router.get('/dashboard', async (req, res) => {
  try {
    // For MVP, return mock dashboard data
    const dashboard = {
      overview: {
        totalStudents: 25,
        activeStudents: 18,
        averageProgress: 67,
        totalEpisodesCompleted: 156
      },
      recentActivity: [
        {
          student: 'Alex Johnson',
          action: 'Completed episode',
          episode: 'Saving for a Spaceship',
          timestamp: '2024-01-20T15:30:00Z'
        },
        {
          student: 'Sam Wilson',
          action: 'Earned badge',
          badge: 'First Steps',
          timestamp: '2024-01-20T14:15:00Z'
        }
      ],
      topPerformers: [
        { name: 'Alex Johnson', progress: 85, streak: 7 },
        { name: 'Jordan Lee', progress: 78, streak: 5 },
        { name: 'Casey Kim', progress: 72, streak: 4 }
      ]
    };

    res.json(dashboard);
  } catch (error) {
    console.error('Error getting dashboard:', error);
    res.status(500).json({ error: 'Failed to get dashboard' });
  }
});

// Get assignments
router.get('/assignments', async (req, res) => {
  try {
    // For MVP, return mock assignments
    const assignments = [
      {
        id: '1',
        title: 'Budget Planning Challenge',
        description: 'Create a weekly budget plan for a family of four',
        dueDate: '2024-01-25',
        assignedTo: ['1', '2', '3'],
        status: 'active',
        episodeContext: 'Saving for a Spaceship'
      },
      {
        id: '2',
        title: 'Cost Analysis Exercise',
        description: 'Analyze the costs of running a small business',
        dueDate: '2024-01-30',
        assignedTo: ['1', '4'],
        status: 'active',
        episodeContext: 'Lemonade Stand Economics'
      }
    ];

    res.json({ assignments });
  } catch (error) {
    console.error('Error getting assignments:', error);
    res.status(500).json({ error: 'Failed to get assignments' });
  }
});

export default router;
