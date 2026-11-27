// Statistics for the Republic of Arunika, a fictional island nation.
// Every figure below is an example figure written for this site, published
// by the Arunika National Statistics Office (ANSO). Each series carries its
// source and reference year so a visitor can check what a number means.

export const META = {
  country: 'Republic of Arunika',
  office: 'Arunika National Statistics Office',
  officeShort: 'ANSO',
  capital: 'Port Selara',
  currency: 'arun (ARU)',
  updated: '14 November 2025',
  sourceLine: 'Source: Arunika National Statistics Office (ANSO)',
};

export const KEY_INDICATORS = [
  { label: 'Population', value: '4,182,400', change: '+0.9% on 2024', year: '2025', note: 'Mid-year estimate, 1 July 2025' },
  { label: 'GDP', value: 'US$ 38.2 bn', change: '+5.8% real growth', year: '2024', note: 'National accounts, constant 2019 prices' },
  { label: 'GDP per capita', value: 'US$ 9,140', change: '+4.9% on 2023', year: '2024', note: 'Current prices, market exchange rate' },
  { label: 'Unemployment', value: '4.6%', change: '−0.2 pts on 2024', year: '2025', note: 'Labour force survey, Q3 2025' },
  { label: 'Inflation (CPI)', value: '2.8%', change: '−0.5 pts on 2024', year: '2025', note: 'Consumer price index, Oct 2025, year on year' },
  { label: 'Life expectancy', value: '76.4 years', change: '+0.3 years on 2024', year: '2025', note: 'Period life table, both sexes' },
];

// Population, millions, mid-year estimates 2015-2025.
export const POPULATION_BY_YEAR = [
  { year: 2015, value: 3.71 }, { year: 2016, value: 3.76 }, { year: 2017, value: 3.81 },
  { year: 2018, value: 3.86 }, { year: 2019, value: 3.91 }, { year: 2020, value: 3.96 },
  { year: 2021, value: 4.01 }, { year: 2022, value: 4.06 }, { year: 2023, value: 4.10 },
  { year: 2024, value: 4.14 }, { year: 2025, value: 4.18 },
];

// Age structure, 2025, share of population.
export const AGE_GROUPS = [
  { group: '0–14 years', share: 24.1 },
  { group: '15–24 years', share: 16.8 },
  { group: '25–54 years', share: 41.3 },
  { group: '55–64 years', share: 10.2 },
  { group: '65+ years', share: 7.6 },
];

// Urban / rural split, 2025.
export const URBAN_RURAL = [
  { label: 'Urban', share: 68.4, colour: '#0b5e57' },
  { label: 'Rural', share: 31.6, colour: '#e8a33d' },
];

// Population by region, 2025, thousands.
export const REGIONS = [
  { region: 'Selara (capital region)', population: 1420, density: 412 },
  { region: 'North Coast', population: 980, density: 96 },
  { region: 'Highlands', population: 710, density: 54 },
  { region: 'Eastern Isles', population: 640, density: 71 },
  { region: 'Southern Plains', population: 432, density: 38 },
];

// GDP, US$ billion, current prices, 2015-2024.
export const GDP_BY_YEAR = [
  { year: 2015, value: 24.1 }, { year: 2016, value: 25.3 }, { year: 2017, value: 26.8 },
  { year: 2018, value: 28.4 }, { year: 2019, value: 29.9 }, { year: 2020, value: 28.7 },
  { year: 2021, value: 31.2 }, { year: 2022, value: 34.0 }, { year: 2023, value: 36.1 },
  { year: 2024, value: 38.2 },
];

// GDP per capita, US$, 2015-2024 (same years as GDP_BY_YEAR).
export const GDP_PER_CAPITA = [
  { year: 2015, value: 6490 }, { year: 2016, value: 6730 }, { year: 2017, value: 7030 },
  { year: 2018, value: 7360 }, { year: 2019, value: 7650 }, { year: 2020, value: 7250 },
  { year: 2021, value: 7780 }, { year: 2022, value: 8370 }, { year: 2023, value: 8800 },
  { year: 2024, value: 9140 },
];

