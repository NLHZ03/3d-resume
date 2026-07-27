import { useState } from 'react'
import AvatarCanvas from './components/AvatarCanvas'
import Overlay from './components/Overlay'
import WebGLGuard from './components/WebGLGuard'

function App() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <WebGLGuard>
      <div className="relative h-screen w-screen overflow-hidden bg-neutral-950">
        {/* Background atmosphere layers (behind the transparent Canvas) */}
        <div className="atmo-glow pointer-events-none absolute inset-0" />
        <div className="atmo-grid pointer-events-none absolute inset-0" />
        <div className="atmo-noise pointer-events-none absolute inset-0" />

        <AvatarCanvas activeSection={activeSection} />
        <Overlay activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </WebGLGuard>
  )
}

export default App
