import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'
import { MaterialHelpProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Carpenter from '../../images/characters/Carpenter.jpg'
import Cartographer from '../../images/characters/Cartographer.jpg'
import Cook from '../../images/characters/Cook.jpg'
import Gunner from '../../images/characters/Gunner.jpg'
import Lookout from '../../images/characters/Lookout.jpg'
import Monkey from '../../images/characters/Monkey.jpg'
import Navigator from '../../images/characters/Navigator.jpg'
import Parrot from '../../images/characters/Parrot.jpg'
import Swabby from '../../images/characters/Swabby.jpg'

/* palette shared with the rest of the parchment help family */
const ink = '#2b1d10'
const inkSoft = '#4b3520'
const inkFaint = '#6a4c2b'
const accent = '#8b1e1e'
const brassHi = '#f2d07a'
const brassGold = '#a47428'
const brassDark = '#5b3d12'

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

export const CharacterTileHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const character: Character = item.location?.rotation ? item.id.back : item.id.front
  const flip = useLegalMove((move) => isMoveItemType(MaterialType.CharacterTile)(move)
    && move.itemIndex === itemIndex
    && (
      (item.location?.type === LocationType.PlayerHand && move.location.type === LocationType.PlayerHand)
      || (item.location?.type === LocationType.AdventureBoardCharacterTile && move.location.type === LocationType.AdventureBoardCharacterTile)
    ))
  const texts = getTexts(character)
  const effects: { tag: string; key: string; endgame?: boolean }[] = []
  if (texts.effect) effects.push({ tag: 'power', key: texts.effect })
  if (texts.endGame) effects.push({ tag: 'end-game', key: texts.endGame, endgame: true })

  return (
    <div css={dialogCss}>
      {/* LEFT : character tile with brass frame + two tape strips */}
      <aside css={tileHolderCss}>
        <div css={tileFrameCss}>
          <span css={[tapeCss, tapeTopCss]}/>
          <span css={[tapeCss, tapeBottomCss]}/>
          <div css={tileInnerCss}>
            <img src={characterImages[character]} alt=""/>
          </div>
        </div>
      </aside>

      {/* RIGHT : content column */}
      <section css={contentCss}>
        <div css={eyebrowCss}>
          <Trans i18nKey="crew-member"/>
        </div>
        <h2 css={nameCss}>
          <Trans i18nKey={texts.title}/>
        </h2>
        <div css={flourishCss}>
          <span css={flourishLineCss}/>
          <span css={flourishMarkCss}>✦</span>
          <span css={[flourishLineCss, flourishLineLongCss]}/>
        </div>

        {effects.map((effect, index) => (
          <div key={effect.key} css={effectRowCss}>
            <div css={[effectCardCss, effect.endgame && effectCardEndgameCss, index % 2 === 1 && effectCardAltRotationCss]}>
              <span css={effectTagCss}>
                <Trans i18nKey={effect.tag}/>
              </span>
              <p>
                <Trans i18nKey={effect.key}>
                  <strong/>
                </Trans>
              </p>
            </div>
          </div>
        ))}

        {flip && (
          <div css={flipRowCss}>
            <Trans i18nKey="tile.flip">
              <PlayMoveButton move={flip} onPlay={closeDialog}/>
            </Trans>
          </div>
        )}

        <p css={quoteCss}>
          <Trans i18nKey={texts.quote}/>
        </p>
      </section>
    </div>
  )
}

const getTexts = (character: Character): { title: string; effect?: string; endGame?: string; quote: string } => {
  switch (character) {
    case Character.Cartographer:
      return { title: 'cartographer', effect: 'cartographer.effect', quote: 'cartographer.quote' }
    case Character.Navigator:
      return { title: 'navigator', effect: 'navigator.effect', quote: 'navigator.quote' }
    case Character.Parrot:
      return { title: 'parrot', effect: 'parrot.effect', endGame: 'parrot.effect.end-game', quote: 'parrot.quote' }
    case Character.Cook:
      return { title: 'cook', effect: 'cook.effect', quote: 'cook.quote' }
    case Character.Swabby:
      return { title: 'swabby', endGame: 'swabby.effect.end-game', quote: 'swabby.quote' }
    case Character.Gunner:
      return { title: 'gunner', effect: 'gunner.effect', endGame: 'gunner.effect.end-game', quote: 'gunner.quote' }
    case Character.Carpenter:
      return { title: 'carpenter', endGame: 'carpenter.effect.end-game', quote: 'carpenter.quote' }
    case Character.Monkey:
      return { title: 'monkey', effect: 'monkey.effect', quote: 'monkey.quote' }
    case Character.Lookout:
      return { title: 'lookout', endGame: 'lookout.effect.end-game', quote: 'lookout.quote' }
  }
}

/* ---------- Split layout : tile (left) + content (right) ---------- */
const dialogCss = css`
  display: grid;
  grid-template-columns: 14em 1fr;
  gap: 2em;
  padding: 1.4em 1.8em 1.2em 1.4em;
  color: ${ink};
  line-height: 1.5;
  max-width: 56em;

  @media (max-width: 44em) {
    grid-template-columns: 1fr;
    gap: 1.4em;
  }
`

