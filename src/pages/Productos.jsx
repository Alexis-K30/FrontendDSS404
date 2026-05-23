import { useState, useEffect } from 'react'
import { productoService } from '../services/productoService'
import ProductoCard from '../components/ProductoCard'
import CotizarModal from '../components/CotizarModal'
import Pagination from '../components/Pagination'
import Beneficios from '../components/Beneficios'
import Whatsapp from '../components/Whatsapp'
 
export default function Productos() {
  const [productos, setProductos] = useState([])
  const [meta, setMeta] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [pagina, setPagina] = useState(1)
 
  useEffect(() => {
    cargarProductos(pagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pagina])
 
  const cargarProductos = async (page) => {
    setCargando(true)
    setError(null)
    try {
      const data = await productoService.getAll({ page, per_page: 9 })
      setProductos(data.data ?? [])
      setMeta(data.meta ?? null)
    } catch {
      setError('Error al cargar los productos.')
    } finally {
      setCargando(false)
    }
  }
 
  const handlePageChange = (nuevaPagina) => {
    setPagina(nuevaPagina)
  }
 
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Catálogo de Vestidos</h2>
 
        {error && (
          <div className="text-center text-red-500 p-4 mb-4 bg-red-50 rounded-lg">{error}</div>
        )}
 
        {cargando ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : productos.length === 0 ? (
          <p className="text-center text-red-500">No hay productos disponibles.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productos.map(p => (
                <ProductoCard key={p.id} producto={p} onCotizar={setProductoSeleccionado} />
              ))}
            </div>
            <Pagination meta={meta} onPageChange={handlePageChange} />
          </>
        )}
      </section>
 
      <Beneficios />
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
 