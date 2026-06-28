#!/usr/bin/env node
/**
 * Writes .git/hooks/pre-commit so the CSS data file is regenerated
 * and staged automatically before every commit.
 *
 * Runs automatically via `npm run prepare` (i.e. after npm install).
 */

import { writeFileSync, chmodSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const hooksDir = join(root, '.git', 'hooks')
const hookFile = join(hooksDir, 'pre-commit')

try {
  if (!existsSync(hooksDir)) mkdirSync(hooksDir, { recursive: true })

  writeFileSync(hookFile, `#!/bin/sh\nnode scripts/generate-css-data.mjs\ngit add .vscode/rv-design.css-data.json\n`, 'utf8')

  try { chmodSync(hookFile, 0o755) } catch {}

  console.log('✓ Installed pre-commit hook → .git/hooks/pre-commit')
} catch (err) {
  // Non-fatal — hook install fails in some CI / shallow-clone environments
  console.warn('⚠ Could not install pre-commit hook:', err.message)
}
