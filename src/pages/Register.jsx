import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'
 
export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password_confirmation: '',
    telefono: '',
    calle: '',
    ciudad: '',
    estado_dir: '',
    codigo_postal: '',
  })
  const [errores, setErrores] = useState({})
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()
 
  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.apellido.trim()) e.apellido = 'El apellido es requerido'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido'
    if (!form.password || form.password.length < 8) e.password = 'Mínimo 8 caracteres'
    if (form.password !== form.password_confirmation) e.password_confirmation = 'Las contraseñas no coinciden'
    if (form.telefono && !/^\+?[\d\s\-()]{6,20}$/.test(form.telefono)) e.telefono = 'Teléfono inválido'
    if (form.codigo_postal && !/^[a-zA-Z0-9\s\-]{3,10}$/.test(form.codigo_postal)) e.codigo_postal = 'Código postal inválido'
    return e
  }
 
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errores[e.target.name]) {
      setErrores(prev => { const n = { ...prev }; delete n[e.target.name]; return n })
    }
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
      await register(form)
      setToast({ mensaje: '¡Registro exitoso! Redirigiendo...', tipo: 'success' })
      setTimeout(() => navigate('/'), 1500)
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrores(error.response.data.errors)
      } else {
        setToast({ mensaje: 'Error al registrarse', tipo: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }
 
  const campo = (name, label, type = 'text', placeholder = '', requerido = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {requerido && <span className="text-pink-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 text-gray-700 outline-none transition"
      />
      {errores[name] && <p className="text-red-600 text-sm mt-1">{errores[name]}</p>}
    </div>
  )
 
  return (
    <>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
 
      <div className="min-h-screen flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-10">
          <h3 className="text-3xl font-bold mb-2 text-center text-gray-800">Crear Cuenta</h3>
          <p className="text-center text-sm text-gray-500 mb-8">Los campos marcados con <span className="text-pink-500">*</span> son obligatorios</p>
 
          <form onSubmit={handleSubmit} className="space-y-6">
 
            {/* Datos personales */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b pb-1">Datos personales</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campo('nombre', 'Nombre', 'text', 'Tu nombre', true)}
                {campo('apellido', 'Apellido', 'text', 'Tu apellido', true)}
                <div className="sm:col-span-2">
                  {campo('email', 'Correo electrónico', 'email', 'tu@correo.com', true)}
                </div>
                {campo('telefono', 'Teléfono', 'tel', '+503 0000 0000')}
              </div>
            </div>
 
            {/* Dirección */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b pb-1">Dirección de envío</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  {campo('calle', 'Calle / Dirección', 'text', 'Calle, número, colonia...')}
                </div>
                {campo('ciudad', 'Ciudad', 'text', 'Tu ciudad')}
                {campo('estado_dir', 'Estado / Departamento', 'text', 'Ej: San Salvador')}
                {campo('codigo_postal', 'Código postal', 'text', 'Ej: 1101')}
              </div>
            </div>
 
            {/* Contraseña */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b pb-1">Seguridad</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campo('password', 'Contraseña', 'password', 'Mínimo 8 caracteres', true)}
                {campo('password_confirmation', 'Confirmar contraseña', 'password', 'Repite tu contraseña', true)}
              </div>
            </div>
 
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
          </form>
 
          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-pink-500 hover:text-pink-600 font-medium">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}