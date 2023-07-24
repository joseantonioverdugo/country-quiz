// import { createContext, useState, useEffect } from 'react'
// import { useFetch } from '../hooks/useFetch'

// export const DataContext = createContext()

// export const DataProvider = ({ children }) => {
//   const [allCountries, setAllCountries] = useState([])
//   const [randomCountries, setRandomCountries] = useState([])
//   const [randomCountry, setRandomCountry] = useState(null)
//   const [selectedCountry, setSelectedCountry] = useState(null)
//   const [typeQuiz, setTypeQuiz] = useState(null)
//   const [score, setScore] = useState(0)
//   const [hasAnswered, setHasAnswered] = useState(false)
//   const [correctAnswer, setCorrectAnswer] = useState(null)
//   const [bestScore, setBestScore] = useState(0)

//   const { data } = useFetch('https://restcountries.com/v3.1/all')

//   const filteredData = data.map((country) => ({
//     name: country.translations.spa.common,
//     flag: country.flags.png,
//     capital: country.capital,
//   }))
//   setAllCountries(filteredData)

//   // Función para obtener cuatro países aleatorios
//   const getRandomCountries = () => {
//     const randomCountries = []
//     while (randomCountries.length < 4) {
//       const randomIndex = Math.floore(Math.random() * allCountries.length)
//       const country = allCountries[randomIndex]
//       if (!randomCountries.some((c) => c.name === country.name)) {
//         randomCountries.push(country)
//       }
//     }
//     return randomCountries
//   }

//   const startNewQuestion = () => {
//     const randomCountries = getRandomCountries()
//     setRandomCountries(randomCountries)
//     const randomCountry = randomCountries[Math.floor(Math.random() * 4)]
//     setRandomCountry(randomCountry)
//     setSelectedCountry(null)

//     // Elegir el tipo de pregunta aleatoriamente (flag o capital)
//     const typeQuiz = Math.random() < 0.5 ? 'flag' : 'capital'
//     setTypeQuiz(typeQuiz)
//   }

//   // Función para manejar la selección de respuestas
//   const handleAnswerSelection = (selectedCountry) => {
//     if (hasAnswered) return

//     setSelectedCountry(selectedCountry)
//     setHasAnswered(true)

//     if (randomCountry.name === selectedCountry.name) {
//       setScore(score + 1)
//     } else {
//       setCorrectAnswer(randomCountry.name)
//       setTimeout(() => {
//         navigate('/result', { state: { score, bestScore } })
//       }, 1500)
//     }

//     startNewQuestionAfterDelay()
//   }

//   // Función para iniciar una nueva pregunta después de 1.5 segundos
//   const startNewQuestionAfterDelay = () => {
//     setTimeout(() => {
//       setHasAnswered(false)
//       startNewQuestion()
//     }, 1500)
//   }

//   // Cargar los países al montar el componente
//   useEffect(() => {
//     fetchCountries()
//   }, [])

//   // Generar una nueva pregunta cuando se actualiza el estado de los países o el tipo de pregunta
//   useEffect(() => {
//     if (allCountries.length > 0) {
//       startNewQuestion()
//     }
//   }, [allCountries])

//   // Cargar el mejor resultado del localStorage al montar el componente
//   // Actualizar el mejor resultado en el localStorage cuando el puntaje actual sea mayor que el mejor resultado
//   useEffect(() => {
//     const storedBestScore = localStorage.getItem('bestScore')
//     if (storedBestScore) {
//       setBestScore(parseInt(storedBestScore))
//     }

//     if (score > bestScore) {
//       setBestScore(score)
//       localStorage.setItem('bestScore', score.toString())
//     }
//   }, [score, bestScore])

//   return (
//     <DataContext.Provider
//       value={{
//         allCountries,
//         setAllCountries,
//         randomCountries,
//         setRandomCountries,
//         randomCountry,
//         setRandomCountry,
//         selectedCountry,
//         setSelectedCountry,
//         typeQuiz,
//         setTypeQuiz,
//         score,
//         setScore,
//         hasAnswered,
//         setHasAnswered,
//         correctAnswer,
//         setCorrectAnswer,
//         bestScore,
//         setBestScore,
//         handleAnswerSelection,
//       }}>
//       {children}
//     </DataContext.Provider>
//   )
// }

import { createContext, useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [allCountries, setAllCountries] = useState([])
  const [randomCountries, setRandomCountries] = useState([])
  const [randomCountry, setRandomCountry] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [typeQuiz, setTypeQuiz] = useState(null)
  const [score, setScore] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [bestScore, setBestScore] = useState(0)

  // Realiza la solicitud de los datos de los países usando el hook useFetch
  const { data, loading, error } = useFetch(
    'https://restcountries.com/v3.1/all'
  )

  // Obtener el objeto navigate de react-router-dom para redireccionar a la página de resultados
  const navigate = useNavigate()

  // useEffect para filtrar y almacenar los datos de los países cuando la solicitud se completa
  useEffect(() => {
    if (data) {
      const filteredData = data.map((country) => ({
        name: country.translations.spa.common,
        flag: country.flags.png,
        capital: country.capital,
      }))
      setAllCountries(filteredData)
    }
  }, [data])

  // useEffect para cargar la mejor puntuación desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedBestScore = localStorage.getItem('bestScore')
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore))
    }
  }, [])

  // Función para obtener un conjunto aleatorio de países
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
    setHasAnswered(false)
    setCorrectAnswer(null)
    const randomCountries = getRandomCountries()
    setRandomCountries(randomCountries)
    const randomCountry = randomCountries[Math.floor(Math.random() * 4)]
    setRandomCountry(randomCountry)
    setSelectedCountry(null)

    // Elegir el tipo de cuestionario al azar (bandera o capital)
    const typeQuiz = Math.random() < 0.5 ? 'flag' : 'capital'
    setTypeQuiz(typeQuiz)
  }

  // Función para manejar la selección de respuesta
  const handleAnswerSelection = (selectedCountry) => {
    if (hasAnswered) return

    setSelectedCountry(selectedCountry)
    setHasAnswered(true)

    if (randomCountry.name === selectedCountry.name) {
      setScore(score + 1)
      console.log(score)
    } else {
      setCorrectAnswer(randomCountry.name)
      // Redirigir a la página de resultados después de 1.5 segundos
      setTimeout(() => {
        navigate('/result', { state: { score, bestScore } })
      }, 1500)
    }

    // Iniciar una nueva pregunta después de 1.5 segundos
    setTimeout(() => {
      startNewQuestion()
    }, 1500)
  }

  // useEffect para actualizar la mejor puntuación en localStorage cuando la puntuación actual es mayor
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
      localStorage.setItem('bestScore', score.toString())
    }
  }, [score, bestScore])

  // useEffect para iniciar una nueva pregunta cuando se cargan los datos de los países por primera vez
  useEffect(() => {
    if (allCountries && allCountries.length > 0) {
      startNewQuestion()
    }
  }, [allCountries])

  return (
    <DataContext.Provider
      value={{
        allCountries,
        setAllCountries,
        randomCountries,
        setRandomCountries,
        randomCountry,
        setRandomCountry,
        selectedCountry,
        setSelectedCountry,
        typeQuiz,
        setTypeQuiz,
        score,
        setScore,
        hasAnswered,
        setHasAnswered,
        correctAnswer,
        setCorrectAnswer,
        bestScore,
        setBestScore,
        handleAnswerSelection,
      }}>
      {children}
    </DataContext.Provider>
  )
}
