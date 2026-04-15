import { css } from '@emotion/react'
import { inkSoft, paper0 } from './palette'

/* ------------------------------------------------------------------
 * Framework button recipe — applied globally via theme.buttons.
 * Minimal visual override: parchment gradient + ink border + pill
 * radius. We deliberately do NOT touch padding / font-weight /
 * color so each consumer's structural defaults (Header, Dialog,
 * ItemMenu, ...) keep working unchanged.
 * ------------------------------------------------------------------ */
export const buttonsCss = css`
  color: var(--gp-on-surface) !important;
  background: linear-gradient(180deg, #fbf2d8, #ddc998) !important;
  border: 0.05em solid var(--gp-on-surface) !important;
  border-radius: 2em !important;

  &:hover:not(:disabled) {
    background: linear-gradient(180deg, #fff8e0, ${paper0}) !important;
  }

  &:active:not(:disabled) {
    filter: brightness(0.96);
  }
`

/* ------------------------------------------------------------------
 * Menu-side buttons (journal toggle, main menu, fullscreen, sound,
 * result, bug report, pop-buttons in corners, buttons inside the
 * open menu drawer...). All four theme.menu slots use this recipe.
 *
 * Strategy:
 *  - parchment-cream background to feel native to the theme
 *  - thin ink border + soft drop shadow
 *  - color: inkSoft is inherited by FontAwesome icons via the
 *    framework's `color: white` rules — we override them with a
 *    targeted selector on .svg-inline--fa, which is the class
 *    react-fontawesome puts on each rendered icon. This way we
 *    don't touch the LogoIcon (which is a custom <svg>) so it
 *    keeps its var(--gp-primary) brand colour intact.
 * ------------------------------------------------------------------ */
export const menuButtonCss = css`
  color: ${inkSoft} !important;
  background: linear-gradient(180deg, #fbf2d8, #ddc998) !important;
  border: 0.06em solid ${inkSoft} !important;
  box-shadow: 0.05em 0.05em 0.1em rgba(0, 0, 0, 0.28) !important;

  &:hover:not(:disabled) {
    background: linear-gradient(180deg, #fff8e0, ${paper0}) !important;
  }

  &:active:not(:disabled) {
    filter: brightness(0.96);
  }

  /* FontAwesome icons render as <svg class="svg-inline--fa ..."> —
   * target only those, not any other svg (the GP LogoIcon must
   * stay coloured by var(--gp-primary) to keep its brand identity). */
  & .svg-inline--fa {
    color: ${inkSoft} !important;
  }
`
