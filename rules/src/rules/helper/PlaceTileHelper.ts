import { ItemMove, isMoveItemType, Location, Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { BoardSpaceEffect } from '../../material/board/description/BoardCommon'
import { BoardSpaceType } from '../../material/board/description/BoardSpaceType'
import { coinValues } from '../../material/Coin'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../PlayerId'
import { CharacterEffect } from '../effect/CharacterEffect'
import { getCharacter } from '../GetCharacter'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { BoardHelper } from './BoardHelper'

export class PlaceTileHelper extends MaterialRulesPart {
  readonly player: PlayerId

  constructor(game: MaterialGame, player: PlayerId) {
    super(game)
    this.player = player
  }

  getPlacementMoves(hand: Material) {
    const moves: MaterialMove[] = []
    const availablePlaces = new BoardHelper(this.game).getFreePlaces(this.player)
    for (const [x, y] of Object.entries(availablePlaces)) {
      moves.push(
        ...hand.moveItems((item) => ({
          type: LocationType.AdventureBoardCharacterTile,
          player: this.player,
          rotation: item.location.rotation,
          x: +x,
          y: y
        }))
      )
    }
    return moves
  }

  onTilePlaced(move: ItemMove): { moves: MaterialMove[], nextRule: RuleId | undefined } {
    const moves: MaterialMove[] = []
    let nextRule: RuleId | undefined
    if (isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.AdventureBoardCharacterTile) {
      this.memorize(Memory.PlacedCard, move.itemIndex)
      const item = this.material(MaterialType.CharacterTile).getItem(move.itemIndex)
      const character = getCharacter(item)
      const helper = new BoardHelper(this.game)
      const effect = helper.getPlaceEffect({ x: move.location.x, y: move.location.y })
      if (effect) {
        if (effect.type === BoardSpaceType.Cost) {
          moves.push(...this.material(MaterialType.Coin).money(coinValues).removeMoney(effect.cost, { type: LocationType.PlayerCoin, player: this.player }))
        } else if (effect.type !== BoardSpaceType.None && effect.type !== BoardSpaceType.Sextant && effect.type !== BoardSpaceType.Bomb) {
          this.addBoardEffect(effect, move.location)
        }
      }

      this.checkRowEffects(helper, move.location)

      nextRule = CharacterEffect[character] ?? RuleId.BoardEffect
    }
    return { moves, nextRule }
  }

  addBoardEffect(effect: BoardSpaceEffect, location: Partial<Location>) {
    const effects = this.remind(Memory.BoardEffect) ?? []
    effects.push({
      effect: effect,
      x: location.x!,
      y: location.y!,
    })
    this.memorize(Memory.BoardEffect, effects)
  }

  checkRowEffects(helper: BoardHelper, location: Partial<Location>) {
    const rowEffects = helper.boardDescription.rowEffects
    if (!rowEffects) return
    for (const rowEffect of rowEffects) {
      const row = rowEffect.row
      if (location.y !== row) continue
      if (rowEffect.endOfGame) continue
      const rowPlaces = helper.places.filter((p) => p.y === row)
      const rowTiles = this.material(MaterialType.CharacterTile)
        .location(LocationType.AdventureBoardCharacterTile)
        .player(this.player)
        .filter((item) => item.location.y === row)
        .length
      console.log(rowTiles, rowPlaces.length)
      if (rowTiles >= rowPlaces.length) {
        this.addBoardEffect(rowEffect, { x: location.x!, y: row })
      }
    }
  }
}
