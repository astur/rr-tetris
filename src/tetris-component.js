import React from 'react'

module.exports = React.createClass({
    render: function() {
        return (
            <div className="grid">
                {
                    ([].concat(...this.props.cells)).map((v,i,a)=>{
                        return <div key={i} className={'cell ' + ['empty' ,'full', 'active'][v]}></div>
                    })
                }
            </div>
        )
    }
})