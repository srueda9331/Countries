import '../styles/Paginate.css'
import React from "react";


export default function Paginate({countriesPerPage, allCountries, paginate}){
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='paginate'>
      {
        pageNumbers && pageNumbers.map(number => {
          return (
            <button className='page-num' onClick={() => paginate(number)}>{number}</button>
          )
        })
      }
    </nav>
  )
}