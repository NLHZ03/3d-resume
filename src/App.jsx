import { useState } from 'react'
import AvatarCanvas from './components/AvatarCanvas'
import Overlay from './components/Overlay'
import WebGLGuard from './components/WebGLGuard'

function App() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <WebGLGuard>
      <div className="relative h-screen w-screen bg-neutral-950 overflow-hidden">
        <AvatarCanvas activeSection={activeSection} />
        <Overlay activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
    </WebGLGuard>
  )
}

export default App
