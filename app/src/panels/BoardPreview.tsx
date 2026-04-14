import { css } from '@emotion/react'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { getCharacter } from '@gamepark/captain-flip/rules/GetCharacter'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { useMaterialContext, useRules } from '@gamepark/react-game'
import { FC, useMemo } from 'react'
import { adventureBoardCharacterTileLocator } from '../locators/AdventureBoardCharacterTileLocator'
import { cellLocator } from '../locators/CellLocator'
import BoardAImg from '../images/boards/BoardA.jpg'
import BoardBImg from '../images/boards/BoardB.jpg'
import BoardCImg from '../images/boards/BoardC.jpg'
import BoardDImg from '../images/boards/BoardD.jpg'
import BoardEImg from '../images/boards/BoardE.jpg'
import BoardFImg from '../images/boards/BoardF.jpg'
import BoardGImg from '../images/boards/BoardG.jpg'
import BoardHImg from '../images/boards/BoardH.jpg'
import BoardIImg from '../images/boards/BoardI.jpg'
import Carpenter from '../images/characters/Carpenter.jpg'
import Cartographer from '../images/characters/Cartographer.jpg'
import Cook from '../images/characters/Cook.jpg'
import Gunner from '../images/characters/Gunner.jpg'
import Lookout from '../images/characters/Lookout.jpg'
import Monkey from '../images/characters/Monkey.jpg'
import Navigator from '../images/characters/Navigator.jpg'
import Parrot from '../images/characters/Parrot.jpg'
import Swabby from '../images/characters/Swabby.jpg'

const characterImages: Record<Character, string> = {
  [Character.Swabby]: Swabby,
  [Character.Cartographer]: Cartographer,
  [Character.Navigator]: Navigator,
  [Character.Carpenter]: Carpenter,
  [Character.Cook]: Cook,
  [Character.Monkey]: Monkey,
  [Character.Gunner]: Gunner,
  [Character.Parrot]: Parrot,
  [Character.Lookout]: Lookout
}

const boardImages: Record<number, string> = {
  [BoardType.BoardA]: BoardAImg,
  [BoardType.BoardB]: BoardBImg,
  [BoardType.BoardC]: BoardCImg,
  [BoardType.BoardD]: BoardDImg,
  [BoardType.BoardE]: BoardEImg,
  [BoardType.BoardF]: BoardFImg,
  [BoardType.BoardG]: BoardGImg,
  [BoardType.BoardH]: BoardHImg,
  [BoardType.BoardI]: BoardIImg,
}

type BoardPreviewProps = {
  playerId: PlayerId
}

export const BoardPreview: FC<BoardPreviewProps> = ({ playerId }) => {
  const rules = useRules<CaptainFlipRules>()!
  const context = useMaterialContext()

  const boardType = rules.remind<BoardType>(Memory.Board)
  const boardImage = boardImages[boardType] ?? BoardAImg

  const boardHelper = useMemo(() => new BoardHelper(rules.game), [rules.game])
  const places = useMemo(() => boardHelper.places, [boardHelper])

  // Tiles on the main board grid
  const boardTiles = useMemo(() => {
    return rules.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .getItems()
      .map(item => {
        const pos = adventureBoardCharacterTileLocator.getPositionOnParent(item.location, context)
        return { pos, character: getCharacter(item) }
      })
  }, [rules.game, playerId, context])

  // Tiles in cells (special slots)
  const cellTiles = useMemo(() => {
    return rules.material(MaterialType.CharacterTile)
      .location(LocationType.Cell)
      .player(playerId)
      .getItems()
      .map(item => {
        const pos = cellLocator.getPositionOnParent(item.location)
        const rotate = cellLocator.getRotateZ(item.location)
        return { pos, character: getCharacter(item), rotate }
      })
  }, [rules.game, playerId])

  // Track occupied board positions for empty slot rendering
  const occupiedPositions = useMemo(() => {
    const set = new Set<string>()
    for (const item of rules.material(MaterialType.CharacterTile)
      .location(LocationType.AdventureBoardCharacterTile)
      .player(playerId)
      .getItems()) {
      set.add(`${item.location.x},${item.location.y}`)
    }
    return set
  }, [rules.game, playerId])

  return (
    <div css={boardInnerCss}>
      <img src={boardImage} alt="" css={boardImgCss} />
      {/* Placed tiles on board */}
      {boardTiles.map((tile, i) => (
        <img
          key={`board-${i}`}
          src={characterImages[tile.character]}
          alt=""
          css={tileOnBoardCss(tile.pos.x, tile.pos.y)}
        />
      ))}
      {/* Tiles in cells */}
      {cellTiles.map((tile, i) => (
        <img
          key={`cell-${i}`}
          src={characterImages[tile.character]}
          alt=""
          css={tileOnBoardCss(tile.pos.x, tile.pos.y, tile.rotate)}
        />
      ))}
      {/* Empty slots */}
      {places.map((place, i) => {
        if (occupiedPositions.has(`${place.x},${place.y}`)) return null
        const pos = adventureBoardCharacterTileLocator.getPositionOnParent(
          { type: LocationType.AdventureBoardCharacterTile, player: playerId, x: place.x, y: place.y },
          context
        )
        return (
          <div key={`empty-${i}`} css={emptySlotCss(pos.x, pos.y)} />
        )
      })}
    </div>
  )
}

const TILE_SIZE = 14 // % of board
const HALF = TILE_SIZE / 2

const boardInnerCss = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.8em;
  overflow: hidden;
  box-shadow: 0 0.3em 1.2em rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.1);
`

const boardImgCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const tileOnBoardCss = (posX: number, posY: number, rotate?: number) => css`
  position: absolute;
  width: ${TILE_SIZE}%;
  height: ${TILE_SIZE}%;
  left: ${posX - HALF}%;
  top: ${posY - HALF}%;
  border-radius: 0.3em;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  ${rotate ? `transform: rotate(${rotate}deg);` : ''}
`

const emptySlotCss = (posX: number, posY: number) => css`
  position: absolute;
  width: ${TILE_SIZE}%;
  height: ${TILE_SIZE}%;
  left: ${posX - HALF}%;
  top: ${posY - HALF}%;
  border-radius: 0.3em;
  border: 2px dashed rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.2);
`
