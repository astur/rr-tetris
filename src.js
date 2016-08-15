import React from 'react'
import {createStore} from 'redux'
import {connect, Provider} from 'react-redux'
window.React = React
import {render} from 'react-dom'

const cells = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,2,0,0],
    [0,2,0,0,0,0,0,2,2,2],
    [0,2,2,0,0,2,2,2,2,2],
]

function reducer(state = {cells}, action) {
    return state
}

const store = createStore(reducer)

const Tetris = React.createClass({
    render: function() {
        return (
            <div className="grid">
                {
                    ([].concat(...this.props.cells)).map((v,i,a)=>{
                        return <div className={'cell ' + ['empty' ,'full', 'active'][v]}></div>
                    })
                }
            </div>
        )
    }
})

const RTetris = connect(
    function(state){
        return state
    }
)(Tetris)

render(
  <Provider store={store}>
    <RTetris/>
  </Provider>,
  document.querySelector('#container')
)