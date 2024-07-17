import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { Trans } from 'react-i18next'

export const ClothBagHelp = () => {
  const rules = useRules<CaptainFlipRules>()!
  const remainingInBag = rules.material(MaterialType.CharacterTile).location(LocationType.ClothBag).length
  return (
    <>
      <h2>
        <Trans defaults="bag" />
      </h2>
      <p>
        <Trans defaults="bag.count" values={{ number: remainingInBag }}>
          <strong />
        </Trans>
      </p>
    </>
  )
}