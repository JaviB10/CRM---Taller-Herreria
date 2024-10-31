<p align="center">
  <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Courier+Prime&size=65&pause=1000&color=F7CB27&center=true&vCenter=true&repeat=false&width=450&height=80&lines=TALLER+CRM" alt="Typing SVG" /></a>
</p>

<p>
  <h2 id="descripción">📝 Descripcion</h2>
  <p align="justify">API robusta para la gestión de clientes y trabajos en un sistema de presupuestos y seguimiento de pagos, desarrollada con Node.js y MongoDB. Esta API permite a los talleres de herrería organizar eficientemente sus operaciones, brindando un control detallado sobre los clientes, la creación de trabajos personalizados, la generación de presupuestos con desglose de materiales y costos, y el seguimiento de los pagos asociados. Pensada para integrarse fácilmente con aplicaciones frontend, esta API maneja autenticación segura, administración de roles, y validación de datos, garantizando tanto la seguridad como la precisión en cada interacción. Además, el sistema es escalable, lo que facilita su personalización y expansión para adaptarse a las crecientes necesidades del taller.</p>
</p>

<details open>
  <summary><h2>📑 Tabla de Contenidos</h2></summary>
  <ul>
    <li><a href="#descripción">Descripción</a></li>
    <li><a href="#instalación-y-requisitos">Instalación y Requisitos</a></li>
    <li><a href="#endpoints-de-la-api">Endpoints de la API</a></li>
    <li><a href="#tecnologías-usadas">Tecnologías Usadas</a></li>
    <li><a href="#estructura-de-carpetas">Estructura de Carpetas</a></li>
    <li><a href="#pruebas">Pruebas</a></li>
    <li><a href="#licencia">Licencia</a></li>
  </ul>
</details>

<details open>
  <summary><h2 id="instalación-y-requisitos">🛠️ Instalación y Requisitos</h2></summary>
  <h4>📋 Requisitos Previos</h4>
  <p>
    <a href="https://github.com/search?q=user%3AJaviB10+language%3Ajavascript"><img alt="Static Badge" src="https://img.shields.io/badge/NodeJS%20-%20brightgreen?style=plastic&logo=nodedotjs&logoColor=%23000000&color=%235FA04E"></a>
    <a><img alt="Static Badge" src="https://img.shields.io/badge/MongoDB%20-%20brightgreen?style=plastic&logo=mongodb&logoColor=%23000000&color=%2347A248"></a>
  </p>
  <h4>🛠️ Instalacion</h4>
  <h5>1 - Clonar el Repositorio</h5>
  
  ```bash
  git clone https://github.com/tuusuario/tu-repo.git
  cd tu-repo
  ```
  <h5>2 - Instalar Dependencias</h5>
  
  ```bash
  npm install
  ```
  <h5>3 - Configurar Variables de Entorno</h5>

  ```bash
  PORT= Numero del puerto con el que se hara conexion
  MONGO_URL= String de conexion a la base de datos con la cual se va a trabajar
  PRIVATE_KEY= Clave privada
  PASS_DEFAULT= Clave por defecto
  ENT= Tipo de entorno de trabajo
  ```
  <h5>4 - Iniciar el Servidor</h5>

  ```bash
  npm start
  ```
</details>

