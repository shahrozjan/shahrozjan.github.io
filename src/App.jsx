import { useState } from 'react'
import './App.css'
import ImageShowCase from './components/scrollingimageshowcase/Imageshowcase'
import Navbar from './components/navbar/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageShowCase />
    </>
  )
}

export default App