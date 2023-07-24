import { v4 as uuidv4 } from 'uuid'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'

export default function RandomCountries() {
  const {
    randomCountries,
    randomCountry,
    selectedCountry,
    hasAnswered,
    handleAnswerSelection,
  } = useContext(DataContext)

  return (
    <div className='Quiz-bottom'>
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
  )
}
