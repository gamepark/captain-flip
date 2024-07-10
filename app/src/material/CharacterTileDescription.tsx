/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { CardDescription } from '@gamepark/react-game'
import Swabby from '../images/characters/Swabby.jpg'
import Cartographer from '../images/characters/Cartographer.jpg'
import Navigator from '../images/characters/Navigator.jpg'
import Carpenter from '../images/characters/Carpenter.jpg'
import Cook from '../images/characters/Cook.jpg'
import Monkey from '../images/characters/Monkey.jpg'
import Gunner from '../images/characters/Gunner.jpg'
import Parrot from '../images/characters/Parrot.jpg'
import Lookout from '../images/characters/Lookout.jpg'
import { MaterialItem } from '@gamepark/rules-api'

export class CharacterTileDescription extends CardDescription {
  height = 3.79
  width = 3.79

  backImages = images

  images = images

  getItemExtraCss(item: MaterialItem) {
    if (process.env.NODE_ENV !== 'development') return
    return css`
      white-space:pre;
      > div:hover:before {
        content: 'location: ${item.location.type} \\A player: ${item.location.player} \\A x: ${item.location.x} \\A y: ${item.location.y}';
        font-size: 0.7em;
        padding: 0.2em;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 0.8em;
        position: absolute;
        transform: translateZ(10em);
        left: 0;
        top:0;
        height: 100%;
        width: 100%;
        color: black;
        white-space: pre-wrap;
      }
    `
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