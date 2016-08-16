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
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'MOVE_LEFT':
            // magic
            return state
        case 'MOVE_RIGHT':
            // magic
            return state
        case 'ROTATE':
            // magic
            return state
        case 'STEP':
            if (state.position === null) {
                let activePiece = state.nextPiece === null ? Math.floor(Math.random() * (19)) : state.nextPiece
                let pieceCells = pieces[activePiece].cells.map(v=>[v[0] + 5, v[1] + 1])
                let isOK = pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0
                if (!isOK) {
                    //clearInterval ...
                    alert('GAME OVER!')
                }
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: [5, 1],
                    activePiece: activePiece,
                    nextPiece: Math.floor(Math.random() * (19)),
                }
            } else {
                let newPosition = state.position.map((v, i) => i === 0 ? v : v + 1)
                let pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
                let isOK = (
                    pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                    pieceCells.filter(v => v[1] > 24).length === 0
                )
                if(isOK){
                    return {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                        position: newPosition,
                        activePiece: state.activePiece,
                        nextPiece: state.nextPiece,
                    }
                } else {
                    let pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
                    return {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                        position: null,
                        activePiece: state.activePiece,
                        nextPiece: state.nextPiece
                    }
                }
            }
        case 'DROP':
            // magic
            return state
        case 'RESTART':
            // magic
            return state
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