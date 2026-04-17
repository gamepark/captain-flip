/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { MaterialHelpProps, PlayMoveButton, useLegalMoves, usePlayerId } from '@gamepark/react-game'
import { isMoveItemType, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { treasureMapImages } from '../../effects/treasureMapImages'

/* palette shared with the rest of the parchment help family */
const ink = '#2b1d10'
const inkSoft = '#4b3520'
const inkFaint = '#6a4c2b'
const accent = '#8b1e1e'
const brassHi = '#f2d07a'
const brassGold = '#a47428'
const brassDark = '#5b3d12'

/* Texts for every treasure-map variant. */
const getTexts = (type: TreasureMapType): { title: string; effect: string } => {
  switch (type) {
    case TreasureMapType.Base:
      return { title: 'treasure-map', effect: 'treasure-map.effect' }
    case TreasureMapType.Cursed:
      return { title: 'treasure-map.cursed', effect: 'treasure-map.cursed.effect' }
    case TreasureMapType.Inflamed:
      return { title: 'treasure-map.inflamed', effect: 'treasure-map.inflamed.effect' }
    case TreasureMapType.Gambler:
      return { title: 'treasure-map.gambler', effect: 'treasure-map.gambler.effect' }
    case TreasureMapType.Kraken:
      return { title: 'treasure-map.kraken', effect: 'treasure-map.kraken.effect' }
    case TreasureMapType.AllDirections:
      return { title: 'treasure-map.alldirections', effect: 'treasure-map.alldirections.effect' }
  }
}

export const TreasureMapTokenHelp: FC<MaterialHelpProps> = (props) => {
  const { item, itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const me = usePlayerId()
  const type = (item.id ?? TreasureMapType.Base) as TreasureMapType
  const texts = getTexts(type)
  const image = treasureMapImages[type]

  // If the current player has a legal move to pick THIS exact map,
  // expose a button so they can take it straight from the help popup.
  const pickMove = useLegalMoves<MoveItem>(
    (m: any) => isMoveItemType(MaterialType.TreasureMapToken)(m)
      && m.itemIndex === itemIndex
      && m.location.type === LocationType.PlayerTreasureMapToken
      && m.location.player === me
  )[0]

  return (
    <div css={dialogCss}>
      {/* LEFT : brass-framed treasure map with tape strips */}
      <aside css={tileHolderCss}>
        <div css={tileFrameCss}>
          <span css={[tapeCss, tapeTopCss]}/>
          <span css={[tapeCss, tapeBottomCss]}/>
          <div css={tileInnerCss}>
            <img src={image} alt=""/>
          </div>
        </div>
      </aside>

      {/* RIGHT : content column */}
      <section css={contentCss}>
        <div css={eyebrowCss}>
          <Trans i18nKey="treasure-map"/>
        </div>
        <h2 css={nameCss}>
          <Trans i18nKey={texts.title}/>
        </h2>
        <div css={flourishCss}>
          <span css={flourishLineCss}/>
          <span css={flourishMarkCss}>✦</span>
          <span css={[flourishLineCss, flourishLineLongCss]}/>
        </div>

        <div css={effectRowCss}>
          <div css={effectCardCss}>
            <span css={effectTagCss}>
              <Trans i18nKey="power"/>
            </span>
            <p>
              <Trans i18nKey={texts.effect}>
                <strong/>
              </Trans>
            </p>
          </div>
        </div>

        {pickMove && (
          <PlayMoveButton move={pickMove} onPlay={closeDialog} css={takeButtonCss}>
            {t('pick-map.take', 'Take this map')}
          </PlayMoveButton>
        )}
      </section>
    </div>
  )
}

/* ---------- Split layout : map (left) + content (right) ---------- */
const dialogCss = css`
  display: grid;
  grid-template-columns: 14em 1fr;
  gap: 2em;
  padding: 1.4em 1.8em 1.2em 1.4em;
  color: ${ink};
  line-height: 1.5;
  max-width: 52em;

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

/* treasure-map illustration framed in brass */
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
    object-fit: contain;
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

/* ---------- Effect row : tilted card ---------- */
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

const takeButtonCss = css`
  margin-top: 0.3em;
  padding: 0.55em 1.2em;
  font-size: 1.05em;
  font-weight: 700;
  font-style: italic;
  color: #f3e7cc;
  background: linear-gradient(180deg, #8b1e1e, #5a0e0e);
  border: 1px solid rgba(43, 29, 16, 0.6);
  border-radius: 0.3em;
  cursor: pointer;
  box-shadow: 0 0.15em 0.35em rgba(0, 0, 0, 0.35);
  transition: filter 150ms ease, transform 120ms ease;

  &:hover { filter: brightness(1.1); transform: translateY(-0.05em); }
  &:active { transform: translateY(0.05em); }
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

