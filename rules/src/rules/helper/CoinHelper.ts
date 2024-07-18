import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'

export class CoinHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get coins() {
    return sum(
      this
      .material(MaterialType.Coin)
      .player(this.player)
      .getItems()
      .map((item) => item.id)
    )
  }
}