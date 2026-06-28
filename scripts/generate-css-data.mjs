#!/usr/bin/env node
/**
 * Reads tokens/*.css and writes .vscode/rv-design.css-data.json
 * for VS Code CSS / SCSS / Vue IntelliSense (css.customData).
 *
 * Run manually:  node scripts/generate-css-data.mjs
 * Auto-runs:     pre-commit hook (installed via npm run prepare)
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensDir = join(root, 'tokens')
const outFile = join(root, '.vscode', 'rv-design.css-data.json')

// ---------------------------------------------------------------------------

function parseTokens(src) {
  const tokens = []
  const lines = src.split('\n')
  let section = ''
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed || trimmed === '}' || trimmed.startsWith('@media') || trimmed.startsWith(':root') || trimmed.startsWith('[data')) {
      i++
      continue
    }

    // ---- Full-line comment → update section label -------------------------
    if (trimmed.startsWith('/*') && !trimmed.includes('--rv-')) {
      if (trimmed.endsWith('*/')) {
        // Single-line: /* ---- Heading text ---- */ or /* Short text */
        const text = trimmed
          .slice(2, -2)
          .replace(/^[-=\s*]+|[-=\s*]+$/g, '')
          .trim()
        if (text.length > 1) section = text
      } else {
        // Multi-line block: collect until */
        const blockParts = [trimmed.slice(2).trim()]
        i++
        while (i < lines.length && !lines[i].includes('*/')) {
          blockParts.push(lines[i].trim().replace(/^\*+\s?/, ''))
          i++
        }
        // Skip file-level separator headers (first line is all =/- chars)
        if (/^[=\-]{8,}/.test(blockParts[0])) {
          i++
          continue
        }
        const text = blockParts
          .join(' ')
          .replace(/^[-=*\s]+|[-=*\s]+$/g, '')
          .replace(/\s+/g, ' ')
          .trim()
        if (text.length > 1) section = text
      }
      i++
      continue
    }

    // ---- Property declaration (value may span multiple lines) -------------
    const propMatch = trimmed.match(/^(--rv-[\w-]+)\s*:\s*(.*)$/)
    if (propMatch) {
      const name = propMatch[1]
      let chunks = [propMatch[2]]

      // Collect continuation lines until we hit a semicolon
      while (!chunks.join('').includes(';') && i + 1 < lines.length) {
        i++
        const next = lines[i].trim()
        // Stop at next declaration, comment, or closing brace
        if (/^(--rv-|\/\*|\})/.test(next)) { i--; break }
        chunks.push(next)
      }

      const full = chunks.join(' ')
      const semiIdx = full.indexOf(';')
      const rawValue = (semiIdx >= 0 ? full.slice(0, semiIdx) : full).trim()
      const afterSemi = semiIdx >= 0 ? full.slice(semiIdx + 1) : ''
      const inlineComment = afterSemi.match(/\/\*\s*([^*]*?)\s*\*\//)?.[1].trim() ?? ''

      // Truncate long values (shadows, transitions, font stacks)
      const shortValue = rawValue.length > 50 ? rawValue.slice(0, 47) + '…' : rawValue

      // Inline comment wins; fall back to section; value always appended
      const label = inlineComment || section
      const description = label && shortValue
        ? `${label} — ${shortValue}`
        : label || shortValue || name

      tokens.push({ name, description })
      i++
      continue
    }

    i++
  }

  return tokens
}

// ---------------------------------------------------------------------------

const files = readdirSync(tokensDir).filter(f => f.endsWith('.css')).sort()
const properties = []

for (const file of files) {
  const src = readFileSync(join(tokensDir, file), 'utf8')
  properties.push(...parseTokens(src))
}

const output = {
  version: 1.1,
  properties: properties.map(({ name, description }) => ({ name, description })),
}

writeFileSync(outFile, JSON.stringify(output, null, 2) + '\n')
console.log(`✓ Generated ${properties.length} token entries → .vscode/rv-design.css-data.json`)
