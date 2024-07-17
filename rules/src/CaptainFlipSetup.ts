import { MaterialGameSetup } from '@gamepark/rules-api'
import { CaptainFlipOptions } from './CaptainFlipOptions'
import { CaptainFlipRules } from './CaptainFlipRules'
import { BoardType } from './material/board/Board'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { characterTiles } from './material/tiles/CharacterTiles'
import { PlayerId } from './PlayerId'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'
import sample from 'lodash/sample'

/**
 * This class creates a new Game based on the game options
 */
export class CaptainFlipSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, CaptainFlipOptions> {
  Rules = CaptainFlipRules

  setupMaterial(options: CaptainFlipOptions) {
    const board = options.board ?? BoardType.BoardA
    this.setupClothBag()
    this.setupPlayerBoards(board)
    this.setupTreasureMapToken()
    this.memorize(Memory.Board, board)
  }

  setupTreasureMapToken() {
    this.material(MaterialType.TreasureMapToken)
      .createItem({
        location: {
          type: LocationType.TreasureMapToken
        }
      })
  }

  setupPlayerBoards(board: BoardType) {
    for (const player of this.players) {
      this.material(MaterialType.AdventureBoard)
        .createItem({
          id: board,
          location: {
            type: LocationType.AdventureBoard,
            player: player
          }
        })
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