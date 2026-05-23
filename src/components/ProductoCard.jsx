import { useState } from 'react'

export default function ProductoCard({ producto, onCotizar }) {
  const [indice, setIndice] = useState(0)
  const imagenes = producto.imagenes ?? []

  const prev = () => setIndice((indice - 1 + imagenes.length) % imagenes.length)
  const next = () => setIndice((indice + 1) % imagenes.length)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition duration-300 hover:ring-2 hover:ring-pink-300">
      
      {/* Imagen con carrusel */}
      <div className="aspect-3/4 w-full overflow-hidden relative">
        {imagenes.length > 0 ? (
          <>
            <img
              src={imagenes[indice]}
              alt={producto.nombre_producto}
              className="w-full h-full object-cover transition"
            />

            {/* Prev / Next */}
            {imagenes.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                  </svg>
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                  </svg>
                </button>
              </>
            )}

            {/* Thumbnails */}
            {imagenes.length > 1 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2">
                {imagenes.map((img, i) => (
                  <button key={i} onClick={() => setIndice(i)} className={`w-10 h-10 rounded overflow-hidden border-2 ${i === indice ? 'border-pink-400' : 'border-white/60'}`}>
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between h-44">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{producto.nombre_producto}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{producto.categoria?.nombre_categoria}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="bg-pink-200 text-gray-900 text-sm font-medium px-3 py-1 rounded-lg">
            ${producto.precio_lista}
          </span>
          <p className="text-xs text-gray-500">+ Envío internacional</p>
        </div>
        <button
          onClick={() => onCotizar(producto)}
          className="mt-2 bg-pink-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition"
        >
          Cotizar
        </button>
      </div>
    </div>
  )
}