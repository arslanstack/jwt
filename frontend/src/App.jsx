import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dashboard, Home, Login, Navbar, Register } from './components'
import AuthUser from './utils/AuthUser'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </>

  )
}

export default App
