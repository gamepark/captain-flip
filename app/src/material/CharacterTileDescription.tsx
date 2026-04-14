import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { getCharacter } from '@gamepark/captain-flip/rules/GetCharacter'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons/faRotateRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import Carpenter from '../images/characters/Carpenter.jpg'
import Cartographer from '../images/characters/Cartographer.jpg'
import Cook from '../images/characters/Cook.jpg'
import Gunner from '../images/characters/Gunner.jpg'
import Lookout from '../images/characters/Lookout.jpg'
import Monkey from '../images/characters/Monkey.jpg'
import Navigator from '../images/characters/Navigator.jpg'
import Parrot from '../images/characters/Parrot.jpg'
import Swabby from '../images/characters/Swabby.jpg'
import { CharacterTileHelp } from './help/CharactereTileHelp'

export class CharacterTileDescription extends CardDescription {
  height = 3.79
  width = 3.79

  backImages = images

  images = images

  help = CharacterTileHelp

  getHelpDisplayExtraCss() {
    // Hide the default tile render on the left side of the help dialog.
    // We render our own framed tile inside CharacterTileHelp.
    return css`
      display: none;
      width: 0;
    `
  }

  getItemExtraCss(item: MaterialItem, context: ItemContext) {
    if (item.location.type === LocationType.ClothBag) return noPointer
    if (context.rules.game.rule?.id === RuleId.ParrotEndOfGame && getCharacter(item) === Character.Parrot) return highlightCharactersCss
    if (context.rules.game.rule?.id === RuleId.SwabbyEndOfGame && getCharacter(item) === Character.Swabby) return highlightCharactersCss
    if (context.rules.game.rule?.id === RuleId.CarpenterEndOfGame && getCharacter(item) === Character.Carpenter) return highlightCharactersCss
    if (context.rules.game.rule?.id === RuleId.LookoutEndOfGame && getCharacter(item) === Character.Lookout) return highlightCharactersCss
    return
  }

  isFlipped(item: MaterialItem): boolean {
    return item.location.rotation
  }

  menuAlwaysVisible = true

  getItemMenu(item: MaterialItem, _context: ItemContext, legalMoves: MaterialMove[]) {
    const flipMove = legalMoves.find(move =>
      isMoveItemType(MaterialType.CharacterTile)(move) &&
      move.itemIndex === _context.index &&
      move.location.rotation !== item.location.rotation
    )
    if (!flipMove) return
    return <ItemMenuButton move={flipMove} label="Flip" labelPosition="right" angle={45} radius={3} css={flipButtonCss}><FontAwesomeIcon icon={faRotateRight} /></ItemMenuButton>
  }

  getHoverTransform(item: MaterialItem, context: ItemContext) {
    const baseHover = super.getHoverTransform(item, context)
    return baseHover.concat([`translateZ(${item.location.rotation ? -10 : 10}em)`, !baseHover.some((t) => t.startsWith('scale'))? 'scale(2)': ''])
  }
}

const images = {
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

export const characterTileDescription = new CharacterTileDescription()

const noPointer = css`
  pointer-events: none;
`

const flipButtonCss = css`
  font-size: 0.8em;
`

const highlightCharactersCss = css`
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 0.2em solid green;
    background-color: rgba(255, 215, 0, 0.2);
    border-radius: 0.4em;
  }
`