<details>
  <summary><h2 id="endpoints-de-la-api">🌐 Endpoints de la API</h2></summary>
  
  <h3>🔒 Autenticación</h3>
  <ul>
      <li>
          <strong>POST /api/sessions/login</strong> - Inicia sesión y devuelve un token. <br>
          <code>{ "email": "user@example.com", "password": "yourpassword" }</code>
      </li>
      <li>
          <strong>POST /api/sessions/logout</strong> - Cierra la session y destruye el token de acceso.
      </li>
  </ul>
  <h3>👤 Usuarios</h3>
  <ul>
      <li>
          <strong>GET /api/users</strong> - Devuelve la lista de usuarios.
      </li>
      <li>
          <strong>GET /api/users/:uid</strong> - Devuelve los detalles de un usuario específico.
      </li>
      <li>
          <strong>POST /api/users/email</strong> - Devuelve los detalles de un usuario específico por su email.
      </li>
      <li>
          <strong>POST /api/users</strong> - Crea un nuevo usuario. <br>
          <code>{ "name": "Julieta", "lastName": "Ballon", "phone": "3415678765", "email": "user@example.com", "password": "yourpassword" }</code>
      </li>
      <li>
          <strong>PUT /api/users/:uid</strong> - Actualiza la información de un usuario específico.
      </li>
      <li>
          <strong>DELETE /api/users/:uid</strong> - Elimina un usuario específico.
      </li>
  </ul>
  <h3>👥 Clientes</h3>
  <ul>
      <li>
          <strong>GET /api/clients</strong> - Devuelve la lista de clientes
      </li>
      <li>
          <strong>GET /api/clients/:cid</strong> - Devuelve los detalles de un cliente específico.
      </li>
      <li>
          <strong>POST /api/clients/phone</strong> - Devuelve los detalles de un cliente específico por su telefono.
      </li>
      <li>
          <strong>POST /api/clients</strong> - Crea un nuevo cliente. <br>
          <code>{ "name": "Julieta", "lastName": "Ballon", "address": "Italia 3040", "phone": "3415678765" }</code>
      </li>
      <li>
          <strong>PUT /api/clients/:cid</strong> - Actualiza la información de un cliente específico.
      </li>
      <li>
          <strong>DELETE /api/clients/:cid</strong> - Elimina un cliente específico.
      </li>
  </ul>
  <h3>🛠️ Trabajos</h3>
  <ul>
      <li>
          <strong>GET /api/jobs</strong> - Devuelve la lista de trabajos.
      </li>
      <li>
          <strong>GET /api/jobs/:jid</strong> - Devuelve los detalles de un trabajo específico.
      </li>
      <li>
          <strong>POST /api/jobs/:cid</strong> - Crea un nuevo trabajo. <br>
          <code>{ "details": "Breve detalle del trabajo" }</code>
      </li>
      <li>
          <strong>PUT /api/jobs/:jid</strong> - Actualiza la información de un trabajo específico. <br>
          <code>{ "details": "Breve detalle del trabajo", "isFinished": true, "budgetAccepted": true }</code>
      </li>
      <li>
          <strong>DELETE /api/jobs/:jid</strong> - Elimina un trabajo específico.
      </li>
  </ul>
  <h3>💰 Presupuestos</h3>
  <ul>
      <li>
          <strong>GET /api/budgets</strong> - Devuelve la lista de presupuestos.
      </li>
      <li>
          <strong>GET /api/budgets/:bid</strong> - Devuelve los detalles de un presupuesto específico.
      </li>
      <li>
          <strong>PUT /api/budgets/:bid</strong> -  Actualiza la información de un presupuesto específico. <br>
          <code>{ "labourCost": "Costo que tendra el trabajo" }</code>
      </li>
      <li>
          <strong>PUT /api/budgets/material/:bid</strong> -  Actualiza la información de un material dentro de un presupuesto específico. <br>
          <code>{ "materialName": "Nombre del material", "amount": "Cantidad de material", "price": "Precio unitario del material" }</code>
      </li>
      <li>
          <strong>GET /api/budgets/remove/:bid</strong> -  Elimina un material dentro de unp presupuesto específico.
      </li>
  </ul>
  <h3>💵 Pagos</h3>
  <ul>
      <li>
          <strong>GET /api/payments</strong> - Devuelve la lista de pagos.
      </li>
      <li>
          <strong>GET /api/payments/:pid</strong> - Devuelve los detalles de un pago específico.
      </li>
      <li>
          <strong>POST /api/payments/:bid</strong> - Registra un nuevo pago. <br>
          <code>{ "amount": "Monto pagado", "paymentMethod": "Metodo de pago", "notes": "Nota sobre el pago si es necesario" }</code>
      </li>
      <li>
          <strong>PUT /api/payments/:pid</strong> - Actualiza la información de un pago específico.
          <code>{ "amount": "Monto pagado", "paymentMethod": "Metodo de pago", "notes": "Nota sobre el pago si es necesario" }</code>
      </li>
      <li>
          <strong>DELETE /api/payments/:pid</strong> - Elimina un pago específico.
      </li>
  </ul>
  <h3>🧾 Facturas</h3>
  <ul>
      <li>
          <strong>GET /api/invoices/:cid</strong> - Confecciona una factura con los datos completos del cliente, trabajos, presupuestos, materiales y pagos.
      </li>
  </ul>
</details>

