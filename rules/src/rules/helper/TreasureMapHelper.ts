import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { sum } from 'es-toolkit/compat'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { TreasureMapType } from '../../material/TreasureMapType'
import { PlayerId } from '../../PlayerId'

export class TreasureMapHelper extends MaterialRulesPart {
  readonly player: PlayerId

  constructor(game: MaterialGame, player: PlayerId) {
    super(game)
    this.player = player
  }

  get playerMaps() {
    return this.material(MaterialType.TreasureMapToken)
      .location(LocationType.PlayerTreasureMapToken)
      .player(this.player)
  }

  hasMap(type?: TreasureMapType) {
    if (type === undefined) return this.playerMaps.length > 0
    return this.playerMaps.filter((item) => item.id === type).length > 0
  }

  hasCursedMap() {
    return this.hasMap(TreasureMapType.Cursed)
  }

  hasInflamedMap() {
    return this.hasMap(TreasureMapType.Inflamed)
  }

  getEndOfTurnCoins() {
    let coins = 0
    for (const map of this.playerMaps.getItems()) {
      switch (map.id) {
        case TreasureMapType.Base:
        case undefined:
          coins += 1
          break
        case TreasureMapType.Cursed:
          coins += 2
          break
        case TreasureMapType.Inflamed:
          coins += 1
          break
        case TreasureMapType.AllDirections:
          coins += this.getAllDirectionsCoins(map)
          break
      }
    }
    return coins
  }

  getAllDirectionsCoins(map: { location: { rotation?: boolean | number } }) {
    const rotation = typeof map.location.rotation === 'number' ? map.location.rotation : 0
    const values = [1, 2, 1, 3]
    return values[rotation % 4]
  }

  get bombCount() {
    let count = 0
    if (this.hasInflamedMap()) count++
    return count
  }

  getPlayerCoins() {
    return sum(
      this.material(MaterialType.Coin)
        .player(this.player)
        .getItems().map((item) => (item.quantity ?? 1) * item.id)
    )
  }
}
