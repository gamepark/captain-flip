/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { BoardType } from '@gamepark/captain-flip/material/board/Board'
import { BoardDescription, BoardSpaceEffect } from '@gamepark/captain-flip/material/board/description/BoardCommon'
import { BoardSpaceType } from '@gamepark/captain-flip/material/board/description/BoardSpaceType'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { Memory } from '@gamepark/captain-flip/rules/Memory'
import { MaterialHelpProps, Picture, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import Flag from '../../images/boards/Flag.png'
import BoardACoin3 from '../../images/effect/BoardACoin3.png'
import BoardACoin5 from '../../images/effect/BoardACoin5.png'
import BoardATreasureMap from '../../images/effect/BoardATreasureMap.png'
import BoardETreasureMap from '../../images/effect/BoardETreasureMap.png'
import BoardB0Then2 from '../../images/effect/BoardB0Then2.png'
import BoardB1Then0 from '../../images/effect/BoardB1Then0.png'
import BoardB2Then1 from '../../images/effect/BoardB2Then1.png'
import BoardB4Then2 from '../../images/effect/BoardB4Then2.png'
import BoardB6Then3 from '../../images/effect/BoardB6Then3.png'
import BoardCCoin4 from '../../images/effect/BoardCCoin4.jpg'
import BoardCCoin6 from '../../images/effect/BoardCCoin6.jpg'
import BoardCTreasureMap from '../../images/effect/BoardCTreasureMap.png'
import BoardDCoin3 from '../../images/effect/BoardDCoin3.png'
import BoardDCoinFull from '../../images/effect/BoardDCoinFull.png'
import BoardDCoinPerDiff from '../../images/effect/BoardDCoinPerDiff.png'
import BoardDCost from '../../images/effect/BoardDCost.png'
import BoardEFlip from '../../images/effect/BoardEFlip.png'
import BoardEReplay from '../../images/effect/BoardEReplay.png'
import BoardECoin3 from '../../images/effect/BoardECoin3.png'
import BoardECoin4 from '../../images/effect/BoardECoin4.png'

export const AdventureBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<CaptainFlipRules>()!
  const description = new BoardHelper(rules.game).boardDescription
  const effects = getEffects(description)
  return (
    <>
      <h2>
        <Trans defaults={getBoardTitle(item.id)}/>
      </h2>
      <p>
        <Trans defaults="board.bonus"/>
      </p>
      <div css={endGameCss}>
        <Trans defaults="end-game"/>
      </div>
      <div css={css`margin-bottom: 1em`}>
        <Trans defaults="end-game.rule"/>
      </div>
      {effects.map((e, index) => (
        <EffectExplaination key={index} board={rules.remind(Memory.Board)} effect={e!}/>
      ))}
      <FlagExplaination {...props} />
    </>
  )

}

type EffectExplainationProps = {
  board: BoardType
  effect: BoardSpaceEffect
}

const getEffects = (description: BoardDescription) => {
  const board = description.board
  const effects = []
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < 5; y++) {
    const line = board[y]
      if (line[x] === undefined || line[x]?.type === BoardSpaceType.None) continue
      effects.push(line[x])
    }
  }

  return effects
}

const EffectExplaination: FC<EffectExplainationProps> = (props) => {
  const { board, effect } = props
  const image = getEffectImage(board, effect)
  return (
    <div css={effectExplainationContainer}>
      <div css={imageRadiusCss}>
        {image && <Picture css={[imageCss]} src={image}></Picture>}
      </div>
      <div css={textContainer}>
        {getEffectDesc(effect)}
      </div>
    </div>
  )
}

const getEffectImage = (board: BoardType, effect: BoardSpaceEffect) => {
  switch (effect.type) {
    case BoardSpaceType.CoinsX:
      if (board === BoardType.BoardA) {
        if (effect.value === 3) return BoardACoin3
        if (effect.value === 5) return BoardACoin5
      }

      if (board === BoardType.BoardD) {
        if (effect.value === 3) return BoardDCoin3
      }
      if (board === BoardType.BoardE) {
        if (effect.value === 3) return BoardECoin3
        if (effect.value === 4) return BoardECoin4
      }
      break
    case BoardSpaceType.TreasureMap:
      if (board === BoardType.BoardA) {
        return BoardATreasureMap
      }

      if (board === BoardType.BoardE) {
        return BoardETreasureMap
      }

      return BoardCTreasureMap
    case BoardSpaceType.CoinIfSame:
      if (board === BoardType.BoardC) {
        return BoardCCoin6
      }
      break
    case BoardSpaceType.CoinIfAllDifferent:
      if (board === BoardType.BoardC) {
        return BoardCCoin4
      }
      break
    case BoardSpaceType.Cost:
      if (board === BoardType.BoardD) {
        return BoardDCost
      }
      break
    case BoardSpaceType.FirstXThenY:
      if (board === BoardType.BoardB) {
        if (effect.first === 1 && effect.then === 0) return BoardB1Then0
        if (effect.first === 2 && effect.then === 1) return BoardB2Then1
        if (effect.first === 6 && effect.then === 3) return BoardB6Then3
        if (effect.first === 0 && effect.then === 2) return BoardB0Then2
        if (effect.first === 4 && effect.then === 2) return BoardB4Then2
      }
      break
    case BoardSpaceType.CoinPerFullColumn:
      return BoardDCoinFull
    case BoardSpaceType.CoinPerDifferent:
      return BoardDCoinPerDiff
    case BoardSpaceType.Flip:
      return BoardEFlip
    case BoardSpaceType.Replay:
      return BoardEReplay
  }

  return
}

