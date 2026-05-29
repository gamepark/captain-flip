import { getEnumValues, OptionsSpec, OptionsValidationError } from '@gamepark/rules-api'
import { BoardType, boardTypes } from './material/board/Board'
import { TreasureMapType } from './material/TreasureMapType'

export const treasureMapTypes = getEnumValues(TreasureMapType)

/**
 * Expansion boards that cannot be played with the Base Treasure Map:
 * they require one of the advanced Treasure Map variants.
 */
export const boardsForbiddenWithBaseTreasureMap = [
  BoardType.BoardF,
  BoardType.BoardG,
  BoardType.BoardH,
  BoardType.BoardI
]

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type CaptainFlipOptions = {
  players: number,
  board: BoardType,
  treasureMap: TreasureMapType
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const CaptainFlipOptionsSpec: OptionsSpec<CaptainFlipOptions> = {
  board: {
    label: t => t('Adventure board'),
    help: t => t('board.help'),
    values: boardTypes,
    valueSpec: board => ({
      label: t => t(getBoardTitle(board)),
      help: board === BoardType.BoardH ? (t => t('board.observatory.help')) : undefined,
      subscriberRequired: board >= BoardType.BoardE
    })
  },
  treasureMap: {
    label: t => t('treasure-map.option'),
    help: t => t('treasure-map.option.help'),
    values: treasureMapTypes,
    valueSpec: type => ({
      label: t => t(getTreasureMapTypeTitle(type)),
      help: t => t(getTreasureMapTypeHelp(type)),
      subscriberRequired: type !== TreasureMapType.Base,
    }),
    competitiveDisabled: true
  },
  validate(options, t) {
    if (
      options.treasureMap === TreasureMapType.Base &&
      options.board !== undefined &&
      boardsForbiddenWithBaseTreasureMap.includes(options.board)
    ) {
      throw new OptionsValidationError(t('base-map.forbidden'), ['board', 'treasureMap'])
    }
  }
}

export const getTreasureMapTypeHelp = (type: TreasureMapType) => {
  switch (type) {
    case TreasureMapType.Base:
      return 'treasure-map.effect'
    case TreasureMapType.Cursed:
      return 'treasure-map.cursed.effect'
    case TreasureMapType.Inflamed:
      return 'treasure-map.inflamed.effect'
    case TreasureMapType.Gambler:
      return 'treasure-map.gambler.effect'
    case TreasureMapType.Kraken:
      return 'treasure-map.kraken.effect'
    case TreasureMapType.AllDirections:
      return 'treasure-map.alldirections.effect'
  }
}

export const getTreasureMapTypeTitle = (type: TreasureMapType) => {
  switch (type) {
    case TreasureMapType.Base:
      return 'treasure-map'
    case TreasureMapType.Cursed:
      return 'treasure-map.cursed'
    case TreasureMapType.Inflamed:
      return 'treasure-map.inflamed'
    case TreasureMapType.Gambler:
      return 'treasure-map.gambler'
    case TreasureMapType.Kraken:
      return 'treasure-map.kraken'
    case TreasureMapType.AllDirections:
      return 'treasure-map.alldirections'
  }
}

export const getBoardTitle = (board: BoardType) => {
  switch (board) {
    case BoardType.BoardA:
      return 'board.pirate'
    case BoardType.BoardB:
      return 'board.kraken'
    case BoardType.BoardC:
      return 'board.raft'
    case BoardType.BoardD:
      return 'board.island'
    case BoardType.BoardE:
      return 'board.kraken-bonus'
    case BoardType.BoardF:
      return 'board.bathysphere'
    case BoardType.BoardG:
      return 'board.prison'
    case BoardType.BoardH:
      return 'board.observatory'
    case BoardType.BoardI:
      return 'board.isla-bomba'
  }
}

