
import type { CompletedJob, PostedJob } from '../types';

// --- NEW 100-LEVEL TIERED SYSTEM ---

const TIERS = [
    { en: 'Wood', np: 'काठ' },       // Levels 1-10
    { en: 'Stone', np: 'ढुङ्गा' },    // Levels 11-20
    { en: 'Bronze', np: 'काँस' },   // Levels 21-30
    { en: 'Silver', np: 'चाँदी' },   // Levels 31-40
    { en: 'Gold', np: 'सुन' },       // Levels 41-50
    { en: 'Platinum', np: 'प्लेटिनम' },// Levels 51-60
    { en: 'Emerald', np: 'पन्ना' },   // Levels 61-70
    { en: 'Sapphire', np: 'नीलम' }, // Levels 71-80
    { en: 'Ruby', np: 'माणिक' },     // Levels 81-90
    { en: 'Diamond', np: 'हीरा' },   // Levels 91-100
];

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

// Constants for the exponential XP formula: totalXp = base * (level - 1) ^ exponent
const BASE_XP = 150;
const EXPONENT = 2.4;

/**
 * Generates all 100 level thresholds programmatically with exponential XP growth.
 * @returns An array of level definition objects.
 */
const generateLevelThresholds = () => {
    const thresholds = [];
    for (let level = 1; level <= 100; level++) {
        const tierIndex = Math.floor((level - 1) / 10);
        const subLevelIndex = (level - 1) % 10;
        
        const tier = TIERS[tierIndex];
        const romanSubLevel = ROMAN_NUMERALS[subLevelIndex];

        // Calculate the total XP needed to *reach* this level using an exponential curve.
        const xp = level === 1 ? 0 : Math.floor(BASE_XP * Math.pow(level - 1, EXPONENT));
        
        thresholds.push({
            level: level,
            xp: xp,
            name: {
                en: `${tier.en} ${romanSubLevel}`,
                np: `${tier.np} ${romanSubLevel}`
            }
        });
    }
    return thresholds;
};

export const levelThresholds = generateLevelThresholds();


// --- XP CALCULATION LOGIC (Unchanged) ---

const difficultyMultipliers = {
    Easy: 1,
    Medium: 1.25,
    Hard: 1.5,
};

export const calculateFreelancerXp = (jobs: CompletedJob[]): number => {
    if (!jobs) return 0;
    return jobs.reduce((totalXp, job) => {
        const budgetXp = job.budget * 0.1;
        const difficultyMultiplier = difficultyMultipliers[job.difficulty] || 1;
        const urgentBonus = job.isUrgent ? 50 : 0;
        const ratingBonus = (job.clientRating || 0) * 20; // Max 100 for 5 stars
        
        const jobXp = (budgetXp * difficultyMultiplier) + urgentBonus + ratingBonus;
        return totalXp + jobXp;
    }, 0);
};

export const calculateClientXp = (jobs: PostedJob[]): number => {
    if (!jobs) return 0;
    return jobs.reduce((totalXp, job) => {
        const budgetXp = job.budget * 0.1;
        const postBonus = 50;
        const ratingBonus = (job.freelancerRating || 0) * 20; // Max 100 for 5 stars

        const jobXp = budgetXp + postBonus + ratingBonus;
        return totalXp + jobXp;
    }, 0);
};

// --- LEVEL & PROGRESS CALCULATION (Unchanged) ---

export const calculateLevelInfo = (xp: number) => {
    // Find the current level by looking through the thresholds array in reverse.
    const currentLevelData = [...levelThresholds].reverse().find(l => xp >= l.xp);

    // This should not happen if xp is >= 0, but as a fallback.
    if (!currentLevelData) {
        return {
            levelName: { en: 'Unranked', np: 'अवर्गीकृत' },
            progress: 0,
            level: 0,
        };
    }

    const nextLevelData = levelThresholds.find(l => l.level === currentLevelData.level + 1);

    // If the user is at the max level
    if (!nextLevelData) { 
        return {
            levelName: currentLevelData.name,
            progress: 100,
            level: currentLevelData.level,
        };
    }
    
    const xpForNextLevel = nextLevelData.xp - currentLevelData.xp;
    const xpIntoLevel = xp - currentLevelData.xp;
    const progress = xpForNextLevel > 0 ? Math.min(Math.floor((xpIntoLevel / xpForNextLevel) * 100), 100) : 100;

    return {
        levelName: currentLevelData.name,
        progress: progress,
        level: currentLevelData.level,
    };
};
