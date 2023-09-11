Esta api maneja todo lo relativo al Login


**iniciar la api: npm start


Agregar a cada llamado de la api los Headers. 
![Alt text](image.png)


const api = axios.create({

  baseURL: 'https://ruta', // Reemplaza con la URL a utilizar

  headers: {

    'Content-Type': 'application/json',

    'x-access-token': token,
    
  },
});


**Rutas :


GET: http://localhost:4002/usuarios 


POST: http://localhost:4002/usuarios 


        body: {
            "nombre":"Teresa",
            "usuario": "Kimoto",   **obligatorio y único**
            "email": "terek@gmail.com",  **obligatorio**
            "contrato":"87765",
            "password":"6654547",   **obligatorio*
            "rol": "Padre"   **obligatorio**
            }


GET by id: http://localhost:4002/usuarios/id


GET to Login: http://localhost:4002/usuarios/usuario/password


PUT http://localhost:4002/usuarios/id


    body: { //info a modificar ej:
        "password": "8665545"
    }

    
DELETE http://localhost:4002/usuarios/id

**Ruta para carga masiva

POST http://localhost:4002/carga
Retorna un array, dentro de éste muestra los usuarios creados, si el uruario ya existe mostrará la leyenda 
`El usuario ${usuario} ya está creado`


body: [{
  "nombre":"Pepe",
  "usuario": "Botella",
  "email": "bote@gmail.com",
  "contrato":"87766",
  "password":"5656565",
  "rol": "Pasajero"
}, {
  "nombre":"Romina",
  "apeusuariollido": "Jaz",
  "email": "romi@gmail.com",
  "contrato":"87767",
  "password":"0909090",
  "rol": "Padre"
}, {
  "nombre":"Vanesa",
  "usuario": "Pez",
  "email": "vane@gmail.com",
  "contrato":"87768",
  "password":"1212121",
  "rol": "Pasajero"
}]


Consideraciones para la carga masiva: dentro del body debe llegar un json con un array de objetos, cada objeto es un usuario a cargar, los datos obligatorios deben estar completos, se generará un error y no se realizara la carga. Considerar mostrar los usuarios cargados luego de realizar la carga. 


Variable de entorno para el archivo .env


PORT='4002'
DB_USER ='postgres'
DB_NAME = 'postgres'
DB_PORT = '5433'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'
