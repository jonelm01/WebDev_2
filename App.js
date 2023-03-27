//Jonel Muncan, Web Dev with Prof Matthew Wong
import {useState, useEffect} from 'react';
import './App.css';
import shapeItems from "./shapes.json" 

function Card({shape, flipped, select}) { 
  const cardSel = (temp) => {
    select(shape)
  }

  {/* Each card obj displays img corresponding to its name when selected. When "face down", unselected, display svg of NPM logo from tabler*/}
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
  {/* Initializing key variables and their setters, using useState hook*/}
  const [shapes, setShapes] = useState([]); {/*Init array of shapes */}
  const [shapeA, setShapeA] = useState(null); {/*Card 1 of pair */}
  const [shapeB, setShapeB] = useState(null); {/*Card 2 of pair */}
  const [win, setWin] = useState(false); {/*Keep track of win condition */}
  const [counter, setCounter] = useState(0); {/*Keep track of "turns" ie pairs attempted to be "matched" successfully or not */}
  const [clicks, setClicks] = useState(0); {/*Helper for counter */}

  const select = (shape) => {
    if(shape === shapeA || shape === shapeB || shape.matched){
      return;
    }
    setClicks(clicks + 1);
    shapeA ? setShapeB(shape) : setShapeA(shape); {/*Set pairs */}
  }

  {/*Initialize game: init array, shuffle cards */}
  const start =() => {
    const shapeList = [...shapeItems, ...shapeItems]  
    .sort(() => Math.random() - .5)
    .map(item => ({...item, id: Math.random() }))

    setShapes(shapeList)
  } 

  {/* Interactions. If all shapes matched bool true, game is won. (clicks > 1 to enable proper counter display)*/}
 useEffect(() => {
  if(shapes.every(shape => shape.matched) && clicks>1){
    setWin(true);
  }
  if(shapeA && shapeB){
    if(shapeA.src === shapeB.src){
      setShapes(prevShapes => {
        return prevShapes.map(item => {
          if(item.src === shapeA.src){
            return {...item, matched:true}; {/*If match, update bool */}
          }
          else{
            return item
          }
        })
      })
    }

    {/*Pause with transition, reinit shape comparators for next attempted match */}
    setTimeout(() => {
      setShapeA(null)
      setShapeB(null)
    }, 500)
    }

    {/*If click amount isnt even and is greater than 0, counter++ */}
    if(clicks % 2 !== 0 && clicks !== 0){
      setCounter(counter + 1)
    }

  }, [shapeA, shapeB])

  {/*Reinit game, but not from start screen.
  Basically, set all cards to unmatched state and set all vars to 0/false/null*/}
  const restart = () => {
    
    setShapes(prevShapes => {
      return prevShapes.map(item => {
        if (item.matched) {
          return {...item, matched: false}
        }
        return item
      })
    })
    setShapeA(null)
    setShapeB(null)
    setWin(false)
    setCounter(0)
    setClicks(0)
    
    setTimeout(() => {
      start()}, 500
      )
  }
 

  return <>
    <h1>Memory Game</h1>
    <div classname = "counter">
      Attempted Pairs: {counter}
    </div>
    {win ? (
      <button className="winRestart" onClick={restart}> 
          You win! New Game?
        </button>
    ):
      shapes.length ? <>
        <button className="restart" onClick={restart}> 
          New Game
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
        Start!
        </button>
        
    }
  </>;
}

export default App;