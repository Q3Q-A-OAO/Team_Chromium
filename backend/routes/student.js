import express from 'express';

const router = express.Router();

// Get student profile and progress
router.get('/profile/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // For MVP, return mock student profile
    // In production, this would query a database
    const profile = {
      id: studentId,
      name: 'Alex Johnson',
      avatarUrl: '/avatars/student1.png',
      streak: 7,
      lastActivity: new Date().toISOString(),
      badges: [
        { id: '1', name: 'Budget Master', type: 'concept', icon: '💰' },
        { id: '2', name: 'Weekly Warrior', type: 'streak', icon: '🔥' }
      ],
      currentEpisode: 'Saving for a Spaceship',
      progress: {
        episodesCompleted: 5,
        totalEpisodes: 12,
        currentStreak: 7,
        bestStreak: 14
      }
    };

    res.json(profile);
  } catch (error) {
    console.error('Error getting student profile:', error);
    res.status(500).json({ error: 'Failed to get student profile' });
  }
});

// Get student achievements
router.get('/achievements/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // For MVP, return mock achievements
    const achievements = {
      badges: [
        {
          id: '1',
          name: 'Budget Master',
          category: 'Skill',
          tier: 'gold',
          state: 'earned',
          earnedAt: '2024-01-15T10:30:00Z',
          unlockHint: 'Complete 5 budgeting challenges',
          artKey: 'budget_master_gold'
        },
        {
          id: '2',
          name: 'Weekly Warrior',
          category: 'Habit',
          tier: 'silver',
          state: 'earned',
          earnedAt: '2024-01-20T14:15:00Z',
          unlockHint: 'Maintain a 7-day learning streak',
          artKey: 'weekly_warrior_silver'
        }
      ],
      streaks: [
        {
          id: 'daily_play',
          name: 'Daily Play Streak',
          description: 'Play the game every day',
          tiers: [3, 7, 14, 30, 100],
          currentCount: 7,
          currentTier: 'silver',
          nextThreshold: 14
        }
      ]
    };

    res.json(achievements);
  } catch (error) {
    console.error('Error getting achievements:', error);
    res.status(500).json({ error: 'Failed to get achievements' });
  }
});

// Get student journal entries
router.get('/journal/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { limit = 20 } = req.query;
    
    // For MVP, return mock journal entries
    const journal = [
      {
        id: '1',
        date: '2024-01-20',
        episode: 'Saving for a Spaceship',
        reflection: 'I learned that saving 20% of my allowance can really add up over time!',
        mood: 'excited',
        concepts: ['Budgeting', 'Goal Setting']
      },
      {
        id: '2',
        date: '2024-01-19',
        episode: 'Lemonade Stand Economics',
        reflection: 'Understanding variable costs helped me price my lemonade better.',
        mood: 'confident',
        concepts: ['Cost Analysis', 'Pricing Strategy']
      }
    ];

    res.json({ entries: journal.slice(0, limit) });
  } catch (error) {
    console.error('Error getting journal:', error);
    res.status(500).json({ error: 'Failed to get journal' });
  }
});

// Update student progress
router.post('/progress/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { episodeId, completed, score, timeSpent } = req.body;
    
    console.log(`📊 Updating progress for student ${studentId} on episode ${episodeId}`);
    
    // For MVP, just acknowledge the update
    // In production, this would save to a database
    res.json({ 
      success: true, 
      message: 'Progress updated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;
