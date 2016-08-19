import pieces from './pieces.js'

function reducer(state = initialState, action) {
    if ((state.position === null || state.gameOver || state.paused) && !~['STEP', 'RESTART', 'PAUSE'].indexOf(action.type)) {
        return state
    }
    function isOk(pC){
        return pC.every(v => state.cells[v[1]*10 + v[0]] !== 1) && pC.every(v => v[0] >= 0 && v[0] < 10 && v[1] < 25)
    }
    let newPosition, pieceCells, newActivePiece, newNextPiece, newNextCells
    switch (action.type) {
        case 'MOVE_LEFT':
            newPosition = state.position.map((v, i) => i === 1 ? v : v - 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            if (!isOk(pieceCells)) {
                return state
            }
            return Object.assign({}, state, {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                position: newPosition,
            })
        case 'MOVE_RIGHT':
            newPosition = state.position.map((v, i) => i === 1 ? v : v + 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            if (!isOk(pieceCells)) {
                return state
            }
            return Object.assign({}, state, {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                position: newPosition,
            })
        case 'MOVE_DOWN':
            newPosition = state.position.map((v, i) => i === 0 ? v : v + 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            if (!isOk(pieceCells)) {
                return state
            }
            return Object.assign({}, state, {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                position: newPosition,
            })
        case 'ROTATE':
            newActivePiece = pieces[state.activePiece].next
            pieceCells = pieces[newActivePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
            if (!isOk(pieceCells)) {
                return state
            }
            return Object.assign({}, state, {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                activePiece: newActivePiece,
            })
        case 'STEP':
            if (state.gameOver || state.paused) {
                return state
            }
            if (state.position === null) {
                newActivePiece = state.nextPiece === null ? Math.floor(Math.random() * (19)) : state.nextPiece
                pieceCells = pieces[newActivePiece].cells.map(v=>[v[0] + 5, v[1] + 1])
                newNextPiece = Math.floor(Math.random() * (19))
                newNextCells = pieces[newNextPiece].cells.map(v => [v[0] + 3, v[1] + 3])
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    nextCells: state.nextCells.map((v, i) => newNextCells.filter((v) => (v[1]*7 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: [5, 1],
                    activePiece: newActivePiece,
                    nextPiece: newNextPiece,
                    gameOver: !(pieceCells.filter(v => state.cells[v[1]*10 + v[0]]===1).length === 0),
                })
            }
            newPosition = state.position.map((v, i) => i === 0 ? v : v + 1)
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+newPosition[0], v[1]+newPosition[1]])
            if(isOk(pieceCells)){
                return Object.assign({}, state, {
                    cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 2 : v === 2 ? 0 : v),
                    position: newPosition,
                })
            }
            pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]])
            return Object.assign({}, state, {
                cells: state.cells.map((v, i) => pieceCells.filter((v) => (v[1]*10 + v[0] === i)).length > 0 ? 1 : v === 2 ? 0 : v),
                position: null,
            })
        case 'DROP':
            let isOK = true
            let offset = 0
            while(isOK){
                offset++
                pieceCells = pieces[state.activePiece].cells.map(v => [v[0]+state.position[0], v[1]+state.position[1]+offset])
                isOK = isOk(pieceCells)
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
            if (!state.gameOver) {
                return state
            } 
            return Object.assign({}, state, {
                cells: Array(250).fill(0),
                position: null,
                gameOver: false,
                count: 0,
            })
        case 'PAUSE':
            if (state.gameOver) {
                return state
            }
            return Object.assign({}, state, {
                paused: !state.paused,
            })
        case 'CLEAR':
            let newCells = state.cells.filter(v => v !== 3)
            return Object.assign({}, state, {
                cells: [].concat(Array(250 - newCells.length).fill(0), ...newCells),
                count: state.count + 25 - (newCells.length / 10),
            })
        case 'HILIGHT':
            let cellRows = Array(25).fill(0).map((_,i) => state.cells.slice(i*10, i*10+10))
            return Object.assign({}, state, {
                cells: [].concat(...(cellRows.map(v => v.every(v => v === 1) ? Array(10).fill(3) : v))),
            })
        default:
            return state
    }
}

module.exports = reducer