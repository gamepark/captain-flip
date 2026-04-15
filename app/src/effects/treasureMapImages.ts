import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import TreasureMapTokenImg from '../images/TreasureMapToken.png'
import TreasureMapAllDirections from '../images/treasure-map/TreasureMapAllDirections.png'
import TreasureMapCursed from '../images/treasure-map/TreasureMapCursed.png'
import TreasureMapGambler from '../images/treasure-map/TreasureMapGambler.png'
import TreasureMapInflamed from '../images/treasure-map/TreasureMapInflamed.png'
import TreasureMapKraken from '../images/treasure-map/TreasureMapKraken.png'

/** Mapping from a TreasureMapType to its illustration image. Base maps
 *  fall back to the generic TreasureMapToken.png used on the board. */
export const treasureMapImages: Record<TreasureMapType, string> = {
  [TreasureMapType.Base]: TreasureMapTokenImg,
  [TreasureMapType.Cursed]: TreasureMapCursed,
  [TreasureMapType.Inflamed]: TreasureMapInflamed,
  [TreasureMapType.Gambler]: TreasureMapGambler,
  [TreasureMapType.Kraken]: TreasureMapKraken,
  [TreasureMapType.AllDirections]: TreasureMapAllDirections,
}
