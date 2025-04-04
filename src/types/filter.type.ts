export interface FilterParams {
    searchTerm: string;
    priceRange: [number, number];
    tier: string;
    theme: string;
    order: string;
    timeRange: [number, number] | null;
    timeFilterType?: 'lastYear' | 'custom';
}

export interface FilterProps {
    onFilterChange: (params: FilterParams) => void;
}