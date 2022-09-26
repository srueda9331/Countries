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

router.get('/names', async (req, res) => {
  try {
    let getAll = await axios.get('https://restcountries.com/v3/all')
    let id = 1;
    let getCodes = getAll.data.map(function(c){
      return {
        id: id++,
        name: c.name.common
      }
    })
    getCodes.sort((a,b) => {
      if(a.name < b.name) return -1;
      else if(a.name > b.name) return 1; 
      else return 0 
    })
    if(getCodes.length > 0) res.status(201).send(getCodes)
    else res.status(404).json({msg: 'I could not find the names'})
    
  } catch (error) {
    console.log(error);
  }
})


router.get('/activityname', async (req, res) => {
  try {
   
    let getName = await Activities.findAll()
    let names = getName.map(el => el.name)
    res.status(201).send(names)
  } catch (error) {
    console.log(error);
  }
})

router.get('/', async (req, res) => {
  try {
   
    let getAll = await Activities.findAll({include : Country})
    res.status(201).send(getAll)
  } catch (error) {
    console.log(error);
  }
})



router.post('/', async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  
  try {
    if(!name || !difficulty || !duration || !season || !countries ) res.status(404).json({msg : 'Some values are missing'})
    
    const repeatedName = await Activities.findOne({where: {name : name}})
    if(repeatedName) res.status(404).json({msg: 'That name already exists'})

    let create = await Activities.create({
      id: getNewId.next().value,
      name,
      difficulty,
      duration, 
      season,
      countries: []
    })
    if(difficulty !== 1 && difficulty !== 2 && difficulty !== 3 && difficulty !== 4 && difficulty !== 5) res.status(404).json({msg :'Write only a number between 1 and 5'})
    if(season !== 'Summer' && season !== 'Winter'  && season !== 'Autumn' && season !== 'Spring') res.status(404).json({msg :'Write only one of four seasons (Summer, Winter, Autumn, Spring)'})
    let countryDb = await Country.findAll({
      where: {name : countries}
    })
    create.addCountries(countryDb)
    res.status(200).send('Activity created')
   
  } catch (error) {
    console.log(error);
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if(id){
      await Activities.destroy({
        where: {id : id}
      })
    }
    res.send('Deleted')
  } catch (error) {
    console.log(error);
  }
})


// { 
//   "name" : "sky", 
//   "difficulty" : 5, 
//   "duration" : "4 days", 
//   "season": "Winter",
//   "countries" : ["Colombia", "Argentina"]
// }

module.exports = router;