import { css } from '@emotion/react'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { BoardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import BoardA from '../images/boards/BoardA.jpg'
import BoardB from '../images/boards/BoardB.jpg'
import BoardC from '../images/boards/BoardC.jpg'
import BoardD from '../images/boards/BoardD.jpg'
import BoardE from '../images/boards/BoardE.jpg'
import BoardF from '../images/boards/BoardF.jpg'
import BoardG from '../images/boards/BoardG.jpg'
import BoardH from '../images/boards/BoardH.jpg'
import BoardI from '../images/boards/BoardI.jpg'
import Flag from '../images/boards/Flag.png'
import { AdventureBoardHelp } from './help/AdventureBoardHelp'

export class AdventureBoardDescription extends BoardDescription {
  height = 24
  width = 24
  borderRadius = 0
  images = {
    [BoardType.BoardA]: BoardA,
    [BoardType.BoardB]: BoardB,
    [BoardType.BoardC]: BoardC,
    [BoardType.BoardD]: BoardD,
    [BoardType.BoardE]: BoardE,
    [BoardType.BoardF]: BoardF,
    [BoardType.BoardG]: BoardG,
    [BoardType.BoardH]: BoardH,
    [BoardType.BoardI]: BoardI,
  }

  help = AdventureBoardHelp

  getHelpDisplayExtraCss() {
    // Hide the default board render on the left side of the help dialog.
    // We render our own richer layout (board image + content) inside AdventureBoardHelp.
    return css`
      display: none;
      width: 0;
    `
  }

  getItemExtraCss() {
    // Smooth transition when switching the viewed player so the boards
    // glide to their new spots in sync with the panels. `!important`
    // overrides any framework-injected `transition: none` that comes
    // with the default animation pipeline.
    return css`
      transition: transform 0.2s ease !important;
    `
  }

  getImages() {
    const images = super.getImages()
    images.push(Flag)
    return images
  }

  getStaticItems(context: MaterialContext) {
    const board = context.rules.remind<BoardType>(Memory.Board) ?? BoardType.BoardA
    // Stash the currently viewed player into `location.x` (an unused
    // coordinate for AdventureBoard). The framework's StaticItemDisplay
    // memoises by deep-equality on the static item, and ignores
    // getPositionDependencies — so we have to vary the item itself to
    // invalidate the memo when the view switches. Without this, the
    // boards jump instantly instead of gliding to their new spots.
    const view = context.rules.game.view
    return context.rules.players.map((player) => ({
      id: board,
      location: {
        type: LocationType.AdventureBoard,
        player: player as number,
        x: typeof view === 'number' ? view : 0
      }
    }))
  }

  getLocations(item: MaterialItem, context: ItemContext) {
    const locations: Location[] = []
    if (item.location.player === context.rules.players[0]) {
      locations.push({
        type: LocationType.FirstPlayerFlag,
      })
    }

    if (!context.player) return locations
    const places = new BoardHelper(context.rules.game).places
    for (const place of places) {
      locations.push({
        type: LocationType.AdventureBoardCharacterTile,
        player: item.location.player,
        x: place.x,
        y: place.y
      })
    }


    return locations
  }
}

export const adventureBoardDescription = new AdventureBoardDescription()
