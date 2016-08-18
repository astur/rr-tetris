import pieces from './pieces.js'

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
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: newPosition,
                })
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
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: newPosition,
                })
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
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: newPosition,
                })
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
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    activePiece: newActivePiece,
                })
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
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    nextCells: state.nextCells.map((v, i) => newNextCells.filter((v) => (v[1]*7 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: [5, 1],
                    activePiece: newActivePiece,
                    nextPiece: newNextPiece,
                    gameOver: !isOK,
                })
            } else {
                newPosition = state.position.map((v, i) => i === 0 ? v : v + 1)
                pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
                isOK = (
                    pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0 &&
                    pieceCells.filter(v => v[1] > 24).length === 0
                )
                if(isOK){
                    return Object.assign({}, state, {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                        position: newPosition,
                    })
                } else {
                    pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
                    return Object.assign({}, state, {
                        cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                        position: null,
                    })
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
            return Object.assign({}, state, {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                position: null,
            })
        case 'RESTART':
            if (state.gameOver === false) {
                return state
            } else {
                return Object.assign({}, state, {
                    cells: Array(250).fill(0),
                    position: null,
                    // activePiece: null,
                    gameOver: false,
                    paused: false,
                    count: 0,
                })
            }
        case 'PAUSE':
            if (state.gameOver === true) {
                return state
            } else {
                return Object.assign({}, state, {
                    paused: !state.paused,
                })
            }
        case 'CLEAR':
            if (state.position === null || state.gameOver === true || state.paused === true) {
                return state
            } else {
                let cellRows = Array(25).fill(0).map((_,i) => state.cells.slice(i*10, i*10+10)).filter(V => !(V.every(v => v === 1)))
                let newCells = [].concat(...cellRows)
                let count = state.count + 25 - cellRows.length
                return Object.assign({}, state, {
                    cells: [].concat(Array(250 - newCells.length).fill(0), ...newCells),
                    count: count,
                })
            }
        default:
            return state
    }
}

module.exports = reducer