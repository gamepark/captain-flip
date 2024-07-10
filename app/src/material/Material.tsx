import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { adventureBoardDescription } from './AdventureBoardDescription'
import { characterTileDescription } from './CharacterTileDescription'
import { coinDescription } from './CoinDescription'
import { treasureMapTokenDescription } from './TreasureMapTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.CharacterTile]: characterTileDescription,
  [MaterialType.AdventureBoard]: adventureBoardDescription,
  [MaterialType.Coin]: coinDescription,
  [MaterialType.TreasureMapToken]: treasureMapTokenDescription
}
