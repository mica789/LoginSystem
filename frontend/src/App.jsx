import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <>
      <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/assets/images/your-image.jpg')" }}
      ></div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
