const { Router } = require('express');
const { Activities, Country } = require('../db')
const axios = require('axios');



const router = Router();

function* newId(){
  id = 1;
  while(true){
    yield id;
    id++
  }
}

let getNewId = newId();

const getAllCodes = async () => {
  let getAll = await axios.get('https://restcountries.com/v3/all')
  let getCodes = getAll.data.map(c => c.cca3)
  return getCodes
}

router.get('/', async (req, res) => {
  try {
    let codes = await getAllCodes()
 
    codes.forEach(el => {
      Activities.findOrCreate({
        where: { name: el}
      })
    });
    let findCodes = await Activities.findAll({where : addCountry});
    res.status(201).send(findCodes)
    
  } catch (error) {
    console.log(error);
  }
})
  //   return (
    // Activities.findOrCreate({
    //   where: { countriesAdd: c}
    // }) 
  // )

    // res.send(c)



router.post('/', async (req, res) => {
  const { name, difficulty, length, season, countries } = req.body;
  
  try {
    if(!name || !difficulty || !length || !season || !countries ) res.status(404).json({msg : 'Some values are missing'})
    
    
    let create = await Activities.create({
      id: getNewId.next().value,
      name,
      difficulty,
      length, 
      season,
      countries: []
    })
    if(difficulty !== 1 && difficulty !== 2 && difficulty !== 3 && difficulty !== 4 && difficulty !== 5) res.status(404).json({msg :'Write only a number between 1 and 5'})
    if(season !== 'Summer' && season !== 'Autumn'  && season !== 'Autumn' && season !== 'Spring') res.status(404).json({msg :'Write only one of four seasons (Summer, Winter, Autumn, Spring)'})
    let countryDb = await Country.findAll({
      where: {name : countries}
    })
    create.addCountries(countryDb)
    // console.log(Activities.__proto__);
    console.log('other', create.__proto__);

    res.status(200).send('Activity created')
   
  } catch (error) {
    console.log(error);
  }
})



// { 
//   "name" : "sky", 
//   "difficulty" : "hard", 
//   "length" : "4 days", 
//   "season": "Winter "
//    "countries" : ["Colombia", "Argentina"]
// }

module.exports = router;