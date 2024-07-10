import { FillGapStrategy, HiddenMaterialRules, hideItemId, MaterialGame, MaterialItem, MaterialMove, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { DrawCharacterTileRule } from './rules/DrawCharacterTileRule'
import { PlayTileRule } from './rules/PlayTileRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class CaptainFlipRules extends HiddenMaterialRules<PlayerId, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.DrawCharacterTile]: DrawCharacterTileRule,
    [RuleId.PlaceTile]: PlayTileRule
  }

  hidingStrategies = {
    [MaterialType.CharacterTile]: {
      [LocationType.ClothBag]: hideItemId,
      [LocationType.PlayerHand]: hideIfRotated,
      [LocationType.AdventureBoardCharacterTile]: hideIfRotated
    }
  }

  locationsStrategies = {
    [MaterialType.CharacterTile]: {
      [LocationType.ClothBag]: new FillGapStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}

const hideIfRotated = (item: MaterialItem) => item.location.rotation? ['id.front']: ['id.back']