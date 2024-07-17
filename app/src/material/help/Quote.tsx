/** @jsxImportSource @emotion/react */ import { css } from '@emotion/react'
import { FC } from 'react'
import { Trans } from 'react-i18next'

type QuoteProps = {
  quote: string
}

export const Quote: FC<QuoteProps> = ({ quote }) => {
  return (
    <>
      <div css={alignRightCss}>
        <Trans defaults={quote} />
      </div>
    </>
  )
}

const alignRightCss = css`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-style: italic;
  color: #575756;
  font-size: 0.9em;
  margin-bottom: 1.5em;
`