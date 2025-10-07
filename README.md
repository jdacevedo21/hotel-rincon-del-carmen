# Hotel El Rincón del Carmen — Sitio Web (Simulación)

Proyecto: sitio web sencillo, responsive y funcional con simulación de reservas mediante localStorage.

## Estructura

- index.html (landing)
- reservas.html (buscador y reservas)
- contacto.html (ubicación y contacto)
- admin.html (panel de gestión)
- components/room-card.js
- components/auth-form.js
- js/storage.js
- js/app.js
- js/admin.js
- css/styles.css

## Cómo ejecutar localmente

1. Extrae el ZIP o clona el repositorio.
2. Abre un servidor local (recomendado para módulos ES):
   - Python: `python3 -m http.server 8000`
   - o `npx http-server -p 8080`
3. Visita `http://localhost:8000` en tu navegador.
4. Usuario admin por defecto: documento `admin`, contraseña `admin`

## Notas
- El proyecto usa `localStorage` para persistencia; borra localStorage para reiniciar datos.
- Mejoras sugeridas: backend real, hashing de contraseñas, pasarela de pagos, mejoras de accesibilidad.
