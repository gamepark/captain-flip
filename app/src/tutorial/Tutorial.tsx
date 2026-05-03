import { ClotheType, EyebrowType, EyeType, FacialHairType, GraphicType, HairColorName, MouthType, SkinColor, TopType } from '@gamepark/avataaars'
import ClotheColorName from '@gamepark/avataaars/dist/avatar/clothes/ClotheColorName'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { LocationType } from '@gamepark/captain-flip/material/LocationType'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCreateItemType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

/** AdventureBoard is now a static item (not in `game.items`). The
 *  tutorial uses BoardA, so we expose a ready-made focus entry. */
const meBoardStaticItem = {
  type: MaterialType.AdventureBoard,
  item: {
    id: BoardType.BoardA,
    location: { type: LocationType.AdventureBoard, player: me }
  }
}

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 3
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
      popup: { text: () => <Trans i18nKey="tuto.welcome"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans i18nKey="tuto.goal"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans i18nKey="tuto.coins"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans i18nKey="tuto.draw"><strong/><em/></Trans> }
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.gunner"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand)
        ],
        staticItems: [meBoardStaticItem],
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
      popup: { text: () => <Trans i18nKey="tuto.popup"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans i18nKey="tuto.opponent"><strong/><em/></Trans> },
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
      popup: { text: () => <Trans i18nKey="tuto.you"><strong/><em/></Trans> },
      move: {}
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.lookout"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand)
        ],
        staticItems: [meBoardStaticItem],
        margin: {
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.flip"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand)
        ],
        staticItems: [meBoardStaticItem],
        margin: {
          bottom: 5
        }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.lookout.flip"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand)
        ],
        staticItems: [meBoardStaticItem],
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
        text: () => <Trans i18nKey="tuto.cartographer"><strong/><em/></Trans>,
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand)
        ],
        staticItems: [meBoardStaticItem],
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
        text: () => <Trans i18nKey="tuto.cartographer.effect"><strong/><em/></Trans>,
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
        text: () => <Trans i18nKey="tuto.opponent.2"><strong/><em/></Trans>
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
        text: () => <Trans i18nKey="tuto.you"><strong/><em/></Trans>
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.swabby"><strong/><em/></Trans>,
        position: { y: -20 },
        size: { width: 100 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me).location(LocationType.PlayerHand)
        ],
        staticItems: [meBoardStaticItem],
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
        text: () => <Trans i18nKey="tuto.column.completed"><strong/><em/></Trans>,
        position: { x: 40 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.CharacterTile).player(me)
        ],
        staticItems: [meBoardStaticItem],
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
      popup: { text: () => <Trans i18nKey="tuto.trigger-end"><strong/><em/></Trans> }
    },
    {
      popup: { text: () => <Trans i18nKey="tuto.go"><strong/><em/></Trans> }
    }
  ]

}