import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, MouthType, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCreateItemType } from '@gamepark/rules-api/dist/material/moves/items/CreateItem'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 2
  options = { player: 2, board: BoardType.BoardA }
  setup = new TutorialSetup()

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Blackbeard',
      avatar: {
        topType: TopType.Eyepatch,
        facialHairType: FacialHairType.BeardMajestic,
        facialHairColor: HairColorName.Black,
        clotheType: ClotheType.GraphicShirt,
        clotheColor: ClotheColorName.Black,
        graphicType: GraphicType.Skull,
        eyeType: EyeType.Default,
        eyebrowType: EyebrowType.AngryNatural,
        mouthType: MouthType.Smile,
        skinColor: SkinColor.Light
      }
    }
  ]

  steps: TutorialStep[] = [
    {
      popup: { text: () => <Trans defaults="tuto.welcome"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.goal"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.coins"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.draw"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.gunner"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand),
          this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        margin: {
          bottom: 5
        }
      }),
      move: {
        filter: (move) => {
          return isMoveItemType(MaterialType.CharacterTile)(move)
            && move.location.x === 4 && move.location.y === 0
        },
        interrupt: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerHand
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.popup"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.opponent"><strong/><em/></Trans> },
      move: {}
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.AdventureBoardCharacterTile,
        interrupt: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerHand
      }
    },
    {
      popup: { text: () => <Trans defaults="tuto.you"><strong/><em/></Trans> },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.lookout"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand),
          this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        margin: {
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.flip"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand),
          this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        margin: {
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.lookout.flip"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand),
          this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        margin: {
          bottom: 5
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerHand
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.cartographer"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand),
          this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        margin: {
          bottom: 5
        }
      }),
      move: {
        filter: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.x === 4 && move.location.y === 1,
        interrupt: (move) => isMoveItemType(MaterialType.TreasureMapToken)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.cartographer.effect"><strong/><em/></Trans>,
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.TreasureMapToken)
        ]
      }),
      move: {
        interrupt: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerHand
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.2"><strong/><em/></Trans>
      },
      move: {}
    },
    {
      move: {
        player: opponent,
        filter: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.AdventureBoardCharacterTile,
        interrupt: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.PlayerHand
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.you"><strong/><em/></Trans>
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.swabby"><strong/><em/></Trans>,
        position: { y: -20 },
        size: { width: 100 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand),
          this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        margin: {
          top: 7
        }
      })
    },
    {
      move: {
        filter: (move) => isMoveItemType(MaterialType.CharacterTile)(move) && move.location.type === LocationType.AdventureBoardCharacterTile && move.location.x === 4 && move.location.y === 2,
        interrupt: (move) => isCreateItemType(MaterialType.Coin)(move)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.column.completed"><strong/><em/></Trans>,
        position: { x: 40 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me)
          //this.material(game, MaterialType.AdventureBoard).player(me)
        ],
        locations: [
          this.location(LocationType.BoardEffect).player(me).location
        ],
        margin: {
          right: 10
        }
      }),
      move: {}
    },
    {
      popup: { text: () => <Trans defaults="tuto.trigger-end"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans defaults="tuto.go"><strong/><em/></Trans> }
    }
  ]

}