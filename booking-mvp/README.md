# 🏨 Booking MVP – Sistema de Gestión de Reservas

Este proyecto es un MVP (Producto Mínimo Viable) de una plataforma tipo Booking.com desarrollado con tecnologías web modernas. Permite gestionar reservas de alojamientos, con autenticación, control de usuarios y operaciones sobre la base de datos.

---

## 🚀 Tecnologías utilizadas

- **Frontend:** HTML, CSS y JavaScript
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Control de versiones:** Git + GitHub

---

## 📁 Estructura del proyecto

```
booking-mvp/
├── backend/              # Código backend con Express y MySQL
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── db.js
│   ├── index.js
│   ├── .env.example
│   └── .gitignore
├── frontend/             # Archivos HTML, CSS y JS del cliente
│   ├── index.html
│   ├── css/
│   └── js/
├── README.md
└── .gitignore            # Ignora node_modules, .env y otros archivos
```

---

## ⚙️ Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu computadora:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Git](https://git-scm.com/) (opcional para clonar)

---

## 📦 Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/javito72/Proyecto_Integrador.git
cd booking-mvp
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

Contenido del `.env`:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_de_base
JWT_SECRET=tu_clave_secreta
```

### 4. Crear la base de datos

Accede a tu cliente MySQL (ej: phpMyAdmin, DBeaver o terminal) y crea la base de datos con el mismo nombre definido en el `.env`.

También podés ejecutar un script SQL si tenés el esquema (`schema.sql`).

### 5. Iniciar el servidor

Desde la carpeta `backend/`, ejecutá:

```bash
npm start
```

---

## 🌐 Visualizar el frontend

Desde la carpeta raíz del proyecto, abrí el archivo `frontend/index.html` directamente en tu navegador.

Alternativamente, podés usar extensiones como **Live Server** en VS Code para una mejor experiencia.

---

## 🧪 Probar la API

Usá herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar los endpoints definidos en Express.

---

## 🔒 Variables de entorno

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=booking_db
JWT_SECRET=mi_clave_secreta
```

---

## 🧼 Archivo `.gitignore` (ubicado en la raíz y en /backend)

```gitignore
# Node
node_modules/

# Entorno
.env

# Logs
*.log

# MacOS
.DS_Store

# VS Code
.vscode/
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Podés hacer un fork del repositorio, crear una rama y abrir un pull request con tus mejoras.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Sentite libre de usarlo, modificarlo y distribuirlo.
