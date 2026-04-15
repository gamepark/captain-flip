/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { Avatar } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { victoryTagCss, victoryTotalCss, victoryWinnerCss } from '../logStyles'
import { commonComponents, Props, useName } from '../shared'

/* End-of-game victory card. Triggered by the `endGame()` move.
 *
 * Layout: VICTOIRE ribbon → big player avatar → winner name → total.
 * The winner is picked via `CaptainFlipRules.getScore()` which handles
 * tie-breakers (3 Gunners → 0, treasure map count, etc.). */
export const VictoryLog: FC<Props> = ({ context }) => {
  const rules = new CaptainFlipRules(context.game)
  const players = context.game.players ?? []
  let winnerId: number | undefined
  let winnerScore = -Infinity
  for (const p of players) {
    const score = rules.getScore(p)
    if (score > winnerScore) {
      winnerScore = score
      winnerId = p
    }
  }
  const name = useName(winnerId)
  const total = winnerScore === -Infinity ? 0 : winnerScore
  return (
    <>
      <span css={victoryTagCss}><Trans i18nKey="log.victory.tag"/></span>
      {winnerId !== undefined && (
        <div css={avatarWrapCss}>
          <Avatar playerId={winnerId} css={avatarCss}/>
        </div>
      )}
      <span css={victoryWinnerCss}>{name}</span>
      <span css={victoryTotalCss}>
        <Trans i18nKey="log.victory.total" values={{ total }} components={commonComponents}/>
      </span>
    </>
  )
}

const avatarWrapCss = css`
  display: flex;
  justify-content: center;
  margin: 0.3em 0 0.5em;
`

const avatarCss = css`
  display: inline-block !important;
  position: relative !important;
  width: 4.5em !important;
  height: 4.5em !important;
  border-radius: 50%;
  box-shadow:
    0 0 0 0.15em #f2d07a,
    0 0 0 0.3em #5b3d12,
    0 0.3em 0.6em rgba(0, 0, 0, 0.35);
`
