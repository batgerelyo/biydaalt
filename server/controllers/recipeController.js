// control every page
require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage
 */

exports.homepage = async(req,res)=>{

  try {
   
   const limitNumber = 5;
   const categories = await Category.find({}).limit(limitNumber); 
   const latest  = await Recipe.find({ }).sort({_id: -1}).limit(limitNumber);
   const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
   const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
   const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);

   const food = {latest, thai, american, chinese};


   res.render('index', {title: 'Cook Blog - Home', categories, food});
  }catch (error) {
    res.status(500).send({message: error.message || "Error occurred"});
  }

}

/**
 * GET /categories
 * Categories 
*/
exports.exploreCategories = async(req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    res.render('categories', { title: 'Cooking Blog - Categories', categories } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occurred" });
  }
} 


/**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 1;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Cook Blog - Categories', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occurred" });
  }
} 


/**
 * GET /recipe/ :id
 * Recipe
*/
exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Cook Blog - Recipe', recipe} );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occurred" });
  }
} 


/**
 * POST /search
 * Search 
*/
exports.searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cook Blog - Search', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occurred" });
  }
  
}


/**
 * GET /explore-latest
 * Explplore Latest 
*/
exports.exploreLatest = async(req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render('explore-latest', { title: 'Cook Blog - Explore Latest', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occurred" });
  }
} 

/**
 * GET /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random', { title: 'Cook Blog - Explore Latest', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occurred" });
  }
} 
/**
 * GET /submit-recipe
 * Submit Recipe
*/
exports.submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}




