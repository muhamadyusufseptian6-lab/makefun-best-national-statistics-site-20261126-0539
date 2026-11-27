// Pre-submit checks for the national statistics site entry (Node 22+, stdlib only).
// Run: node tests/check.mjs
// Checks: main.ts runs twice into temp dirs with byte-identical output; output holds
// app/ + screenshots/ + dossier.json; screenshots are 3-4 PNG/JPEG, each <= 256 KiB,
// long side <= 1280, short side >= 360; no dotfile is copied into the output.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
let failures = 0;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failures++;
};

// JPEG/PNG dimensions without any dependency.
function imageSize(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off < buf.length) {
      if (buf[off] !== 0xff) break;
      const marker = buf[off + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { w: buf.readUInt16BE(off + 7), h: buf.readUInt16BE(off + 5) };
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  return null;
}

function walk(dir, base = '') {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (statSync(p).isDirectory()) out.push(...walk(p, rel));
    else out.push(rel);
  }
  return out.sort();
}

check('main.ts exists', existsSync(join(root, 'main.ts')));
check('app/index.html exists', existsSync(join(root, 'app', 'index.html')));
check('vendor/makefun-frontend.ts exists', existsSync(join(root, 'vendor', 'makefun-frontend.ts')));
check('LICENSE exists', existsSync(join(root, 'LICENSE')));
check('README.md exists', existsSync(join(root, 'README.md')));

const shots = existsSync(join(root, 'screenshots'))
  ? readdirSync(join(root, 'screenshots')).filter((n) => !n.startsWith('.')).sort()
  : [];
check('3-4 screenshots', shots.length >= 3 && shots.length <= 4, `${shots.length} found`);
for (const name of shots) {
  const buf = readFileSync(join(root, 'screenshots', name));
  const size = imageSize(buf);
  check(`screenshot ${name} <= 256 KiB`, buf.length <= 262144, `${buf.length} bytes`);
  check(`screenshot ${name} dimensions`, !!size && Math.max(size.w, size.h) <= 1280 && Math.min(size.w, size.h) >= 360,
    size ? `${size.w}x${size.h}` : 'unreadable');
  check(`screenshot ${name} name valid`, /^[A-Za-z0-9._-]{1,128}$/.test(name) && !name.startsWith('-'));
}

// Run main.ts twice into temp dirs; outputs must be byte-identical (determinism).
const outA = mkdtempSync(join(tmpdir(), 'statsite-a-'));
const outB = mkdtempSync(join(tmpdir(), 'statsite-b-'));
try {
  execFileSync('node', [join(root, 'main.ts')], { env: { ...process.env, MAKEFUN_OUTPUT_DIR: outA }, stdio: 'pipe' });
  execFileSync('node', [join(root, 'main.ts')], { env: { ...process.env, MAKEFUN_OUTPUT_DIR: outB }, stdio: 'pipe' });
  check('main.ts runs (run A)', existsSync(join(outA, 'dossier.json')));
  check('main.ts runs (run B)', existsSync(join(outB, 'dossier.json')));
  const filesA = walk(outA);
  const filesB = walk(outB);
  check('deterministic file list', JSON.stringify(filesA) === JSON.stringify(filesB));
  let identical = true;
  for (const f of filesA) {
    if (!readFileSync(join(outA, f)).equals(readFileSync(join(outB, f)))) { identical = false; break; }
  }
  check('deterministic bytes (two runs identical)', identical);
  check('output holds app/index.html', existsSync(join(outA, 'app', 'index.html')));
  check('output holds dossier.json', existsSync(join(outA, 'dossier.json')));
  check('output holds screenshots', existsSync(join(outA, 'screenshots', shots[0] ?? '')));
  const dotfiles = filesA.filter((f) => f.split('/').some((part) => part.startsWith('.')));
  check('no dotfile in output', dotfiles.length === 0, dotfiles.join(', '));
  const dossier = JSON.parse(readFileSync(join(outA, 'dossier.json'), 'utf8'));
  check('dossier.json parses', typeof dossier === 'object' && dossier !== null);
  console.log(`      output files: ${filesA.length}`);
} catch (err) {
  check('main.ts runs twice without error', false, String(err.message ?? err).slice(0, 200));
} finally {
  rmSync(outA, { recursive: true, force: true });
  rmSync(outB, { recursive: true, force: true });
}

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
