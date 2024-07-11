import { getDistanceBetweenSquares, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CharacterEffect } from './CharacterEffect'

export class MonkeyRule extends PlayerTurnRule {
  onRuleStart() {
    const adjacentCards = this.adjacentCards
    const moves: MaterialMove[] = []
    moves.push(
      this.material(MaterialType.Coin).createItem({
        location: {
          type: LocationType.PlayerCoin,
          player: this.player
        },
        quantity: 1
      })
    )
    if (!adjacentCards.length) {
      moves.push(this.startRule(RuleId.EndOfTurn))
    }

    return moves
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
    const character = item.location.rotation? item.id.back : item.id.front
    const ruleId = CharacterEffect[character]
    if (ruleId) return [this.startRule(ruleId)]
    return [this.startRule(RuleId.EndOfTurn)]
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
    return this.material(MaterialType.CharacterTile)
      .getItem(this.remind(Memory.PlacedCard))!
  }
}