// Share of gross value added, 2024.
export const SECTORS = [
  { sector: 'Services', share: 58.2 },
  { sector: 'Industry', share: 24.6 },
  { sector: 'Agriculture', share: 11.8 },
  { sector: 'Fishing & aquaculture', share: 5.4 },
];

// CPI inflation, % year on year, 2019-2025.
export const INFLATION = [
  { year: 2019, value: 3.1 }, { year: 2020, value: 2.4 }, { year: 2021, value: 4.7 },
  { year: 2022, value: 5.9 }, { year: 2023, value: 4.2 }, { year: 2024, value: 3.3 },
  { year: 2025, value: 2.8 },
];

// Unemployment rate, %, 2019-2025.
export const UNEMPLOYMENT = [
  { year: 2019, value: 5.9 }, { year: 2020, value: 6.8 }, { year: 2021, value: 6.1 },
  { year: 2022, value: 5.4 }, { year: 2023, value: 5.0 }, { year: 2024, value: 4.8 },
  { year: 2025, value: 4.6 },
];

// Trade, US$ billion, 2024.
export const TRADE = [
  { item: 'Exports of goods', value: 14.6 },
  { item: 'Imports of goods', value: 13.9 },
  { item: 'Trade balance (goods)', value: 0.7 },
  { item: 'Exports of services', value: 6.3 },
  { item: 'Tourism receipts', value: 2.4 },
];

// Top export goods, share of goods exports, 2024.
export const TOP_EXPORTS = [
  { good: 'Spices & herbs', share: 18 },
  { good: 'Textiles & garments', share: 15 },
  { good: 'Electronics', share: 12 },
  { good: 'Fish & seafood', share: 11 },
  { good: 'Timber products', share: 8 },
  { good: 'Other goods', share: 36 },
];

// Life expectancy at birth, years, 2015-2025.
export const LIFE_EXPECTANCY = [
  { year: 2015, value: 73.8 }, { year: 2016, value: 74.1 }, { year: 2017, value: 74.4 },
  { year: 2018, value: 74.7 }, { year: 2019, value: 75.0 }, { year: 2020, value: 74.9 },
  { year: 2021, value: 75.3 }, { year: 2022, value: 75.7 }, { year: 2023, value: 76.0 },
  { year: 2024, value: 76.1 }, { year: 2025, value: 76.4 },
];

export const HEALTH_EDUCATION = [
  { label: 'Adult literacy (15+)', value: '97.8%', year: '2025', note: 'Literacy survey, ages 15 and over' },
  { label: 'Primary enrolment (net)', value: '99.1%', year: '2025', note: 'Ministry of Education school census' },
  { label: 'Secondary enrolment (net)', value: '94.3%', year: '2025', note: 'Ministry of Education school census' },
  { label: 'Tertiary enrolment (gross)', value: '41.7%', year: '2024', note: 'Higher education statistics' },
  { label: 'Hospital beds per 1,000 people', value: '3.2', year: '2024', note: 'Health facility register' },
  { label: 'Doctors per 1,000 people', value: '2.1', year: '2024', note: 'Medical council register' },
  { label: 'Infant mortality per 1,000 live births', value: '8.4', year: '2024', note: 'Civil registration and vital statistics' },
  { label: 'Mean years of schooling', value: '11.6 years', year: '2024', note: 'Labour force survey, ages 25+' },
];

// Environment and energy, 2025 unless noted.
export const ENVIRONMENT = [
  { label: 'Renewable share of electricity', value: '46.2%', year: '2025', note: 'Energy balance; hydro 28.1%, geothermal 11.4%, solar & wind 6.7%' },
  { label: 'Forest cover', value: '58.3%', year: '2024', note: 'National forest inventory, share of land area' },
  { label: 'CO₂ emissions per capita', value: '2.1 tonnes', year: '2024', note: 'Greenhouse gas inventory' },
  { label: 'Protected land area', value: '21.4%', year: '2025', note: 'National parks and reserves, share of land area' },
  { label: 'Household recycling rate', value: '38%', year: '2024', note: 'Municipal waste survey' },
  { label: 'Access to clean water', value: '96.5%', year: '2025', note: 'Household survey, improved water source' },
];

