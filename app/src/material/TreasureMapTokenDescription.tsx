import { css } from '@emotion/react'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { TokenDescription } from '@gamepark/react-game'
import TreasureMapToken from '../images/TreasureMapToken.png'
import TreasureMapAllDirections from '../images/treasure-map/TreasureMapAllDirections.png'
import TreasureMapCursed from '../images/treasure-map/TreasureMapCursed.png'
import TreasureMapGambler from '../images/treasure-map/TreasureMapGambler.png'
import TreasureMapInflamed from '../images/treasure-map/TreasureMapInflamed.png'
import TreasureMapKraken from '../images/treasure-map/TreasureMapKraken.png'
import { TreasureMapTokenHelp } from './help/TreasureMapTokenHelp'

export class TreasureMapTokenDescription extends TokenDescription {
  height = 5
  ratio = 5.81 / 7
  borderRadius = 0.5
  transparency = true

  image = TreasureMapToken

  images = {
    [TreasureMapType.Base]: TreasureMapToken,
    [TreasureMapType.Cursed]: TreasureMapCursed,
    [TreasureMapType.Inflamed]: TreasureMapInflamed,
    [TreasureMapType.Gambler]: TreasureMapGambler,
    [TreasureMapType.Kraken]: TreasureMapKraken,
    [TreasureMapType.AllDirections]: TreasureMapAllDirections,
  }

  help = TreasureMapTokenHelp

  getHelpDisplayExtraCss() {
    // Hide the default token render on the left side of the help
    // dialog — our TreasureMapTokenHelp renders its own richer
    // layout (framed map + content) so we don't want the framework
    // to show a duplicate image next to it.
    return css`
      display: none;
      width: 0;
    `
  }
}

export const treasureMapTokenDescription = new TreasureMapTokenDescription()
