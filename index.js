const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
      await Recipe.deleteMany();

    //iteraction 2 -> we create a new recipe
    let caldinho = await Recipe.create({title: 'Caldo Verde', level: 'Easy Peasy', ingredients: ['cebola', 'chouriço', 'espinafres', 'galinha', 'sal', 'coentros'], cuisine: 'Tuga', dishType: 'soup', image: 'https://www.mulherportuguesa.com/wp-content/uploads/2016/10/Receita-de-caldo-verde.jpg', duration: '15', creator: 'Padeira de Aljubarrota', created: '1996-11-20'});  
    
    console.log(caldinho.title);
    
//Iteration 3 - Insert multiple recipes
//now, we want to insert multiple recipe into the database from the array data in the file data.json
    await Recipe.insertMany(data);

//Iteration 4 - Update recipe, duration of "Rigatoni alla Genovese" 
    let update = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true});
  console.log(`update sucessfull: ` + update.duration);
    
    
//Iteration 5 - Remove a recipe
//now, we want to remove the recipe Carrot Cake from the database
    //for the TA's, hakai means erasure. Look up Beerus in the documentation for clarification.
    let hakai = await Recipe.findOneAndDelete({title: 'Carrot Cake'}, {new: true});
    console.log(hakai, 'WE HAKAI THE DAMN CARROTS');

    //to close the database
    mongoose.disconnect();
    
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();







