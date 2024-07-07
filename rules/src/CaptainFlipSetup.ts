import { MaterialGameSetup } from '@gamepark/rules-api'
import { CaptainFlipOptions } from './CaptainFlipOptions'
import { CaptainFlipRules } from './CaptainFlipRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class CaptainFlipSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, CaptainFlipOptions> {
  Rules = CaptainFlipRules

  setupMaterial(_options: CaptainFlipOptions) {
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}