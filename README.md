# 🫔 Prueba técnica SMARTBITERP - API

Aplicación web desarrollada con **Angular**, **Vite** y **TailwindCSS** para el diseño.  
Incluye autenticación con **JWT**, cración de usuarios y llevar el control de gastos personales, llevando el control de ingresos y egresos por fondo monetario.

---

## 🚀 Tecnologías utilizadas

- **Angular 21.0.0** con **Vite** como herramienta de build
- **TailwindCSS** para el diseño y estilos
- **Axios** para realizar solicitudes HTTP hacia la API
- **sweetalert2** para notificaciones y alertas
- **chart.js** para visualización de datos mediante gráficas

---


## 📁 Estructura del proyecto

```
src/
│
├── app/
│   │
│   ├── auth/                         # Módulo de autenticación
│   │   ├── login/                    # Pantalla de login
│   │   ├── registro/                 # Pantalla de registro
│   │   ├── auth.service.ts           # Manejo de login, logout, JWT y usuario
│   │   └── auth.guard.ts             # Protección de rutas con JWT
│   │
│   ├── features/                     # Módulos funcionales (recursos del sistema)
│   │   ├── modulo/
│   │   │   ├── pages/                # Páginas principales del recurso
│   │   │   ├── modal/                # Modales para crear/editar
│   │   │   ├── modulo-monetario.route.ts
│   │   │   ├── modulo-monetario.service.ts  # Llamadas al API usando ApiService
│   │   │   └── modulo-monetario.types.ts # Interfaces Models/DTOs del recurso
│   │   │
│   │   ├── ...                       # Repetido igual para gasto, presupuesto, depósitos, reportes, etc.
│   │
│   ├── shared/                       # Elementos compartidos en toda la app
│   │   ├── menu/                     # Header, sidebar, etc.
│   │   ├── alert.service.ts          # Servicio global para SweetAlert2
│   │   └── api.service.ts            # Configuración global de Axios e interceptores
│   │
│   ├── app.routes.ts                 # Definición de rutas + guards + layout
│   └── app.config.ts                 # Configuración de Angular (si aplica)
│
├── environments/                     # Variables de entorno
│   └── environment.ts
│
└── main.ts                           # Punto de entrada de Angular
```

---
## ⚙️ Configuración inicial

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/miltong261/smartbit-frontend
cd smartbit-frontend
```

---

### 2️⃣ Instalar dependencias

```bash
npm install
```

---

### 3️⃣ Crear archivo environment

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

y agregar el url del API 

---

## ▶️ Compilación y ejecución

### 1️⃣ Ejecutar en modo desarrollo

```bash
ng serve
```

Esto iniciará el servidor de desarrollo en:

```
http://localhost:4200/
```

---

## 📘 Entorno de desarrollo recomendado

- Visual Studio Code
- Node.js 20+
- Navegador moderno (Chrome, Edge, Firefox) 

---

### 🔗 Página oficial de Angular
[https://angular.dev/](https://angular.dev/)

---

## 👨‍💻 Autor

**Milton Girón**  
Desarrollador Full Stack  
Prueba técnica: *SMARTBITERP - FRONTEND*
