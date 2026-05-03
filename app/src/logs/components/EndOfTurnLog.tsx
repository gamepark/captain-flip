/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { TreasureMapHelper } from '@gamepark/captain-flip/rules/helper/TreasureMapHelper'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { MaterialGame, MaterialItem } from '@gamepark/rules-api'
import { usePlayerName } from '@gamepark/react-game'
import { FC, Fragment } from 'react'
import { Trans } from 'react-i18next'
import { treasureMapImages } from '../../effects/treasureMapImages'
import { endTurnTagCss, metaCss, whoCss } from '../logStyles'
import { commonComponents, Props, useName } from '../shared'

/* Fin de tour card. The shape of the card is:
 *
 *   [Fin de tour]   <-- accent tag
 *   Joueur X gagne N [coin] [icons de toutes ses cartes au trésor]
 *     bonus Gambler : +2 (si aucune pièce gagnée ce tour)
 *     bonus Kraken : vole 1 au plus riche
 *
 *  The main body line is only rendered when the player actually
 *  earned something from their maps (N > 0). The map icons shown
 *  after the amount are all the maps currently in the player's
 *  possession — including AllDirections, whose rotation update is
 *  implied visually by showing the card itself (no need for a
 *  separate "rotates one notch" line).
 *
 *  Gambler / Kraken bonuses still get their own italic sub-line
 *  when the player holds the corresponding map. */
export const EndOfTurnLog: FC<Props> = ({ move, context }) => {
  // The StartRule(EndOfTurn) move carries the target player in its
  // `player` field. We prefer it over context.action.playerId because
  // it's the canonical source for who's entering the rule.
  const playerId = (move as any).player ?? context.action.playerId
  const name = useName(playerId)
  const game = context.game

  // Amount gained from treasure maps at end of turn — computed
  // directly via TreasureMapHelper so we don't depend on
  // `game.rule.player` (which still points at the previous rule
  // when this log entry is rendered, since the move hasn't been
  // applied yet).
  const mapsHelper = new TreasureMapHelper(game, playerId)
  const coins = mapsHelper.getEndOfTurnCoins()

  // All maps owned by this player — displayed inline as icons.
  const playerMaps = mapsHelper.playerMaps.getItems() as MaterialItem[]

  const hasGambler = playerMaps.some((m) => m.id === TreasureMapType.Gambler)
  const hasKraken = playerMaps.some((m) => m.id === TreasureMapType.Kraken)
  // Gambler bonus fires when the player has not gained any coin this
  // turn. Memory holds the wallet snapshot at the start of the turn,
  // so we compare against the current wallet (this log renders before
  // the EndOfTurn move is applied, so the wallet doesn't include any
  // end-of-turn bonus yet).
  const coinsAtStart = new CaptainFlipRules(game).remind<number>(Memory.CoinsAtStartOfTurn) ?? 0
  const gamblerTriggered = hasGambler && mapsHelper.getPlayerCoins() <= coinsAtStart

  // Kraken: find the richest opponent and check if the steal triggers.
  const krakenCoins = mapsHelper.getKrakenCoins()
  const krakenTarget = hasKraken ? findRichestOpponent(game, playerId) : undefined

  return (
    <>
      <span css={endTurnTagCss}><Trans i18nKey="log.end-turn.tag"/></span>
      {coins > 0 && (
        <div css={bodyRowCss}>
          <span css={bodyLineCss}>
            <Trans
              i18nKey="log.end-turn.body"
              values={{ player: name, coins }}
              components={{
                ...commonComponents,
                who: <span css={whoCss}/>,
                maps: (
                  <span css={mapsRowCss}>
                    {playerMaps.map((m, i) => (
                      <Fragment key={i}>
                        <img
                          src={treasureMapImages[m.id as TreasureMapType] ?? treasureMapImages[TreasureMapType.Base]}
                          alt=""
                          css={mapIconCss}
                        />
                      </Fragment>
                    ))}
                  </span>
                )
              }}
            />
          </span>
        </div>
      )}
      {gamblerTriggered && (
        <div css={metaCss}>
          <Trans i18nKey="log.end-turn.gambler" components={commonComponents}/>
        </div>
      )}
      {hasKraken && krakenCoins > 0 && (
        <div css={metaCss}>
          <KrakenLine target={krakenTarget}/>
        </div>
      )}
      {hasKraken && krakenCoins === 0 && (
        <div css={metaCss}>
          <KrakenNoStealLine/>
        </div>
      )}
    </>
  )
}

