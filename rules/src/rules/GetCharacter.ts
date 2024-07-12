import { MaterialItem } from '@gamepark/rules-api'
import { Character } from '../material/tiles/Character'

export const getCharacter = (item: MaterialItem): Character => item.location.rotation? item.id.back : item.id.front