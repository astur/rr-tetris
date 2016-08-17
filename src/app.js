import React from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
window.React = React
import {render} from 'react-dom'

import Tetris from './tetris-component'
import pieces from './pieces.js'

const initialState = {
    cells: Array(250).fill(0),
    position: null,
    activePiece: null,
    nextPiece: null,
    gameOver: false,
}

function reducer(state = initialState, action) {
    let newPosition, pieceCells, isOK, newActivePiece
    switch (action.type) {
        case 'MOVE_LEFT':
            if (state.position === null || state.gameOver === true) {
                return state
            }
            newPosition = state.position.map((v, i) => i === 1 ? v : v - 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            isOK = (
                pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                pieceCells.filter(v => v[0] < 0).length === 0
            )
            if (isOK) {
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: newPosition,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                }
            } else {
                return state
            }
        case 'MOVE_RIGHT':
            if (state.position === null || state.gameOver === true) {
                return state
            }
            newPosition = state.position.map((v, i) => i === 1 ? v : v + 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            isOK = (
                pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                pieceCells.filter(v => v[0] > 9).length === 0
            )
            if (isOK) {
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: newPosition,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                }
            } else {
                return state
            }
        case 'ROTATE':
            if (state.position === null || state.gameOver === true) {
                return state
            }
            newActivePiece = pieces[state.activePiece].next
            pieceCells = pieces[newActivePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
            isOK = (
                pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                pieceCells.filter(v => v[0] > 9 || v[0] < 0 || v[1] < 0 || v[1] > 24).length === 0
            )
            if (isOK) {
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: state.position,
                    activePiece: newActivePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                }
            } else {
                return state
            }
        case 'STEP':
            if (state.gameOver === true) {
                return state
            }
            if (state.position === null) {
                newActivePiece = state.nextPiece === null ? Math.floor(Math.random() * (19)) : state.nextPiece
                pieceCells = pieces[newActivePiece].cells.map(v=>[v[0] + 5, v[1] + 1])
                isOK = pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0
                if (!isOK) {
                    //clearInterval ...
                    alert('GAME OVER!')
                }
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: [5, 1],
                    activePiece: newActivePiece,
                    nextPiece: Math.floor(Math.random() * (19)),
                    gameOver: !isOK,
                }
            } else {
                newPosition = state.position.map((v, i) => i === 0 ? v : v + 1)
                pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
                isOK = (
                    pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                    pieceCells.filter(v => v[1] > 24).length === 0
                )
                if(isOK){
                    return {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                        position: newPosition,
                        activePiece: state.activePiece,
                        nextPiece: state.nextPiece,
                        gameOver: false,
                    }
                } else {
                    pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
                    return {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                        position: null,
                        activePiece: state.activePiece,
                        nextPiece: state.nextPiece,
                        gameOver: false,
                    }
                }
            }
        case 'DROP':
            if (state.position === null || state.gameOver === true) {
                return state
            }
            isOK = true
            let offset = 0
            while(isOK){
                offset++
                pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]+offset])
                isOK = (
                    pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                    pieceCells.filter(v => v[1] > 24).length === 0
                )
            }
            offset--
            if (offset === 0) {
                pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
            } else {
                newPosition = state.position.map((v, i) => i === 0 ? v : v + offset)
                pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            }
            return {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                position: null,
                activePiece: state.activePiece,
                nextPiece: state.nextPiece,
                gameOver: false,
            }
        case 'RESTART':
            if (state.gameOver === false) {
                return state
            } else {
                return {
                    cells: Array(250).fill(0),
                    position: null,
                    activePiece: null,
                    nextPiece: null,
                    gameOver: false,
                }
            }
        default:
            return state
    }
}

const store = createStore(reducer)

window.store = store //// FOR DEBUG

const RTetris = connect(
    function(state){
        return { cells: state.cells }
    }
)(Tetris)

render(
  <Provider store={store}>
    <RTetris/>
  </Provider>,
  document.querySelector('#container')
)

document.onkeydown = function(e) {
    const actions = {
        37: 'MOVE_LEFT', //left arrow
        39: 'MOVE_RIGHT', //right arrow
        38: 'ROTATE', //up arrow
        32: 'DROP', //space
        27: 'RESTART', //esc
    }
    let action = actions[e.keyCode]
    action && store.dispatch({type: action})
    return false
}

let timer = setInterval(()=>{
    store.dispatch({type: 'STEP'})
}, 1000)