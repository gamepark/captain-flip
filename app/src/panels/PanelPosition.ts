export const PANEL_FONT_SIZE = 0.438
export const PANEL_WIDTH_EM = 28 // in panel em
const PANEL_GAP_EM = 1 // in panel em

// Table boundaries
const TABLE_X_MIN = -32
const TABLE_Y_MIN = -5

/**
 * Get panel CSS position in panel-em units (for CSS top/left)
 */
export function getPanelCssPosition(index: number, playerCount: number) {
  const top = 0

  if (playerCount === 2) {
    const left = index === 0 ? 1 : ((-TABLE_X_MIN - TABLE_X_MIN) / PANEL_FONT_SIZE) - PANEL_WIDTH_EM - 1
    return { top, left }
  }

  // 3+ players: center horizontally
  // Total table width in panel-em
  const tableWidthEm = (-TABLE_X_MIN - TABLE_X_MIN) / PANEL_FONT_SIZE
  const totalPanelsWidth = playerCount * PANEL_WIDTH_EM + (playerCount - 1) * PANEL_GAP_EM
  const startLeft = (tableWidthEm - totalPanelsWidth) / 2
  const left = startLeft + index * (PANEL_WIDTH_EM + PANEL_GAP_EM)

  return { top, left }
}

/**
 * Get panel center position in TABLE coordinates (for locators/animations)
 */
export function getPanelTablePosition(index: number, playerCount: number) {
  const { top, left } = getPanelCssPosition(index, playerCount)
  // Convert panel-em to table coords: multiply by PANEL_FONT_SIZE, then offset by table origin
  const tableX = TABLE_X_MIN + left * PANEL_FONT_SIZE + (PANEL_WIDTH_EM * PANEL_FONT_SIZE) / 2
  const tableY = TABLE_Y_MIN + top * PANEL_FONT_SIZE + (7 * PANEL_FONT_SIZE) / 2
  return { x: tableX, y: tableY }
}

/**
 * Get panel height in table coordinates
 */
export function getPanelHeight() {
  return 7 * PANEL_FONT_SIZE
}
