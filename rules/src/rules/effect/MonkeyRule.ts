import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCharacter } from '../GetCharacter'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CharacterEffect } from './CharacterEffect'
import { CoinRule } from './CoinRule'

export class MonkeyRule extends CoinRule {
  onRuleStart() {
    const adjacentCards = this.adjacentCards
    const moves: MaterialMove[] = []
    moves.push(...super.onRuleStart())
    if (!adjacentCards.length) {
      moves.push(this.startRule(RuleId.BoardEffect))
    }

    return moves
  }

  getCoins() {
    return 1
  }

  getPlayerMoves() {
    const adjacentCards = this.adjacentCards
    return adjacentCards.moveItems((item) => ({
      ...item.location,
      rotation: !item.location.rotation
    }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.CharacterTile)(move) || move.location.type !== LocationType.AdventureBoardCharacterTile) return []
    const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)!
    const character = getCharacter(item)
    const ruleId = CharacterEffect[character]
    if (ruleId) return [this.startRule(ruleId)]
    return [this.startRule(RuleId.BoardEffect)]
  }

  get adjacentCards() {
    const monkey = this.monkey
    return this.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(this.player)
      .filter((item) =>
        getDistanceBetweenSquares(
          { x: item.location.x!, y: item.location.y! },
          { x: monkey.location.x!, y: monkey.location.y! }
        ) === 1
      )
  }

  get monkey() {
    const cards = this.remind(Memory.PlacedCard) ?? []
    const index = cards[cards.length - 1]
    return this.material(MaterialType.CharacterTile)
      .getItem(index)!
  }

  onRuleEnd() {
    return []
  }
}