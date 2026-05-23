# Creaciones Normita — Frontend

Frontend de la tienda de vestidos Creaciones Normita, desarrollado en React con Vite y Tailwind CSS. Se conecta al backend en Laravel a través de una API REST.

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- Backend Laravel corriendo en `http://localhost:8000`

---

## Instalación

1. Clona el repositorio y entra a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre el navegador en `http://localhost:5173`

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Previsualiza el build de producción |

---

## Estructura del proyecto

```
frontend/
├── public/                  # Archivos estáticos públicos
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── Footer.jsx       # Pie de página
│   │   ├── ProductoCard.jsx # Tarjeta de producto con carrusel
│   │   ├── CotizarModal.jsx # Modal de cotización por WhatsApp
│   │   ├── Beneficios.jsx   # Sección de beneficios
│   │   ├── Pagination.jsx   # Paginación reutilizable
│   │   ├── Toast.jsx        # Notificaciones temporales
│   │   └── Whatsapp.jsx     # Botón flotante de WhatsApp
│   ├── context/
│   │   └── AuthContext.jsx  # Contexto global de autenticación
│   ├── pages/               # Vistas principales
│   │   ├── Home.jsx         # Página de inicio con destacados
│   │   ├── Productos.jsx    # Catálogo completo con paginación
│   │   ├── Nosotros.jsx     # Historia, valores y testimonios
│   │   ├── Contacto.jsx     # Formulario de contacto y mapa
│   │   ├── Login.jsx        # Inicio de sesión
│   │   ├── Register.jsx     # Registro de usuario
│   │   └── Admin.jsx        # Panel de administración de productos
│   ├── services/            # Consumo de la API
│   │   ├── api.js           # Cliente Axios con interceptors
│   │   ├── authService.js   # Login, registro, logout, perfil
│   │   ├── productoService.js # CRUD de productos
│   │   └── categoriaService.js # Listado de categorías
│   ├── App.jsx              # Rutas y layout principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales con Tailwind
├── .env                     # Variables de entorno (no se sube al repo)
├── .env.example             # Plantilla de variables de entorno
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Roles de usuario

| Rol | Valor | Acceso |
|---|---|---|
| Cliente | `1` | Catálogo, cotizar, perfil |
| Administrador | `3` | Todo lo anterior + panel de admin |

---

## Tecnologías utilizadas

- [React 19](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router DOM v7](https://reactrouter.com)
- [Axios](https://axios-http.com)

---

## Conexión con el backend

El frontend se comunica con el backend Laravel en `http://localhost:8000/api/v1`. Asegúrate de que el backend esté corriendo y que el archivo `.env` de Laravel tenga configurado el CORS para permitir peticiones desde `http://localhost:5173`.

El token de autenticación se almacena en `localStorage` y se envía automáticamente en cada petición mediante un interceptor de Axios.
