/**
 * Captain Flip — single source of truth for the parchment / pirate
 * palette. Every other style module (help popups, log panel, player
 * panels, buttons...) should import from this file instead of
 * duplicating hex values.
 */

/* ---------- Ink & paper (dominant tones) ---------- */
export const ink = '#2b1d10'
export const inkSoft = '#4b3520'
export const inkFaint = '#6a4c2b'
export const paper0 = '#f3e7cc'
export const paper = '#e9decb'
export const paper2 = '#d9c393'

/* ---------- Accents (sealing wax red, aged brass) ---------- */
export const accent = '#8b1e1e'
export const accentDk = '#5d1010'
export const accentHi = '#c83838'
export const brass = '#a47428'
export const brassHi = '#f2d07a'
export const brassDk = '#5b3d12'

/* ---------- Pirate captain colours (player coding) ---------- *
 * Used for the active-player ring, log entry borders, and any
 * place the framework asks for a per-player accent. They are
 * ordered for seats 1-4. Keep them dark enough to read on the
 * parchment background.
 * -------------------------------------------------------------- */
export const captains = {
  bordeaux: accent,     // seat 1 — red sealing wax
  moss: '#3a5e2a',      // seat 2 — mossy green
  navy: '#1e3a5f',      // seat 3 — deep navy
  ochre: '#a06218'      // seat 4 — burnt gold
}
export const captainRing: [string, string] = [brassHi, brass]
