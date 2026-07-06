// Panel CSS font sizes. The 2-player layout keeps its original size; the
// 3+ layout computes its panel font from the mini-board scale so each
// panel sits visually centred on top of its mini board.
const PANEL_FONT_SIZE_2P = 0.438
export const PANEL_WIDTH_EM = 28

// Table boundaries (kept in sync with GameDisplay.tsx)
const TABLE_X_MIN = -32
const TABLE_X_MAX = 32
const TABLE_Y_MIN = -5

// Adventure board (full size) and gap between consecutive boards in the
// top row. Gap is the only fixed value — mini-board scale is derived so
// the row exactly fills the table width.
const BOARD_FULL_WIDTH = 24
const BOARD_GAP = 1.5
// Side margin: boards never touch the table edge. Used as-is for 2p/3p;
// the 4-panel row (4p/5p) derives a wider margin — see getSideMargin.
const TABLE_SIDE_MARGIN = 0.2
// Clear gap we want between the outermost panel edge and the table edge in
// the 4-panel row, where the panels are slightly wider than the minis they
// sit on (so the panel — not the mini — is the binding outer element).
const TABLE_EDGE_GAP = 0.6

// Buffer between the top row's mini bottom and the floating panel.
const FLOATING_BUFFER = 0

// Compatibility export.
export const PANEL_FONT_SIZE = PANEL_FONT_SIZE_2P
export const PANEL_SMALL_FONT_SIZE = PANEL_FONT_SIZE_2P

/** Number of panels in the top row. */
function topRowCount(playerCount: number): number {
  if (playerCount <= 2) return playerCount
  if (playerCount === 3) return 3
  // 4p has 4 panels in the top row; 5p too with slot 4 floating.
  return 4
}

/** Side margin between the top row and each table edge.
 *
 *  2p/3p sit well inside the table and keep the flat TABLE_SIDE_MARGIN.
 *
 *  The 4-panel row (4p & 5p) packs the central board + 3 minis edge-to-edge,
 *  but each player PANEL is a touch WIDER than the mini board it floats on,
 *  so the two outer panels would spill past the table edge. We reserve a side
 *  margin equal to that panel overhang plus TABLE_EDGE_GAP. Solving the
 *  margin -> miniWidth -> overhang fixpoint gives the mini width directly:
 *  the outer panel edge then lands exactly TABLE_EDGE_GAP inside the table. */
function getSideMargin(playerCount: number): number {
  if (playerCount <= 3) return TABLE_SIDE_MARGIN
  const minis = topRowCount(playerCount) - 1
  const panelWidth = PANEL_WIDTH_EM * PANEL_FONT_SIZE_2P
  const tableWidth = TABLE_X_MAX - TABLE_X_MIN
  const mini = (tableWidth - 2 * TABLE_EDGE_GAP - panelWidth - BOARD_FULL_WIDTH - minis * BOARD_GAP) / (minis - 1)
  return TABLE_EDGE_GAP + (panelWidth - mini) / 2
}

/** Mini-board scale: derived per player count so a row of (1 central +
 *  N minis) with uniform `BOARD_GAP` fills the table width. Smaller
 *  player counts get bigger minis. 3p shrinks slightly — at full fill
 *  the minis dominate the table. */
function getMiniScale(playerCount: number): number {
  if (playerCount <= 2) return 1
  const n = topRowCount(playerCount)
  const tableWidth = TABLE_X_MAX - TABLE_X_MIN - 2 * getSideMargin(playerCount)
  const minisCount = n - 1
  const remaining = tableWidth - BOARD_FULL_WIDTH - (n - 1) * BOARD_GAP
  const scale = (remaining / minisCount) / BOARD_FULL_WIDTH
  return playerCount === 3 ? scale * 0.85 : scale
}

/** Mini-board visual width (table em). */
function miniWidth(playerCount: number): number {
  return BOARD_FULL_WIDTH * getMiniScale(playerCount)
}

/** Gap between consecutive boards in the top row, computed so the row
 *  exactly spans the table width (between the side margins). */
function rowGap(playerCount: number): number {
  if (playerCount <= 2) return BOARD_GAP
  const n = topRowCount(playerCount)
  const tableWidth = TABLE_X_MAX - TABLE_X_MIN - 2 * getSideMargin(playerCount)
  return (tableWidth - BOARD_FULL_WIDTH - (n - 1) * miniWidth(playerCount)) / (n - 1)
}

/** Panel font-size: chosen so each panel renders at the same visual
 *  width as the mini board it sits above. */
