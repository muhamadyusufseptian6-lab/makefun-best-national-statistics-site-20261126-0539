// National statistics site entry (Node 22, standard library only).
//
// This program hands the site in: it copies this repository's app/ and
// screenshots/ into the output directory and writes dossier.json there with
// the vendored make.fun dossier library. The library must stay byte for byte
// the kit's copy, so vendor/makefun-frontend.ts is never edited.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Resolve the repository from this file's own location, never from the
// working directory, so the program works from anywhere.
const repoDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Dotfiles are never handed in: the scorer refuses an output holding one.
const notDotfile = (src) => !src.split('/').pop().startsWith('.');

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoDir, 'app'), join(outputDir, 'app'), { recursive: true, filter: notDotfile });

const shotsDir = join(repoDir, 'screenshots');
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) {
  for (const name of readdirSync(shotsDir)) {
    if (!name.startsWith('.')) {
      cpSync(join(shotsDir, name), join(outputDir, 'screenshots', name));
    }
  }
}

// The scorer's own caps, as the kit's reference/gate.json states them: the
// dossier text is capped at 160 KiB, at most 4 screenshots of at most
// 256 KiB each, app/ at most 993 files and directories and 16 MiB in all.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
