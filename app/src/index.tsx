/** @jsxImportSource @emotion/react */
import { CaptainFlipOptionsSpec } from '@gamepark/captain-flip/CaptainFlipOptions'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CaptainFlipSetup } from '@gamepark/captain-flip/CaptainFlipSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="captain-flip" Rules={CaptainFlipRules} optionsSpec={CaptainFlipOptionsSpec} GameSetup={CaptainFlipSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
