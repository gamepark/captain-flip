/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { ComponentType } from 'react'
import { BoardEffectHeader } from './BoardEffectHeader'
import { CarpenterEndOfGameHeader } from './CarpenterEndOfGameHeader'
import { CartographerHeader } from './CartographerHeader'
import { CookHeader } from './CookHeader'
import { DrawCharacterTileHeader } from './DrawCharacterTileHeader'
import { EndOfTurnHeader } from './EndOfTurnHeader'
import { GunnerHeader } from './GunnerHeader'
import { LookoutEndOfGameHeader } from './LookoutEndOfGameHeader'
import { MonkeyHeader } from './MonkeyHeader'
import { NavigatorHeader } from './NavigatorHeader'
import { ParrotEndOfGameHeader } from './ParrotEndOfGameHeader'
import { PlayTileHeader } from './PlayTileHeader'
import { SwabbyEndOfGameHeader } from './SwabbyEndOfGameHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DrawCharacterTile]: DrawCharacterTileHeader,
  [RuleId.PlayTile]: PlayTileHeader,
  [RuleId.EndOfTurn]: EndOfTurnHeader,
  [RuleId.Cartographer]: CartographerHeader,
  [RuleId.Navigator]: NavigatorHeader,
  [RuleId.Cook]: CookHeader,
  [RuleId.Gunner]: GunnerHeader,
  [RuleId.Monkey]: MonkeyHeader,
  [RuleId.CarpenterEndOfGame]: CarpenterEndOfGameHeader,
  [RuleId.ParrotEndOfGame]: ParrotEndOfGameHeader,
  [RuleId.SwabbyEndOfGame]: SwabbyEndOfGameHeader,
  [RuleId.LookoutEndOfGame]: LookoutEndOfGameHeader,
  [RuleId.BoardEffectCoinX]: BoardEffectHeader,
  [RuleId.BoardEffectTreasureMap]: BoardEffectHeader,
  [RuleId.BoardEffectFirstXThenY]: BoardEffectHeader,
  [RuleId.BoardEndOfGameCoinIfSame]: BoardEffectHeader,
  [RuleId.BoardEndOfGameCoinIfAllDifferent]: BoardEffectHeader,
  [RuleId.BoardEffectCoinPerDifferent]: BoardEffectHeader,
  [RuleId.BoardEffectCoinPerFullColumn]: BoardEffectHeader,
}