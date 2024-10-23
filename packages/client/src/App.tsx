import { Outlet } from 'react-router-dom'
import './App.css'

import { Navbar } from './components/Navbar.component'
import { Footer } from './components/Footer.component'

function App() {
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100vh'
      }}
    >
      <Navbar /> 

      <Outlet />

      <Footer />
    </div>
  )
}

export default App
