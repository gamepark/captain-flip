import { FC } from 'react'
import { Trans } from 'react-i18next'
import { commonComponents, Props, useName } from '../shared'

export const PassMapLeftLog: FC<Props> = ({ context }) => {
  const name = useName(context.action.playerId)
  return (
    <Trans
      i18nKey="log.board.pass-map-left"
      values={{ player: name }}
      components={commonComponents}
    />
  )
}
