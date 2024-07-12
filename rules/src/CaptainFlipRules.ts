import { FillGapStrategy, HiddenMaterialRules, hideItemId, MaterialGame, MaterialItem, MaterialMove, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerId } from './PlayerId'
import { BoardEffectRule } from './rules/BoardEffectRule'
import { DrawCharacterTileRule } from './rules/DrawCharacterTileRule'
import { BoardEffectCoinXRule } from './rules/effect/board/BoardEffectCoinXRule'
import { BoardEffectFirstXThenYRule } from './rules/effect/board/BoardEffectFirstXThenYRule'
import { BoardEffectTreasureMapRule } from './rules/effect/board/BoardEffectTreasureMapRule'
import { CartographerRule } from './rules/effect/CartographerRule'
import { CookRule } from './rules/effect/CookRule'
import { CarpenterEndOfGameRule } from './rules/effect/end/CarpenterEndOfGameRule'
import { LookoutEndOfGameRule } from './rules/effect/end/LookoutEndOfGameRule'
import { ParrotEndOfGameRule } from './rules/effect/end/ParrotEndOfGameRule'
import { SwabbyEndOfGameRule } from './rules/effect/end/SwabbyEndOfGameRule'
import { GunnerRule } from './rules/effect/GunnerRule'
import { MonkeyRule } from './rules/effect/MonkeyRule'
import { NavigatorRule } from './rules/effect/NavigatorRule'
import { ParrotRule } from './rules/effect/ParrotRule'
import { EndOfTurnRule } from './rules/EndOfTurnRule'
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
    [RuleId.PlaceTile]: PlayTileRule,
    [RuleId.EndOfTurn]: EndOfTurnRule,
    [RuleId.Cartographer]: CartographerRule,
    [RuleId.Navigator]: NavigatorRule,
    [RuleId.Parrot]: ParrotRule,
    [RuleId.Cook]: CookRule,
    [RuleId.Gunner]: GunnerRule,
    [RuleId.Monkey]: MonkeyRule,
    [RuleId.BoardEffect]: BoardEffectRule,
    [RuleId.BoardEffectCoinX]: BoardEffectCoinXRule,
    [RuleId.BoardEffectTreasureMap]: BoardEffectTreasureMapRule,
    [RuleId.BoardEffectFirstXThenY]: BoardEffectFirstXThenYRule,
    [RuleId.CarpenterEndOfGame]: CarpenterEndOfGameRule,
    [RuleId.ParrotEndOfGame]: ParrotEndOfGameRule,
    [RuleId.SwabbyEndOfGame]: SwabbyEndOfGameRule,
    [RuleId.LookoutEndOfGame]: LookoutEndOfGameRule,
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