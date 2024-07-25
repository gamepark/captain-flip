/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { ScoringDescription } from '@gamepark/react-client'
import { Trans } from 'react-i18next'
import { CarpenterScoringRule } from './rules/CarpenterScoringRule'
import { ColumnBonusScoringRule } from './rules/ColumnBonusScoringRule'
import { LookoutScoringRule } from './rules/LookoutScoringRule'
import { ParrotScoringRule } from './rules/ParrotScoringRule'
import { SwabbyScoringRule } from './rules/SwabbyScoringRule'

enum ScoringKeys {
  Coins,
  Swabby = 1,
  Carpenter,
  Lookout,
  Parrot,
  Gunner,
  ColumnBonus,
  Total
}


export class CaptainFlipScoringDescription implements ScoringDescription<PlayerId, CaptainFlipRules, ScoringKeys> {
  getScoringKeys(rules: CaptainFlipRules) {
    const keys = [
      ScoringKeys.Coins,
      ScoringKeys.Swabby,
      ScoringKeys.Carpenter,
      ScoringKeys.Lookout,
      ScoringKeys.Parrot
    ]

    const endOfGamEffects = new BoardHelper(rules.game).endOfGameEffects()
    if (endOfGamEffects.length) {
      keys.push(ScoringKeys.ColumnBonus)
    }

    keys.push(ScoringKeys.Gunner)
    keys.push(ScoringKeys.Total)

    return keys
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.Coins:
        return <Trans defaults="scoring.coins"/>
      case ScoringKeys.Swabby:
        return <Trans defaults="swabby"/>
      case ScoringKeys.Carpenter:
        return <Trans defaults="carpenter"/>
      case ScoringKeys.Lookout:
        return <Trans defaults="lookout"/>
      case ScoringKeys.Parrot:
        return <Trans defaults="parrot"/>
      case ScoringKeys.Gunner:
        return <Trans defaults="gunner"/>
      case ScoringKeys.ColumnBonus:
        return <Trans defaults="column-bonus"/>
      case ScoringKeys.Total:
      default:
        return <div css={bold}><Trans defaults="scoring.total"/></div>
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerId, rules: CaptainFlipRules) {
    switch (key) {
      case ScoringKeys.Coins:
        return new CoinHelper(rules.game, player).coins
          - this.getScoring(ScoringKeys.Parrot, player, rules)
          - this.getScoring(ScoringKeys.Swabby, player, rules)
          - this.getScoring(ScoringKeys.Lookout, player, rules)
          - this.getScoring(ScoringKeys.Carpenter, player, rules)
          - this.getScoring(ScoringKeys.ColumnBonus, player, rules)
      case ScoringKeys.Total:
        return <div css={bold}>{rules.getScore(player)}</div>
      case ScoringKeys.Gunner:
        return `x${this.getScoring(ScoringKeys.Gunner, player, rules)}`
      default:
        return this.getScoring(key, player, rules)
    }
  }

  getScoring(key: ScoringKeys, player: PlayerId, rules: CaptainFlipRules) {
    switch (key) {
      case ScoringKeys.Swabby:
        return new SwabbyScoringRule(rules.game, player).getCoins()
      case ScoringKeys.Carpenter:
        return new CarpenterScoringRule(rules.game, player).getCoins()
      case ScoringKeys.Lookout:
        return new LookoutScoringRule(rules.game, player).getCoins()
      case ScoringKeys.Parrot:
        return new ParrotScoringRule(rules.game, player).getCoins()
      case ScoringKeys.Gunner:
        return rules.getPlayerGunners(player)
      case ScoringKeys.ColumnBonus:
        return new ColumnBonusScoringRule(rules.game, player).getCoins()
      case ScoringKeys.Total:
      default:
        return rules.getScore(player)
    }
  }
}

const bold = css`
  font-weight: bold;
`