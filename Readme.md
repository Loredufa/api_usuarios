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


Variable de entorno para el archivo .env


PORT='4002'
DB_USER ='postgres'
DB_NAME = 'postgres'
DB_PORT = '5433'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'
