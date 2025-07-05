import { Route, Routes } from 'react-router-dom'

import SignInEmail from './pages/SignInEmail'
import SignInPassword from './pages/SignInPassword'

function App() {

  return (
    <Routes>
      <Route path='/' element={<SignInEmail />} />
      <Route path='/password' element={<SignInPassword />} />
    </Routes>
  )
}

export default App
