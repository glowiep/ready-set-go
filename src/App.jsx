import React, { useState, useEffect } from 'react'
import './App.css'
import Model from './components/Model'
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2200);
  }, []);

  return (
    <div className="canvas-container w-screen h-screen">
      {isLoading ? <LoadingScreen />
      : <Model setIsLoading={setIsLoading} />
      }
      {/* <LoadingScreen /> */}
    </div>
  )
}

export default App