<details>
  <summary><h2 id="tecnologías-usadas">⚙️ Tecnologías Usadas</h2></summary>
  <ul>
      <li><strong>Node.js</strong> - Entorno de ejecución de JavaScript en el servidor.</li>
      <li><strong>Express</strong> - Framework web para Node.js, que facilita la creación de aplicaciones y APIs.</li>
      <li><strong>Mongoose</strong> - ODM (Object Data Modeling) para MongoDB y Node.js, que simplifica la interacción con la base de datos.</li>
      <li><strong>Bcrypt</strong> - Librería para encriptar contraseñas.</li>
      <li><strong>JWT (JSON Web Token)</strong> - Para gestionar autenticación y autorización en aplicaciones web.</li>
      <li><strong>Passport</strong> - Middleware para autenticación en Node.js, compatible con diferentes estrategias.</li>
      <li><strong>Mocha</strong> - Framework de pruebas para Node.js.</li>
      <li><strong>Chai</strong> - Librería de aserciones para Mocha, que facilita la escritura de pruebas.</li>
      <li><strong>Swagger</strong> - Herramientas para documentar y diseñar APIs.</li>
      <li><strong>PDFKit</strong> - Librería para generar documentos PDF en Node.js.</li>
      <li><strong>CORS</strong> - Middleware que permite controlar el acceso de recursos entre dominios.</li>
      <li><strong>Dotenv</strong> - Carga variables de entorno desde un archivo `.env`.</li>
      <li><strong>Commander</strong> - Para crear interfaces de línea de comandos (CLI) en Node.js.</li>
      <li><strong>Cookie-parser</strong> - Middleware para parsear cookies en las solicitudes.</li>
      <li><strong>Yamljs</strong> - Librería para trabajar con archivos YAML en JavaScript.</li>
      <li><strong>Supertest</strong> - Librería para realizar pruebas de integración HTTP.</li>
      <li><strong>Winston</strong> - Librería de registro para aplicaciones Node.js.</li>
      <li><strong>Concurrently</strong> - Permite ejecutar múltiples comandos de forma concurrente en la terminal.</li>
  </ul>
</details>

<details>
  <summary><h2 id="estructura-de-carpetas">📂 Estructura de Carpetas</h2></summary>
  <pre>
  <code>
  src/
  │
  ├── assets/
  │   ├── fonts/
  │   └── images/
  │  
  │── config/
  │
  ├── controllers/
  │
  ├── DAOs/
  │   ├── mongo/
  │   │   ├── budgets.mongo.js
  │   │   ├── clients.mongo.js
  │   │   ├── jobs.mongo.js
  │   │   ├── payments.mongo.js
  │   │   └── users.mongo.js
  │   └── factory.js
  │
  ├── docs/
  │   ├── budget/
  │   ├── client/
  │   ├── job/
  │   ├── payment/
  │   ├── session/
  │   └── user/
  │
  ├── middlewares/
  │
  ├── repositories/
  │
  ├── routes/
  │   ├── api/
  │   └── router.js
  │
  ├── services/
  │
  ├── utils/
  │
  ├── app.js
  tests/
  .env.example
  </code>
  </pre>
</details>

<details>
  <summary><h2 id="pruebas">🧪 Pruebas</h2></summary>
  <h5>1 - Iniciar el servidor</h5>
  
  ```bash
  npm start
  ```

  <h5>2 - Iniciar las pruebas</h5>
  
  ```bash
  npm test
  ```
</details>

<details>
  <summary><h2>📖 Documentación de la API con Swagger</h2></summary>
  <h5>Para facilitar la comprensión y uso de la API, se ha integrado Swagger en el proyecto. Puedes acceder a la documentación interactiva de la API en la siguiente URL:</h5>
  
  http://localhost:8080/api-docs

  <p><strong>(Nota: Asegúrate de reemplazar `localhost:8080` con la URL de tu servidor si estás desplegando la aplicación en un entorno diferente.)</strong></p>
  
  <h5>¿Qué es Swagger?</h5>
  
  <p>Swagger es una herramienta que permite documentar APIs de forma visual, facilitando a los desarrolladores entender cómo interactuar con los diferentes endpoints disponibles. Con la interfaz de Swagger, puedes probar cada endpoint directamente desde el navegador.</p>
  
  <h5>Cómo usar Swagger</h5>
  <ul>
      <li><strong>Accede a la URL de Swagger:</strong> Abre tu navegador y ve a la URL mencionada anteriormente.</li>
      <li><strong>Explora los endpoints:</strong> Puedes ver todos los endpoints disponibles, junto con sus métodos (GET, POST, etc.) y parámetros.</li>
      <li><strong>Probar la API:</strong> 
        <ul>
          <li>Primero, utiliza el endpoint de `/sessions` para autenticarte. Este endpoint te devolverá un token que necesitarás para autorizar tus solicitudes a otros endpoints.</li>
          <li>Segundo, en la parte superior encontraras un boton AUTHORIZE, ahi deberas colocar el token obtenido y validarlo.</li>
          <li>Tercero, selecciona cualquier endpoint y usa el botón "Try it out" para probarlo con datos de entrada. Swagger mostrará la respuesta de la API en tiempo real.</li>
        </ul>
  </ul>
  <p>Asegúrate de que tu servidor esté en funcionamiento para acceder a la documentación.</p>
</details>

<details open id="licencia">
  <summary><h2>📜 Licencia</h2></summary>
  <h4>Distribuido bajo la licencia MIT.</h4>
</details>

