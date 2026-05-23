import { useEffect } from 'react'

export default function Toast({ mensaje, tipo = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colores = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error:   'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  }

  return (
    <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl border shadow-lg text-sm font-medium transition ${colores[tipo]}`}>
      {mensaje}
    </div>
  )
}