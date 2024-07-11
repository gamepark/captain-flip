import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { characterTileDescription } from '../../material/CharacterTileDescription'

export class AdventureBoardCharacterTileDescription extends LocationDescription {
  height = characterTileDescription.height
  width = characterTileDescription.width

  borderRadius = 0.4
  isAlwaysVisible(location: Location, context: MaterialContext): boolean {
    if (context.rules.game.rule?.id !== RuleId.Monkey) return super.isAlwaysVisible(location, context)
    return context.player === location.player
  }

  highlight(location: Location, context: MaterialContext) {
    if (context.rules.game.rule?.id !== RuleId.Monkey) return super.highlight?.(location, context)
    return false
  }

}