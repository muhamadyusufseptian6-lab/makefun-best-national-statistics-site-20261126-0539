// Hand-drawn SVG charts for the statistics site. No chart library is used:
// every chart is built from the data by the functions below, so the site
// loads nothing over the network and stays small.

function svgOpen(width, height, label) {
  // No xmlns attribute: this SVG is inlined into an HTML page, where the
  // HTML parser already puts <svg> in the SVG namespace.
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${label}">`;
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function fmt(n, decimals = 1) {
  return Number(n).toFixed(decimals).replace(/\.0$/, '');
}

// A line chart with labelled points and a light grid. points: [{x, y}].
// xLabel/valueLabel name the axes for screen readers and the caption.
export function lineChart(points, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 300;
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const iw = w - padL - padR, ih = h - padT - padB;
  const ys = points.map((p) => p.y);
  const dataMax = Math.max(...ys);
  const dataMin = Math.min(...ys);
  const max = niceMax(dataMax * 1.08);
  // When the values sit far above zero, a zero baseline flattens the trend
  // into a straight line; start the axis just below the lowest value instead.
  // The axis labels always show the real values, so nothing is hidden.
  const min = (dataMax - dataMin) < 0.5 * dataMax && dataMin > 0 ? dataMin * 0.9 : Math.min(0, dataMin * 0.92);
  const xAt = (i) => padL + (iw * i) / (points.length - 1);
  const yAt = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  const colour = opts.colour ?? '#0b5e57';
  let s = svgOpen(w, h, opts.label ?? 'Line chart');
  for (let g = 0; g <= 4; g++) {
    const v = min + ((max - min) * g) / 4;
    const y = yAt(v);
    s += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e3ded2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b6558">${opts.format ? opts.format(v) : fmt(v)}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.y).toFixed(1)}`).join(' ');
  s += `<path d="${path}" fill="none" stroke="${colour}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    const highlight = opts.highlight === i;
    s += `<circle cx="${xAt(i)}" cy="${yAt(p.y)}" r="${highlight ? 6 : 3.5}" fill="${highlight ? '#e8a33d' : '#ffffff'}" stroke="${colour}" stroke-width="2.5"/>`;
    if (highlight || opts.showValues) {
      // Keep the value label inside the chart: anchor the first point's
      // label to its left edge and the last point's to its right edge.
      const anchor = i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? padL + 2 : i === points.length - 1 ? w - padR - 2 : xAt(i);
      s += `<text x="${lx}" y="${yAt(p.y) - 12}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="#1d2b2a">${opts.format ? opts.format(p.y) : fmt(p.y)}</text>`;
    }
  });
  points.forEach((p, i) => {
    if (i % Math.ceil(points.length / 6) === 0 || i === points.length - 1) {
      s += `<text x="${xAt(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#6b6558">${p.x}</text>`;
    }
  });
  s += '</svg>';
  return s;
}

// A vertical bar chart. bars: [{label, value}].
export function barChart(bars, opts = {}) {
  const w = opts.width ?? 640;
  const h = opts.height ?? 300;
  const padL = 52, padR = 16, padT = 26, padB = 34;
  const iw = w - padL - padR, ih = h - padT - padB;
  const max = niceMax(Math.max(...bars.map((b) => b.value)) * 1.1);
  const colour = opts.colour ?? '#0b5e57';
  const slot = iw / bars.length;
  const bw = Math.min(46, slot * 0.62);
  let s = svgOpen(w, h, opts.label ?? 'Bar chart');
  for (let g = 0; g <= 4; g++) {
    const v = (max * g) / 4;
    const y = padT + ih - (ih * g) / 4;
    s += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" stroke="#e3ded2" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="#6b6558">${opts.format ? opts.format(v) : fmt(v)}</text>`;
  }
  bars.forEach((b, i) => {
    const x = padL + slot * i + (slot - bw) / 2;
    const bh = (b.value / max) * ih;
    const y = padT + ih - bh;
    const fill = i === opts.highlight ? '#e8a33d' : colour;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw}" height="${bh.toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2b2a">${opts.format ? opts.format(b.value) : fmt(b.value)}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#6b6558">${b.label}</text>`;
  });
  s += '</svg>';
  return s;
}

// A donut chart with a centre label. slices: [{label, share, colour}].
export function donutChart(slices, opts = {}) {
  const size = opts.size ?? 260;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, thick = 34;
  const total = slices.reduce((a, s) => a + s.share, 0);
  let s = svgOpen(size, size, opts.label ?? 'Donut chart');
  let angle = -Math.PI / 2;
  slices.forEach((sl) => {
    const frac = sl.share / total;
    const a0 = angle, a1 = angle + frac * Math.PI * 2;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}" fill="none" stroke="${sl.colour}" stroke-width="${thick}"/>`;
    angle = a1;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="#1d2b2a">${opts.centre ?? ''}</text>`;
  s += `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#6b6558">${opts.centreSub ?? ''}</text>`;
  s += '</svg>';
  return s;
}

// Horizontal bars with labels and values. rows: [{label, value, colour}].
export function hbarChart(rows, opts = {}) {
  const w = opts.width ?? 640;
  const rowH = 44;
  const h = rowH * rows.length + 14;
  const padL = 150, padR = 64, padT = 8;
  const iw = w - padL - padR;
  const max = Math.max(...rows.map((r) => r.value));
  let s = svgOpen(w, h, opts.label ?? 'Horizontal bar chart');
  rows.forEach((row, i) => {
    const y = padT + i * rowH;
    const bw = (row.value / max) * iw;
    s += `<text x="${padL - 10}" y="${y + 20}" text-anchor="end" font-size="13" fill="#1d2b2a">${row.label}</text>`;
    s += `<rect x="${padL}" y="${y + 6}" width="${bw.toFixed(1)}" height="20" rx="4" fill="${row.colour ?? '#0b5e57'}"/>`;
    s += `<text x="${padL + bw + 8}" y="${y + 21}" font-size="13" font-weight="700" fill="#1d2b2a">${opts.format ? opts.format(row.value) : fmt(row.value) + '%'}</text>`;
  });
  s += '</svg>';
  return s;
}

// A small sparkline for indicator cards. values: numbers.
export function sparkline(values, opts = {}) {
  const w = opts.width ?? 120;
  const h = opts.height ?? 36;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => `${((w * i) / (values.length - 1)).toFixed(1)},${(h - 4 - ((v - min) / span) * (h - 8)).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Trend"><polyline points="${pts}" fill="none" stroke="${opts.colour ?? '#0b5e57'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
