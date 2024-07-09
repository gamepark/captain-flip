/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/captain-flip/rules/RuleId'
import { ComponentType } from 'react'
import { PlayerTurnHeader } from './PlayerTurnHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DrawCharacterTile]: PlayerTurnHeader
}