import { css } from '@emotion/react'
import { ItemButtonProps, ItemMenuButton } from '@gamepark/react-game'
import { HTMLAttributes, ReactNode } from 'react'
import { brass, brassDk, brassHi, ink, inkSoft } from './palette'

/* ------------------------------------------------------------------
 * Styled ItemMenuButton for Captain Flip — brass medallion with a
 * parchment ribbon for the label. Mirrors the parchment / pirate
 * vibe used by dialogs, header and menu buttons. Mainly used by the
 * "Flip" action on character tiles, but kept generic so any future
 * tile action can reuse the same recipe.
 * ------------------------------------------------------------------ */
type FlipMenuButtonProps = ItemButtonProps & HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export const FlipMenuButton = ({ labelPosition, x, ...props }: FlipMenuButtonProps) => {
  const position = labelPosition ?? (x && x > 0 ? 'left' : 'right')
  return <ItemMenuButton css={flipMenuButtonCss(position)} labelPosition={labelPosition} x={x} {...props}/>
}

const flipMenuButtonCss = (labelPosition: 'left' | 'right') => css`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, ${brassHi} 0%, ${brass} 55%, ${brassDk} 100%);
  border: 0.1em solid ${brassDk};
  color: ${ink};
  box-shadow:
    0 0.15em 0.4em rgba(0, 0, 0, 0.65),
    0 0.05em 0.15em rgba(0, 0, 0, 0.5),
    inset 0 0.08em 0.18em rgba(255, 232, 170, 0.6),
    inset 0 -0.1em 0.2em rgba(0, 0, 0, 0.45);
  font-size: 0.8em;
  transition: margin-top 0.15s, filter 0.15s;

  &:hover:not(:disabled) {
    margin-top: -0.15em;
    filter: brightness(1.08);
  }

  > span {
    font-size: 0.7em;
    font-weight: 800;
    font-style: italic;
    color: ${ink};
    background: linear-gradient(180deg, #fbf2d8, #ddc998);
    border: 0.1em solid ${inkSoft};
    box-shadow:
      0 0.12em 0.3em rgba(0, 0, 0, 0.55),
      0 0.04em 0.1em rgba(0, 0, 0, 0.4);
    text-shadow: 0 0.06em 0 rgba(243, 231, 204, 0.7);
    letter-spacing: 0.05em;
    white-space: nowrap;
    ${labelPosition === 'right'
      ? `border-left: none;
         border-radius: 0 0.3em 0.3em 0;
         padding: 0.15em 0.55em 0.15em 0.75em;`
      : `border-right: none;
         border-radius: 0.3em 0 0 0.3em;
         padding: 0.15em 0.75em 0.15em 0.55em;`
    }
  }
`
