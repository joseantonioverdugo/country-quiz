import { useLocation, Link } from 'react-router-dom'

export default function Result() {
  const location = useLocation()
  const { score, bestScore } = location.state

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
          <Link to='/' className='Result-link'>
            Volver a jugar
          </Link>
        </div>
      </div>
    </div>
  )
}
