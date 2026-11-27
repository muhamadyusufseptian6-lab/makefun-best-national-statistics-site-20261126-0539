// Page views for the statistics site. Each view returns HTML for one hash
// route; main.js renders it and wires up the view's controls. All figures
// come from data.js, so a number on screen always has a source and a year.

import {
  AGE_GROUPS, DATASETS, ENERGY_MIX, ENVIRONMENT, GDP_BY_YEAR, GDP_PER_CAPITA,
  HEALTH_EDUCATION, INFLATION, KEY_INDICATORS, LIFE_EXPECTANCY, META,
  POPULATION_BY_YEAR, REGIONS, RELEASES, RENEWABLES, SECTORS, TOP_EXPORTS,
  TRADE, UNEMPLOYMENT, URBAN_RURAL,
} from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';

const sourceNote = (text) => `<p class="source">${text}. ${META.sourceLine}.</p>`;

function kpiCards() {
  return `<section class="kpi-grid" aria-label="Key indicators">
    ${KEY_INDICATORS.map((k, i) => `
      <article class="kpi">
        <h3>${k.label}</h3>
        <p class="kpi-value">${k.value}</p>
        <p class="kpi-change">${k.change}</p>
        <p class="kpi-year">${k.year} · ${k.note}</p>
      </article>`).join('')}
  </section>`;
}

export function viewOverview() {
  const pop = POPULATION_BY_YEAR.map((p) => ({ x: p.year, y: p.value }));
  return `
  <section class="hero">
    <p class="eyebrow">Official statistics · Updated ${META.updated}</p>
    <h1>Arunika in numbers</h1>
    <p class="lede">The Republic of Arunika, home to 4.18 million people across five regions,
    counted by the Arunika National Statistics Office. Every figure on this site is
    free to use with its source and year — start with the country at a glance below,
    then explore population, economy, health, education and the environment.</p>
    <div class="hero-actions">
      <a class="btn" href="#/population">Explore population</a>
      <a class="btn btn-ghost" href="#/data">Browse all datasets</a>
    </div>
  </section>
  ${kpiCards()}
  <section class="panel">
    <div class="panel-head">
      <h2>Population growth, 2015–2025</h2>
      <p>Millions of people, mid-year estimates</p>
    </div>
    ${lineChart(pop, { label: 'Population of Arunika 2015 to 2025', format: (v) => v.toFixed(2) + 'm', highlight: pop.length - 1 })}
    ${sourceNote('Population estimates 2015–2025, released 3 October 2025')}
    <p class="insight">Arunika added about 470,000 people in ten years. Growth has slowed from
    1.4% a year in 2015 to 0.9% in 2025, as families have fewer children and more
    people move to the capital region.</p>
  </section>
  <div class="two-col">
    <section class="panel">
      <div class="panel-head"><h2>Latest releases</h2><p>Newest first</p></div>
      <ul class="releases">
        ${RELEASES.map((r) => `<li><span class="release-date">${r.date}</span>
          <a href="#/data">${r.title}</a><span class="tag">${r.topic}</span></li>`).join('')}
      </ul>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Where the numbers come from</h2><p>How ANSO counts</p></div>
      <p>ANSO runs the census every ten years, a labour force survey every quarter,
      and a price survey in 42 towns every month. Figures are revised when better
      data arrives, and every revision is listed with the release it changed.</p>
      <p>The next census is in <strong>March 2027</strong>. Results will appear here
      first, region by region, as they are checked.</p>
      <p><a href="#/data">See the full list of datasets →</a></p>
    </section>
  </div>`;
}

