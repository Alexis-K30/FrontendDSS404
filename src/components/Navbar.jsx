import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
 
const linksPublicos = [
  { to: '/nosotros',     label: 'Nosotros' },
  { to: '/como-ordenar', label: 'Cómo ordenar' },
  { to: '/contacto',     label: 'Contacto' },
]
 
const linksAutenticados = [
  { to: '/',             label: 'Inicio' },
  { to: '/productos',    label: 'Catálogo' },
  { to: '/nosotros',     label: 'Nosotros' },
  { to: '/como-ordenar', label: 'Cómo ordenar' },
  { to: '/contacto',     label: 'Contacto' },
]
 
export default function Navbar() {
  const { usuario, logout, esAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)
 
  const links = usuario ? linksAutenticados : linksPublicos
 
  const handleLogout = async () => {
    await logout()
    setMenuAbierto(false)
    navigate('/login', { replace: true })
  }
 
  const cerrarMenu = () => setMenuAbierto(false)
 
  const esActivo = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
 
  return (
    <nav className="bg-pink-100/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
 
          {/* Logo */}
          <Link to="/" onClick={cerrarMenu} className="shrink-0 hover:opacity-80 transition">
            <img src="/images/logo.png" alt="Creaciones Normita" className="h-10 w-auto object-contain" />
          </Link>
 
          {/* Links escritorio */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition hover:text-pink-600 ${esActivo(to) ? 'text-pink-600 font-semibold' : ''}`}
              >
                {label}
              </Link>
            ))}
            {usuario && esAdmin() && (
              <Link
                to="/admin"
                className={`transition hover:text-pink-600 ${esActivo('/admin') ? 'text-pink-600 font-semibold' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>
 
          {/* Auth escritorio */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {usuario ? (
              <>
                <span className="text-sm text-gray-500 max-w-35 truncate">
                  Hola, {usuario.nombre_completo}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-pink-200 text-gray-900 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-200 transition whitespace-nowrap"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-700 hover:text-pink-600 transition whitespace-nowrap">
                  Iniciar sesión
                </Link>
                <Link to="/register" className="bg-pink-200 text-gray-900 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-200 transition whitespace-nowrap">
                  Registrarse
                </Link>
              </>
            )}
          </div>
 
          {/* Botón hamburguesa */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-pink-200 transition"
            aria-label="Abrir menú"
          >
            {menuAbierto ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
 
        </div>
      </div>
 
      {/* Menú móvil */}
      {menuAbierto && (
        <div className="lg:hidden border-t border-pink-200 bg-pink-50/95 backdrop-blur-md px-4 py-4 space-y-1">
 
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={cerrarMenu}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${esActivo(to) ? 'bg-pink-200 text-pink-700' : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'}`}
            >
              {label}
            </Link>
          ))}
 
          {usuario && esAdmin() && (
            <Link
              to="/admin"
              onClick={cerrarMenu}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${esActivo('/admin') ? 'bg-pink-200 text-pink-700' : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'}`}
            >
              Admin
            </Link>
          )}
 
          <div className="border-t border-pink-200 my-2" />
 
          {usuario ? (
            <>
              <p className="px-3 py-1 text-sm text-gray-500">
                Hola, <span className="font-medium text-gray-700">{usuario.nombre_completo}</span>
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={cerrarMenu}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={cerrarMenu}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium bg-pink-200 text-gray-900 hover:bg-purple-200 transition text-center mt-1"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}