/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

type SidePickerPopupProps = {
  /** Currently displayed side for this player, if any. Used to
   *  underline the matching button so the user sees the current state. */
  currentSide?: 'left' | 'right'
  onPick: (side: 'left' | 'right') => void
  onClose: () => void
}

/**
 * Tiny parchment bubble that appears next to a player panel when the
 * user clicks it. Offers two actions: show this player on the port
 * (left) deck, or on the starboard (right) deck. Closes on Escape or
 * when the user clicks outside — but NOT when they click on the bubble
 * itself. The parent places it; we only handle content + behavior.
 */
export const SidePickerPopup: FC<SidePickerPopupProps> = ({ currentSide, onPick, onClose }) => {
  const { t } = useTranslation()
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const onDocClick = (e: MouseEvent) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDocClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDocClick)
    }
  }, [onClose])

  return (
    <div ref={bubbleRef} css={bubbleCss} onClick={(e) => e.stopPropagation()}>
      <span css={labelCss}>{t('view.display-at', 'Afficher à')}</span>
      <button
        css={[buttonCss, currentSide === 'left' && currentCss]}
        onClick={() => onPick('left')}
      >
        {t('view.left', 'Gauche')}
      </button>
      <button
        css={[buttonCss, currentSide === 'right' && currentCss]}
        onClick={() => onPick('right')}
      >
        {t('view.right', 'Droite')}
      </button>
    </div>
  )
}

const bubbleCss = css`
  position: absolute;
  top: calc(100% + 0.8em);
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 0.7em;
  border-radius: 0.3em;
  font-family: 'IM Fell English', 'EB Garamond', serif;
  font-size: 2.4em;
  white-space: nowrap;

  /* Parchment (3-layer, matches theme/parchment.ts) */
  background-color: #e9decb;
  background-image:
    radial-gradient(circle at 18% 22%, rgba(43,29,16,0.10) 0.8px, transparent 1.8px),
    radial-gradient(circle at 62% 38%, rgba(43,29,16,0.08) 0.6px, transparent 1.5px),
    radial-gradient(circle at 84% 74%, rgba(43,29,16,0.10) 0.7px, transparent 1.8px),
    radial-gradient(120% 80% at 50% 0%, #f3e7cc 0%, #e9decb 40%, #d9c393 100%);
  background-size: 8px 8px, 11px 11px, 13px 13px, 100% 100%;
  background-blend-mode: multiply, multiply, multiply, normal;
  box-shadow:
    inset 0 0 0 1px rgba(43,29,16,0.4),
    inset 0 0 1em rgba(91,61,18,0.25),
    0 0.4em 0.9em rgba(0,0,0,0.6);
  color: #2b1d10;

  /* Little arrow pointing up towards the panel above the bubble */
  &::before {
    content: '';
    position: absolute;
    top: -0.4em;
    left: 50%;
    transform: translateX(-50%);
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;
    border-bottom: 0.45em solid #e9decb;
    filter: drop-shadow(0 -0.03em 0 rgba(43,29,16,0.4));
  }
`

const labelCss = css`
  font-style: italic;
  font-size: 0.75em;
  color: #6a4c2b;
  padding: 0 0.2em;
  white-space: nowrap;
`

const buttonCss = css`
  appearance: none;
  border: 1px solid rgba(43,29,16,0.45);
  cursor: pointer;
  padding: 0.3em 0.8em;
  border-radius: 0.2em;
  font-family: inherit;
  font-size: 0.85em;
  color: #2b1d10;
  background: linear-gradient(180deg, #f3e7cc, #d9c393);
  box-shadow: 0 0.1em 0.2em rgba(0,0,0,0.25);
  transition: background 150ms ease, transform 120ms ease;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(180deg, #faf0d6, #e9decb);
    transform: translateY(-0.05em);
  }
  &:active { transform: translateY(0.05em); }
`

const currentCss = css`
  text-decoration: underline;
  text-decoration-color: rgba(139,30,30,0.8);
  text-decoration-thickness: 0.1em;
  text-underline-offset: 0.2em;
`
