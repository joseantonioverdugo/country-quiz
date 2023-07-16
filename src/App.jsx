import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [countries, setCountries] = useState([])
  const [randomCountries, setRandomCountries] = useState([])
  const [randomCountry, setRandomCountry] = useState(null)
  const url = 'https://restcountries.com/v3.1/all'

  const fetchCountries = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const filteredData = data.map((country) => ({
      name: country.translations.spa.common,
      flag: country.flags.png,
      capital: country.capital,
    }))
    setCountries(filteredData)
    console.log(filteredData)
  }

  const fourRandomCountries = () => {
    const randomCountries = []
    for (let i = 0; i < 4; i++) {
      const random = Math.floor(Math.random() * countries.length)
      randomCountries.push(countries[random])
    }
    return randomCountries
  }

  const filterAnswers = (selectedCountry) => {
    const answer = randomCountries.filter(
      (country) =>
        country === randomCountry && country.name === selectedCountry.name
    )
    if (answer.length > 0) {
      console.log('El país coincide')
    } else {
      console.log('El país no coincide')
    }
    return answer
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (countries.length > 0) {
      const randomCountries = fourRandomCountries()
      setRandomCountries(randomCountries)
      console.log(randomCountries)
      const randomCountry = randomCountries[Math.floor(Math.random() * 4)]
      setRandomCountry(randomCountry)
      console.log(randomCountry)
    }
  }, [countries])

  return (
    <div>
      <h1>Country Quiz</h1>
      <h3>País para hacer la pregunta:</h3>
      {randomCountry && (
        <div>
          <h2>{randomCountry.name}</h2>
          <img src={randomCountry.flag} alt={randomCountry.name} />
        </div>
      )}
      <div className='container'>
        <hr />
        {randomCountries.map((country) => {
          return (
            <div key={uuidv4()} onClick={() => filterAnswers(country)}>
              <h2>{country.name}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
