const { Router } = require('express');
const { Country, Activities } = require('../db') 
const { Op } = require('sequelize')
const axios = require('axios')

const router = Router();


router.get('/', (req, res) => {
 
  try {
    const name = req.query.name

    if(name){
      Country.findAll({
        include : Activities,
        where: {
          name : {
            [Op.iLike] : '%' + name + '%'
          }
        }
      })
      .then(response => {
        let found = response.filter(p => p.name)
        found.length > 0? res.send(found) : res.status(404).send('Country not found')
      })  
    } 
    
    Country.findAll({
      include: {
        model : Activities,
        attributes : ['id', 'name', 'difficulty', 'length', 'season'],
        through: {
          attributes: []
        }
      }
    }).then(response => {
      if(response.length > 0){
        res.send(response)
      } 

      else{

        axios.get('https://restcountries.com/v3/all')
       .then((response) => {
         let countries = response.data.map(country => {
           return {
             id: country.cca3,
             name: country.name.common,
             image: country.flags[1],
             continent: country.continents[0],
             capital: country.capital? country.capital[0] : 'No capital',
             subregion: country.subregion,
             area: country.area,
             population: country.population
             } 
         })  
        
        Country.bulkCreate(countries).then(result => res.send(result))
        .catch(error => res.status(404).json({msg : 'Something went wrong'}))
        
       })

      }
    })
    
  } catch (error) {
    console.log(error);
  }
})




router.get('/:id', async (req, res) => {
  const id = req.params.id.toUpperCase()
  let country;
  try {
    country = await Country.findByPk(id, {
      include: {
        model : Activities,
        attributes : ['id', 'name', 'difficulty', 'length', 'season'],
        through: {
          attributes: []
        }
      }
    })
    if(country) res.send(country)
    else {
      res.status(404).json({msg: 'The Id does not exist'})
    }
  } catch (error) {
    console.log(error);
  }
})




module.exports = router;