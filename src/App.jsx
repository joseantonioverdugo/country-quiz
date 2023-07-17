import './App.css'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [randomCountries, setRandomCountries] = useState([])
  const [randomCountry, setRandomCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const url = 'https://restcountries.com/v3.1/all'

  // Función para obtener los países desde la API
  const fetchCountries = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      const filteredData = data.map((country) => ({
        name: country.translations.spa.common,
        flag: country.flags.png,
        capital: country.capital,
      }))
      setAllCountries(filteredData)
    } catch (error) {
      console.error('Error al obtener los países:', error)
    }
  }

  // Función para obtener cuatro países aleatorios
  const getRandomCountries = () => {
    const randomCountries = []
    while (randomCountries.length < 4) {
      const randomIndex = Math.floor(Math.random() * allCountries.length)
      const country = allCountries[randomIndex]
      if (!randomCountries.includes(country)) {
        randomCountries.push(country)
      }
    }
    return randomCountries
  }

  // Función para iniciar una nueva pregunta
  const startNewQuestion = () => {
    const randomCountries = getRandomCountries()
    // Asignar los países aleatorios al estado
    setRandomCountries(randomCountries)
    const randomCountry = randomCountries[Math.floor(Math.random() * 4)]
    // Asignar el país aleatorio al estado
    setRandomCountry(randomCountry)
    setSelectedCountry(null)
  }

  // Función para manejar la selección de respuestas
  const handleAnswerSelection = (selectedCountry) => {
    setSelectedCountry(selectedCountry)

    if (randomCountry.name === selectedCountry.name) {
      console.log('El país coincide')
    } else {
      console.log('El país no coincide')
    }

    // Esperar 1.5 segundos antes de iniciar una nueva pregunta
    setTimeout(() => {
      startNewQuestion()
    }, 1500)
  }

  // Cargar los países al montar el componente
  useEffect(() => {
    fetchCountries()
  }, [])

  // Generar una nueva pregunta cuando se actualiza el estado de los países
  useEffect(() => {
    if (allCountries.length > 0) {
      startNewQuestion()
    }
  }, [allCountries])

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
          const isCorrect = randomCountry.name === country.name
          const isSelected =
            selectedCountry && selectedCountry.name === country.name

          return (
            <div
              key={uuidv4()}
              onClick={() => handleAnswerSelection(country)}
              className={isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}>
              <h2>{country.name}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
