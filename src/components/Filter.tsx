import { Input, Select, Button, Slider, DatePicker, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useCallback, useEffect } from 'react';
import { FilterParams, FilterProps, } from '@/types/filter.type';
import { debounce } from '@/utils/helpers';
import { Tiers, Themes } from '@/constants/product';
import dayjs from 'dayjs';
import type { MenuProps } from 'antd';
import '@/styles/components/Filter.scss';
import { DateRange } from '@/constants/date';

const { Option } = Select;
const { RangePicker } = DatePicker;

const defaultFilters: FilterParams = {
    searchTerm: '',
    priceRange: [0, 200],
    tier: 'Basic',
    theme: 'Halloween',
    order: 'asc',
    timeRange: [DateRange.lastYear.start, DateRange.lastYear.end],
    timeFilterType: 'lastYear'
};

const Filter = ({ onFilterChange }: FilterProps) => {
    const [filters, setFilters] = useState<FilterParams>(defaultFilters);
    const [selectedDateRange, setSelectedDateRange] = useState<[number, number] | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const debouncedFilterChange = useCallback(
        debounce((newFilters: FilterParams) => {
            onFilterChange(newFilters);
        }, 300),
        [onFilterChange]
    );

    const handleChange = (key: keyof FilterParams, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        debouncedFilterChange(newFilters);
    };

    const handleTimeFilterChange = (type: 'lastYear' | 'custom', dateRange?: [any, any]) => {
        let timeRange: [number, number] | null = null;

        if (type === 'lastYear') {
            timeRange = [DateRange.today.start, DateRange.today.end];
            setSelectedDateRange(null);
        } else if (dateRange) {
            const startDate = dayjs(dateRange[0]).startOf('day').valueOf();
            const endDate = dayjs(dateRange[1]).endOf('day').valueOf();
            timeRange = [startDate, endDate];
            setSelectedDateRange(dateRange);
        }

        const newFilters = {
            ...filters,
            timeFilterType: type,
            timeRange
        };
        setFilters(newFilters);
        debouncedFilterChange(newFilters);
    };

    const getTimeFilterLabel = () => {
        if (filters.timeFilterType === 'lastYear') return 'Last Year';
        if (selectedDateRange) {
            return `${dayjs(selectedDateRange[0]).format('MM/DD/YYYY')} - ${dayjs(selectedDateRange[1]).format('MM/DD/YYYY')}`;
        }
        return 'Custom Range';
    };

    useEffect(() => {
        return () => {
            debouncedFilterChange.cancel?.();
        };
    }, [debouncedFilterChange]);

    const timeMenuItems: MenuProps['items'] = [
        {
            key: 'lastYear',
            label: 'Last Year',
            onClick: () => {
                handleTimeFilterChange('lastYear');
                setDropdownOpen(false);
            }
        },
        {
            key: 'custom',
            label: (
                <div className="custom-date-menu" onClick={e => e.stopPropagation()}>
                    <div className="custom-date-title">Custom Range</div>
                    <RangePicker
                        value={
                            selectedDateRange
                                ? [dayjs(selectedDateRange[0]), dayjs(selectedDateRange[1])]
                                : null
                        }
                        onChange={(dates) => {
                            if (dates) {
                                handleTimeFilterChange('custom', dates);
                                setDropdownOpen(false);
                            }
                        }}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="filter-container" data-testid="filterContainer">
            <div className="filter-item">
                <label>Search</label>
                <Input
                    placeholder="Quick Search"
                    prefix={<SearchOutlined />}
                    className="search-input"
                    onChange={(e) => handleChange('searchTerm', e.target.value)}
                    value={filters.searchTerm}
                />
            </div>
            <div className="filter-item">
                <label>Price</label>
                <Slider
                    range={{ draggableTrack: true }}
                    defaultValue={[0, 200]}
                    min={0}
                    max={200}
                    onChange={(value: any) => handleChange('priceRange', value)}
                    value={filters.priceRange}
                />
            </div>
            <div className="filter-item">
                <label>Tier</label>
                <Select
                    data-testid="tierSelect"
                    value={filters.tier}
                    className="filter-select"
                    onChange={(value) => handleChange('tier', value)}
                >
                    {Tiers.map((tier) => (
                        <Option key={tier} value={tier}>
                            {tier}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="filter-item">
                <label>Theme</label>
                <Select
                    data-testid="themeSelect"
                    value={filters.theme}
                    className="filter-select"
                    onChange={(value) => handleChange('theme', value)}
                >
                    {Themes.map((theme) => (
                        <Option key={theme} value={theme}>
                            {theme}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className="filter-item">
                <label>Sort by Price</label>
                <Select
                    data-testid="sortSelect"
                    value={filters.order}
                    className="filter-select"
                    onChange={(value) => handleChange('order', value)}
                >
                    <Option value="asc">Low to High</Option>
                    <Option value="desc">High to Low</Option>
                </Select>
            </div>
            <div className="filter-item">
                <label>Time</label>
                <Dropdown
                    menu={{
                        items: timeMenuItems,
                        onClick: ({ key }) => {
                            if (key === 'lastYear') {
                                handleTimeFilterChange('lastYear');
                                setDropdownOpen(false);
                            }
                        }
                    }}
                    trigger={['click']}
                    placement="bottomLeft"
                    open={dropdownOpen}
                    onOpenChange={setDropdownOpen}
                >
                    <Button className="time-dropdown-button" data-testid="timeDropdownButton">
                        {getTimeFilterLabel()}
                    </Button>
                </Dropdown>
            </div>
            <div className="filter-item">
                <label>&nbsp;</label>
                <Button
                    data-testid="resetButton"
                    type="default"
                    onClick={() => {
                        setFilters(defaultFilters);
                        onFilterChange(defaultFilters);
                    }}
                    disabled={JSON.stringify(filters) === JSON.stringify(defaultFilters)}
                >
                    Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default Filter;
