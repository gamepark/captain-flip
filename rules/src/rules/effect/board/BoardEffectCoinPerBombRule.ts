import { hasBombWhenFilled, isBombEffect } from '../../../material/board/description/BoardSpaceGuards'
import { BoardSpaceType } from '../../../material/board/description/BoardSpaceType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { Character } from '../../../material/tiles/Character'
import { getCharacter } from '../../GetCharacter'
import { BoardHelper } from '../../helper/BoardHelper'
import { BaseBoardEffect } from './BaseBoardEffect'

type BoardEffectCoinPerBomb = { type: BoardSpaceType, value: number }

export class BoardEffectCoinPerBombRule extends BaseBoardEffect<BoardEffectCoinPerBomb> {
  getCoins() {
    return this.bombCount * this.effect.effect.value
  }

  get bombCount() {
    const helper = new BoardHelper(this.game)
    let count = 0

    // Count Gunners on board (they are bombs)
    count += this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) => getCharacter(item) === Character.Gunner)
      .length

    // Count uncovered bomb symbols on board
    for (const place of helper.places) {
      if (!isBombEffect(place.effect)) continue
      const occupied = this.material(MaterialType.CharacterTile)
        .location(LocationType.AdventureBoardCharacterTile)
        .player(this.player)
        .filter((item) => item.location.x === place.x && item.location.y === place.y)
        .length > 0
      if (!occupied) count++
    }

    // Count bombWhenFilled symbols (active when covered)
    for (const place of helper.places) {
      if (!hasBombWhenFilled(place.effect)) continue
      const occupied = this.material(MaterialType.CharacterTile)
        .location(LocationType.AdventureBoardCharacterTile)
        .player(this.player)
        .filter((item) => item.location.x === place.x && item.location.y === place.y)
        .length > 0
      if (occupied) count++
    }

    // TODO: count bombs from treasure map cards (Carte Enflammée)

    return count
  }
}
