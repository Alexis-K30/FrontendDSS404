import { useState } from 'react'
import Whatsapp from '../components/Whatsapp'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Tu nombre es requerido'
    if (!form.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = 'Correo inválido'
    if (!form.mensaje || form.mensaje.length < 10) e.mensaje = 'Escribe al menos 10 caracteres'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validar()
    if (Object.keys(e2).length > 0) {
      setErrores(e2)
      return
    }
    setEnviado(true)
    setForm({ nombre: '', correo: '', mensaje: '' })
    setErrores({})
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errores[e.target.name]) {
      setErrores(prev => { const n = { ...prev }; delete n[e.target.name]; return n })
    }
  }

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Contáctanos</h2>
        <p className="text-center text-gray-600 mb-10">Estamos aquí para ayudarte a encontrar el vestido de tus sueños ✨</p>

        {/* Redes sociales */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-lg">
          <a href="https://wa.me/50376970004" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition">
            WhatsApp
          </a>
          <a href="https://www.facebook.com/creacionesnormita.sv" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
            Facebook
          </a>
          <a href="https://www.instagram.com/creacionesnormita.sv" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition">
            Instagram
          </a>
          <a href="mailto:contacto@creacionesnormita.sv" className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
            Correo
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Formulario */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Correo</label>
                <input name="correo" type="email" value={form.correo} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                {errores.correo && <p className="text-red-500 text-sm mt-1">{errores.correo}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Mensaje</label>
                <textarea name="mensaje" rows="5" value={form.mensaje} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                {errores.mensaje && <p className="text-red-500 text-sm mt-1">{errores.mensaje}</p>}
              </div>
              <button type="submit"
                className="bg-pink-200 text-gray-900 px-5 py-2 rounded-lg font-medium hover:bg-purple-200 transition">
                Enviar
              </button>
            </form>
            {enviado && (
              <div className="mt-4 bg-green-100 text-green-800 px-4 py-3 rounded-lg">
                ¡Gracias por contactarnos! Te responderemos pronto.
              </div>
            )}
          </div>

          {/* Mapa */}
          <div className="bg-white overflow-hidden rounded-xl shadow-md h-400px">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.1578052685393!2d-89.19205882491427!3d13.708114186679152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63316a6c29e2ab%3A0x456f594886a42248!2sCreaciones%20Normita%20El%20Salvador!5e0!3m2!1ses!2ssv!4v1758001985717!5m2!1ses!2ssv"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Info extra */}
      <section className="bg-pink-50 py-12 mt-16">
        <div className="max-w-5xl mx-auto text-center space-y-6 px-4">
          <h3 className="text-2xl font-bold text-gray-800">Información adicional</h3>
          <p className="text-gray-600">Puedes visitarnos en nuestra boutique o escribirnos en cualquier momento.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-pink-600 mb-2">📍 Dirección</h4>
              <p className="text-gray-600">1a Norte y 19 Calle Pte. 11, San Salvador CP 1101</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-pink-600 mb-2">⏰ Horarios</h4>
              <p className="text-gray-600">Lunes a Sábado<br />9:00 AM – 5:00 PM</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h4 className="font-semibold text-pink-600 mb-2">📞 Teléfono</h4>
              <p className="text-gray-600">+503 7697 0004</p>
            </div>
          </div>
        </div>
      </section>

      <Whatsapp />
    </>
  )
}