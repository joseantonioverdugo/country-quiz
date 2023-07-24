import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DataProvider } from './context/DataContext.jsx'
import Quiz from './Quiz.jsx'
import Result from './Result.jsx'
import '../src/scss/app.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DataProvider>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </DataProvider>
  </BrowserRouter>
)
