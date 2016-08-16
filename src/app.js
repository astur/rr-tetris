import React from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
window.React = React
import {render} from 'react-dom'

import Tetris from './tetris-component'

const initialState = {
    cells: Array(25).fill(0).map(()=>Array(10).fill(0)),
    position: null,
    activePiece: null,
    nextPiece: null,
}

function reducer(state = initialState, action) {
    return state
}

const store = createStore(reducer)

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