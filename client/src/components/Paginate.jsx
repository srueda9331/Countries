import React from "react";


export default function Paginate({countriesPerPage, allCountries, paginate}){
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      {
        pageNumbers && pageNumbers.map(number => {
          return (
            <a href={() => paginate(number)} onClick={() => paginate(number)}>{number}</a>

          )
        })
      }
    </nav>
  )
}