export const emissionsData = [
  { month: 'Jan', emissions: 2800, sinks: 1200 },
  { month: 'Feb', emissions: 2650, sinks: 1300 },
  { month: 'Mar', emissions: 3100, sinks: 1400 },
  { month: 'Apr', emissions: 2900, sinks: 1350 },
  { month: 'May', emissions: 3200, sinks: 1500 },
  { month: 'Jun', emissions: 3300, sinks: 1600 },
];

export const activityData = [
  { name: 'Haul Trucks', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Excavators', value: 30, fill: 'hsl(var(--chart-2))' },
  { name: 'Drilling Rigs', value: 15, fill: 'hsl(var(--chart-3))' },
  { name: 'Processing Plant', value: 10, fill: 'hsl(var(--chart-4))' },
];

export const forecastData = [
  ...emissionsData,
  { month: 'Jul', forecast: 3400, emissions: null },
  { month: 'Aug', forecast: 3350, emissions: null },
  { month: 'Sep', forecast: 3500, emissions: null },
];

export const sinksVsEmissionsData = [
  { name: 'Emissions', value: 3300 },
  { name: 'Sinks', value: 1600 },
  { name: 'Target', value: 2500 },
];

export const complianceScore = 85;

export const aiAlerts = [
    { id: 1, message: 'Diesel usage increased by 14% today.', timestamp: '2 hours ago', severity: 'warning' },
    { id: 2, message: 'Carbon sink #3 is underperforming by 8%.', timestamp: '1 day ago', severity: 'error' },
    { id: 3, message: 'Forecasted emissions for next month are 5% above target.', timestamp: '3 days ago', severity: 'warning' },
    { id: 4, message: 'New report generated for Q2 2024.', timestamp: '5 days ago', severity: 'info' },
];
