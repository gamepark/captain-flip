import { CaptainFlipSetup } from '@gamepark/captain-flip/CaptainFlipSetup'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { Character } from '@gamepark/captain-flip/material/tiles/Character'

export class TutorialSetup extends CaptainFlipSetup {

  setupClothBag() {
    super.setupClothBag()
    const clothbag = this.material(MaterialType.CharacterTile).location(LocationType.ClothBag)
    const firstTile = clothbag.id(({ front, back }: any) => front === Character.Lookout && back === Character.Gunner)
    const secondTile = clothbag.id(({ front, back }: any) => front === Character.Swabby && back === Character.Cook)
    const thirdTile = clothbag.id(({ front, back }: any) => front === Character.Lookout && back === Character.Cartographer)
    const fourthTile = clothbag.id(({ front, back }: any) => front === Character.Carpenter && back === Character.Swabby)
    const fifthTile = clothbag.id(({ front, back }: any) => front === Character.Swabby && back === Character.Gunner)

    fifthTile.moveItem({
      type: LocationType.ClothBag,
      rotation: false
    })

    fourthTile.moveItem((item) => ({
      type: LocationType.ClothBag,
      rotation: item.location.rotation
    }))

    thirdTile.moveItem({
      type: LocationType.ClothBag,
      rotation: false
    })

    secondTile.moveItem((item) => ({
      type: LocationType.ClothBag,
      rotation: item.location.rotation
    }))

    firstTile.moveItem({
      type: LocationType.ClothBag,
      rotation: true
    })
  }
}