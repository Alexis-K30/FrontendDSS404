import { useState } from 'react'

export default function CotizarModal({ producto, onClose }) {
  const [talla, setTalla] = useState('M')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errores, setErrores] = useState(false)
  const [indice, setIndice] = useState(0)

  const imagenes = producto?.imagenes ?? []
  const WHATSAPP = '50376970004'

  const esNombreValido = (v) => v.trim().length > 0 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v)
  const esTelefonoValido = (v) => /^\d{8,15}$/.test(v)

  const enviar = async () => {
    if (!esNombreValido(nombre) || !esTelefonoValido(telefono)) {
      setErrores(true)
      return
    }

    const msg = `Hola, quisiera cotizar:
*${producto.nombre_producto}*
Precio: $${producto.precio_lista}
Talla: ${talla}

Mis datos:
Nombre: ${nombre}
Teléfono: ${telefono}`

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')

    try {
      await navigator.clipboard.writeText(msg)
    } catch {}

    onClose()
  }

  if (!producto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo */}
      <button className="absolute inset-0 w-full h-full bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative mx-auto w-[95%] max-w-4xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col lg:flex-row gap-6 max-h-[90vh] overflow-y-auto">
        
        {/* Cerrar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">
          &times;
        </button>

        {/* Carrusel */}
        <div className="w-full lg:w-1/2 relative">
          {imagenes.length > 0 ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={imagenes[indice]} alt={producto.nombre_producto} className="w-full h-64 lg:h-500px object-cover rounded-lg" />
              {imagenes.length > 1 && (
                <>
                  <button onClick={() => setIndice((indice - 1 + imagenes.length) % imagenes.length)}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                    ‹
                  </button>
                  <button onClick={() => setIndice((indice + 1) % imagenes.length)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                    ›
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-64 lg:h-500px bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
        </div>

        {/* Detalles */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cotizar {producto.nombre_producto}</h2>
          <p className="text-gray-600 mb-4">Precio: <span className="font-semibold text-gray-900">${producto.precio_lista}</span></p>

          {/* Talla */}
          <label className="block font-medium text-gray-700 mb-2">Talla</label>
          <select value={talla} onChange={e => setTalla(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 focus:ring-2 focus:ring-pink-300 focus:outline-none">
            {['XS', 'S', 'M', 'L', 'XL'].map(t => <option key={t}>{t}</option>)}
          </select>

          {/* Nombre y teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-300 focus:outline-none" />
              {errores && !esNombreValido(nombre) && (
                <p className="text-sm text-red-600 mt-1">Ingresa un nombre válido.</p>
              )}
            </div>
            <div>
              <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-300 focus:outline-none" />
              {errores && !esTelefonoValido(telefono) && (
                <p className="text-sm text-red-600 mt-1">Ingresa un teléfono válido.</p>
              )}
            </div>
          </div>

          {/* Aviso */}
          <div className="bg-yellow-50 border-l-4 border-yellow-300 text-yellow-800 text-sm p-3 rounded-md mt-5">
            ⚠️ <span className="font-medium">Nota:</span> Si es la primera vez que nos escribes, WhatsApp podría abrir el chat vacío. El mensaje se copiará automáticamente en tu portapapeles 📋.
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
              Cancelar
            </button>
            <button onClick={enviar} className="px-4 py-2 bg-pink-200 text-gray-900 rounded-lg hover:bg-purple-200 transition">
              Enviar Cotización
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}