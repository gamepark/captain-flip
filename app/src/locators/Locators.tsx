import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { ItemLocator } from '@gamepark/react-game'
import { adventureBoardCharacterTileLocator } from './AdventureBoardCharacterTileLocator'
import { adventureBoardLocation } from './AdventureBoardLocator'
import { boardEffectLocator } from './BoardEffectLocator'
import { clothBagLocator } from './ClothBagLocator'
import { coinPileLocator } from './CoinPileLocator'
import { firstPlayerFlagLocator } from './FirstPlayerFlagLocator'
import { monkeyFlipButtonLocator } from './FlipButtonLocator'
import { playerCoinLocator } from './PlayerCoinLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerTreasureMapLocator } from './PlayerTreasureMapLocator'
import { treasureMapLocator } from './TreasureMapLocator'

export const Locators: Partial<Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.AdventureBoard]: adventureBoardLocation,
  [LocationType.AdventureBoardCharacterTile]: adventureBoardCharacterTileLocator,
  [LocationType.ClothBag]: clothBagLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.CoinStock]: coinPileLocator,
  [LocationType.PlayerCoin]: playerCoinLocator,
  [LocationType.PlayerTreasureMapToken]: playerTreasureMapLocator,
  [LocationType.TreasureMapToken]: treasureMapLocator,
  [LocationType.MonkeyFlipButton]: monkeyFlipButtonLocator,
  [LocationType.FirstPlayerFlag]: firstPlayerFlagLocator,
  [LocationType.BoardEffect]: boardEffectLocator

}
