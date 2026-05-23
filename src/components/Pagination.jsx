export default function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null
 
  const { current_page, last_page } = meta
 
  // Genera el array de páginas a mostrar con puntos suspensivos
  const getPages = () => {
    const pages = []
    const delta = 2 // páginas a cada lado de la actual
 
    const left  = Math.max(2, current_page - delta)
    const right = Math.min(last_page - 1, current_page + delta)
 
    pages.push(1)
 
    if (left > 2) pages.push('...')
 
    for (let i = left; i <= right; i++) pages.push(i)
 
    if (right < last_page - 1) pages.push('...')
 
    if (last_page > 1) pages.push(last_page)
 
    return pages
  }
 
  const pages = getPages()
 
  return (
    <div className="mt-8 flex justify-center items-center gap-1 flex-wrap">
 
      {/* Anterior */}
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={current_page === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-pink-200 text-gray-600 hover:bg-pink-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ‹
      </button>
 
      {/* Números / puntos */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-gray-400 text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition border
              ${page === current_page
                ? 'bg-pink-400 text-white border-pink-400 shadow-sm'
                : 'bg-white border-pink-200 text-gray-600 hover:bg-pink-100'
              }`}
          >
            {page}
          </button>
        )
      )}
 
      {/* Siguiente */}
      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={current_page === last_page}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-pink-200 text-gray-600 hover:bg-pink-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ›
      </button>
 
    </div>
  )
}