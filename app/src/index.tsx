/** @jsxImportSource @emotion/react */
import { CaptainFlipOptionsSpec } from '@gamepark/captain-flip/CaptainFlipOptions'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CaptainFlipSetup } from '@gamepark/captain-flip/CaptainFlipSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { captainFlipAnimations } from './animations/CaptainFlipAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { CaptainFlipScoringDescription } from './scoring/CaptainFlipScoringDescription'
import translations from './translations.json'
import { Tutorial } from './tutorial/Tutorial'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="captain-flip"
      Rules={CaptainFlipRules}
      optionsSpec={CaptainFlipOptionsSpec}
      GameSetup={CaptainFlipSetup}
      material={Material}
      locators={Locators}
      tutorial={new Tutorial()}
      scoring={new CaptainFlipScoringDescription()}
      theme={{
        dialog: {
          backgroundColor: '#e9decb',
        }
      }}
      animations={captainFlipAnimations}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
