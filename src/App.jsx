import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [randomCountries, setRandomCountries] = useState([])
  const [randomCountry, setRandomCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [typeQuiz, setTypeQuiz] = useState(null)
  const [score, setScore] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [bestScore, setBestScore] = useState(0)
  const url = 'https://restcountries.com/v3.1/all'
  const navigate = useNavigate()

  // Función para obtener los países desde la API
  const fetchCountries = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
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
      if (!randomCountries.some((c) => c.name === country.name)) {
        randomCountries.push(country)
      }
    }
    return randomCountries
  }

  // Función para iniciar una nueva pregunta
  const startNewQuestion = () => {
    const randomCountries = getRandomCountries()
    setRandomCountries(randomCountries)
    const randomCountry = randomCountries[Math.floor(Math.random() * 4)]
    setRandomCountry(randomCountry)
    setSelectedCountry(null)

    // Elegir el tipo de pregunta aleatoriamente (flag o capital)
    const typeQuiz = Math.random() < 0.5 ? 'flag' : 'capital'
    setTypeQuiz(typeQuiz)
  }

  // Función para manejar la selección de respuestas
  const handleAnswerSelection = (selectedCountry) => {
    if (hasAnswered) return

    setSelectedCountry(selectedCountry)
    setHasAnswered(true)

    if (randomCountry.name === selectedCountry.name) {
      setScore(score + 1)
    } else {
      setCorrectAnswer(randomCountry.name)
      setTimeout(() => {
        navigate('/result', { state: { score, bestScore } })
      }, 1500)
    }

    startNewQuestionAfterDelay()
  }

  // Función para iniciar una nueva pregunta después de 1.5 segundos
  const startNewQuestionAfterDelay = () => {
    setTimeout(() => {
      setHasAnswered(false)
      startNewQuestion()
    }, 1500)
  }

  // Cargar los países al montar el componente
  useEffect(() => {
    fetchCountries()
  }, [])

  // Generar una nueva pregunta cuando se actualiza el estado de los países o el tipo de pregunta
  useEffect(() => {
    if (allCountries.length > 0) {
      startNewQuestion()
    }
  }, [allCountries])

  // Cargar el mejor resultado del localStorage al montar el componente
  // Actualizar el mejor resultado en el localStorage cuando el puntaje actual sea mayor que el mejor resultado
  useEffect(() => {
    const storedBestScore = localStorage.getItem('bestScore')
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore))
    }

    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('bestScore', score.toString())
    }
  }, [score, bestScore])

  return (
    <div className='Quiz'>
      <h1 className='Quiz-h1'>Country Quiz</h1>
      <div className='Quiz-container'>
        <img className='Quiz-svg' src='/quiz.png' alt='world image' />
        {randomCountry && (
          <div>
            {typeQuiz === 'flag' ? (
              <img
                className='Quiz-img'
                src={randomCountry.flag}
                alt={randomCountry.name}
              />
            ) : (
              ''
            )}
          </div>
        )}
        <h3 className='Quiz-question'>
          {typeQuiz === 'flag'
            ? '¿A qué país pertenece esta bandera?'
            : `¿${
                randomCountry ? randomCountry.capital : ''
              } es la capital de?`}
        </h3>
        <div className='Quiz-bottom'>
          <hr />
          {randomCountries.map((country) => {
            const isCorrect = randomCountry.name === country.name
            const isSelected =
              selectedCountry && selectedCountry.name === country.name
            const shouldShowCorrect = hasAnswered && isCorrect && !isSelected

            return (
              <div
                key={uuidv4()}
                onClick={() => handleAnswerSelection(country)}
                className={`Quiz-option ${
                  isSelected
                    ? isCorrect
                      ? 'Quiz-option--correct'
                      : 'Quiz-option--wrong'
                    : ''
                } ${shouldShowCorrect ? 'Quiz-option--correct' : ''}`}>
                <span className='Quiz-response'>{country.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
