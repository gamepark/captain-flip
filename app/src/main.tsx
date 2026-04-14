import { css } from '@emotion/react'
import { CaptainFlipOptionsSpec } from '@gamepark/captain-flip/CaptainFlipOptions'
import { CaptainFlipRules } from '@gamepark/captain-flip/CaptainFlipRules'
import { CaptainFlipSetup } from '@gamepark/captain-flip/CaptainFlipSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { captainFlipAnimations } from './animations/CaptainFlipAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { CaptainFlipScoringDescription } from './scoring/CaptainFlipScoringDescription'
import { Tutorial } from './tutorial/Tutorial'

/**
 * Parchment dialog background, applied globally to every help/rules dialog
 * via theme.dialog.container.
 * - ink speckles + radial gradient = aged paper
 * - grain SVG overlay = subtle texture
 * - brass/ink layered box-shadows = bound leather book feel
 */
const parchmentDialogCss = css`
  position: relative;
  color: #2b1d10;
  background:
    radial-gradient(circle at 22% 14%, rgba(43, 29, 16, 0.1) 0 1.2px, transparent 1.4px),
    radial-gradient(circle at 78% 36%, rgba(43, 29, 16, 0.08) 0 1px, transparent 1.2px),
    radial-gradient(circle at 44% 72%, rgba(43, 29, 16, 0.09) 0 1.1px, transparent 1.3px),
    radial-gradient(120% 80% at 50% 0%, #f3e7cc 0%, #e9d8b4 50%, #d9c393 100%);
  background-blend-mode: multiply, multiply, multiply, normal;
  box-shadow:
    inset 0 0 0 2px rgba(106, 76, 43, 0.25),
    inset 0 0 80px rgba(106, 76, 43, 0.28),
    inset 0 0 220px rgba(72, 48, 22, 0.3),
    0 30px 60px rgba(0, 0, 0, 0.55),
    0 80px 140px rgba(0, 0, 0, 0.45);
  border-radius: 6px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7'/><feColorMatrix type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.16 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
    background-size: 260px 260px;
    mix-blend-mode: multiply;
    opacity: 0.4;
    pointer-events: none;
    border-radius: inherit;
  }
`

createRoot(document.getElementById('root')!).render(
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
          color: '#2b1d10',
          container: parchmentDialogCss
        }
      }}
      animations={captainFlipAnimations}
    >
      <App/>
    </GameProvider>
  </StrictMode>
)
