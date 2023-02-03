// Variable de entorno
const mySecret = process.env['MONGO_URI'];

require('dotenv').config();

// Importar mongoose
let mongoose = require( 'mongoose' );

// Conectar Base de Datos
mongoose.connect( mySecret , { useNewUrlParser: true, useUnifiedTopology: true });

// Creando un Esquema 
const personSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  age : {
    type : Number    
  },
  favoriteFoods : {
    type : [ String ]
  }
});

// Creando un Modelo( Coleccion )
let Person = mongoose.model( 'Person', personSchema );

const createAndSavePerson = (done) => {
  
  // Crear un documento
  const personaUno = new
   Person( {
    name : 'Jose Carlos',
    age : 35,
    favoriteFoods : [ 'Albondigas', 'Hamburguesas' ]
  });

  // Insertar un documento( registro )
  const promesa = personaUno.save();

  promesa.then( ( respuesta ) => {
    console.log( respuesta );
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal', error );
  })
};  

const createManyPeople = (arrayOfPeople, done) => {

  // Insertar multiples documentos( registros )
  const promesa = Person.create( arrayOfPeople );

  promesa.then( ( respuesta ) => {
    console.log( respuesta );
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal', error )
  });

};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
