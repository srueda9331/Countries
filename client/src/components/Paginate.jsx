import React from "react";

export default function Paginate({countriesPerPage, allCountries, paginate}){
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allCountries/countriesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      {
        pageNumbers.map(number => {
          return (
            <a onClick={paginate(number)}>{number}</a>
          )
        })
      }
    </nav>
  )
}