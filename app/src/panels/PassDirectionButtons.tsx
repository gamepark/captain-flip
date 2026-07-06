import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CustomMoveType } from '@gamepark/captain-flip/material/CustomMoveType'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { PlayMoveButton, useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PassDirectionButtons: FC = () => {
  const rules = useRules<CaptainFlipRules>()!
  const playerId = usePlayerId()
  const { t } = useTranslation()
  const legalMoves = useLegalMoves()
  // Screen layout maps the previous player to the left and the next player
  // to the right, so the "← Pass left" button plays PassPrevious and the
  // "Pass right →" button plays PassNext. The rule itself stays turn-order
  // based (see BoardEffectPassTreasureMapRule).
  const passPrevious = legalMoves.find(isCustomMoveType(CustomMoveType.PassPrevious))
  const passNext = legalMoves.find(isCustomMoveType(CustomMoveType.PassNext))

  if (rules.game.rule?.id !== RuleId.BoardEffectPassTreasureMap) return null
  if (!playerId || playerId !== rules.game.rule?.player) return null
  if (!passPrevious || !passNext) return null

  return (
    <>
      <div css={[buttonWrapCss, leftButtonCss]}>
        <PlayMoveButton move={passPrevious} css={directionButtonCss}>
          ← {t('pass.left', 'Pass left')}
        </PlayMoveButton>
      </div>
      <div css={[buttonWrapCss, rightButtonCss]}>
        <PlayMoveButton move={passNext} css={directionButtonCss}>
          {t('pass.right', 'Pass right')} →
        </PlayMoveButton>
      </div>
    </>
  )
}

const buttonWrapCss = css`
  position: absolute;
  z-index: 40;
  transform: translateZ(100em);
`

const leftButtonCss = css`
  top: 5em;
  left: 2em;
`

const rightButtonCss = css`
  top: 5em;
  right: 2em;
`

const directionButtonCss = css`
  font-size: 2em;
  padding: 0.4em 0.8em;
  border-radius: 0.5em;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(180deg, #d4a828, #c09020);
  color: white;
  border: 0.1em solid #a07818;
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.4);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  &:hover {
    background: linear-gradient(180deg, #e0b838, #d0a028);
  }
`
