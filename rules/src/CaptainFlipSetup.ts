import { MaterialGameSetup } from '@gamepark/rules-api'
import { CaptainFlipOptions } from './CaptainFlipOptions'
import { CaptainFlipRules } from './CaptainFlipRules'
import { BoardType } from './material/board/Board'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { TreasureMapType } from './material/TreasureMapType'
import { characterTiles } from './material/tiles/CharacterTiles'
import { PlayerId } from './PlayerId'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'
import { sample } from 'es-toolkit'
import { treasureMapTypes } from './CaptainFlipOptions'

/**
 * This class creates a new Game based on the game options
 */
export class CaptainFlipSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, CaptainFlipOptions> {
  Rules = CaptainFlipRules

  setupMaterial(options: CaptainFlipOptions) {
    const board = options.board ?? BoardType.BoardA
    // If no treasure map variant was picked in the options, draw one
    // at random so every game still starts with a treasure map on the
    // board (base game behaviour).
    const treasureMap = options.treasureMap ?? sample(treasureMapTypes)
    this.setupClothBag()
    this.setupTreasureMapToken(board, treasureMap)
    if (board === BoardType.BoardG) {
      this.setupCells()
    }
    this.memorize(Memory.Board, board)
  }

  setupTreasureMapToken(board: BoardType, type: TreasureMapType) {
    this.createTreasureMapToken(type)
    // On the Observatory board, a second treasure map is picked at random
    if (board === BoardType.BoardH) {
      const randomType = sample(treasureMapTypes.filter((t) => t !== type))
      this.createTreasureMapToken(randomType)
    }
  }

  createTreasureMapToken(type: TreasureMapType) {
    this.material(MaterialType.TreasureMapToken)
      .createItem({
        id: type,
        location: {
          type: LocationType.TreasureMapToken,
          ...(type === TreasureMapType.AllDirections ? { rotation: 0 } : {})
        }
      })
  }

  setupCells() {
    for (const player of this.players) {
      for (let i = 0; i < 2; i++) {
        const bag = this.material(MaterialType.CharacterTile).location(LocationType.ClothBag)
        bag.moveItem((item) => ({
          type: LocationType.Cell,
          player,
          rotation: item.location.rotation
        }))
      }
    }
  }

  setupClothBag() {
    for (const [front, back] of characterTiles) {
      const item = {
        id: {
          front,
          back
        },
        location: {
          type: LocationType.ClothBag,
          rotation: sample([true, false])
        }
      }

      this.material(MaterialType.CharacterTile).createItem(item)
    }

    this.material(MaterialType.CharacterTile).shuffle()
  }

  start() {
    this.startPlayerTurn(RuleId.DrawCharacterTile, this.game.players[0])
  }
}