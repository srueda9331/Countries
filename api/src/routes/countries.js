const { Router } = require('express');
const { Country, Activities } = require('../db') 
const { Op } = require('sequelize')
const axios = require('axios')

const router = Router();


router.get('/', async (req, res) => {
  // If no name, then find all ---> Si no hay nombre, entonces encontrar todos
  const name = req.query.name    
  try {
    if(name){
      let findName = await Country.findAll({
        include : Activities,
        where: {
          name : {
            [Op.iLike] : '%' + name.toLowerCase() + '%'
          }
        }
      })

      findName.length? res.status(201).send(findName) : res.status(404).json({msg: 'Could not find that country name'})
    }
    // Find all countries already created at database --> Encontrar todos los paises en base de datos
    // let findEveryCountry = await Country.findAll({
    //   include: {
    //     model : Activities,
    //     attributes : ['id', 'name', 'difficulty', 'duration', 'season'],
    //     through: {
    //       attributes: []
    //     }
    //   }
    // })
    let findEveryCountry = await Country.findAll()
    // If they're not created yet, go to else and Bulkcreate first --> Si no existen en bd entonces crearlos
    if(findEveryCountry.length > 0) res.status(201).send(findEveryCountry) 
    
    else {
    // for default it will create the countries at db, if all conditions before weren't true
    let getAllCountries = await axios.get('https://restcountries.com/v3/all')
    let countries = getAllCountries.data.map(country => {
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
   
   
   let createEverything = await Country.bulkCreate(countries)
   createEverything.length > 0? res.send(createEverything) : res.status(404).send('Country not found')
  }
    
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
        attributes : ['id', 'name', 'difficulty', 'duration', 'season'],
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