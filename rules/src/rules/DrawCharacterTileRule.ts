import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DrawCharacterTileRule extends PlayerTurnRule {
  onRuleStart() {
    // Snapshot only on the FIRST entry of the turn — Parrot/Monkey
    // can re-enter this rule mid-turn, and re-snapshotting then would
    // wipe out coins already gained earlier in the turn (breaking
    // Gambler's "no coins gained" condition).
    if (this.remind(Memory.CoinsAtStartOfTurn) === undefined) {
      this.memorize(Memory.CoinsAtStartOfTurn, new BoardHelper(this.game).getPlayerCoin(this.player))
    }
    const tiles = this.clothBagTiles
    const moves: MaterialMove[] = []
    moves.push(
      tiles.moveItem((item) => ({
        type: LocationType.PlayerHand,
        rotation: item.location.rotation,
        player: this.player
      }))
    )

    moves.push(
      this.startRule(RuleId.PlayTile)
    )

    return moves;
  }

  get clothBagTiles() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.ClothBag)
      .sort((item) => -item.location.x!)
  }

  getPlayerMoves() {
    return []
  }
}