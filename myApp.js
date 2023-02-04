// Variable de entorno
const mySecret = process.env['MONGO_URI'];

require('dotenv').config();

// Importar mongoose
let mongoose = require('mongoose');

// Conectar Base de Datos
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

// Creando un Esquema 
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

// Creando un Modelo( Coleccion )
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  // Crear un documento
  const personaUno = new
    Person({
      name: 'Jose Carlos',
      age: 35,
      favoriteFoods: ['Albondigas', 'Hamburguesas']
    });

  // Insertar un documento( registro )
  const promesa = personaUno.save();

  promesa.then((respuesta) => {
    console.log(respuesta);
  });

  promesa.catch((error) => {
    console.error('Algo salio mal', error);
  })
};

const createManyPeople = (arrayOfPeople, done) => {

  // Insertar multiples documentos( registros )
  const promesa = Person.create(arrayOfPeople);

  promesa.then((respuesta) => {
    console.log(respuesta);
  });

  promesa.catch((error) => {
    console.error('Algo salio mal', error)
  });

};

// Realizando una busqueda
const findPeopleByName = (personName, done) => {

  const promesa = Person.find({ name: personName }, (error, personas) => {
    if (!error) {
      done(null, personas);
    }
  });

  promesa.then((respuesta) => {
    console.log('Las coincidencias de busqueda son: ', respuesta);
  });

  promesa.catch((error) => {
    console.error('Algo salio mal: ', error);
  });

};

// Realizando una busqueda de una sola coincidencia
const findOneByFood = (food, done) => {
  
  const promesa =  Person.findOne( { favoriteFoods : food }, ( error, persona ) => {
      if( !error ){
        done( null, persona );
      }
  });

  promesa.then( ( respuesta ) => {
    console.log( 'El resultado de la busqueda es: ', respuesta );
  });

  promesa.catch( ( error ) => {
    console.log( 'Algo salio mal: ', error );
  });

};

// Realizando una busqueda por Id
const findPersonById = (personId, done) => {
  
  const promesa = Person.findById( personId, ( error, persona ) => {
    if( !error ){
      done( null, persona );
    }
  });

  promesa.then( ( respuesta ) => {
    console.log( 'El resultado de la busqueda es: ', respuesta );
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal: ',error );
  })
};

// Editando un documento( registro )
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  const promesa = Person.findById( personId, ( error, registro ) => {
    if( !error ){
      done( null, registro );
    }
  });

  const documento = promesa.then( ( respuesta ) => {
    console.log( 'Registro: ', respuesta );

    respuesta.favoriteFoods.push( foodToAdd );

    return respuesta;
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal: ', error );
  });

  const prom = documento.save( ( error, dato ) => {
    if( !error ){
      done( null, dato );
    } 
  });

  prom.then( ( respuesta ) => {
    console.log( 'Registro actualizado: ', respuesta );
  });

  prom.catch( ( error ) => {
    console.error( 'Algo salio mal: ', error );
  });

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
