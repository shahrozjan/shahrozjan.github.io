import { useState } from 'react'
import './App.css'
import ImageShowCase from './components/scrollingimageshowcase/Imageshowcase'
import Navbar from './components/navbar/navbar'
import {StartPage} from './Monospace/StartPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StartPage />
    </>
  )
}

export default App