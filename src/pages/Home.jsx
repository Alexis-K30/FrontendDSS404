import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { productoService } from '../services/productoService'
import ProductoCard from '../components/ProductoCard'
import CotizarModal from '../components/CotizarModal'
import Beneficios from '../components/Beneficios'
import Whatsapp from '../components/Whatsapp'

export default function Home() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    productoService.getAll({ per_page: 3 })
      .then(data => setProductos(data.data ?? []))
      .finally(() => setCargando(false))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-[40vh] rounded-xl shadow-lg overflow-hidden bg-linear-to-r from-pink-50 via-white to-purple-50 mx-auto max-w-7xl mt-6 px-4">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 drop-shadow-lg">
            Creaciones Normita
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-800">
            Viste tus momentos más especiales con elegancia ✨
          </p>
          <p className="mt-2 text-base md:text-lg text-pink-400 font-medium">
            Envíos internacionales a EE.UU. 🇺🇸 y Europa 🇪🇺
          </p>
          <button
            onClick={() => navigate('/productos')}
            className="mt-5 bg-pink-200 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-purple-200 transition transform hover:scale-105 duration-300"
          >
            Ver catálogo completo
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <Beneficios />

      {/* Destacados */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Destacados</h2>

        {cargando ? (
          <p className="text-center text-gray-500">Cargando vestidos...</p>
        ) : productos.length === 0 ? (
          <p className="text-center text-red-500">No se encontraron vestidos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map(p => (
              <ProductoCard key={p.id} producto={p} onCotizar={setProductoSeleccionado} />
            ))}
          </div>
        )}
      </section>

      <Whatsapp />

      {productoSeleccionado && (
        <CotizarModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </>
  )
}