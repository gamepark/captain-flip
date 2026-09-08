import { FC } from 'react'
import { Trans } from 'react-i18next'
import { commonComponents, Props } from '../shared'

/** 2-player game: "left" and "right" are the same opponent, so the maps
 *  are swapped automatically without the player choosing a direction. */
export const PassMapSwapLog: FC<Props> = () => (
  <Trans i18nKey="log.board.pass-map-swap" components={commonComponents}/>
)
