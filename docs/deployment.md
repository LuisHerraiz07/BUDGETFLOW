# Despliegue en Vercel

## Estructura del repositorio

El proyecto tiene frontend y backend en el mismo repositorio. Vercel gestiona ambos gracias al `vercel.json`:

```json
{
  "builds": [
    { "src": "server/src/index.js", "use": "@vercel/node" },
    { "src": "index.html",          "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/src/index.js" },
    { "src": "/(.*)",     "dest": "/$1" }
  ]
}
```

Las peticiones a `/api/*` van al servidor Express. El resto sirve los archivos estáticos del frontend compilado.

## Pasos de despliegue

1. Compila el frontend: `npm run build` (genera la carpeta `dist/`)
2. Sube el repositorio a GitHub
3. Ve a [vercel.com](https://vercel.com) → **Add New Project** → importa el repo
4. En **Build Command**: `npm run build`
5. En **Output Directory**: `dist`
6. En **Environment Variables** añade:
   - `VITE_API_URL` = `https://tu-proyecto.vercel.app/api/v1`
   - `NODE_ENV` = `production`
7. Haz clic en **Deploy**

## Variables de entorno necesarias

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL completa de la API en producción |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | Opcional — por defecto acepta todos los orígenes en producción |

## URLs finales

- **Frontend**: `https://budgetflow-xxx.vercel.app`
- **API**: `https://budgetflow-xxx.vercel.app/api/v1`
- **Health**: `https://budgetflow-xxx.vercel.app/api/v1/health`
