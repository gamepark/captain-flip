import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { Locator } from '@gamepark/react-game'
import { adventureBoardCharacterTileLocator } from './AdventureBoardCharacterTileLocator'
import { adventureBoardLocator } from './AdventureBoardLocator'
import { boardEffectLocator } from './BoardEffectLocator'
import { clothBagLocator } from './ClothBagLocator'
import { coinPileLocator } from './CoinPileLocator'
import { firstPlayerFlagLocator } from './FirstPlayerFlagLocator'
import { flipButtonLocator } from './FlipButtonLocator'
import { playerCoinLocator } from './PlayerCoinLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { playerTreasureMapLocator } from './PlayerTreasureMapLocator'
import { treasureMapLocator } from './TreasureMapLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerId, MaterialType, LocationType>>> = {
  [LocationType.AdventureBoard]: adventureBoardLocator,
  [LocationType.AdventureBoardCharacterTile]: adventureBoardCharacterTileLocator,
  [LocationType.ClothBag]: clothBagLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.CoinStock]: coinPileLocator,
  [LocationType.PlayerCoin]: playerCoinLocator,
  [LocationType.PlayerTreasureMapToken]: playerTreasureMapLocator,
  [LocationType.TreasureMapToken]: treasureMapLocator,
  [LocationType.FlipButton]: flipButtonLocator,
  [LocationType.FirstPlayerFlag]: firstPlayerFlagLocator,
  [LocationType.BoardEffect]: boardEffectLocator

}