/** Return true iff there's at least one piece of information worth
 *  showing for this player's end-of-turn card. Used by the dispatcher
 *  to skip the whole EndOfTurnLog entry entirely when nothing would
 *  render (no base coins, no Gambler trigger, no Kraken). Keeps the
 *  journal clean instead of emitting a ghost "End of turn" tag with
 *  no content below it. */
export const shouldShowEndOfTurnLog = (game: MaterialGame, playerId: number): boolean => {
  const mapsHelper = new TreasureMapHelper(game, playerId)
  // End-of-turn base coins computed directly from the helper so we
  // don't rely on EndOfTurnRule.getCoins(), which reads this.player
  // from `game.rule` — and the rule hasn't been entered yet at the
  // moment a StartRule(EndOfTurn) move is being logged.
  const coins = mapsHelper.getEndOfTurnCoins()
  if (coins > 0) return true
  const playerMaps = mapsHelper.playerMaps.getItems() as MaterialItem[]
  const hasKraken = playerMaps.some((m) => m.id === TreasureMapType.Kraken)
  if (hasKraken) return true
  const hasGambler = playerMaps.some((m) => m.id === TreasureMapType.Gambler)
  if (hasGambler) {
    const coinsAtStart = new CaptainFlipRules(game).remind<number>(Memory.CoinsAtStartOfTurn) ?? 0
    if (mapsHelper.getPlayerCoins() <= coinsAtStart) return true
  }
  return false
}

/* Row wrapper (block) — forces the body onto its own line under
 * the "Fin de Tour" tag. Extra bottom padding to breathe between
 * the body and any sub-line (Gambler / Kraken) below. */
const bodyRowCss = css`
  display: block;
  line-height: 2.6em;
  padding-bottom: 0.5em;
`

/* The body itself is a single inline-block span so every Trans child
 * (maps, who, num, coin) stays on the same visual line and never
 * wraps — `white-space: nowrap` guarantees it regardless of the
 * parent width. */
const bodyLineCss = css`
  display: inline-block;
  white-space: nowrap;
`

const mapsRowCss = css`
  display: inline;
`

const mapIconCss = css`
  display: inline-block;
  vertical-align: middle;
  width: 2.5em;
  height: 2.5em;
  object-fit: contain;
  margin: 0 0.1em;
`

const krakenMapCss = css`
  display: inline-block;
  vertical-align: middle;
  width: 2.5em;
  height: 2.5em;
  object-fit: contain;
  margin: 0 0.15em;
`

function findRichestOpponent(game: MaterialGame, playerId: PlayerId): PlayerId | undefined {
  const players = game.players.filter((p) => p !== playerId)
  let richest: PlayerId | undefined
  let richestCoins = 0
  for (const p of players) {
    const coins = new TreasureMapHelper(game, p).getPlayerCoins()
    if (coins > richestCoins) {
      richestCoins = coins
      richest = p
    }
  }
  return richest
}

const KrakenLine: FC<{ target?: PlayerId }> = ({ target }) => {
  const targetName = usePlayerName(target) || ''
  return (
    <Trans
      i18nKey="log.end-turn.kraken"
      values={{ target: targetName }}
      defaults="<img/> steals <num>1</num><coin/> from <who>{target}</who>"
      components={{
        ...commonComponents,
        who: <span css={whoCss}/>,
        img: <img src={treasureMapImages[TreasureMapType.Kraken]} alt="" css={krakenMapCss}/>
      }}
    />
  )
}

const KrakenNoStealLine: FC = () => (
  <Trans
    i18nKey="log.end-turn.kraken.nothing"
    defaults="<img/> nothing to steal"
    components={{
      img: <img src={treasureMapImages[TreasureMapType.Kraken]} alt="" css={krakenMapCss}/>
    }}
  />
)
