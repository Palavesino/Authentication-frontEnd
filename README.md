# Authentication Frontend

Frontend desarrollado con **React + TypeScript + Vite** que sirve como interfaz de usuario para el sistema de autenticación y gestión de usuarios.

## 🚀 Demo

[https://authentication-front-end.vercel.app/](https://authentication-front-end.vercel.app/)

## 📋 Características

### 🔐 Autenticación
- Login con validación de campos
- Registro de nuevos usuarios
- Cierre de sesión
- Protección de rutas por rol
- Persistencia de sesión con JWT

### 👤 Perfil de Usuario
- Visualización de datos personales
- Edición de perfil (nombre, email, dirección, teléfono)
- Actualización de foto de perfil
- Validación de formularios con Formik + Yup

### 👥 Panel de Administrador
- Listado completo de usuarios
- Búsqueda y filtrado por nombre/email
- Cambio de roles (USER / ADMIN)
- Bloqueo/Desbloqueo de cuentas

### 🎨 Diseño
- UI Neumórfica
- Diseño responsive
- Animaciones y transiciones
- Componentes con React Bootstrap

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| React 18 | Biblioteca principal |
| TypeScript | Tipado estático |
| Vite | Build tool |
| React Bootstrap | Componentes UI |
| React Router DOM | Navegación |
| Axios | Cliente HTTP |
| Formik + Yup | Formularios y validación |

## 📁 Estructura

```
src/
├── components/     # Navbar, Footer, Carousel, UserList
├── contexts/       # Context API (autenticación)
├── pages/          # Home, Login, Register, Profile, Admin, 401, 404
├── interface/      # Tipos TypeScript
├── enum/           # Enumeradores (Roles)
├── services/       # Configuración de API
└── reducers/       # Reducers de autenticación
```

## 👥 Roles

| Rol | Permisos |
|-----|----------|
| **ADMIN** | Lista de usuarios, cambiar roles, bloquear/desbloquear |
| **USER** | Ver y editar su propio perfil |

## 🔧 Instalación

```bash
git clone https://github.com/Palavesino/Authentication-Frontend
cd Authentication-Frontend
npm install
npm run dev
```

### Variables de Entorno

```env
VITE_API_URL=https://tu-backend.com/api
```


## 🧪 Usuarios de Prueba

| Email | Contraseña | Rol |
|-------|------------|-----|
| usuario2@gmail.com | 123456 | USER |
| Admin1@gmail.com | 123456 | ADMIN |

## 🚀 Deploy

Desplegado en Vercel: [https://authentication-front-end.vercel.app/](https://authentication-front-end.vercel.app/)

## 📦 Dependencias

```json
{
  "react": "^18.2.0",
  "react-bootstrap": "^2.10.0",
  "react-router-dom": "^6.22.0",
  "axios": "^1.6.0",
  "formik": "^2.4.0",
  "yup": "^1.4.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0"
}
```

## 👨‍💻 Autor

**Palavesino** - [GitHub](https://github.com/Palavesino)

## 🔗 Repositorios

- [Frontend](https://github.com/Palavesino/Authentication-Frontend)
- [Backend](https://github.com/Palavesino/Authentication-Middleware)

---

⭐ Si te gustó el proyecto, ¡no olvides darle una estrella!
