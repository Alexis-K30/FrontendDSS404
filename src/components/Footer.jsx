import { Link } from 'react-router-dom'
 
export default function Footer() {
  const anio = new Date().getFullYear()
 
  return (
    <footer className="border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12 text-gray-700 items-start">
 
        {/* Logo + descripción */}
        <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
          <img
            src="/images/cnfooter.png"
            alt="Creaciones Normita"
            className="h-24 w-auto object-contain mx-auto lg:mx-0"
          />
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
            Boutique especializada en vestidos únicos y elegantes,
            pensados para resaltar tu belleza en cada momento especial ✨
          </p>
          <p className="text-xs text-gray-400 mt-6">© Creaciones Normita {anio}</p>
        </div>
 
        {/* Acerca de */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">Acerca de</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/nosotros" className="hover:text-pink-500 transition">Nuestra historia</Link></li>
            <li><Link to="/contacto" className="hover:text-pink-500 transition">Contáctenos</Link></li>
          </ul>
        </div>
 
        {/* Preguntas frecuentes */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">Preguntas frecuentes</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/como-ordenar" className="hover:text-pink-500 transition">Cómo ordenar</Link></li>
            <li><Link to="/como-ordenar" className="hover:text-pink-500 transition">Guía de tallas</Link></li>
          </ul>
        </div>
 
        {/* Conéctate */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase tracking-wide text-sm">Conéctate</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <a href="https://www.facebook.com/creacionesnormita.sv" target="_blank" rel="noreferrer"
                className="hover:text-pink-500 transition">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/creacionesnormita.sv" target="_blank" rel="noreferrer"
                className="hover:text-pink-500 transition">Instagram</a>
            </li>
            <li>
              <a href="https://wa.me/50376970004" target="_blank" rel="noreferrer"
                className="hover:text-pink-500 transition">WhatsApp</a>
            </li>
            <li>
              <a href="mailto:contacto@creacionesnormita.sv"
                className="hover:text-pink-500 transition">Email</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}