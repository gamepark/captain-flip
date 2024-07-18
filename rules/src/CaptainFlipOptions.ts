import { OptionsSpec } from '@gamepark/rules-api'
import { BoardType, boardTypes } from './material/board/Board'

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type CaptainFlipOptions = {
  players: number,
  board: BoardType
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const CaptainFlipOptionsSpec: OptionsSpec<CaptainFlipOptions> = {
  board: {
    label: t => t('Adventure board'),
    values: boardTypes,
    valueSpec: board => ({
      label: t => t(getBoardTitle(board)),
      subscriberRequired: board !== BoardType.BoardA
    })
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
  }
}