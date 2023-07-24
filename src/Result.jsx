import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'

export default function Result() {
  const { score, bestScore, starNewQuestion } = useContext(DataContext)

  const handleStartNewGame = () => {
    starNewQuestion()
  }

  return (
    <div className='Result'>
      <h1 className='Result-h1'>Country Quiz</h1>
      <div className='Result-container'>
        <img className='Result-svg' src='/result.png' alt='champion image' />
        <div className='Result-bottom'>
          <h2 className='Result-h2'>Resultado</h2>
          <p className='Result-p'>
            Has acertado <span className='Result-span'>{score}</span>{' '}
            {score === 1 ? 'pregunta' : 'preguntas'}
          </p>
          <p className='Result-p'>
            Tu mejor puntuación es:
            <span className='Result-span'>{bestScore}</span>
          </p>
          <Link to='/' onClick={handleStartNewGame} className='Result-link'>
            Volver a jugar
          </Link>
        </div>
      </div>
    </div>
  )
}
