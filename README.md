# Event Management API

Esta API permite gestionar eventos y proporciona endpoints para crear, obtener, actualizar y eliminar eventos. También cuenta con funcionalidades adicionales como inscripción a eventos y búsqueda de eventos por diferentes criterios.

## Requisitos previos

- Node.js instalado en tu máquina.
- MongoDB instalado y en funcionamiento.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ve al directorio del proyecto.
3. Instala las dependencias utilizando el siguiente comando: `npm install`.

## Configuración

1. Crea un archivo `.env` en el directorio raíz del proyecto.
2. Agrega las siguientes variables de entorno al archivo `.env`:
3. Asegúrate de reemplazar `<URL de conexión a MongoDB>` con la URL de tu base de datos MongoDB y `<Secreto para generar tokens JWT>` con una clave secreta para firmar los tokens JWT.

PORT = 3001

MONGO_URL = "mongodb+srv://HetmoTest:techTest@cluster0.faaknqx.mongodb.net/"

SECRET = "HetmoInfoTest"

## Uso

1. Inicia el servidor ejecutando el siguiente comando: `nodemon server.js`.
2. La API estará disponible en `http://localhost:3001`.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama con la nueva funcionalidad o corrección de errores: `git checkout -b nueva-funcionalidad`.
3. Realiza los cambios necesarios y realiza commits: `git commit -m "Agregar nueva funcionalidad"`.
4. Sube los cambios a tu repositorio remoto: `git push origin nueva-funcionalidad`.
5. Abre un pull request en este repositorio.
