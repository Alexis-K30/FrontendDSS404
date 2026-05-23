import { useState, useEffect } from 'react'
import { productoService } from '../services/productoService'
import { categoriaService } from '../services/categoriaService'
import Pagination from '../components/Pagination'
import Toast from '../components/Toast'
 
const anioActual = new Date().getFullYear()
 
export default function Admin() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [meta, setMeta] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [pagina, setPagina] = useState(1)
  const [form, setForm] = useState({
    nombre_producto: '',
    categoria_id: '',
    precio_lista: '',
    modelo_anio: '',
  })
  const [erroresForm, setErroresForm] = useState({})
  const [imagenes, setImagenes] = useState([])
  const [editando, setEditando] = useState(null)
  const [loadingForm, setLoadingForm] = useState(false)
 
  useEffect(() => {
    cargarProductos(pagina)
  }, [pagina])
 
  useEffect(() => {
    cargarCategorias()
  }, [])
 
  const cargarProductos = async (page) => {
    setCargando(true)
    setError(null)
    try {
      const data = await productoService.getAll({ page, per_page: 5 })
      setProductos(data.data ?? [])
      setMeta(data.meta ?? null)
    } catch {
      setError('No se pudieron cargar los productos.')
    } finally {
      setCargando(false)
    }
  }
 
  const cargarCategorias = async () => {
    try {
      const data = await categoriaService.getAll()
      setCategorias(data)
    } catch {
      setToast({ mensaje: 'Error al cargar categorías.', tipo: 'error' })
    }
  }
 
  const validarForm = () => {
    const e = {}
 
    if (!form.nombre_producto.trim())
      e.nombre_producto = 'El nombre del producto es requerido.'
 
    if (!form.categoria_id)
      e.categoria_id = 'Debes seleccionar una categoría.'
 
    if (!form.precio_lista || isNaN(form.precio_lista) || Number(form.precio_lista) <= 0)
      e.precio_lista = 'El precio debe ser un número mayor a 0.'
 
    if (form.modelo_anio) {
      const anio = Number(form.modelo_anio)
      if (isNaN(anio) || anio < 1900)
        e.modelo_anio = 'El año debe ser mayor a 1900.'
      else if (anio > anioActual)
        e.modelo_anio = `El año no puede ser futuro. El año actual es ${anioActual}.`
    }
 
    if (!editando && imagenes.length === 0)
      e.imagenes = 'Debes subir al menos una imagen.'
    if (imagenes.length > 5)
      e.imagenes = 'Máximo 5 imágenes permitidas.'
 
    return e
  }
 
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (erroresForm[e.target.name]) {
      setErroresForm(prev => { const n = { ...prev }; delete n[e.target.name]; return n })
    }
  }
 
  const handleImagenes = (e) => {
    setImagenes(Array.from(e.target.files))
    if (erroresForm.imagenes) {
      setErroresForm(prev => { const n = { ...prev }; delete n.imagenes; return n })
    }
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validarForm()
    if (Object.keys(e2).length > 0) {
      setErroresForm(e2)
      return
    }
 
    setLoadingForm(true)
    const formData = new FormData()
    formData.append('nombre_producto', form.nombre_producto)
    formData.append('precio_lista', form.precio_lista)
    formData.append('categoria_id', form.categoria_id)
    if (form.modelo_anio) formData.append('modelo_anio', form.modelo_anio)
    imagenes.forEach((img, i) => formData.append(`imagenes[${i}]`, img))
 
    try {
      if (editando) {
        await productoService.update(editando.id, formData)
        setToast({ mensaje: 'Producto actualizado correctamente.', tipo: 'success' })
      } else {
        await productoService.create(formData)
        setToast({ mensaje: 'Producto creado correctamente.', tipo: 'success' })
      }
      resetForm()
      cargarProductos(pagina)
    } catch {
      setToast({ mensaje: 'Error al guardar el producto.', tipo: 'error' })
    } finally {
      setLoadingForm(false)
    }
  }
 
  const handleEditar = (producto) => {
    setEditando(producto)
    setForm({
      nombre_producto: producto.nombre_producto,
      categoria_id: producto.categoria_id ?? '',
      precio_lista: producto.precio_lista,
      modelo_anio: producto.modelo_anio ?? '',
    })
    setImagenes([])
    setErroresForm({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
 
  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    try {
      await productoService.destroy(id)
      setToast({ mensaje: 'Producto eliminado correctamente.', tipo: 'success' })
      // Si eliminamos el último de la página, retrocedemos
      const nuevaPagina = productos.length === 1 && pagina > 1 ? pagina - 1 : pagina
      setPagina(nuevaPagina)
      if (nuevaPagina === pagina) cargarProductos(pagina)
    } catch {
      setToast({ mensaje: 'Error al eliminar el producto.', tipo: 'error' })
    }
  }
 
  const resetForm = () => {
    setForm({ nombre_producto: '', categoria_id: '', precio_lista: '', modelo_anio: '' })
    setImagenes([])
    setEditando(null)
    setErroresForm({})
  }
 
  const handlePageChange = (nuevaPagina) => {
    setPagina(nuevaPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
 
  return (
    <>
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
 
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10 mb-16">
        <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>
 
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3">{error}</div>
        )}
 
        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            {editando ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
 
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del producto <span className="text-pink-500">*</span>
                </label>
                <input
                  name="nombre_producto"
                  value={form.nombre_producto}
                  onChange={handleChange}
                  placeholder="Nombre del vestido"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                {erroresForm.nombre_producto && <p className="text-red-500 text-sm mt-1">{erroresForm.nombre_producto}</p>}
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio ($) <span className="text-pink-500">*</span>
                </label>
                <input
                  name="precio_lista"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.precio_lista}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                {erroresForm.precio_lista && <p className="text-red-500 text-sm mt-1">{erroresForm.precio_lista}</p>}
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría <span className="text-pink-500">*</span>
                </label>
                <select
                  name="categoria_id"
                  value={form.categoria_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  <option value="">— Selecciona una categoría —</option>
                  {categorias.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre_categoria}</option>
                  ))}
                </select>
                {erroresForm.categoria_id && <p className="text-red-500 text-sm mt-1">{erroresForm.categoria_id}</p>}
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año del modelo{' '}
                  <span className="text-gray-400 text-xs">(1900 – {anioActual}, opcional)</span>
                </label>
                <input
                  name="modelo_anio"
                  type="number"
                  min="1900"
                  max={anioActual}
                  value={form.modelo_anio}
                  onChange={handleChange}
                  placeholder={String(anioActual)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                {erroresForm.modelo_anio && <p className="text-red-500 text-sm mt-1">{erroresForm.modelo_anio}</p>}
              </div>
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {editando
                  ? 'Imágenes (deja vacío para mantener las actuales)'
                  : <>Imágenes <span className="text-pink-500">*</span> — máx. 5, formatos jpg/png/webp</>
                }
              </label>
              <input
                type="file"
                multiple
                accept="image/jpg,image/jpeg,image/png,image/webp"
                onChange={handleImagenes}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              {imagenes.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">{imagenes.length} imagen(es) seleccionada(s)</p>
              )}
              {erroresForm.imagenes && <p className="text-red-500 text-sm mt-1">{erroresForm.imagenes}</p>}
            </div>
 
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loadingForm}
                className="bg-pink-200 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-purple-200 transition disabled:opacity-50"
              >
                {loadingForm ? 'Guardando...' : editando ? 'Actualizar' : 'Crear Producto'}
              </button>
              {editando && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
 
        {/* Lista */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Lista de Productos
            {meta && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({meta.total} en total)
              </span>
            )}
          </h3>
 
          {cargando ? (
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="animate-spin h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Cargando productos...</span>
            </div>
          ) : productos.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay productos en esta página.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase border-b">
                    <tr>
                      <th className="pb-3 pr-4">Imagen</th>
                      <th className="pb-3 pr-4">Nombre</th>
                      <th className="pb-3 pr-4">Categoría</th>
                      <th className="pb-3 pr-4">Precio</th>
                      <th className="pb-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productos.map(p => (
                      <tr key={p.id}>
                        <td className="py-3 pr-4">
                          {p.imagenes && p.imagenes.length > 0 ? (
                            <img src={p.imagenes[0]} alt={p.nombre_producto} className="w-12 h-12 object-cover rounded-lg" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">Sin img</div>
                          )}
                        </td>
                        <td className="py-3 pr-4 font-medium text-gray-800">{p.nombre_producto}</td>
                        <td className="py-3 pr-4 text-gray-600">{p.categoria?.nombre_categoria ?? '—'}</td>
                        <td className="py-3 pr-4 text-gray-800">${p.precio_lista}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditar(p)}
                              className="bg-pink-200 text-gray-900 px-3 py-1 rounded-lg text-xs font-medium hover:bg-purple-200 transition">
                              Editar
                            </button>
                            <button onClick={() => handleEliminar(p.id)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-200 transition">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination meta={meta} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </section>
    </>
  )
}