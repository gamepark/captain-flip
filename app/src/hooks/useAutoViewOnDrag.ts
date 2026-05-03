import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { useAutoViewOnDrag as useAutoViewOnDragFwk, useRules } from '@gamepark/react-game'
import { getViewedPlayer, isMiniLayout } from '../locators/ViewHelper'

/**
 * Captain Flip switches the view to the dragging player only when the
 * layout actually centres a single board (3+ players). With 2 players
 * both boards are always shown, so no switch is needed.
 */
export const useAutoViewOnDrag = () => {
  const rules = useRules<CaptainFlipRules>()

  useAutoViewOnDragFwk((me) => {
    if (!rules) return undefined
    if (!isMiniLayout({ rules, player: me } as any)) return undefined
    const viewed = getViewedPlayer({ rules, player: me } as any)
    return viewed === me ? undefined : me
  })
}
