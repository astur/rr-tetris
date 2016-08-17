import React from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
window.React = React
import {render} from 'react-dom'

import Tetris from './tetris-component'
import Dashboard from './dashboard-component'
import reducer from './reducer'

const store = createStore(reducer)

window.store = store //// FOR DEBUG

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

function start(){
    store.dispatch({type: 'STEP'})
    timer = setTimeout(start, 1000)
    setTimeout(() => store.dispatch({type: 'CLEAR'}), 100)
}

start()