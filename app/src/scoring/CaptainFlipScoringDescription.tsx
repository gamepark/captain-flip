import { css } from '@emotion/react'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { MaterialType } from '@gamepark/captain-flip/material/MaterialType'
import { TreasureMapType } from '@gamepark/captain-flip/material/TreasureMapType'
import { PlayerId } from '@gamepark/captain-flip/PlayerId'
import { BoardHelper } from '@gamepark/captain-flip/rules/helper/BoardHelper'
import { CoinHelper } from '@gamepark/captain-flip/rules/helper/CoinHelper'
import { ScoringDescription } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import TotalCoin from '../images/coins/TotalCoin.png'
import Carpenter from '../images/characters/Carpenter.jpg'
import Gunner from '../images/characters/Gunner.jpg'
import Lookout from '../images/characters/Lookout.jpg'
import Parrot from '../images/characters/Parrot.jpg'
import Swabby from '../images/characters/Swabby.jpg'
import TreasureMapInflamed from '../images/treasure-map/TreasureMapInflamed.png'
import { CarpenterScoringRule } from './rules/CarpenterScoringRule'
import { ColumnBonusScoringRule } from './rules/ColumnBonusScoringRule'
import { InflamedBonusScoringRule } from './rules/InflamedBonusScoringRule'
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
  InflamedBonus,
  Total
}

/** True iff the Inflamed (Burned) treasure map is currently in play
 *  (either still on the central area or held by a player). If no
 *  one can ever gain its +5 bonus, we hide the scoring line. */
const isInflamedInGame = (rules: CaptainFlipRules): boolean => {
  const tokens = rules.material(MaterialType.TreasureMapToken).getItems()
  return tokens.some((t) => t.id === TreasureMapType.Inflamed)
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

    // Only show the Inflamed bonus row when the Burned treasure
    // map is actually in play — otherwise no one could ever gain
    // the +5 and the column would be empty for everyone.
    if (isInflamedInGame(rules)) {
      keys.push(ScoringKeys.InflamedBonus)
    }

    keys.push(ScoringKeys.Gunner)
    keys.push(ScoringKeys.Total)

    return keys
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.Coins:
        return <div css={centerCss}><img src={TotalCoin} alt="" css={coinImgCss}/></div>
      case ScoringKeys.Swabby:
        return <div css={centerCss}><img src={Swabby} alt="" css={characterImgCss}/></div>
      case ScoringKeys.Carpenter:
        return <div css={centerCss}><img src={Carpenter} alt="" css={characterImgCss}/></div>
      case ScoringKeys.Lookout:
        return <div css={centerCss}><img src={Lookout} alt="" css={characterImgCss}/></div>
      case ScoringKeys.Parrot:
        return <div css={centerCss}><img src={Parrot} alt="" css={characterImgCss}/></div>
      case ScoringKeys.Gunner:
        return <div css={centerCss}><img src={Gunner} alt="" css={characterImgCss}/></div>
      case ScoringKeys.ColumnBonus:
        return <Trans i18nKey="column-bonus"/>
      case ScoringKeys.InflamedBonus:
        return <div css={centerCss}><img src={TreasureMapInflamed} alt="" css={characterImgCss}/></div>
      case ScoringKeys.Total:
      default:
        return <div css={bold}><Trans i18nKey="scoring.total"/></div>
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerId, rules: CaptainFlipRules) {
    switch (key) {
      case ScoringKeys.Coins:
        return <div css={valueCss}>{new CoinHelper(rules.game, player).coins
          - this.getScoring(ScoringKeys.Parrot, player, rules)
          - this.getScoring(ScoringKeys.Swabby, player, rules)
          - this.getScoring(ScoringKeys.Lookout, player, rules)
          - this.getScoring(ScoringKeys.Carpenter, player, rules)
          - this.getScoring(ScoringKeys.ColumnBonus, player, rules)
          - this.getScoring(ScoringKeys.InflamedBonus, player, rules)}</div>
      case ScoringKeys.Total:
        return <div css={[valueCss, bold]}>{rules.getScore(player)}</div>
      case ScoringKeys.Gunner:
        return <div css={valueCss}>x{this.getScoring(ScoringKeys.Gunner, player, rules)}</div>
      default:
        return <div css={valueCss}>{this.getScoring(key, player, rules)}</div>
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
      case ScoringKeys.InflamedBonus:
        return new InflamedBonusScoringRule(rules.game, player).getCoins()
      case ScoringKeys.Total:
      default:
        return rules.getScore(player)
    }
  }
}

const bold = css`
  font-weight: bold;
`

const valueCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const centerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const characterImgCss = css`
  height: 3.5em;
  width: 3.5em;
  object-fit: cover;
  border-radius: 0.3em;
`

const coinImgCss = css`
  height: 2.5em;
  width: 2.5em;
  object-fit: contain;
`