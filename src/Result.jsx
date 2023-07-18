import { useLocation } from 'react-router-dom'

export default function Result() {
  const location = useLocation()
  const { score } = location.state

  return (
    <div>
      <h1>Result</h1>
      <h2>Score: {score}</h2>
    </div>
  )
}
