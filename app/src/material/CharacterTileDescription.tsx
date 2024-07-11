/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Carpenter from '../images/characters/Carpenter.jpg'
import Cartographer from '../images/characters/Cartographer.jpg'
import Cook from '../images/characters/Cook.jpg'
import Gunner from '../images/characters/Gunner.jpg'
import Lookout from '../images/characters/Lookout.jpg'
import Monkey from '../images/characters/Monkey.jpg'
import Navigator from '../images/characters/Navigator.jpg'
import Parrot from '../images/characters/Parrot.jpg'
import Swabby from '../images/characters/Swabby.jpg'

export class CharacterTileDescription extends CardDescription {
  height = 3.79
  width = 3.79

  backImages = images

  images = images

  getItemExtraCss(item: MaterialItem) {
    if (item.location.type === LocationType.ClothBag) return noPointer
    return
  }

  canLongClick(move: MaterialMove, context: ItemContext) {
    return context.rules.game.rule?.id !== RuleId.Monkey && super.canLongClick(move, context)
  }

  isFlipped(item: MaterialItem): boolean {
    return item.location.rotation
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
  [Character.Lookout]: Lookout,
}

export const characterTileDescription = new CharacterTileDescription()

const noPointer = css`
  pointer-events: none;
`