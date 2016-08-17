import React from 'react'

module.exports = React.createClass({
    render: function() {
        return (
            <div className="dashboard">
                <h1>{this.props.gameOver ? 'Game over!' : ''}</h1>
                <h1>{this.props.paused ? 'PAUSE' : ''}</h1>
                <h1>Score: {this.props.count}</h1>
            </div>
        )
    }
})