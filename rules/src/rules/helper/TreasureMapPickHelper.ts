import { MaterialGame, MaterialRulesPart, isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'

/** Shared logic for every rule that lets a player "take a treasure
 *  map from the central area":
 *   - Cartographer character effect
 *   - BoardEffectTreasureMap
 *   - BoardEffectCoinAndTreasureMap
 *
 *  A rule can have one map to take (auto-play), no map (skip) or
 *  two maps to choose from (on Observatory / Board H). This helper
 *  centralises that decision so every rule implements it the same
 *  way. Each caller supplies its own "next move" (e.g. goNext() or
 *  startRule(BoardEffect)) via the `next` parameter. */
export class TreasureMapPickHelper extends MaterialRulesPart {
  readonly player: PlayerId

  constructor(game: MaterialGame, player: PlayerId) {
    super(game)
    this.player = player
  }

  /** One MoveItem per treasure map currently available to take —
   *  whether it's still on the central area or already held by
   *  another player. "Take the Treasure Map" means wherever it is. */
  getPickMoves() {
    return this.material(MaterialType.TreasureMapToken)
      .filter((item) =>
        item.location.type === LocationType.TreasureMapToken
        || (item.location.type === LocationType.PlayerTreasureMapToken && item.location.player !== this.player)
      )
      .moveItems({
        type: LocationType.PlayerTreasureMapToken,
        player: this.player
      })
  }

  /** Convenience for `onRuleStart`: returns the moves the rule
   *  should emit given the `next` transition it wants afterwards.
   *   - 0 picks available → `[next]` (skip straight through)
   *   - 1 pick available  → `[pick]` (auto-play — the rule's
   *     `afterItemMove` must detect the pick via `isPickMove`
   *     and emit `next` itself)
   *   - 2+ picks          → `[]` (let the player choose — the rule
   *     must also handle the after-move transition via
   *     `afterItemMove`)
   *
   *  Both "1 pick" and "2+ picks" go through `afterItemMove` to
   *  emit `next`, so the calling rule only needs one transition
   *  code path regardless of how the pick came about.
   */
  onRuleStartWithNext(next: any) {
    const moves = this.getPickMoves()
    if (moves.length === 0) return [next]
    if (moves.length === 1) return moves
    return []
  }

  /** Check whether an `ItemMove` is the "take a treasure map" move
   *  that we just emitted — used by rules that need to continue
   *  after the player has picked a map in the 2+ case. */
  static isPickMove(move: ItemMove): boolean {
    return isMoveItemType(MaterialType.TreasureMapToken)(move)
      && move.location.type === LocationType.PlayerTreasureMapToken
  }
}
