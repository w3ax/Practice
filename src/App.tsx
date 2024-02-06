
import sun from '/sunn.gif'
import './App.css'

function App() {

  return (
      <>
          <div>
              <img src={sun} className="sun-pic" alt="Sun"/>
          </div>
          <h1>Weather forecast</h1>
          <div className="card">
          </div>
      </>
  )
}

export default App
