import React from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
window.React = React
import {render} from 'react-dom'

import Tetris from './tetris-component'
import pieces from './pieces.js'

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

function reducer(state = initialState, action) {
    let newPosition, pieceCells, isOK, newActivePiece, newNextPiece, newNextCells
    switch (action.type) {
        case 'MOVE_LEFT':
            if (state.position === null || state.gameOver === true || state.paused === true) {
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
                    nextCells: state.nextCells,
                    position: newPosition,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                    paused: false,
                    count: state.count,
                }
            } else {
                return state
            }
        case 'MOVE_RIGHT':
            if (state.position === null || state.gameOver === true || state.paused === true) {
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
                    nextCells: state.nextCells,
                    position: newPosition,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                    paused: false,
                    count: state.count,
                }
            } else {
                return state
            }
        case 'MOVE_DOWN':
            if (state.position === null || state.gameOver === true || state.paused === true) {
                return state
            }
            newPosition = state.position.map((v, i) => i === 0 ? v : v + 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            isOK = (
                pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                pieceCells.filter(v => v[1] > 24).length === 0
            )
            if (isOK) {
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    nextCells: state.nextCells,
                    position: newPosition,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                    paused: false,
                    count: state.count,
                }
            } else {
                return state
            }
        case 'ROTATE':
            if (state.position === null || state.gameOver === true || state.paused === true) {
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
                    nextCells: state.nextCells,
                    position: state.position,
                    activePiece: newActivePiece,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                    paused: false,
                    count: state.count,
                }
            } else {
                return state
            }
        case 'STEP':
            if (state.gameOver === true || state.paused === true) {
                return state
            }
            if (state.position === null) {
                newActivePiece = state.nextPiece === null ? Math.floor(Math.random() * (19)) : state.nextPiece
                pieceCells = pieces[newActivePiece].cells.map(v=>[v[0] + 5, v[1] + 1])
                newNextPiece = Math.floor(Math.random() * (19))
                newNextCells = pieces[newNextPiece].cells.map(v => [v[0] + 3, v[1] + 3])
                isOK = pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0
                if (!isOK) {
                    //clearInterval ...
                    alert('GAME OVER!')
                }
                return {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    nextCells: state.nextCells.map((v, i) => newNextCells.filter((v) => (v[1]*7 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: [5, 1],
                    activePiece: newActivePiece,
                    nextPiece: newNextPiece,
                    gameOver: !isOK,
                    paused: false,
                    count: state.count,
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
                        nextCells: state.nextCells,
                        position: newPosition,
                        activePiece: state.activePiece,
                        nextPiece: state.nextPiece,
                        gameOver: false,
                        paused: false,
                        count: state.count,
                    }
                } else {
                    pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
                    return {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                        nextCells: state.nextCells,
                        position: null,
                        activePiece: state.activePiece,
                        nextPiece: state.nextPiece,
                        gameOver: false,
                        paused: false,
                        count: state.count,
                    }
                }
            }
        case 'DROP':
            if (state.position === null || state.gameOver === true || state.paused === true) {
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
            restart()
            return {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                nextCells: state.nextCells,
                position: null,
                activePiece: state.activePiece,
                nextPiece: state.nextPiece,
                gameOver: false,
                paused: false,
                count: state.count,
            }
        case 'RESTART':
            if (state.gameOver === false) {
                return state
            } else {
                return {
                    cells: Array(250).fill(0),
                    nextCells: state.nextCells,
                    position: null,
                    activePiece: null,
                    nextPiece: state.nextPiece,
                    gameOver: false,
                    paused: false,
                    count: 0,
                }
            }
        case 'PAUSE':
            if (state.gameOver === true) {
                return state
            } else {
                return {
                    cells: state.cells,
                    nextCells: state.nextCells,
                    position: state.position,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: state.gameOver,
                    paused: !state.paused,
                    count: state.count,
                }
            }
        case 'CLEAR':
            if (state.position === null || state.gameOver === true || state.paused === true) {
                return state
            } else {
                let cellRows = Array(25).fill(0).map((_,i) => state.cells.slice(i*10, i*10+10)).filter(V => !(V.every(v => v === 1)))
                let newCells = [].concat(...cellRows)
                let count = state.count + 25 - cellRows.length
                return {
                    cells: [].concat(Array(250 - newCells.length).fill(0), ...newCells),
                    nextCells: state.nextCells,
                    position: state.position,
                    activePiece: state.activePiece,
                    nextPiece: state.nextPiece,
                    gameOver: state.gameOver,
                    paused: state.paused,
                    count: count,
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

const RTetrisNextPiece = connect(
    function(state){
        return { cells: state.nextCells }
    }
)(Tetris)

const RDashboard = connect(
    function(state){
        return { count: state.count }
    }
)(
    React.createClass({
        render: function() {
            return (
                <div className="dashboard">
                    <h1>Score: {this.props.count}</h1>
                </div>
            )
        }
    })
)

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

function restart(){
    clearInterval(timer)
    timer = setTimeout(start, 0)
}

start()