// Renewable share of electricity, %, 2015-2025.
export const RENEWABLES = [
  { year: 2015, value: 31.2 }, { year: 2016, value: 32.8 }, { year: 2017, value: 34.5 },
  { year: 2018, value: 36.1 }, { year: 2019, value: 37.9 }, { year: 2020, value: 39.4 },
  { year: 2021, value: 41.0 }, { year: 2022, value: 42.6 }, { year: 2023, value: 44.1 },
  { year: 2024, value: 45.3 }, { year: 2025, value: 46.2 },
];

// Electricity generation mix, 2025, share of generation.
export const ENERGY_MIX = [
  { source: 'Hydro', share: 28.1 },
  { source: 'Geothermal', share: 11.4 },
  { source: 'Natural gas', share: 30.5 },
  { source: 'Coal', share: 16.2 },
  { source: 'Solar', share: 4.9 },
  { source: 'Wind', share: 1.8 },
  { source: 'Other', share: 7.1 },
];

// Latest releases.
export const RELEASES = [
  { date: '14 Nov 2025', title: 'Consumer Price Index, October 2025', topic: 'Prices' },
  { date: '31 Oct 2025', title: 'Labour Force Survey, Q3 2025', topic: 'Labour' },
  { date: '17 Oct 2025', title: 'National Accounts, Q2 2025', topic: 'Economy' },
  { date: '03 Oct 2025', title: 'Population Estimates, mid-2025', topic: 'Population' },
  { date: '19 Sep 2025', title: 'Education Statistics 2024', topic: 'Education' },
  { date: '05 Sep 2025', title: 'Energy Balance 2024', topic: 'Environment' },
];

// Downloadable datasets listed on the Data page.
export const DATASETS = [
  { name: 'Population by year, 2015–2025', topic: 'Population', years: '2015–2025', format: 'CSV', updated: '03 Oct 2025', file: 'data/population-by-year.csv' },
  { name: 'Population by region, 2025', topic: 'Population', years: '2025', format: 'CSV', updated: '03 Oct 2025', file: '' },
  { name: 'GDP and GDP per capita, 2015–2024', topic: 'Economy', years: '2015–2024', format: 'CSV', updated: '17 Oct 2025', file: '' },
  { name: 'Consumer price index, monthly, 2019–2025', topic: 'Prices', years: '2019–2025', format: 'CSV', updated: '14 Nov 2025', file: '' },
  { name: 'Labour force survey, quarterly, 2019–2025', topic: 'Labour', years: '2019–2025', format: 'CSV', updated: '31 Oct 2025', file: '' },
  { name: 'Life expectancy by year, 2015–2025', topic: 'Health', years: '2015–2025', format: 'CSV', updated: '19 Sep 2025', file: '' },
  { name: 'School enrolment by level, 2015–2025', topic: 'Education', years: '2015–2025', format: 'CSV', updated: '19 Sep 2025', file: '' },
  { name: 'Energy balance and renewables, 2015–2025', topic: 'Environment', years: '2015–2025', format: 'CSV', updated: '05 Sep 2025', file: '' },
  { name: 'Trade by partner country, 2024', topic: 'Economy', years: '2024', format: 'CSV', updated: '17 Oct 2025', file: '' },
  { name: 'Household income and expenditure, 2023', topic: 'Living standards', years: '2023', format: 'CSV', updated: '12 Jun 2024', file: '' },
  { name: 'Tourism arrivals by month, 2019–2025', topic: 'Tourism', years: '2019–2025', format: 'CSV', updated: '28 Aug 2025', file: '' },
  { name: 'Crime and safety statistics, 2024', topic: 'Society', years: '2024', format: 'CSV', updated: '22 Jul 2025', file: '' },
];
