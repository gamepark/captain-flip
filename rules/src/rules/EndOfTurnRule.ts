import { MaterialMove } from '@gamepark/rules-api'
import { coinValues } from '../material/Coin'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TreasureMapType } from '../material/TreasureMapType'
import { PlayerId } from '../PlayerId'
import { CoinRule } from './effect/CoinRule'
import { BoardHelper } from './helper/BoardHelper'
import { TreasureMapHelper } from './helper/TreasureMapHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends CoinRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    const helper = new TreasureMapHelper(this.game, this.player)

    // Base coins from treasure maps
    moves.push(...super.onRuleStart())

    // Gambler: 2 coins if no coins gained this turn
    if (helper.hasMap(TreasureMapType.Gambler)) {
      const coinsAtStart = this.remind(Memory.CoinsAtStartOfTurn) ?? 0
      const coinsNow = helper.getPlayerCoins()
      if (coinsNow <= coinsAtStart) {
        moves.push(...this.gainCoinsMoves(2))
      }
    }

    // Kraken: steal 1 coin from richest player
    if (helper.hasMap(TreasureMapType.Kraken)) {
      moves.push(...this.stealFromRichest())
    }

    // AllDirections: rotate card
    const allDirectionsMaps = helper.playerMaps.filter((item) => item.id === TreasureMapType.AllDirections)
    if (allDirectionsMaps.length > 0) {
      const map = allDirectionsMaps.getItem()!
      const currentRotation = map.location.rotation ?? 0
      moves.push(allDirectionsMaps.moveItem({
        ...map.location,
        rotation: (currentRotation + 1) % 4
      }))
    }

    if (this.mustGoToScoring) {
      moves.push(this.startPlayerTurn(RuleId.SwabbyEndOfGame, this.game.players[0]))
    } else {
      // Round increments when the last player just finished their turn,
      // so the next player (= first player) starts a new round.
      const isLastPlayerOfRound = this.player === this.game.players[this.game.players.length - 1]
      if (isLastPlayerOfRound) {
        this.memorize(Memory.Round, (this.remind<number>(Memory.Round) ?? 1) + 1)
      }
      moves.push(this.startPlayerTurn(RuleId.DrawCharacterTile, this.nextPlayer))
    }
    return moves
  }

  getCoins() {
    return new TreasureMapHelper(this.game, this.player).getEndOfTurnCoins()
  }

  stealFromRichest(): MaterialMove[] {
    const players = this.game.players.filter((p) => p !== this.player)
    if (players.length === 0) return []

    const myCoins = new TreasureMapHelper(this.game, this.player).getPlayerCoins()
    let richest: PlayerId | undefined
    let richestCoins = 0

    for (const p of players) {
      const coins = new TreasureMapHelper(this.game, p).getPlayerCoins()
      if (coins > richestCoins) {
        richestCoins = coins
        richest = p
      }
    }

    if (myCoins > richestCoins) return []
    if (richest === undefined || richestCoins === 0) return []

    return this.material(MaterialType.Coin).money(coinValues).moveMoney(
      { type: LocationType.PlayerCoin, player: richest },
      { type: LocationType.PlayerCoin, player: this.player },
      1
    )
  }

  get mustGoToScoring() {
    if (this.player !== this.game.players[this.game.players.length - 1]) return false
    return this.game.players.some((p) => new BoardHelper(this.game).hasTriggeredEndOfGame(p))
  }

  onRuleEnd() {
    this.forget(Memory.PlacedCard)
    this.forget(Memory.BoardEffect)
    this.forget(Memory.CoinsAtStartOfTurn)
    return []
  }
}