export function viewPopulation() {
  const pop = POPULATION_BY_YEAR.map((p) => ({ x: p.year, y: p.value }));
  const total = REGIONS.reduce((a, r) => a + r.population, 0);
  return `
  <section class="page-head">
    <p class="eyebrow">People</p>
    <h1>Population &amp; demography</h1>
    <p class="lede">Who lives in Arunika, where they live, and how the population is changing.</p>
  </section>
  <section class="panel">
    <div class="panel-head">
      <h2>Population by year</h2>
      <label class="year-picker">Pick a year
        <select id="pop-year" aria-label="Pick a year">
          ${POPULATION_BY_YEAR.map((p) => `<option value="${p.year}"${p.year === 2025 ? ' selected' : ''}>${p.year}</option>`).join('')}
        </select>
      </label>
    </div>
    <p class="big-readout" id="pop-readout">In <strong>2025</strong>, Arunika had <strong>4.18 million</strong> people.</p>
    ${lineChart(pop, { label: 'Population of Arunika 2015 to 2025', format: (v) => v.toFixed(2) + 'm', highlight: pop.length - 1, showValues: false })}
    ${sourceNote('Population estimates 2015–2025, released 3 October 2025')}
  </section>
  <div class="two-col">
    <section class="panel">
      <div class="panel-head"><h2>Age structure, 2025</h2><p>Share of population</p></div>
      ${hbarChart(AGE_GROUPS.map((a) => ({ label: a.group, value: a.share, colour: a.group === '25–54 years' ? '#e8a33d' : '#0b5e57' })), { label: 'Age structure 2025' })}
      ${sourceNote('Population estimates 2025, by five-year age group')}
      <p class="insight">Two in five Arunikians are 25 to 54 — the working-age core. One in four is
      under 15, and only 7.6% is 65 or older, so the population is still young.</p>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Urban &amp; rural, 2025</h2><p>Share of population</p></div>
      ${donutChart(URBAN_RURAL, { label: 'Urban and rural share 2025', centre: '68.4%', centreSub: 'urban' })}
      <ul class="legend">
        ${URBAN_RURAL.map((u) => `<li><span class="swatch" style="background:${u.colour}"></span>${u.label} — ${u.share}%</li>`).join('')}
      </ul>
      ${sourceNote('Population estimates 2025, urban and rural classification')}
    </section>
  </div>
  <section class="panel">
    <div class="panel-head"><h2>Population by region, 2025</h2><p>Thousands of people</p></div>
    <table>
      <thead><tr><th>Region</th><th>Population</th><th>Share</th><th>Density (per km²)</th></tr></thead>
      <tbody>
        ${REGIONS.map((r) => `<tr><td>${r.region}</td><td>${r.population.toLocaleString('en-US')}</td><td>${((r.population / total) * 100).toFixed(1)}%</td><td>${r.density}</td></tr>`).join('')}
      </tbody>
    </table>
    ${sourceNote('Population estimates 2025, by region')}
  </section>`;
}

