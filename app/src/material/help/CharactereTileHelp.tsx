/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { Quote } from './Quote'

export const CharacterTileHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const character = item.location?.rotation ? item.id.back : item.id.front
  const flip = useLegalMove((move) => isMoveItemType(MaterialType.CharacterTile)(move)
    && move.itemIndex === itemIndex
    && (
      (item.location?.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand)
      || (item.location?.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile)
    ))
  const texts = getTexts(character)
  return (
    <>
      <h2 css={titleCss}>
        <Trans defaults={texts.title}/>
      </h2>
      {flip && (
        <div>
          <Trans defaults="tile.flip">
            <PlayMoveButton move={flip} onPlay={closeDialog}/>
          </Trans>
        </div>
      )}
      {!!texts.effect && (
        <p css={lessMarginCss}>
          <Trans defaults={texts.effect}/>
        </p>
      )}
      {!!texts.endGame && (
        <p css={[lessMarginCss, endGameCss]}>
          <Trans defaults={texts.endGame}>
            <strong/>
          </Trans>
        </p>
      )}
      <Quote quote={texts.quote}/>
      <p>
        <Trans defaults="tile.characters"/>
      </p>
    </>
  )

}

const getTexts = (character: Character) => {
  switch (character) {
    case Character.Cartographer:
      return {
        title: 'cartographer',
        effect: 'cartographer.effect',
        quote: 'cartographer.quote'

      }
    case Character.Navigator:
      return {
        title: 'navigator',
        effect: 'navigator.effect',
        quote: 'navigator.quote'
      }
    case Character.Parrot:
      return {
        title: 'parrot',
        effect: 'parrot.effect',
        endGame: 'parrot.effect.end-game',
        quote: 'parrot.quote'
      }
    case Character.Cook:
      return {
        title: 'cook',
        effect: 'cook.effect',
        quote: 'cook.quote'
      }
    case Character.Swabby:
      return {
        title: 'swabby',
        endGame: 'swabby.effect.end-game',
        quote: 'swabby.quote'
      }
    case Character.Gunner:
      return {
        title: 'gunner',
        effect: 'gunner.effect',
        endGame: 'gunner.effect.end-game',
        quote: 'gunner.quote'
      }
    case Character.Carpenter:
      return {
        title: 'carpenter',
        endGame: 'carpenter.effect.end-game',
        quote: 'carpenter.quote'
      }
    case Character.Monkey:
      return {
        title: 'monkey',
        effect: 'monkey.effect',
        quote: 'monkey.quote'
      }
    case Character.Lookout:
      return {
        title: 'lookout',
        endGame: 'lookout.effect.end-game',
        quote: 'lookout.quote'
      }
  }
}

const lessMarginCss = css`
  margin-bottom: 0.3;
`

const titleCss = css`
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Rock Salt", sans-serif;
`

const endGameCss = css`
  color: #517a8c;
`