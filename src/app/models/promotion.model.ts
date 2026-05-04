export interface Promotion{
    id: number;
    title: string;
    description: string;
    active: boolean;
    type: string;
    startDate: string;
    endDate: string;
    badge: string;
    pointsReward: number;
    minPurchaseAmount: number;
    fuelId: number;
}