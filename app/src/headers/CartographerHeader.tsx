/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'
import { GetTreasureMap } from './GetTreasureMap'

export const CartographerHeader = () => {
  const { t } = useTranslation()

  return <GetTreasureMap effect={t('cartographer')} />
}
