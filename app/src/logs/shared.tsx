/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { MaterialLogProps, usePlayerName } from '@gamepark/react-game'
import { FC, ReactNode } from 'react'
import { Trans } from 'react-i18next'
import Carpenter from '../images/characters/Carpenter.jpg'
import Cartographer from '../images/characters/Cartographer.jpg'
import Cook from '../images/characters/Cook.jpg'
import Gunner from '../images/characters/Gunner.jpg'
import Lookout from '../images/characters/Lookout.jpg'
import Monkey from '../images/characters/Monkey.jpg'
import Navigator from '../images/characters/Navigator.jpg'
import Parrot from '../images/characters/Parrot.jpg'
import Swabby from '../images/characters/Swabby.jpg'
import {
  bombIconCss,
  coinIconCss,
  directionBadgeCss,
  mapIconCss,
  numCss,
  whoCss
} from './logStyles'

export type Props = MaterialLogProps

/** Return the displayable name of a player, falling back to empty
 *  string when react-game has nothing to show. */
export const useName = (playerId?: number) => usePlayerName(playerId) || ''

export const characterI18nKey = (character: Character | undefined): string => {
  switch (character) {
    case Character.Cartographer: return 'cartographer'
    case Character.Navigator: return 'navigator'
    case Character.Parrot: return 'parrot'
    case Character.Cook: return 'cook'
    case Character.Swabby: return 'swabby'
    case Character.Gunner: return 'gunner'
    case Character.Carpenter: return 'carpenter'
    case Character.Monkey: return 'monkey'
    case Character.Lookout: return 'lookout'
    default: return 'character.unknown'
  }
}

const characterImages: Record<Character, string> = {
  [Character.Carpenter]: Carpenter,
  [Character.Cartographer]: Cartographer,
  [Character.Cook]: Cook,
  [Character.Gunner]: Gunner,
  [Character.Lookout]: Lookout,
  [Character.Monkey]: Monkey,
  [Character.Navigator]: Navigator,
  [Character.Parrot]: Parrot,
  [Character.Swabby]: Swabby
}

/* Inline mini-tile rendered next to the character name in logs. When
 *  `onClick` is passed the image becomes clickable (cursor + hover
 *  scale) and opens the material help modal for that character. */
export const CharacterTileMini: FC<{ character: Character; onClick?: () => void }> = (
  { character, onClick }
) => (
  <img
    src={characterImages[character]}
    alt=""
    css={[characterTileMiniCss, onClick && clickableCss]}
    onClick={onClick}
  />
)

const characterTileMiniCss = css`
  display: inline-block;
  vertical-align: -0.9em;
  width: 2.5em;
  height: 2.5em;
  border-radius: 0.2em;
  object-fit: cover;
  margin: 0 0.2em;
`

const clickableCss = css`
  cursor: pointer;
  transition: transform 0.15s ease-out;

  &:hover {
    transform: scale(1.08);
  }
`

/* Clickable wrapper for a whole log line. When the line describes a
 *  material item (tile, map, etc.), wrap its content in this span so
 *  the entire row opens the help modal on click — not just the icon. */
export const ClickableLine: FC<{ onClick?: () => void; children: ReactNode }> = (
  { onClick, children }
) => (
  <span css={onClick && clickableLineCss} onClick={onClick}>
    {children}
  </span>
)

const clickableLineCss = css`
  cursor: pointer;
  display: inline;

  /* Scale any inline image on hover so the whole line feels
   * clickable — visually consistent with clicking the icon alone. */
  & img {
    transition: transform 0.15s ease-out;
  }

  &:hover img {
    transform: scale(1.08);
  }
`

/* ---------- Common components map for <Trans> ----------
 * Every NAMED tag we use in translation strings ends up here.
 * Basic HTML tags <strong>, <i>, <br>, <p> are auto-recognised by
 * react-i18next via transKeepBasicHtmlNodesFor and DON'T need to be
 * mapped — translations can use them directly. */
export const commonComponents = {
  who: <span css={whoCss}/>,
  num: <span css={numCss}/>,
  coin: <span css={coinIconCss}/>,
  map: <span css={mapIconCss}/>,
  bomb: <span css={bombIconCss}/>,
  left: <span css={directionBadgeCss}><Trans i18nKey="direction.left"/></span>,
  right: <span css={directionBadgeCss}><Trans i18nKey="direction.right"/></span>
}
