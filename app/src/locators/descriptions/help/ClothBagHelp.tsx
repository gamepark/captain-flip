import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const ClothBagHelp = () => {
  const rules = useRules<CaptainFlipRules>()!
  const remainingInBag = rules.material(MaterialType.CharacterTile).location(LocationType.ClothBag).length
  return (
    <>
      <h2>
        <Trans i18nKey="bag"/>
      </h2>
      <p>
        <Trans i18nKey="bag.count" values={{ number: remainingInBag }}>
          <strong/>
        </Trans>
      </p>
      <p>
        <Trans i18nKey="tile.characters"/>
      </p>
    </>
  )
}