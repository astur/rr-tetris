import React from 'react'
window.React = React
import {render} from 'react-dom'

render(
    <div className="grid">
        {
            new Array(250).fill(null).map((v,i,a)=>{
                return <div className="cell"></div>
            })
        }
    </div>,
    document.querySelector('#container')
)