/**
 * async function insertDymmyRecipeData(){
   try {
     await Recipe.insertMany([
    {
      "name": "Crab cakes",
      "description": "Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.",
      "email": "hello@email.com",
      "ingredients": [
        "4 large free-range egg yolks",
        "400 ml condensed milk",
        "5 limes",
        "200 ml double cream"
      ],
      "category": "American",
      "image": "crab-cakes.jpg",
      "__v": 0
    },
    {
      "name": "Thai-style mussels",
      "description": "Wash the mussels thoroughly, discarding any that are not tightly closed.",
      "email": "hello@email.com",
      "ingredients": [
        "1 kg mussels , bearded, from sustainable sources",
        "groundnut oil",
        "4 spring onions",
        "2 cloves of garlic",
        "½ a bunch of fresh coriander"
      ],
      "category": "Thai",
      "image": "thai-style-mussels.jpg",
      "__v": 0
    },{

      "name": "Thai-style mussels",
      "description": "Peel and crush the garlic, then peel and roughly chop the ginger.",
      "email": "hello@email.com",
      "ingredients": [
        "3 cloves of garlic",
        "5cm piece of ginger",
        "200 g mixed Asian greens , such as baby pak choi, choy sum, Chinese cabbage",
        "2 spring onions",
        "1 fresh red chilli"
      ],
      "category": "Thai",
      "image": "thai-inspired-vegetable-broth.jpg",
      "__v": 0
    },{

      
      "name": "Thai-Chinese-inspired pinch salad",
      "description": "Peel and very finely chop the ginger and deseed and finely slice the chilli",
      "email": "hello@email.com",
      "ingredients": [
        "5 cm piece of ginger",
        "1 fresh red chilli",
        "25 g sesame seeds",
        "24 raw peeled king prawns , from sustainable sources (defrost first, if using frozen)",
        "1 pinch Chinese five-spice powder"
      ],
      "category": "Chinese",
      "image": "thai-chinese-inspired-pinch-salad.jpg",
      "__v": 0
    },{

      
      "name": "Southern fried chicken",
      "description": "To make the brine, toast the peppercorns",
      "email": "hello@email.com",
      "ingredients": [
        "4 free-range chicken thighs , skin on, bone in",
        "4 free-range chicken drumsticks",
        "200 ml buttermilk",
        "4 sweet potatoes",
        "200 g plain flour",
        "1 level teaspoon baking powder",
        "1 level teaspoon cayenne pepper",
        "1 level teaspoon hot smoked paprika"
      ],
      "category": "American",
      "image": "southern-friend-chicken.jpg",
      "__v": 0
    },{
      
      "name": "Chocolate & banoffee whoopie pies",
      "description": "Preheat the oven to 170ºC/325ºF/gas 3 and line 2 baking sheets with greaseproof paper.",
      "email": "hello@email.com",
      "ingredients": [
        "3 spring onions",
        "½ a bunch of fresh flat-leaf parsley",
        "1 large free-range egg",
        "750 g cooked crabmeat , from sustainable sources",
        "300 g mashed potatoes",
        "1 teaspoon ground white pepper",
        "1 teaspoon cayenne pepper",
        "olive oil"
      ],
      "category": "American",
      "image": "chocolate-banoffe-whoopie-pies.jpg",
      "__v": 0
    },{
   
      "name": "Veggie pad Thai",
      "description": "Cook the noodles according to the packet ",
      "email": "hello@email.com",
      "ingredients": [
        "150 g rice noodles",
        "sesame oil",
        "2 cloves of garlic",
        "80 g silken tofu",
        "low-salt soy sauce"
      ],
      "category": "Thai",
      "image": "veggie-pad-thai.jpg",
      "__v": 0
    },{

      "name": "Chinese steak & tofu stew",
      "description": "Get your prep done first, for smooth cooking. ",
      "email": "hello@email.com",
      "ingredients": [
        "250g rump or sirloin steak",
        "2 cloves of garlic",
        "4cm piece of ginger",
        "2 fresh red chilli",
        "1 bunch of spring onions"
      ],
      "category": "Chinese",
      "image": "chinese-steak-tofu-stew.jpg",
      "__v": 0
    },{

      "name": "Spring rolls",
      "description": "Put your mushrooms in a medium-sized bowl, cover with hot water and leave for 10 minutes, or until soft. ",
      "email": "hello@email.com",
      "ingredients": [
        "40 g dried Asian mushrooms",
        "50 g vermicelli noodles",
        "200 g Chinese cabbage",
        "1 carrot",
        "3 spring onions"
      ],
      "category": "Chinese",
      "image": "spring-rolls.jpg",
      "__v": 0
    },{

      "name": "Tom Daley's sweet & sour chicken",
      "description": "Drain the juices from the tinned fruit",
      "email": "hello@email.com",
      "ingredients": [
        "1 x 227 g tin of pineapple in natural juice",
        "1 x 213 g tin of peaches in natural juice",
        "1 tablespoon low-salt soy sauce",
        "1 tablespoon fish sauce",
        "2 teaspoons cornflour",
        "2 x 120 g free-range chicken breasts , skin on"
      ],
      "category": "Chinese",
      "image": "tom-daley.jpg",
      "__v": 0
    },{

      "name": "Crab cakes",
      "description": "Trim and finely chop the spring onions, and pick and finely chop the parsley. ",
      "email": "hello@email.com",
      "ingredients": [
        "3 spring onions",
        "½ a bunch of fresh flat-leaf parsley",
        "1 large free-range egg",
        "750 g cooked crabmeat , from sustainable sources",
        "300 g mashed potatoes",
        "1 teaspoon ground white pepper",
        "1 teaspoon cayenne pepper",
        "olive oil"
      ],
      "category": "American",
      "image": "crab-cakes.jpg",
      "__v": 0
    },{

      "name": "Thai red chicken soup",
      "description": "Sit the chicken in a large, deep pan.",
      "email": "hello@email.com",
      "ingredients": [
        "1 x 1.6 kg whole free-range chicken",
        "1 butternut squash (1.2kg)",
        "1 bunch of fresh coriander (30g)"
      ],
      "category": "Thai",
      "image": "thai-red-chicken-soup.jpg",
      "__v": 0
    },{

      "name": "Key lime pie",
      "description": "Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.",
      "email": "hello@email.com",
      "ingredients": [
        "4 large free-range egg yolks",
        "400 ml condensed milk",
        "5 limes",
        "200 ml double cream"
      ],
      "category": "American",
      "image": "key-lime-pie.jpg",
      "__v": 0
    },{

      "name": "Grilled lobster rolls",
      "description": "Remove the butter from the fridge and allow to soften.",
      "email": "hello@email.com",
      "ingredients": [
        "85 g butter",
        "6 submarine rolls",
        "500 g cooked lobster meat, from sustainable sources",
        "1 stick of celery",
        "2 tablespoons mayonnaise , made using free-range eggs"
      ],
      "category": "American",
      "image": "grilled-lobster-rolls.jpg",
      "__v": 0
    },{

      "name": "Thai green curry",
      "description": "Preheat the oven to 180ºC/350ºF/gas",
      "email": "hello@email.com",
      "ingredients": [
        "1 butternut squash (1.2kg)",
        "groundnut oil",
        "12x 400 g tins of light coconut milk",
        "400 g leftover cooked greens, such as",
        "Brussels sprouts, Brussels tops, kale, cabbage, broccoli"
      ],
      "category": "Thai",
      "image": "thai-green-curry.jpg",
      "__v": 0
    },{

      "name": "Stir-fried vegetables",
      "description": "Crush the garlic and finely slice the chilli and spring onion. ",
      "email": "hello@email.com",
      "ingredients": [
        "1 clove of garlic",
        "1 fresh red chilli",
        "3 spring onions",
        "1 small red onion",
        "1 handful of mangetout",
        "a few shiitake mushrooms"
      ],
      "category": "Chinese",
      "image": "stir-fried-vegetables.jpg",
      "__v": 0
    },{

      "name": "New Chocolate Cake",
      "description": "Chocolate Cake Description...",
      "email": "hello@email.com",
      "ingredients": [
        "Water",
        "1 pastry for double-crust pie",
      "6 cups thinly sliced apples",
      "3/4 cup sugar",
      "2 tablespoons all-purpose flour",
      "1/2 teaspoon ground cinnamon",
      "1/4 teaspoon ground nutmeg",
      "1/4 teaspoon salt",
      "1 tablespoon lemon juice"
      ],
      "category": "Mexican",
      "image": "chinese-steak-tofu-stew.jpg",
      "__v": 0
    },
  ]);
  } catch (error) {
    console.log('err' + error); // output error in case of any errors during the execution
  }
}

insertDymmyRecipeData();
 * 
*/





















