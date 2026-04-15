/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Carpenter from '../../images/characters/Carpenter.jpg'
import Gunner from '../../images/characters/Gunner.jpg'
import Lookout from '../../images/characters/Lookout.jpg'
import Parrot from '../../images/characters/Parrot.jpg'
import Swabby from '../../images/characters/Swabby.jpg'
import TotalCoin from '../../images/coins/TotalCoin.png'
import TreasureMapInflamed from '../../images/treasure-map/TreasureMapInflamed.png'
import { CarpenterScoringRule } from '../../scoring/rules/CarpenterScoringRule'
import { ColumnBonusScoringRule } from '../../scoring/rules/ColumnBonusScoringRule'
import { InflamedBonusScoringRule } from '../../scoring/rules/InflamedBonusScoringRule'
import { LookoutScoringRule } from '../../scoring/rules/LookoutScoringRule'
import { ParrotScoringRule } from '../../scoring/rules/ParrotScoringRule'
import { SwabbyScoringRule } from '../../scoring/rules/SwabbyScoringRule'
import { scoreDeltaCss, scoreDeltaLossCss, whoCss } from '../logStyles'
import { Props, useName } from '../shared'

/* Compact per-player end-of-game breakdown.
 *
 * Structure mirrors the result dialog so the sum of parts always
 * matches the final total:
 *   [coins accumulated] [+swabby] [+carpenter] [+lookout] [−parrot]
 *   [+columnBonus] [×gunners if 3+] = total
 *
 * `coins` = total current coins - end-of-game gains, i.e. the coins
 * the player earned during play (from tile effects, cook, gunner...)
 * before the final scoring kicks in. Rendered first so the math reads
 * cleanly left-to-right. */
export const PlayerScoreBreakdownLog: FC<Props> = ({ move, context }) => {
  const playerId = (move as any).player ?? context.action.playerId
  const name = useName(playerId)
  const game = context.game
  const rules = new CaptainFlipRules(game)

  const swabby = new SwabbyScoringRule(game, playerId).getCoins() ?? 0
  const carpenter = new CarpenterScoringRule(game, playerId).getCoins() ?? 0
  const lookout = new LookoutScoringRule(game, playerId).getCoins() ?? 0
  const parrot = new ParrotScoringRule(game, playerId).getCoins() ?? 0
  const columnBonus = new ColumnBonusScoringRule(game, playerId).getCoins() ?? 0
  const inflamedBonus = new InflamedBonusScoringRule(game, playerId).getCoins() ?? 0
  // Coins accumulated during play. We log BEFORE the scoring rules
  // run, so the helper already gives us the pre-scoring balance.
  const earnedCoins = new CoinHelper(game, playerId).coins
  const gunners = rules.getPlayerGunners(playerId)
  const isZeroed = gunners >= 3
  // Final total = current coins + all end-of-game adjustments,
  // zeroed out if the player has 3+ gunners.
  const computedTotal = earnedCoins + swabby + carpenter + lookout + parrot + columnBonus + inflamedBonus
  const total = isZeroed ? 0 : computedTotal

  // Only show the Inflamed column at all when the Burned map is
  // actually in play — if no one can ever claim it, the column
  // would be empty for every player.
  const inflamedInGame = rules.material(MaterialType.TreasureMapToken)
    .getItems()
    .some((t) => t.id === TreasureMapType.Inflamed)

  const parts: Array<{ key: string; icon: string; value: number; loss?: boolean }> = []
  // Always show the accumulated coins first, even if 0, so the
  // visual math is legible.
  parts.push({ key: 'coins', icon: TotalCoin, value: earnedCoins })
  if (swabby) parts.push({ key: 'swabby', icon: Swabby, value: swabby })
  if (carpenter) parts.push({ key: 'carpenter', icon: Carpenter, value: carpenter })
  if (lookout) parts.push({ key: 'lookout', icon: Lookout, value: lookout })
  if (parrot) parts.push({ key: 'parrot', icon: Parrot, value: parrot, loss: parrot < 0 })
  if (columnBonus) parts.push({ key: 'column', icon: TotalCoin, value: columnBonus })
  if (inflamedInGame && inflamedBonus) {
    parts.push({ key: 'inflamed', icon: TreasureMapInflamed, value: inflamedBonus })
  }

  return (
    <span css={rowCss}>
      <span css={whoCss}>{name}</span>
      <span css={partsRowCss}>
        {parts.map((p) => (
          <span key={p.key} css={partCss}>
            <img src={p.icon} alt="" css={miniTileCss}/>
            <span css={p.loss || p.value < 0 ? scoreDeltaLossCss : scoreDeltaCss}>
              {p.value > 0 ? '+' : ''}{p.value}
            </span>
          </span>
        ))}
        {isZeroed && (
          <span css={gunnerPenaltyCss}>
            <img src={Gunner} alt="" css={miniTileCss}/>
            <span>×{gunners}</span>
            <Trans i18nKey="log.score.gunner-zero"/>
          </span>
        )}
      </span>
      <span css={totalCss}>
        =<span>{total}</span>
        <img src={TotalCoin} alt="" css={coinCss}/>
      </span>
    </span>
  )
}

const rowCss = css`
  display: flex;
  align-items: center;
  gap: 0.8em;
  flex-wrap: wrap;
  width: 100%;
`

const partsRowCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  flex: 1;
  flex-wrap: wrap;
`

const partCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.15em;
`

const gunnerPenaltyCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  color: #8b1e1e;
  font-style: italic;
  font-weight: 700;
`

const miniTileCss = css`
  display: inline-block;
  width: 2em;
  height: 2em;
  object-fit: cover;
  border-radius: 0.15em;
`

const totalCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.2em;
  font-weight: 900;
  font-size: 1.1em;
`

const coinCss = css`
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  object-fit: contain;
`
