import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Notfound from './vendorDashboard/components/Notfound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/*' element={<Notfound />}/>
      </Routes>
    </div>
  )
}

export default App