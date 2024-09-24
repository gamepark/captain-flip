import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import isEqual from 'lodash/isEqual'
import { characterTileDescription } from '../../material/CharacterTileDescription'

export class AdventureBoardCharacterTileDescription extends DropAreaDescription {
  constructor() {
    super(characterTileDescription)
  }

  canShortClick(move: MaterialMove, location: Location, context: MaterialContext) {
    if (
      context.rules.game.rule?.id === RuleId.Monkey
      || !isMoveItemType(MaterialType.CharacterTile)(move)
      || move.location.type !== LocationType.AdventureBoardCharacterTile
    ) return false
    const { rotation, ...rest } = move.location
    return isEqual(rest, location)
  }
}