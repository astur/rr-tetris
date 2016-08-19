import React from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
import {render} from 'react-dom'

import Tetris from './tetris-component'
import Dashboard from './dashboard-component'
import reducer from './reducer'

const initialState = {
    cells: Array(250).fill(0),
    nextCells: Array(49).fill(0),
    position: null,
    activePiece: null,
    nextPiece: null,
    gameOver: false,
    paused: false,
    count: 0,
}

const store = createStore(reducer, initialState)

const RTetris = connect(
    function(state){
        return { cells: state.cells }
    }
)(Tetris)

const RTetrisNextPiece = connect(
    function(state){
        return { cells: state.nextCells }
    }
)(Tetris)

const RDashboard = connect(
    function(state){
        return {
            count: state.count,
            paused: state.paused,
            gameOver: state.gameOver,
        }
    }
)(Dashboard)

render(
  <Provider store={store}>
    <div>
        <div className="left">
            <RTetris/>
        </div>  
        <div className="right">
            <RDashboard/>
            <RTetrisNextPiece/>
        </div>  
    </div>  
    </Provider>,
  document.querySelector('#container')
)

document.onkeydown = function(e) {
    if(e.keyCode === 32){
        clearInterval(timer)
        timer = setTimeout(start, 0)
    }
    const actions = {
        37: 'MOVE_LEFT', //left arrow
        39: 'MOVE_RIGHT', //right arrow
        40: 'MOVE_DOWN', //right arrow
        38: 'ROTATE', //up arrow
        32: 'DROP', //space
        27: 'RESTART', //esc
        80: 'PAUSE', //P - pause
    }
    let action = actions[e.keyCode]
    action && store.dispatch({type: action})
    return false
}

let timer
let delay = 1000

function start(){
    store.dispatch({type: 'STEP'})
    timer = setTimeout(start, delay)
    setTimeout(() => store.dispatch({type: 'HILIGHT'}), 50)
    setTimeout(() => store.dispatch({type: 'CLEAR'}), 150)
    delay > 300 && delay--
}

start()