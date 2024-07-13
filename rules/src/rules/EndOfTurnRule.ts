import { MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CoinRule } from './effect/CoinRule'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends CoinRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    if (this.mustGoToScoring) {
      moves.push(this.startRule(RuleId.ParrotEndOfGame))
    } else {
      moves.push(this.startPlayerTurn(RuleId.DrawCharacterTile, this.nextPlayer))
    }
    return moves
  }

  getCoins() {
    return this.hasTreasureMap? 1: 0
  }

  get hasTreasureMap() {
    return this.material(MaterialType.TreasureMapToken)
      .location(LocationType.PlayerTreasureMapToken)
      .player(this.player)
      .length > 0
  }

  get mustGoToScoring() {
    if (this.player !== this.game.players[this.game.players.length - 1]) return false
    return this.game.players.some((p) => new BoardHelper(this.game).hasTriggeredEndOfGame(p));
  }

  onRuleEnd() {
    this.forget(Memory.PlacedCard)
    this.forget(Memory.BoardEffect)
    return []
  }
}