export function getPanelFontSize(_playerCount: number): number {
  // Player panels keep a constant size across every layout.
  return PANEL_FONT_SIZE_2P
}

const panelFontSize = getPanelFontSize

function panelTableHeight(playerCount: number): number {
  return 7 * panelFontSize(playerCount)
}

// ---- Public API ----

export function getPanelTableWidth(_slot: number, playerCount: number): number {
  return PANEL_WIDTH_EM * panelFontSize(playerCount)
}

export function isFloatingSlot(slot: number, playerCount: number): boolean {
  return slot >= topRowCount(playerCount)
}

/**
 * Centre x (table em) of the board / panel for slot `slot`. Slot 1 is
 * the viewed (central) board. The row is laid out from the left edge:
 *
 *   [mini_0][gap][mini_1 OR central][gap][...][gap][mini_n-1]
 *
 * where exactly one position holds the central full-size board.
 */
function topRowSlotX(slot: number, playerCount: number): number {
  const n = topRowCount(playerCount)
  const m = miniWidth(playerCount)
  const gap = rowGap(playerCount)
  // Walk from the left margin, accumulating widths and gaps.
  let cursor = TABLE_X_MIN + getSideMargin(playerCount)
  let result = 0
  for (let i = 0; i < n; i++) {
    const w = i === 1 ? BOARD_FULL_WIDTH : m
    const centre = cursor + w / 2
    if (i === slot) {
      result = centre
    }
    cursor += w + (i < n - 1 ? gap : 0)
  }
  return result
}

export function getPanelTablePosition(slot: number, playerCount: number) {
  const h = panelTableHeight(playerCount)
  if (playerCount <= 2) {
    const w = PANEL_WIDTH_EM * PANEL_FONT_SIZE_2P
    const x = slot === 0
      ? TABLE_X_MIN + 1 * PANEL_FONT_SIZE_2P + w / 2
      : TABLE_X_MAX - 1 * PANEL_FONT_SIZE_2P - w / 2
    return { x, y: TABLE_Y_MIN + h / 2 }
  }
  if (isFloatingSlot(slot, playerCount)) {
    // Sit just below the top-row mini bottom so the floating panel
    // doesn't overlap the mini above it.
    const topRowMiniBottom = (TABLE_Y_MIN + 7 * panelFontSize(playerCount)) + miniWidth(playerCount) + 0.5
    return {
      x: topRowSlotX(topRowCount(playerCount) - 1, playerCount),
      y: topRowMiniBottom + FLOATING_BUFFER + h / 2
    }
  }
  return { x: topRowSlotX(slot, playerCount), y: TABLE_Y_MIN + h / 2 }
}

export function getPanelCssPosition(slot: number, playerCount: number) {
  const { x, y } = getPanelTablePosition(slot, playerCount)
  const fontSize = panelFontSize(playerCount)
  const widthTable = getPanelTableWidth(slot, playerCount)
  const heightTable = panelTableHeight(playerCount)
  const leftTable = (x - TABLE_X_MIN) - widthTable / 2
  const topTable = (y - TABLE_Y_MIN) - heightTable / 2
  return { top: topTable / fontSize, left: leftTable / fontSize }
}

export function getMiniBoardTablePosition(slot: number, playerCount: number) {
  const panel = getPanelTablePosition(slot, playerCount)
  const miniHalf = miniWidth(playerCount) / 2
  // Sit just below the panel bottom so the mini doesn't get clipped by it.
  const panelBottom = panel.y + panelTableHeight(playerCount) / 2
  return { x: panel.x, y: panelBottom + miniHalf + 0.5 }
}

/** Mini-board scale exposed for the locator. */
export function getCurrentMiniScale(playerCount: number): number {
  return getMiniScale(playerCount)
}

export function getPanelSlot(playerIndex: number, viewedIndex: number, playerCount: number): number {
  if (playerCount <= 2) return playerIndex
  if (playerIndex === viewedIndex) return 1

  // Turn order reads left-to-right on screen: the viewed player sits
  // at slot 1, the players who come AFTER them in turn order extend to
  // the right, and the player right BEFORE them wraps to the far left.
  //   slot 0 = previous (farthest to the left)
  //   slot 1 = viewed
  //   slot 2 = next
  //   slot 3 = next-next, ...
  // For 5p the last slot (4) floats below the rightmost top-row mini.
  const offset = (playerIndex - viewedIndex + playerCount) % playerCount
  if (offset === playerCount - 1) return 0
  return offset + 1
}
