import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import ComoOrdenar from './pages/ComoOrdenar'
 
function RutaAdmin({ children }) {
  const { usuario, esAdmin } = useAuth()
  if (!usuario) return <Navigate to="/login" />
  if (!esAdmin()) return <Navigate to="/" />
  return children
}
 
export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-pink-50 via-white to-purple-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/como-ordenar" element={<ComoOrdenar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <RutaAdmin>
              <Admin />
            </RutaAdmin>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}