export interface Challenge{
    id: number;
    title: string;
    description: string;
    completed: boolean;
    rewardCoins: number;
    rewardXp: number;
    progress: number;
    target: number;
}