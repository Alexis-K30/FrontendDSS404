import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const validar = () => {
    const e = {}
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo inválido'
    if (!password) e.password = 'La contraseña es requerida'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validar()
    if (Object.keys(e2).length > 0) {
      setErrores(e2)
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      setToast({ mensaje: 'Inicio de sesión exitoso', tipo: 'success' })
      setTimeout(() => navigate('/'), 1000)
    } catch {
      setToast({ mensaje: 'Correo o contraseña incorrectos', tipo: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-sm bg-white bg-opacity-60 rounded-xl shadow-lg p-10 flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-pink-400 focus:border-pink-400 text-gray-700 outline-none"
              />
              {errores.email && <p className="text-red-600 text-sm mt-1">{errores.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 focus:ring-pink-400 focus:border-pink-400 text-gray-700 outline-none"
              />
              {errores.password && <p className="text-red-600 text-sm mt-1">{errores.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-pink-500 hover:text-pink-600 font-medium">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}