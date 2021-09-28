const Player = (playerName, playerValue) => {
    const getName = () => playerName;
    const getValue = () => playerValue

    let playingStatus = false;
    const isPlaying = () => playingStatus
    const togglePlaying = () => playingStatus = !playingStatus
    const setName = (newName) => {
        playerName = newName
    }


    return {
        getName,
        getValue,
        isPlaying,
        togglePlaying,
        setName

    }

}

const gameBoard = (() => {

    let gameArray = [];
    let displayedWinner = document.querySelector('#winner')
    const createArray = () => {

        let grid = document.querySelector('.grid')
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.index = `${i}`
            gameArray[i] = cell

            grid.appendChild(cell)
        }
    console.log(grid);


    }

    const checkWin = () => {

        let valuesArray = []
        let whoWon = ''
        gameArray.forEach(cell => {
            if (cell.children[0] === undefined) {
                return
            }
            valuesArray[gameArray.indexOf(cell)] = cell.children[0].textContent

        })

        function options(currentValue) {
            if (valuesArray[0] == `${currentValue}` && valuesArray[1] == `${currentValue}` && valuesArray[2] == `${currentValue}`) {
                return true;
            }
            else if (valuesArray[3] == `${currentValue}` && valuesArray[4] == `${currentValue}` && valuesArray[5] == `${currentValue}`) {
                return true;
            }
            else if (valuesArray[6] == `${currentValue}` && valuesArray[7] == `${currentValue}` && valuesArray[8] == `${currentValue}`) {
                return true;
            }
            else if (valuesArray[0] == `${currentValue}` && valuesArray[4] == `${currentValue}` && valuesArray[8] == `${currentValue}`) {
                return true;
            }
            else if (valuesArray[0] == `${currentValue}` && valuesArray[3] == `${currentValue}` && valuesArray[6] == `${currentValue}`) {
                return true;
            }
            else if (valuesArray[1] == `${currentValue}` && valuesArray[4] == `${currentValue}` && valuesArray[7] == `${currentValue}`) {
                return true
            }
            else if (valuesArray[2] == `${currentValue}` && valuesArray[5] == `${currentValue}` && valuesArray[8] == `${currentValue}`) {
                return true
            }
            else if (valuesArray[2] == `${currentValue}` && valuesArray[4] == `${currentValue}` && valuesArray[6] == `${currentValue}`) {
                return true
            }
            else {
                return false
            }
        }
        if (options('X')) {
            displayedWinner.textContent = 'X  Won!'
            displayedWinner.style.color = '#303f9f'

            return true;
        }
        else if (options('O')) {
            displayedWinner.textContent = 'O  Won!'
            displayedWinner.style.color = '#003049'

            return true;
            
        }

        else if (gameArray.every(isEmpty)) {
            displayedWinner.textContent = 'Draw'
            return true;
        }

        function isEmpty(cell) {
            return cell.children[0] !== undefined
        }



    }

    const resetGameBoard = () => {
        const cells = document.querySelectorAll('.cell')
        console.log(cells);

        displayedWinner.textContent = ''
        cells.forEach(cell => {
            cell.remove()
        })
        gameArray = []
        createArray()

    }




    return {
        createArray,
        checkWin,
        resetGameBoard,
        gameArray
    }






})()




const game = (() => {
    let allCells = document.querySelectorAll('.cell')
    const playerOne = Player('First', 'X')
    const playerTwo = Player('Second', 'O')
    playerOne.togglePlaying()
    gameBoard.createArray()

    const btnStart = document.querySelector('#start-button')



    const startBtn = () => {

        btnStart.addEventListener('click', beginGame, { once: true })

    }

    const beginGame = () => {

        allCells = document.querySelectorAll('.cell')
        allCells.forEach(cell => {
            cell.addEventListener('click', playerTurn, { once: true })
        })
    }




    function playerTurn(e) {

        playerOne.isPlaying() ? turnRender(e, playerOne) : turnRender(e, playerTwo);

    }



    function turnRender(event, currentPlayer) {


  

        turnUI(event, currentPlayer)

        playerOne.togglePlaying();
        playerTwo.togglePlaying();

        currentPlayer.getName() == 'First' ? changePlayingName(playerTwo.getValue()) : changePlayingName(playerOne.getValue())
        console.log(gameBoard.gameArray);

        if (gameBoard.checkWin()) {
            stopGame()

            restartGame(currentPlayer)
        }
    }

    function turnUI(event, currentPlayer){
        
        let gameElement = document.createElement('p')
        gameElement.textContent = currentPlayer.getValue()
        gameElement.classList.add('game-element')
        gameElement.textContent == 'X'? gameElement.classList.add('x'): gameElement.classList.add('o')

   
        event.target.appendChild(gameElement)
    }

    function changePlayingName(newName) {
        let nameElement = document.querySelector('#who-play')
        nameElement.textContent = newName + "'s" +  " Player turn"
        if(newName == 'X'){
            nameElement.style.color = '#303f9f'
        }
        else{
            nameElement.style.color = '#003049'
        }
      
    }


    function stopGame() {
        allCells.forEach(cell => {
            cell.removeEventListener('click', playerTurn)
        })
    }

    function restartGame(currentPlayer) {
        if (currentPlayer.getName() == 'First') {
            playerOne.togglePlaying();
            playerTwo.togglePlaying();
            changePlayingName(playerOne.getValue())
        }
        btnStart.textContent = 'restart'
        btnStart.addEventListener('click', () => {
            gameBoard.resetGameBoard();
            beginGame()

        })
    }





    return {
        startBtn
    }


})()

game.startBtn()