export function viewEconomy() {
  const gdp = GDP_BY_YEAR.map((g) => ({ x: g.year, y: g.value }));
  return `
  <section class="page-head">
    <p class="eyebrow">Money</p>
    <h1>Economy</h1>
    <p class="lede">How big Arunika's economy is, what it makes, what it sells abroad, and what
    prices and jobs look like.</p>
  </section>
  <section class="panel">
    <div class="panel-head">
      <h2>Gross domestic product</h2>
      <div class="toggle" role="group" aria-label="Choose the GDP measure">
        <button id="gdp-total" class="toggle-btn active" type="button">GDP, US$ bn</button>
        <button id="gdp-percap" class="toggle-btn" type="button">GDP per capita, US$</button>
      </div>
    </div>
    <div id="gdp-chart">${lineChart(gdp, { label: 'GDP of Arunika 2015 to 2024', format: (v) => '$' + v.toFixed(1) + 'bn', highlight: gdp.length - 1 })}</div>
    ${sourceNote('National accounts 2015–2024, current prices, released 17 October 2025')}
    <p class="insight">The economy shrank 4% in 2020, then grew every year since — 5.8% in 2024,
    the fastest since 2017. At US$ 38.2 billion it is roughly 1.6 times its 2015 size.</p>
  </section>
  <div class="two-col">
    <section class="panel">
      <div class="panel-head"><h2>What the economy makes, 2024</h2><p>Share of gross value added</p></div>
      ${hbarChart(SECTORS.map((s) => ({ label: s.sector, value: s.share, colour: s.sector === 'Services' ? '#e8a33d' : '#0b5e57' })), { label: 'Sectors of the economy 2024' })}
      ${sourceNote('National accounts 2024, by industry')}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Top exports, 2024</h2><p>Share of goods exports</p></div>
      ${hbarChart(TOP_EXPORTS.map((t) => ({ label: t.good, value: t.share, colour: '#17756e' })), { label: 'Top export goods 2024' })}
      ${sourceNote('Trade statistics 2024, by commodity')}
    </section>
  </div>
  <div class="two-col">
    <section class="panel">
      <div class="panel-head"><h2>Inflation, 2019–2025</h2><p>CPI, % year on year</p></div>
      ${barChart(INFLATION.map((i) => ({ label: String(i.year), value: i.value })), { label: 'Inflation 2019 to 2025', format: (v) => v.toFixed(1) + '%', highlight: 3, height: 260 })}
      ${sourceNote('Consumer price index, October 2025 release')}
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Unemployment, 2019–2025</h2><p>% of the labour force</p></div>
      ${barChart(UNEMPLOYMENT.map((u) => ({ label: String(u.year), value: u.value })), { label: 'Unemployment 2019 to 2025', format: (v) => v.toFixed(1) + '%', colour: '#8a6d1f', highlight: 1, height: 260 })}
      ${sourceNote('Labour force survey, Q3 2025')}
      <p class="insight">Unemployment peaked at 6.8% in 2020 and has fallen every year since, to
      4.6% in 2025 — the lowest in the series.</p>
    </section>
  </div>
  <section class="panel">
    <div class="panel-head"><h2>Trade, 2024</h2><p>US$ billion</p></div>
    <table>
      <thead><tr><th>Item</th><th>US$ bn</th></tr></thead>
      <tbody>
        ${TRADE.map((t) => `<tr><td>${t.item}</td><td>${t.value.toFixed(1)}</td></tr>`).join('')}
      </tbody>
    </table>
    ${sourceNote('Trade statistics 2024')}
  </section>`;
}

export function viewHealth() {
  const life = LIFE_EXPECTANCY.map((l) => ({ x: l.year, y: l.value }));
  return `
  <section class="page-head">
    <p class="eyebrow">People · Wellbeing</p>
    <h1>Health &amp; education</h1>
    <p class="lede">How long Arunikians live, how healthy they are, and how much schooling they get.</p>
  </section>
  <div class="tabs" role="tablist" aria-label="Health or education">
    <button id="tab-health" class="tab active" type="button" role="tab" aria-selected="true">Health</button>
    <button id="tab-education" class="tab" type="button" role="tab" aria-selected="false">Education</button>
  </div>
  <section class="panel" id="health-panel">
    <div class="panel-head"><h2>Life expectancy at birth</h2><p>Years, both sexes</p></div>
    ${lineChart(life, { label: 'Life expectancy 2015 to 2025', format: (v) => v.toFixed(1), highlight: life.length - 1 })}
    ${sourceNote('Life tables 2015–2025, civil registration and vital statistics')}
    <p class="insight">Life expectancy rose 2.6 years in a decade, to 76.4 in 2025. Women live
    79.1 years on average, men 73.8 — a gap of 5.3 years, narrower than in 2015.</p>
  </section>
  <section class="panel" id="education-panel" hidden>
    <div class="panel-head"><h2>Schooling</h2><p>Enrolment and attainment</p></div>
    ${hbarChart([
      { label: 'Primary enrolment', value: 99.1, colour: '#0b5e57' },
      { label: 'Secondary enrolment', value: 94.3, colour: '#17756e' },
      { label: 'Tertiary enrolment', value: 41.7, colour: '#e8a33d' },
    ], { label: 'Enrolment by level' })}
    ${sourceNote('Education statistics 2024–2025, Ministry of Education school census')}
    <p class="insight">Almost every child finishes primary school, and 94 in 100 are in secondary
    school. Tertiary enrolment has doubled since 2015, to 41.7% — the fastest rise
    in the region.</p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Health &amp; education in figures</h2><p>Latest available year</p></div>
    <table>
      <thead><tr><th>Indicator</th><th>Value</th><th>Year</th><th>Note</th></tr></thead>
      <tbody>
        ${HEALTH_EDUCATION.map((h) => `<tr><td>${h.label}</td><td><strong>${h.value}</strong></td><td>${h.year}</td><td>${h.note}</td></tr>`).join('')}
      </tbody>
    </table>
    ${sourceNote('Health facility register, medical council register and education statistics')}
  </section>`;
}

