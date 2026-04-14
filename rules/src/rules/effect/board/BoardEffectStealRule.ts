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
    if (neighbor !== undefined) {
      const stolen = this.computeSteal(neighbor)
      if (stolen > 0) {
        const available = new BoardHelper(this.game).getPlayerCoin(neighbor)
        const actual = Math.min(stolen, available)
        if (actual > 0) {
          moves.push(...this.material(MaterialType.Coin).money(coinValues).removeMoney(actual, { type: LocationType.PlayerCoin, player: neighbor }))
          moves.push(...this.gainCoinsMoves(actual))
        }
      }
    }
    moves.push(this.goNext())
    return moves
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

export class BoardEffectStealLeftRule extends BoardEffectStealRule {
  get direction() { return -1 }
}

export class BoardEffectStealRightRule extends BoardEffectStealRule {
  get direction() { return 1 }
}
