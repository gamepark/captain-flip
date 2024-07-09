import { MaterialGame, MaterialMove, MaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { DrawCharacterTileRule } from './rules/DrawCharacterTileRule'
import { PlayTileRule } from './rules/PlayTileRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class CaptainFlipRules extends MaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> {
  rules = {
    [RuleId.DrawCharacterTile]: DrawCharacterTileRule,
    [RuleId.PlaceTile]: PlayTileRule
  }

  giveTime(): number {
    return 60
  }
}