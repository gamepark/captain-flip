import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { BoardHelper } from './helper/BoardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    if (this.hasTreasureMap) {
      moves.push(
        this.material(MaterialType.Coin).createItem({
          location: {
            type: LocationType.PlayerCoin,
            player: this.player
          },
          quantity: 1
        })
      )
    }

    if (this.mustGoToScoring) {
      moves.push(this.startRule(RuleId.ParrotEndOfGame))
    } else {
      moves.push(this.startPlayerTurn(RuleId.DrawCharacterTile, this.nextPlayer))
    }
    return moves
  }

  get hasTreasureMap() {
    return this.material(MaterialType.TreasureMapToken)
      .location(LocationType.PlayerTreasureMapToken)
      .player(this.player)
      .length > 0
  }

  get mustGoToScoring() {
    if (this.player !== this.game.players[this.game.players.length - 1]) return false
    return this.game.players.some((p) => new BoardHelper(this.game, p).hasTriggeredEndOfGame);
  }

  onRuleEnd() {
    this.forget(Memory.PlacedCard)
    this.forget(Memory.BoardEffect)
    return []
  }
}