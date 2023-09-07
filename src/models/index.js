const {Sequelize} = require('sequelize')
const {dbUser, dbName, dbPassword, dbHost} = require('../utils/config')
const Travels = require('./Travel')
const Excursions = require('./Excursion')
const Landings = require('./Landing')
const Contracts = require('./Contract')
const Passengers = require('./Passenger')
const Logins = require('./Login')

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`);

const Travel = Travels(sequelize)
const Excursion = Excursions(sequelize)
const Landing = Landings(sequelize)
const Contract = Contracts(sequelize)
const Passenger = Passengers(sequelize)
const Login = Logins(sequelize)


//Relaciones

Travel.hasMany(Excursion)
Excursion.belongsTo (Travel) // coloca viajeId en Excursion

Travel.hasMany(Contract)
Contract.belongsTo (Travel) // coloca travelId en contract

Contract.hasMany(Passenger)
Passenger.belongsTo (Contract) // coloca Contract_id en Passenger

Passenger.hasMany(Login)
Login.belongsTo (Passenger) // coloca PassengerId en Login


module.exports = {
    conn: sequelize,
    Travel,
    Excursion,
    Landing,
    Contract,
    Passenger,
    Login
}