import { CaptainFlipOptionsSpecV2 } from '@gamepark/captain-flip/CaptainFlipOptions'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CaptainFlipSetup } from '@gamepark/captain-flip/CaptainFlipSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { captainFlipAnimations } from './animations/CaptainFlipAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { CaptainFlipLogs } from './logs/CaptainFlipLogs'
import { Material } from './material/Material'
import { CaptainFlipScoringDescription } from './scoring/CaptainFlipScoringDescription'
import { captainFlipTheme } from './theme'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="captain-flip"
      Rules={CaptainFlipRules}
      optionsSpec={CaptainFlipOptionsSpecV2}
      GameSetup={CaptainFlipSetup}
      material={Material}
      locators={Locators}
      tutorial={new Tutorial()}
      scoring={new CaptainFlipScoringDescription()}
      logs={new CaptainFlipLogs()}
      theme={captainFlipTheme}
      animations={captainFlipAnimations}
    >
      <App/>
    </GameProvider>
  </StrictMode>
)
