import {useState, useEffect} from 'react';
import './App.css';
import shapeItems from "./shapes.json"

function Card({shape, flipped, select}) {
  const cardSel = (e) => {
    select(shape)
  }

  return <div className={`card ${flipped ? "matched" : '' } ` } onClick={cardSel}>
    <img src={shape.src}  alt = "Missing" style={{transform: "rotateY(180deg)" }}/>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-npm" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M1 8h22v7h-12v2h-4v-2h-6z"></path>
    <path d="M7 8v7"></path>
    <path d="M14 8v7"></path>
    <path d="M17 11v4"></path>
    <path d="M4 11v4"></path>
    <path d="M11 11v1"></path>
    <path d="M20 11v4"></path>
    </svg>
  </div>
}

function App() {
  const [shapes, setShapes] = useState([]);
  const [shapeA, setShapeA] = useState(null);
  const [shapeB, setShapeB] = useState(null);

  const select = (shape) => {
    shapeA ? setShapeB(shape) : setShapeA(shape)
  }

  const start =() => {
    const shapeList = [...shapeItems, ...shapeItems]
    .sort(() => Math.random() - .5)
    .map(item => ({...item, id: Math.random() }))

    setShapes(shapeList)
  } 

 useEffect(() => {
  if(shapeA && shapeB){
    if(shapeA.src === shapeB.src){
      setShapes(prevShapes => {
        return prevShapes.map(item => {
          if(item.src === shapeA.src){
            return {...item, matched:true}
          }
          else{
            return item
          }
        })
      })
    }

    setTimeout(() => {
      setShapeA(null)
      setShapeB(null)
    }, 500)
    }

  }, [shapeA, shapeB])
 

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
              select={select}
              flipped = {shape.matched || shape === shapeA || shape === shapeB}
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
