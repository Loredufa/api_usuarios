const {Sequelize} = require('sequelize')
const {dbUser, dbName, dbPassword, dbHost} = require('../utils/config')
const Travels = require('./Travel')
const Excursions = require('./Excursion')
const Landings = require('./Landing')
const Contracts = require('./Contract')
const Passengers = require('./Passenger')
const Logins = require('./Login')
const Walls = require('./Wall')
const Fees = require('./Fee')

const sequelize = new Sequelize(`postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`);

const Travel = Travels(sequelize)
const Excursion = Excursions(sequelize)
const Landing = Landings(sequelize)
const Contract = Contracts(sequelize)
const Passenger = Passengers(sequelize)
const Login = Logins(sequelize)
const Wall = Walls(sequelize)
const Fee = Fees(sequelize)


//Relaciones


Travel.hasMany(Contract)
Contract.belongsTo(Travel, { foreignKey: 'travelId' }); // coloca travelId en contract

Contract.hasMany(Passenger)
Passenger.belongsTo (Contract) // coloca Contract_id en Passenger

Travel.hasMany(Wall)
Wall.belongsTo (Travel, { foreignKey: 'travelId' }) // coloca TravelId en Wall

Passenger.hasMany(Fee) 
Fee.belongsTo (Passenger, { foreignKey: 'passengerId' }) // colocaPassengerId en Fee


module.exports = {
    conn: sequelize,
    Travel,
    Excursion,
    Landing,
    Contract,
    Passenger,
    Login,
    Wall,
    Fee,
    sequelize
}