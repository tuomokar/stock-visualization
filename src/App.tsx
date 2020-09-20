import React from 'react'

import './App.css'
import StocksGraphs from './StocksGraphs'

const App = () => {
  return (
    <div className='App'>
      <h1>Apple stockprices:</h1>

      <StocksGraphs />
    </div>
  )
}

export default App
