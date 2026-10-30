# 🎮 SteamLite

Plataforma web (SPA) de distribución digital de mini-juegos, inspirada en Steam.
Hecha con **Vite + React**, **react-router-dom**, **Formik + Yup** y **Tailwind CSS**.

## Ejecutar

```bash
npm install
npm run dev
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Catálogo por categorías, carrusel destacado, búsqueda y filtros |
| `/game/:id` | Detalle: descripción, capturas, reseñas y botón Comprar / Jugar |
| `/cart` | Carrito + formulario de pago simulado (Formik + Yup) |
| `/library` | Juegos adquiridos |
| `/play/:id` | Ejecución del mini-juego (solo si está en la biblioteca) |

## Estructura

```
src/
├── components/   cart/ games/ layout/
├── context/      ShopContext.jsx  (carrito + biblioteca + localStorage)
├── data/         games.json
├── minigames/    Snake, Memory, SpaceRunner, PixelRacer, TicTacToe, BugHunter
├── page/         home, GameDetail, CartCheckout, library, Playgame
├── routes/       AppRoutes.jsx
└── utils/
```

## Persistencia

`localStorage` guarda `steamlite_library` (juegos adquiridos) y `steamlite_cart`.
Para reiniciar la tienda: `localStorage.clear()` en la consola del navegador.

## Flujo Git

`main` solo con versiones estables. Cada funcionalidad en `feature/...` con Pull Request.
