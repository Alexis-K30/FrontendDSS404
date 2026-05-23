export default function Whatsapp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      
        <a href="https://wa.me/50376970004?text=Hola,%20me%20interesa%20un%20vestido"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-110 transition text-white border-2 border-white animate-pulse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-7 h-7">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z" />
        </svg>
        <span className="absolute bottom-16 right-0 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          ¡Chatea con nosotros!
        </span>
      </a>
    </div>
  )
}