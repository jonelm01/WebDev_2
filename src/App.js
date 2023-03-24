import shapeItems from "./shapes.json"
import {useState} from 'react';
import './App.css';

function Card({shape}) {
  return <div className="card">
    <img src={shape.src} />
  </div>
}

function App() {
  const [shapes, setShapes] = useState([]);

  const start =() => {
    const shapeList = [...shapeItems, ...shapeItems]
    .sort(() => Math.random() - .5)
    .map(item => ({...item, id: Math.random() }))

    setShapes(shapeList)
  } 

  return <>
    <h1>Memory Game</h1>
    {
      shapes.length ? <>
        <button className="reset">
        
        </button>

        <div className="game">
        {
          shapes.map((shape, key) => {
            return <Card 
              key = {key}
              shape = {shape}
            />
          })
        }
        </div>
      </> : <button className="start" onClick={start}>
        Start
        </button>
    }
  </>;
}

export default App;
