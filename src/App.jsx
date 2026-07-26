import { useState } from 'react'
import AvatarCanvas from './components/AvatarCanvas'
import Overlay from './components/Overlay'

function App() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <div className="relative h-screen w-screen bg-neutral-950 overflow-hidden">
      <AvatarCanvas activeSection={activeSection} />
      <Overlay activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  )
}

export default App
