import { MaterialMove } from '@gamepark/rules-api'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { coinValues } from '../../../material/Coin'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerId } from '../../../PlayerId'
import { getCharacter } from '../../GetCharacter'
import { BoardHelper } from '../../helper/BoardHelper'
import { Memory } from '../../Memory'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectSteal = { type: BoardSpaceType }

abstract class BoardEffectStealRule extends BaseBoardEffect<BoardEffectSteal> {
  abstract get direction(): number

  onRuleStart() {
    const moves: MaterialMove[] = []
    const neighbor = this.getNeighbor()
    const actual = this.getCoins()
    if (neighbor !== undefined && actual > 0) {
      moves.push(
        ...this.material(MaterialType.Coin).money(coinValues).moveMoney(
          { type: LocationType.PlayerCoin, player: neighbor },
          { type: LocationType.PlayerCoin, player: this.player },
          actual
        )
      )
    }
    moves.push(this.goNext())
    return moves
  }

  /** Actual amount stolen from the neighbor: computed intent, capped
   *  by how many coins the victim actually owns. Exposed so log
   *  components can instantiate the rule and read the same amount the
   *  backend will apply. */
  getCoins() {
    const neighbor = this.getNeighbor()
    if (neighbor === undefined) return 0
    const stolen = this.computeSteal(neighbor)
    if (stolen <= 0) return 0
    const available = new BoardHelper(this.game).getPlayerCoin(neighbor)
    return Math.min(stolen, available)
  }

  computeSteal(neighbor: PlayerId) {
    const placedItem = this.material(MaterialType.CharacterTile).getItem(this.remind(Memory.PlacedCard))
    const placedCharacter = getCharacter(placedItem)
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(neighbor)
      .filter((item) => getCharacter(item) === placedCharacter)
      .length
  }

  getNeighbor(): PlayerId | undefined {
    const players = this.game.players
    const myIndex = players.indexOf(this.player)
    const neighborIndex = (myIndex + this.direction + players.length) % players.length
    if (neighborIndex === myIndex) return undefined
    return players[neighborIndex]
  }
}

// Captain Flip convention: the player to your LEFT (shown on the left of
// the screen) is the PREVIOUS player in turn order (myIndex - 1); the
// player to your RIGHT is the NEXT player (myIndex + 1).
export class BoardEffectStealLeftRule extends BoardEffectStealRule {
  get direction() { return -1 }
}

export class BoardEffectStealRightRule extends BoardEffectStealRule {
  get direction() { return 1 }
}
