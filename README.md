<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" />
  </a>
</p>

# ⚙️ NestJS Generate API from MySQL  

**NestJS Generate API** es una herramienta CLI que genera automáticamente la estructura completa de una **API REST en NestJS** a partir del esquema de una base de datos **MySQL**.  

Analiza tablas, claves foráneas y relaciones, y crea **Entities, Services, Controllers y Modules** listos para usar.  

---

## 🚀 Características

- 🔄 Generación automática de **Entities, Services, Controllers y Modules**  
- 🔗 Manejo de relaciones (`@BelongsTo`, `@HasMany`)  
- 🗂️ Organización modular por carpeta en `src/`  
- ⚙️ Módulo de base de datos con **Sequelize**  
- 🧩 Plantillas de código con **Handlebars**  
- 💻 CLI interactiva con **Inquirer**  

---

## 🛠️ Instalación

```bash
git clone <repo-url>
cd nestjs-generate-api
npm install
⚙️ Configuración
Crea un archivo .env en la raíz del proyecto con tus credenciales de conexión a MySQL:

env
Copiar código
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=tu_base_de_datos
PORT=3000
🚀 Uso
Ejecuta el generador con:

bash
Copiar código
npm run generate
Selecciona la opción 1.) Base de datos en el menú interactivo.
El generador analizará tu esquema y creará automáticamente la estructura en src/.

📂 Ejemplo de estructura generada
cpp
Copiar código
src/
 ├── usuario/
 │   ├── usuario.entity.ts
 │   ├── usuario.service.ts
 │   ├── usuario.controller.ts
 │   └── usuario.module.ts
 ├── curso/
 │   ├── curso.entity.ts
 │   ├── curso.service.ts
 │   ├── curso.controller.ts
 │   └── curso.module.ts
 └── database/
     └── database.module.ts
▶️ Ejecutar aplicación
bash
Copiar código
# desarrollo
npm run start

# modo watch
npm run start:dev

# producción
npm run start:prod
📦 Dependencias principales
NestJS – Framework Node.js

Sequelize – ORM SQL

MySQL2 – Driver MySQL

Handlebars – Plantillas de código

Inquirer – CLI interactiva

📄 Licencia
Este proyecto es UNLICENSED.

yaml
Copiar código

---

¿Quieres que lo acomode también en tu **README principal de GitHub** como un tercer proyecto destacado junt
