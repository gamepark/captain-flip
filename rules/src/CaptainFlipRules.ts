import { CompetitiveScore, FillGapStrategy, HiddenMaterialRules, hideItemId, MaterialGame, MaterialItem, MaterialMove, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Character } from './material/tiles/Character'
import { PlayerId } from './PlayerId'
import { BoardEffectRule } from './rules/BoardEffectRule'
import { BoardEndOfGameEffectRule } from './rules/BoardEndOfGameEffectRule'
import { DrawCharacterTileRule } from './rules/DrawCharacterTileRule'
import { BoardEffectCoinPerDifferentRule } from './rules/effect/board/BoardEffectCoinPerDifferentRule'
import { BoardEffectCoinPerFullColumnRule } from './rules/effect/board/BoardEffectCoinPerFullColumnRule'
import { BoardEffectCoinXRule } from './rules/effect/board/BoardEffectCoinXRule'
import { BoardEffectFirstXThenYRule } from './rules/effect/board/BoardEffectFirstXThenYRule'
import { BoasEffectFlipRule } from './rules/effect/board/BoardEffectFlipRule'
import { BoardEffectReplayRule } from './rules/effect/board/BoardEffectReplayRule'
import { BoardEffectTreasureMapRule } from './rules/effect/board/BoardEffectTreasureMapRule'
import { BoardEndOfGameCoinIfAllDifferentRule } from './rules/effect/board/BoardEndOfGameCoinIfAllDifferentRule'
import { BoardEndOfGameCoinIfSameRule } from './rules/effect/board/BoardEndOfGameCoinIfSameRule'
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
import { getCharacter } from './rules/GetCharacter'
import { CoinHelper } from './rules/helper/CoinHelper'
import { PlayTileRule } from './rules/PlayTileRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class CaptainFlipRules extends HiddenMaterialRules<PlayerId, MaterialType, LocationType>
  implements CompetitiveScore<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId>,
TimeLimit<MaterialGame<PlayerId, MaterialType, LocationType>, MaterialMove<PlayerId, MaterialType, LocationType>, PlayerId> {
  rules = {
    [RuleId.DrawCharacterTile]: DrawCharacterTileRule,
    [RuleId.PlayTile]: PlayTileRule,
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
    [RuleId.BoardEffectCoinPerDifferent]: BoardEffectCoinPerDifferentRule,
    [RuleId.BoardEffectCoinPerFullColumn]: BoardEffectCoinPerFullColumnRule,
    [RuleId.CarpenterEndOfGame]: CarpenterEndOfGameRule,
    [RuleId.ParrotEndOfGame]: ParrotEndOfGameRule,
    [RuleId.SwabbyEndOfGame]: SwabbyEndOfGameRule,
    [RuleId.LookoutEndOfGame]: LookoutEndOfGameRule,
    [RuleId.BoardEndOfEffect]: BoardEndOfGameEffectRule,
    [RuleId.BoardEndOfGameCoinIfSame]: BoardEndOfGameCoinIfSameRule,
    [RuleId.BoardEndOfGameCoinIfAllDifferent]: BoardEndOfGameCoinIfAllDifferentRule,
    [RuleId.BoardEffectFlip]: BoasEffectFlipRule,
    [RuleId.BoardEffectReplay]: BoardEffectReplayRule
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

  getScore(playerId: PlayerId): number {
    const gunners = this.getPlayerGunners(playerId)
    if (gunners >= 3) return 0
    return new CoinHelper(this.game, playerId).coins
  }

  getTieBreaker(tieBreaker: number, playerId: PlayerId): number | undefined {
    if (tieBreaker === 1) {
      const gunner = this.getPlayerGunners(playerId)
      if (gunner === 3) return 0
      const treasureMap = this.material(MaterialType.TreasureMapToken).player(playerId)
      return treasureMap.length
    }

    return
  }

  getPlayerGunners(player: PlayerId) {
    return this
      .material(MaterialType.CharacterTile)
      .player(player)
      .filter((item) => getCharacter(item) === Character.Gunner)
      .length
  }
}

const hideIfRotated = (item: MaterialItem) => item.location.rotation? ['id.front']: ['id.back']