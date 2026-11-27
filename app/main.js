// Router and controls for the statistics site.
//
// Routes (all reached by a link in the header nav):
//   #/            Overview — key indicators, population trend, latest releases
//   #/population  Population & demography — year picker, age, urban/rural, regions
//   #/economy     Economy — GDP toggle, sectors, exports, inflation, unemployment
//   #/health      Health & education — Health / Education tabs
//   #/environment Environment & energy — renewables, electricity mix
//   #/data        Data & publications — live dataset search
//
// Nothing here fetches anything: every figure is already in data.js.

import { GDP_BY_YEAR, GDP_PER_CAPITA, POPULATION_BY_YEAR } from './data.js';
import { lineChart } from './charts.js';
import {
  viewData, viewEconomy, viewEnvironment, viewHealth, viewOverview, viewPopulation,
} from './views.js';

const ROUTES = {
  '/': viewOverview,
  '/population': viewPopulation,
  '/economy': viewEconomy,
  '/health': viewHealth,
  '/environment': viewEnvironment,
  '/data': viewData,
};

const TITLES = {
  '/': 'Arunika in numbers',
  '/population': 'Population & demography',
  '/economy': 'Economy',
  '/health': 'Health & education',
  '/environment': 'Environment & energy',
  '/data': 'Data & publications',
};

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav a')];

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  document.title = `${TITLES[route]} — Arunika National Statistics Office`;
  navLinks.forEach((a) => {
    const on = a.getAttribute('href') === `#${route}`;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls(route);
  window.scrollTo(0, 0);
}

// Every control on every page does what it says. Each is wired here, after
// the view renders, so a control that cannot work is never shown.
function wireControls(route) {
  if (route === '/population') {
    const select = document.getElementById('pop-year');
    const readout = document.getElementById('pop-readout');
    select.addEventListener('change', () => {
      const year = Number(select.value);
      const row = POPULATION_BY_YEAR.find((p) => p.year === year);
      readout.innerHTML = `In <strong>${year}</strong>, Arunika had <strong>${row.value.toFixed(2)} million</strong> people.`;
    });
  }

  if (route === '/economy') {
    const chart = document.getElementById('gdp-chart');
    const totalBtn = document.getElementById('gdp-total');
    const percapBtn = document.getElementById('gdp-percap');
    const draw = (perCapita) => {
      const series = (perCapita ? GDP_PER_CAPITA : GDP_BY_YEAR).map((g) => ({ x: g.year, y: g.value }));
      chart.innerHTML = lineChart(series, {
        label: perCapita ? 'GDP per capita 2015 to 2024' : 'GDP of Arunika 2015 to 2024',
        format: perCapita ? (v) => '$' + v.toLocaleString('en-US') : (v) => '$' + v.toFixed(1) + 'bn',
        highlight: series.length - 1,
      });
      totalBtn.classList.toggle('active', !perCapita);
      percapBtn.classList.toggle('active', perCapita);
    };
    totalBtn.addEventListener('click', () => draw(false));
    percapBtn.addEventListener('click', () => draw(true));
  }

  if (route === '/health') {
    const healthTab = document.getElementById('tab-health');
    const eduTab = document.getElementById('tab-education');
    const healthPanel = document.getElementById('health-panel');
    const eduPanel = document.getElementById('education-panel');
    const show = (education) => {
      healthTab.classList.toggle('active', !education);
      eduTab.classList.toggle('active', education);
      healthTab.setAttribute('aria-selected', String(!education));
      eduTab.setAttribute('aria-selected', String(education));
      healthPanel.hidden = education;
      eduPanel.hidden = !education;
    };
    healthTab.addEventListener('click', () => show(false));
    eduTab.addEventListener('click', () => show(true));
  }

  if (route === '/data') {
    const input = document.getElementById('dataset-search');
    const count = document.getElementById('dataset-count');
    const rows = [...document.querySelectorAll('#dataset-table tbody tr')];
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      rows.forEach((row) => {
        const match = !q || row.dataset.search.includes(q);
        row.style.display = match ? '' : 'none';
        if (match) shown += 1;
      });
      count.textContent = shown === rows.length
        ? `${rows.length} datasets`
        : `${shown} of ${rows.length} datasets match “${input.value.trim()}”`;
    });
  }
}

window.addEventListener('hashchange', render);
render();
