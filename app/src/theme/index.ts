import { BottomBarNavigation } from '@gamepark/react-game'
import {
  chatBarCss,
  historyEntryCss,
  journalTabCss,
  journalTabSelectedCss
} from '../logs/logStyles'
import { buttonsCss, menuButtonCss } from './buttons'
import { headerBarCss } from './header'
import {
  accent,
  accentDk,
  brassHi,
  captainRing,
  ink,
  inkFaint,
  inkSoft,
  paper,
  paper0
} from './palette'
import { parchmentDialogCss, parchmentDrawerCss } from './parchment'
import { playerDataBadgeCss, playerPanelCss } from './playerPanel'
import { resultContainerCss } from './result'
import { timeStatsContainerCss } from './timeStats'
import { tutorialContainerCss, tutorialContentCss } from './tutorial'

/* ==================================================================
 * captainFlipTheme — the full theme object passed to GameProvider.
 * Each slot is assembled from a dedicated recipe file in this
 * folder so they can be tweaked independently without scrolling
 * through a single 200-line blob.
 * ================================================================== */
export const captainFlipTheme = {
  dialog: {
    backgroundColor: paper,
    color: ink,
    container: parchmentDialogCss,
    /* Framework-provided bottom bar with Previous / Next + counter
     * dots, used inside the material help popup to navigate between
     * same-location items (character tiles, treasure map variants...). */
    navigation: BottomBarNavigation
  },
  menu: {
    panel: parchmentDrawerCss,
    button: menuButtonCss,
    mainButton: menuButtonCss,
    popButton: menuButtonCss
  },
  journal: {
    tab: journalTabCss,
    tabSelected: journalTabSelectedCss,
    chatBar: chatBarCss,
    historyEntry: historyEntryCss
  },
  header: {
    bar: headerBarCss
    /* No header.buttons override: the framework now layers
     * theme.buttons on top of its own structural base (padding,
     * font-weight) so our parchment recipe is automatically applied
     * with the right header layout. */
  },
  playerPanel: {
    activeRingColors: captainRing,
    panel: playerPanelCss,
    dataBadge: playerDataBadgeCss
  },
  result: {
    border: accent,
    icon: brassHi,
    container: resultContainerCss
  },
  tutorial: {
    container: tutorialContainerCss,
    content: tutorialContentCss
  },
  timeStats: {
    container: timeStatsContainerCss,
    /* Soft parchment fills for the think/wait stats grid so the
     * dialog stays readable instead of screaming red. */
    thinkBackground: 'rgba(139, 30, 30, 0.12)',
    waitBackground: 'rgba(106, 76, 43, 0.12)'
  },
  buttons: buttonsCss,
  palette: {
    /* Primary = the warm dark brown used for ink, buttons, icons,
     * logos. Framework components that read var(--gp-primary) such
     * as the Menu LogoIcon will match the FontAwesome icons we
     * inherit from color:. */
    primary: inkSoft,
    primaryHover: ink,
    primaryActive: ink,
    primaryLight: inkFaint,
    primaryLighter: 'rgba(106, 76, 43, 0.4)',
    surface: paper0,
    onSurface: ink,
    onSurfaceFocus: 'rgba(139, 30, 30, 0.08)',
    onSurfaceActive: 'rgba(139, 30, 30, 0.18)',
    /* Danger stays sealing-wax red — keep the accent for destructive
     * actions so they still pop. */
    danger: accent,
    dangerHover: accentDk,
    dangerActive: accentDk,
    disabled: inkFaint
  }
}

/* Re-export palette & recipes for consumers that want to use them
 * directly without reaching into the theme/ sub-folder. */
export * from './buttons'
export * from './header'
export * from './palette'
export * from './parchment'
export * from './playerPanel'
export * from './result'
export * from './timeStats'
export * from './tutorial'
