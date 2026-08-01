import { isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { CoinRule } from './effect/CoinRule'
import { PlaceTileHelper } from './helper/PlaceTileHelper'
import { TreasureMapHelper } from './helper/TreasureMapHelper'
import { Memory } from './Memory'

export class PlayTileRule extends CoinRule {
  getPlayerMoves() {
    const hand = this.hand
    const helper = new PlaceTileHelper(this.game, this.player)
    const moves: MaterialMove[] = [...helper.getPlacementMoves(hand)]

    if (!this.hasFlipped && !new TreasureMapHelper(this.game, this.player).hasCursedMap()) {
      moves.push(hand.rotateItem((item) => !item.location.rotation))
    }

    return moves
  }

  get hasFlipped() {
    return this.remind(Memory.Flipped)
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type !== LocationType.AdventureBoardCharacterTile) {
      const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)
      if (item.location.rotation !== move.location.rotation) this.memorize(Memory.Flipped, true)
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    const helper = new PlaceTileHelper(this.game, this.player)
    const { moves, nextRule } = helper.onTilePlaced(move)
    if (nextRule) {
      moves.push(this.startRule(nextRule))
    }
    return moves
  }

  get hand() {
    return this
      .material(MaterialType.CharacterTile)
      .location(LocationType.PlayerHand)
  }

  onRuleEnd() {
    this.forget(Memory.Flipped)
  }
}
