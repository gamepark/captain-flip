import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'
import Flag from '../../images/boards/Flag.png'

const FlagContent = () => (
  <>
    <div css={css`
      position: absolute;
      inset: -10% 0 10% 0;
      background: url(${Flag}) no-repeat center / contain;
      filter: drop-shadow(0.1em 0.1em 0.15em rgba(255,255,255,0.4));
    `} />
    <div css={css`
      position: absolute;
      left: 0;
      top: -5%;
      width: 0.25em;
      height: 200%;
      background: linear-gradient(to right, #5a4a35, #8b7355);
      box-shadow: 0.05em 0 0.1em rgba(0,0,0,0.4);
    `} />
  </>
)

export class FirstPlayerFlagDescription extends LocationDescription {
  width = 3.2
  height = 2.67
  content = FlagContent
}
