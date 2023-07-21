import { useLocation, Link } from 'react-router-dom'

export default function Result() {
  const location = useLocation()
  const { score } = location.state

  return (
    <div className='Result'>
      <h1 className='Result-h1'>Country Quiz</h1>
      <div className='Result-container'>
        <img className='Result-svg' src='/result.png' alt='champion image' />
        <div className='Result-bottom'>
          <h2 className='Result-h2'>Results</h2>
          <p className='Result-p'>
            You got <span className='Result-span'>{score}</span> correct answers
          </p>
          <Link to='/' className='Result-link'>
            Try again
          </Link>
        </div>
      </div>
    </div>
  )
}