export function viewEnvironment() {
  const ren = RENEWABLES.map((r) => ({ x: r.year, y: r.value }));
  return `
  <section class="page-head">
    <p class="eyebrow">Land · Sea · Air</p>
    <h1>Environment &amp; energy</h1>
    <p class="lede">Arunika's forests, coasts and power — and how fast the country is switching
    to renewable electricity.</p>
  </section>
  <section class="kpi-grid" aria-label="Environment indicators">
    ${ENVIRONMENT.map((e) => `
      <article class="kpi">
        <h3>${e.label}</h3>
        <p class="kpi-value">${e.value}</p>
        <p class="kpi-year">${e.year} · ${e.note}</p>
      </article>`).join('')}
  </section>
  <div class="two-col">
    <section class="panel">
      <div class="panel-head"><h2>Renewable electricity, 2015–2025</h2><p>Share of generation, %</p></div>
      ${lineChart(ren, { label: 'Renewable share of electricity 2015 to 2025', format: (v) => v.toFixed(1) + '%', highlight: ren.length - 1 })}
      ${sourceNote('Energy balance 2015–2025, released 5 September 2025')}
      <p class="insight">Renewables now make 46.2% of Arunika's electricity, up from 31.2% in 2015.
      Hydro does most of the work; geothermal, from the volcanic Highlands, is
      the second source and still growing.</p>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Electricity mix, 2025</h2><p>Share of generation</p></div>
      ${hbarChart(ENERGY_MIX.map((m) => ({ label: m.source, value: m.share, colour: ['Hydro', 'Geothermal', 'Solar', 'Wind'].includes(m.source) ? '#0b5e57' : '#b0893a' })), { label: 'Electricity generation mix 2025' })}
      ${sourceNote('Energy balance 2025')}
      <p class="insight">Coal has fallen from 29% of generation in 2015 to 16.2% today. The
      government's target is 60% renewables by 2030.</p>
    </section>
  </div>`;
}

export function viewData() {
  return `
  <section class="page-head">
    <p class="eyebrow">Open data</p>
    <h1>Data &amp; publications</h1>
    <p class="lede">Every dataset ANSO publishes, in one place. Search by name or topic, then
    download the file. All data is free to use with attribution to ANSO.</p>
  </section>
  <section class="panel">
    <div class="panel-head">
      <h2>All datasets</h2>
      <label class="search-box">Search datasets
        <input id="dataset-search" type="search" placeholder="Try “population”, “prices” or “trade”…" aria-label="Search datasets">
      </label>
    </div>
    <p class="result-count" id="dataset-count">${DATASETS.length} datasets</p>
    <table id="dataset-table">
      <thead><tr><th>Dataset</th><th>Topic</th><th>Years</th><th>Format</th><th>Updated</th><th>Download</th></tr></thead>
      <tbody>
        ${DATASETS.map((d) => `<tr data-search="${(d.name + ' ' + d.topic).toLowerCase()}">
          <td>${d.name}</td><td>${d.topic}</td><td>${d.years}</td><td>${d.format}</td><td>${d.updated}</td>
          <td>${d.file ? `<a href="${d.file}" download>Download CSV</a>` : 'On request'}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <p class="insight">Datasets marked “On request” are published as printed tables; email
    data@anso.arunika.example to ask for the file. Figures in this site's charts
    are drawn from the datasets listed here.</p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>How to cite ANSO</h2><p>Attribution</p></div>
    <p>Arunika National Statistics Office (2025). <em>Population Estimates, mid-2025.</em>
    Port Selara: ANSO. Figures reused from this site should name the dataset and
    the release date shown beside it.</p>
  </section>`;
}
