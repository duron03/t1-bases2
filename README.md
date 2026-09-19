# t1-bases2

**Estudiante:** Noé López Durón (2024234500)

**Estado:** Finalizado

## Tecnologías y requerimientos

- [Node.js](https://nodejs.org/) y npm.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) para ejecutar SQL Server 2025.
- SQL Server 2025 para Linux en la imagen `mcr.microsoft.com/mssql/server:2025-latest`.
- Una herramienta para ejecutar scripts SQL, por ejemplo SQL Server Management Studio (SSMS), Azure Data Studio o `sqlcmd`.
- Una copia de la base de datos **AdventureWorks2025** que incluya los esquemas `HumanResources`, `Production` y `Person`.

## Instalación de programas y servicios

### 1. Instalar Node.js

Instale Node.js desde su sitio oficial. npm se instala junto con Node.js. Compruebe la instalación en una terminal:

```bash
node --version
npm --version
```

### 2. Instalar y ejecutar SQL Server 2025 en Docker

Instale Docker Desktop o Docker Engine y confirme que el servicio de Docker esté iniciado. Luego descargue la imagen de SQL Server:

```bash
docker pull mcr.microsoft.com/mssql/server:2025-latest
```

Ejecute el contenedor. Reemplace `UnaClaveSegura123!` por una contraseña segura para el usuario `sa`; no la publique ni la suba al repositorio.

```bash
docker run \
  --name sqlserver2025 \
  -e "ACCEPT_EULA=Y" \
  -e "MSSQL_SA_PASSWORD=UnaClaveSegura123!" \
  -p 1433:1433 \
  -v sqlserver2025-data:/var/opt/mssql \
  -d mcr.microsoft.com/mssql/server:2025-latest
```

El volumen `sqlserver2025-data` conserva los datos si el contenedor se detiene o se recrea. Verifique que el servicio esté activo:

```bash
docker ps
```

Para iniciar un contenedor que ya existe y está detenido, use:

```bash
docker start sqlserver2025
```

La imagen oficial utiliza la variable `MSSQL_SA_PASSWORD` y expone el puerto interno 1433. Consulte la [guía oficial de SQL Server en Docker](https://learn.microsoft.com/es-es/sql/linux/quickstart-install-connect-docker?view=sql-server-ver17) para requisitos de plataforma y opciones adicionales.

### 3. Restaurar o cargar AdventureWorks2025

Conéctese al servidor en `localhost,1433` con el usuario `sa` y la contraseña definida al crear el contenedor. Restaure una copia compatible de **AdventureWorks2025** o cargue su esquema y datos. La base debe contener, como mínimo, estas tablas:

- `HumanResources.Employee`
- `Production.Product`
- `Production.ProductSubcategory`
- `Person.PhoneNumberType`

Seleccione `AdventureWorks2025` como base de datos activa y ejecute el archivo [`Script sql/stored_procedures.sql`](./Script%20sql/stored_procedures.sql). Este crea los cinco procedimientos almacenados que consume la API.

## Instalación del proyecto

1. Clone el repositorio y entre en la carpeta de la API:

   ```bash
   git clone https://github.com/duron03/t1-bases2.git
   cd t1-bases2/codigo
   ```

2. Instale las dependencias declaradas en `package.json`:

   ```bash
   npm install
   ```

   Se instalarán `express`, `dotenv`, `mssql` y `nodemon`.

3. Cree el archivo `codigo/.env`. Use valores propios; el archivo está ignorado por Git y no debe compartirse.

   ```dotenv
   PORT=3000
   DB_USER=sa
   DB_PASSWORD=SU_CLAVE_DE_SQL_SERVER
   DB_SERVER=localhost
   DB_DATABASE=AdventureWorks2025
   ```

   La configuración actual usa el puerto predeterminado de SQL Server (1433); mantenga el mapeo `-p 1433:1433` del comando anterior. Para usar otro puerto del host, debe modificar la configuración de conexión en `codigo/src/database/connection.js`.

4. Inicie la API en modo desarrollo:

   ```bash
   npm run dev
   ```

   El servidor queda disponible en `http://localhost:3000` y se reinicia automáticamente cuando cambia un archivo fuente.

## Endpoints disponibles

| Método | Ruta | Descripción | Cuerpo JSON |
| --- | --- | --- | --- |
| `GET` | `/getSingleEmployees` | Obtiene empleados con estado civil soltero. | — |
| `GET` | `/getSubcategoryProductsName` | Obtiene productos y el nombre de su subcategoría. | — |
| `POST` | `/createPhoneNumberType` | Crea un tipo de número telefónico. | `{ "name": "dato" }` |
| `PUT` | `/updatePhoneNumberType/:id` | Actualiza el nombre del registro indicado. | `{ "name": "dato" }` |
| `DELETE` | `/deletePhoneNumberType/:id` | Elimina el registro indicado. | — |

## Enlace del video

https://www.youtube.com/watch?v=JxKf3tGxM84
