import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { Quote } from './Quote'

export const TreasureMapTokenHelp: FC<MaterialHelpProps> = () => {
  return (
    <>
      <h2>
        <Trans i18nKey="treasure-map" />
      </h2>
      <p>
        <Trans i18nKey="treasure-map.effect" />
      </p>
        <Quote quote="treasure-map.quote" />
    </>
  )

}