import { Character } from '../../material/tiles/Character'
import { RuleId } from '../RuleId'

export const CharacterEffect: Partial<Record<Character, RuleId>> = {
  [Character.Cartographer]: RuleId.Cartographer,
  [Character.Navigator]: RuleId.Navigator,
  [Character.Parrot]: RuleId.Parrot,
  [Character.Cook]: RuleId.Cook,
  [Character.Gunner]: RuleId.Gunner,
  [Character.Monkey]: RuleId.Monkey,
}