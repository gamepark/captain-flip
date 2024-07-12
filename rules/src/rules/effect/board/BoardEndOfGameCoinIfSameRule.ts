import { MaterialMove } from '@gamepark/rules-api'
import uniqBy from 'lodash/uniqBy'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerId } from '../../../PlayerId'
import { getCharacter } from '../../GetCharacter'
import { BaseBoardEndOfGameEffect } from './BaseBoardEndOfGameEffect'

type BoardEndOfGameCoinIfSame = { type: BoardSpaceType, value: number }
export class BoardEndOfGameCoinIfSameRule extends BaseBoardEndOfGameEffect<BoardEndOfGameCoinIfSame> {

  onRuleStart() {
    const moves: MaterialMove[] = []
    const columnSize = this.columnSize
    const effect = this.effect.effect
    for (const player of this.game.players) {

      const characters = this.getPlayerCharacters(player)
      const countDifferent = uniqBy(characters, (item) => getCharacter(item))?.length ?? 0
      if (characters.length === columnSize && countDifferent === 1) {
        moves.push(
          this.material(MaterialType.Coin).createItem({
            location: {
              type: LocationType.PlayerCoin,
              player: player
            },
            quantity: effect.value
          })
        )
      }

    }

    moves.push(this.goNext())
    return moves
  }

  get columnSize() {

    return this.effect.y + 1
  }

  getPlayerCharacters(playerId: PlayerId) {
    const effect = this.effect
    return this
      .material(MaterialType.CharacterTile)
      .player(playerId)
      .location((l) => l.type === LocationType.AdventureBoardCharacterTile && l.x === effect.x)
      .getItems()
  }



}