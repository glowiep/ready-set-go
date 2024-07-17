import React from 'react'
import './App.css'
import ModelOriginal from './components/ModelOriginal'
import Model from './components/Model'
import Scene from './components/Scene'

function App() {

  return (
    <div className="canvas-container">
      {/* <Model /> */}
      <ModelOriginal />
      {/* <Scene /> */}
    </div>
  )
}

export default App
