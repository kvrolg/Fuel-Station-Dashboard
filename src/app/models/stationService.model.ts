export interface StationService{
    id: number;
    name: string;
    available: boolean;
    icon: string;
    description: string;
    level: number;
    maxLevel: number;
    popularity: number;
}