const tileHolderCss = css`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.4em;

  &::after {
    content: '';
    position: absolute;
    top: 0.4em;
    bottom: 0.4em;
    right: -1em;
    width: 1px;
    background: repeating-linear-gradient(180deg, transparent 0 0.4em, rgba(106, 76, 43, 0.45) 0.4em 0.65em);

    @media (max-width: 44em) {
      display: none;
    }
  }
`

/* character tile — brass frame, slight rotation, two tape strips */
const tileFrameCss = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0.6em;
  background: linear-gradient(145deg, ${brassHi}, ${brassGold} 48%, ${brassDark});
  border-radius: 0.3em;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, 0.25),
    0 18px 32px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 230, 170, 0.4);
  transform: rotate(-1deg);

  &::before {
    content: '';
    position: absolute;
    inset: 0.28em;
    border: 1px solid rgba(43, 29, 16, 0.55);
    border-radius: 0.15em;
    pointer-events: none;
    z-index: 1;
  }
`

const tileInnerCss = css`
  width: 100%;
  height: 100%;
  border-radius: 0.15em;
  overflow: hidden;
  background: #2a1a0d;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(0.98) contrast(1.04);
  }
`

const tapeCss = css`
  position: absolute;
  width: 4.2em;
  height: 0.9em;
  background: linear-gradient(180deg, rgba(241, 228, 200, 0.65), rgba(221, 197, 152, 0.8));
  border: 1px solid rgba(106, 76, 43, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  z-index: 2;
`

const tapeTopCss = css`
  top: -0.45em;
  left: 1.6em;
  transform: rotate(-4deg);
`

const tapeBottomCss = css`
  bottom: -0.45em;
  right: 1.6em;
  transform: rotate(3deg);
`

/* ---------- Right column ---------- */
const contentCss = css`
  position: relative;
  min-width: 0;
`

const eyebrowCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  font-size: 0.68em;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: ${inkFaint};
  font-weight: 800;
  margin-bottom: 0.3em;

  &::before {
    content: '';
    display: inline-block;
    width: 1.6em;
    height: 1px;
    background: currentColor;
  }
`

const nameCss = css`
  margin: 0 0 0.1em -0.05em;
  font-size: 2.6em;
  font-weight: 900;
  font-style: italic;
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: ${ink};
  text-shadow: 0 1px 0 rgba(243, 231, 204, 0.7);
  text-wrap: balance;
`

const flourishCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  color: ${inkSoft};
  margin: 0.6em 0 1.1em;
`

const flourishLineCss = css`
  height: 1px;
  width: 3em;
  background: currentColor;
  opacity: 0.55;
`

const flourishLineLongCss = css`
  width: 6em;
`

const flourishMarkCss = css`
  font-size: 1em;
  opacity: 0.7;
  font-weight: 900;
`

/* ---------- Effect rows : tilted cards ---------- */
const effectRowCss = css`
  position: relative;
  margin: 0 0 0.9em;
`

const effectCardCss = css`
  position: relative;
  padding: 0.7em 1em 0.8em;
  background: linear-gradient(180deg, rgba(243, 231, 204, 0.55), rgba(221, 197, 152, 0.25));
  border: 1px solid rgba(106, 76, 43, 0.4);
  border-left: 3px double ${inkSoft};
  border-radius: 2px;
  box-shadow: 2px 2px 0 rgba(139, 30, 30, 0.08);
  transform: rotate(-0.3deg);

  p {
    margin: 0;
    font-size: 0.95em;
    line-height: 1.5;
    color: ${ink};
  }

  p strong {
    font-weight: 800;
    color: ${ink};
  }
`

const effectCardAltRotationCss = css`
  transform: rotate(0.35deg);
`

const effectCardEndgameCss = css`
  background: linear-gradient(180deg, rgba(139, 30, 30, 0.09), rgba(139, 30, 30, 0.02));
  border-left-color: ${accent};
`

const effectTagCss = css`
  display: inline-block;
  font-size: 0.6em;
  letter-spacing: 0.28em;
  font-weight: 900;
  text-transform: uppercase;
  color: ${accent};
  margin-bottom: 0.3em;

  &::before {
    content: '';
    display: inline-block;
    width: 1.2em;
    height: 1px;
    background: currentColor;
    vertical-align: middle;
    margin-right: 0.5em;
  }
`

/* ---------- Flip action row ---------- */
const flipRowCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  margin: 1.1em 0 0.8em;
  padding-top: 0.7em;
  border-top: 1px dashed rgba(106, 76, 43, 0.45);
  font-style: italic;
  color: ${inkSoft};
  font-size: 0.85em;

  button {
    font-weight: 900;
    font-style: normal;
    letter-spacing: 0.1em;
  }
`

/* ---------- Quote ---------- */
const quoteCss = css`
  position: relative;
  margin: 1.4em 0 0;
  padding: 0 0 0 1em;
  border-left: 3px solid ${accent};
  font-size: 1em;
  line-height: 1.45;
  font-style: italic;
  color: ${inkSoft};
  font-weight: 500;
  max-width: 28em;

  &::before {
    content: '\\201C';
    display: inline-block;
    font-size: 1.6em;
    line-height: 0;
    vertical-align: -0.25em;
    color: ${accent};
    font-weight: 900;
    margin-right: 0.1em;
  }

  &::after {
    content: '\\201D';
    font-size: 1.6em;
    line-height: 0;
    vertical-align: -0.25em;
    color: ${accent};
    font-weight: 900;
    margin-left: 0.08em;
  }
`
