/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { FC } from 'react'
import { parchmentFillCss } from '../theme/parchment'

/** Small floating toast displayed when the player has minimized a
 *  dialog they still need to answer. Clicking it re-opens the dialog.
 *  Shares the exact parchment recipe used by theme.dialog.container
 *  so the background matches the dialog it re-opens. */
export const MinimizedToast: FC<{ title: string, onClick: () => void }> = ({ title, onClick }) => (
  <div css={[parchmentFillCss, toastCss]} onClick={onClick}>
    <span css={toastTitleCss}>{title}</span>
    <span css={toastBtnCss}>Open</span>
  </div>
)

const toastSlideUp = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(0.6em); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`

const toastCss = css`
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.35em 0.45em 0.35em 0.9em;
  border-radius: 0.36em;
  box-shadow:
    inset 0 0 0 0.08em rgba(106, 76, 43, 0.35),
    0 0.3em 0.8em rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 1000;
  font-size: 1.3em;
  white-space: nowrap;
  animation: ${toastSlideUp} 0.3s ease-out;
`

const toastTitleCss = css`
  font-weight: 700;
  font-style: italic;
`

const toastBtnCss = css`
  padding: 0.2em 0.7em;
  background: linear-gradient(180deg, #8b1e1e, #5a0e0e);
  color: #f3e7cc;
  border-radius: 0.25em;
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`
