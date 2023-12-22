Esta api maneja todo lo relativo al Login


**iniciar la api: npm start


Agregar a cada llamado de la api los Headers. 
![Alt text](image.png)

export function getUsers(){
    return async function (dispatch){
        let response = await axios.get("http://localhost:4002/usuarios", {
            headers: {'x-access-token': 'XXXX'}} );
        console.log(response.data)
        return dispatch({
            type: GET_USERS,
            payload: response.data
        })
    }
}


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

DELETE http://localhost:4002/usuarios/id

PUT http://localhost:4002/usuarios/id
    body:{
        'nombre': 'Florenacia'
    }


***Ruta para reseteo del password***
Desde el BackOffice
POST http://localhost:4002/reset

    body: { 
        "usuario": "xxx"
    }

Desde la App
POST http://localhost:4002/resetapp

    body: { 
        "usuario": "xxx"
    }

PUT http://localhost:4002/usuarios

    body: { 
        "id" : "463"  //dato obligatorio
        "password": "8665545"
    }


**Pasajeros**
Obtener los pasajeros de un contrato determinado

GET: http://localhost:4002/pasajero/:num

Guarda la informacion del pasajero, lo relaciona con el usuario padre, crea el usuario hijo si es necesario, actualiza los contratos en el usuario hijo si este ya existe, calcula el numpass y envía datos a redis para sincronizar las cuotas en una lista.
POST: http://localhost:4002/pasajero
    body {  **Todos los campos deben estar en el body
  "nombre": "Roberto",
  "apellido": "Mandela",
  "dni":"98872700", 
  "email":"lorenadufaur@gmail.com",
  "contrato":["999"],   
  "rol": "Pasajero",
  "estado": "true"
  "login": "", || true, **El campo debe estar varcio o debe ser true
  "fechaNac": "2011-01-02",
  "importe": "190000",
  "cuotas": "12",
  "loginId":"4",   **id del padre relacionado
    }

Modifica los datos del pasajero
PUT: http://localhost:4002/pasajero/:id   
    body {
        "presente": "true"
    }

Verifica los datos del pasajero antes de crearlo, se utiliza para autocompletado de la app
GET: http://localhost:4002/pasajero//verify/:dni/:num
    

Obtiene la informacion de la tabla intermedia por id de usuario (loginId) y retorna todos los pasajeros relacionados con este id
GET: http://localhost:4002/pasajero/relation/:loginId


Variable de entorno para el archivo .env


PORT='4002'
DB_USER ='postgres'
DB_NAME = 'postgres'
DB_PORT = '5433'
HOST = 'localhost'
DB_PASSWORD="xxxxx"
DB_HOST = 'localhost'

SECRET_KEY = 'palabra_secreta'

