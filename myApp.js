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

  const promesa = Person.findById( personId );

  promesa.then( ( respuesta ) => {
    console.log( 'Registro: ', respuesta );

    respuesta.favoriteFoods.push( foodToAdd );

    const prom = respuesta.save();

    prom.then( ( respuesta ) => {
      console.log( 'Registro actualizado: ', respuesta );
    });

    prom.catch( ( error ) => {
      console.error( 'Algo salio mal: ', error );
    });

  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal: ', error );
  });

  
};

// Editar un registro con la propiedad
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  const promesa = Person.findOneAndUpdate( 
    { name : personName }, 
    { age : ageToSet }, 
    { new : true, runValidators : true }
  );

  promesa.then( ( resultado ) => {
    console.log( 'Registro actualizado: ', resultado );
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal: ', error );
  });
};

//  Eliminar un registro usando el ID
const removeById = (personId, done) => {
  
  const promesa = Person.findByIdAndRemove( personId, ( error, dato ) => {
    if( !error ){
      done( null, dato );
    }
  });

  promesa.then( ( resultado ) => {
    console.log( 'Registro eliminado: ', resultado );
  });

  promesa.catch( ( error ) => {
    console.log( 'Algo salio mal: ', error );
  });

};

// Eliminar muchos registros  a la vez
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  const promesa = Person.remove( { name : nameToRemove }, ( error, dato ) => {
    if( !error ){
      done( null, dato );
    }
  });

  promesa.then( ( resultado ) => {
    console.log( 'Registros eliminados: ', resultado );
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal: ', error );
  });
};

// Usando auxiliares de consulta
const queryChain = (done) => {
  const foodToSearch = "burrito";

  const promesa = Person.find( { favoriteFoods : foodToSearch } )
    .sort( { name: 1 } )
    .limit( 2 )
    .select( { age : 0 } )
    .exec( (error, datos) => {
    if( !error ){
      done( null, datos );
    }
  });

  promesa.then( ( resultado ) => {
    console.log( 'Registros: ', resultado );
  });

  promesa.catch( ( error ) => {
    console.error( 'Algo salio mal: ', error );
  });
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
