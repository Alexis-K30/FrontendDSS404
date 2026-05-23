import { Link } from 'react-router-dom'
import Whatsapp from '../components/Whatsapp'
 
const pasos = [
  {
    icono: '📞',
    titulo: 'Agenda tu cita',
    descripcion: 'Contáctanos por WhatsApp o redes sociales para agendar tu visita o iniciar tu cotización.',
  },
  {
    icono: '👗',
    titulo: 'Prueba y elige',
    descripcion: 'Ven a la boutique, conoce nuestros vestidos, pruébalos y cotiza tu diseño a medida.',
  },
  {
    icono: '💳',
    titulo: 'Reserva con tu anticipo',
    descripcion: 'Con un pago del 50% iniciamos el trabajo de tu vestido. Aceptamos pagos en persona o desde otro país.',
  },
  {
    icono: '✂️',
    titulo: 'Ajustes y pruebas',
    descripcion: 'Realizamos las pruebas necesarias y ajustes para que tu vestido quede perfecto.',
  },
  {
    icono: '🚚',
    titulo: 'Entrega o envío',
    descripcion: 'Recoge tu vestido en la boutique o recibe tu pedido con envío nacional o internacional.',
  },
]
 
export default function ComoOrdenar() {
  return (
    <>
      <section className="bg-linear-to-r from-pink-50 via-white to-purple-50 py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
 
          {/* Título */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cómo ordenar tu vestido ✨
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Vive la experiencia Creaciones Normita en simples pasos, desde tu primera cita
              hasta recibir tu vestido soñado.
            </p>
          </div>
 
          {/* Pasos */}
          <div className="space-y-6">
            {pasos.map((paso, i) => (
              <div key={i} className="flex items-start gap-5 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full text-2xl">
                  {paso.icono}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Paso {i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-1">{paso.titulo}</h3>
                  <p className="text-gray-600">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
 
          {/* Pagos aceptados */}
          <div className="mt-16 bg-linear-to-r from-pink-100 to-purple-100 p-8 rounded-2xl text-center shadow">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Pagos aceptados</h3>
            <p className="text-gray-700">
              Efectivo, transferencia bancaria o tarjeta. Pagos locales e internacionales 🌍
            </p>
          </div>
 
          {/* CTA */}
          <div className="text-center mt-12 space-y-4">
            <a
              href="https://wa.me/50376970004?text=Hola,%20quiero%20cotizar%20mi%20vestido"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-10 py-4 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 hover:scale-105 transition"
            >
              Agenda tu cita por WhatsApp
            </a>
            <div>
              <Link to="/productos" className="text-sm text-gray-500 hover:text-pink-500 transition underline underline-offset-2">
                Ver catálogo de vestidos →
              </Link>
            </div>
          </div>
 
        </div>
      </section>
 
      <Whatsapp />
    </>
  )
}