const getEffectDesc = (effect: BoardSpaceEffect) => {
  switch (effect.type) {
    case BoardSpaceType.CoinsX:
      return (
        <Trans defaults="effect.take-coins" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.TreasureMap:
      if (effect.isAllSame) {
        return (
          <Trans defaults="effect.treasure.same" values={{ number: effect.value }}>
            <strong/>
          </Trans>
        )
      }
      return (
        <Trans defaults="cartographer.effect">
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinIfSame:
      return (
        <Trans defaults="effect.same-all" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinIfAllDifferent:
      return (
        <Trans defaults="effect.diff-all" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerFullColumn:
      return (
        <Trans defaults="effect.column-full" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.CoinPerDifferent:
      return (
        <Trans defaults="effect.diff-each" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.Cost:
      return (
        <Trans defaults="effect.pay" values={{ number: effect.value }}>
          <strong/>
        </Trans>
      )
    case BoardSpaceType.Flip:
      if (effect.isAllDifferent) {
        return (
          <Trans defaults="effect.flip.diff">
            <strong/>
          </Trans>
        )
      }
      break
    case BoardSpaceType.Replay:
      if (effect.isAllSame) {
        return (
          <Trans defaults="effect.replay.same">
            <strong/>
          </Trans>
        )
      }
      break
    case BoardSpaceType.FirstXThenY:
      if (effect.first === 0) {
        return (
          <Trans defaults="effect.not-first" values={{ number: effect.then }}>
            <strong/>
          </Trans>
        )
      }
      return (
        <Trans defaults="effect.race" values={{ first: effect.first, then: effect.then }}>
          <strong/>
        </Trans>
      )
  }

  return
}

const FlagExplaination: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const rules = useRules<CaptainFlipRules>()!
  const player = usePlayerId()
  const firstPlayer = rules.players[0]
  const firstPlayerName = usePlayerName(firstPlayer)
  const lastPlayer = rules.players[rules.players.length - 1]
  const lastPlayerName = usePlayerName(lastPlayer)
  const itsMe = player && firstPlayer === player
  if (item.location?.player !== firstPlayer) return null

  return (
    <div css={explainationContainer}>
      <div>
        <div css={flagCss}></div>
      </div>
      <div css={textContainer}>
        {itsMe && (
          <div>
            <Trans defaults="end-game.flag.you"/>
          </div>
        )}
        {!itsMe && (
          <div>
            <Trans defaults="end-game.flag.player" values={{ firstPlayer: firstPlayerName }}/>
          </div>
        )}
        {lastPlayer === player && (
          <div>
            <Trans defaults="end-game.last.you"/>
          </div>
        )}
        {lastPlayer !== player && (
          <div>
            <Trans defaults="end-game.last.player" values={{ player: lastPlayerName }}/>
          </div>
        )}
      </div>

    </div>
  )
}

const explainationContainer = css`
  border: 0.1em solid black;
  border-radius: 0.5em;
  padding: 0.5em;
  margin-top: 0.5em;
  display: flex;
  flex-direction: row;


`

const effectExplainationContainer = css`
  ${explainationContainer};
`

const imageRadiusCss = css`
  border-radius: 0.5em;
  
  > picture {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`


const textContainer = css`
  display: flex;
  align-items: center;
  > div:first-of-type {
    margin-bottom: 0.5em;
  }

  font-size: 0.7em;
`

const endGameCss = css`
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 0.5em;
`

const flagCss = css`
  background: url(${Flag}) no-repeat top center;
  background-size: contain;
  height: 3em;
  width: 2em;
  margin-right: 1em;
`

const imageCss = css`
  width: 2.5em;
  margin-right: 1em;
`

const getBoardTitle = (board: BoardType) => {
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