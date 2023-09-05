Esta api maneja todo lo relativo al Login

**iniciar la api: npm start


**Rutas :


GET: http://localhost:4002/usuarios 


POST: http://localhost:4002/usuarios 


        body: {
            "nombre":"Teresa",
            "apellido": "Kimoto",
            "email": "terek@gmail.com",  **obligatorio**
            "numPas":"87765",
            "password":"6654547",   **obligatorio y único**
            "rol": "Padre"   **obligatorio**
            }


GET by id: http://localhost:4002/usuarios/id


PUT http://localhost:4002/usuarios/id


    body: { //info a modificar ej:
        "password": "8665545"
    }

    
DELETE http://localhost:4002/usuarios/id

**Ruta para carga masiva

POST http://localhost:4002/carga
body: [{
  "nombre":"Pepe",
  "apellido": "Botella",
  "email": "bote@gmail.com",
  "numPas":"87766",
  "password":"5656565",
  "rol": "Pasajero"
}, {
  "nombre":"Romina",
  "apellido": "Jaz",
  "email": "romi@gmail.com",
  "numPas":"87767",
  "password":"0909090",
  "rol": "Padre"
}, {
  "nombre":"Vanesa",
  "apellido": "Pez",
  "email": "vane@gmail.com",
  "numPas":"87768",
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
