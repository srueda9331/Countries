const { Router } = require('express');
const { Activities } = require('../db')


const router = Router();

function* newId(){
  id = 1;
  while(true){
    yield id;
    id++
  }
}

let getNewId = newId();

router.post('/', async (req, res) => {
  const { name, difficulty, length, season } = req.body;
  
  try {
    if(!name || !difficulty || !length || !season) res.status(404).json({msg : 'Some values are missing'})
   
    
    let create = await Activities.create({
      id: getNewId.next().value,
      name,
      difficulty,
      length, 
      season
    })
    
    res.status(201).send(create)
  } catch (error) {
    console.log(error);
  }
})

router.get('',  (req, res) => {
  let findAll = Activities.findAll()
  .then(resp => res.send(resp))
})


// { 
//   "name" : "sky", 
//   "difficulty" : "hard", 
//   "length" : "4 days", 
//   "season": "Winter "
// }

module.exports = router;