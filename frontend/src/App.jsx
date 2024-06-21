import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Alert from './components/Alert'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import About from './components/About'
import LoginPage from './components/Loginpg'
function App() {
  const tabswitch={id1:[0,]}
  const [switchh, setSwitchh] = useState(tabswitch)
  const [prevTab, setPrevTab] = useState('id1')
  const [login, setLogin] = useState(false)

  const router= createBrowserRouter([
    {path:"/about" ,
  element: <><Nav/><About/></>},
    {path:"/" ,
  element: <><Nav />
  <Home switchh={switchh} setSwitchh={setSwitchh} prevTab={prevTab} setPrevTab={setPrevTab}/></>},
 
  {path:"/history" ,
  element: <><Nav  /></>},
 
  ])

  return (<>
  { login ? (<>
  <RouterProvider router={router}>
    </RouterProvider></>) : (<LoginPage setLogin={setLogin} />) }</>
  )
}

export default App
