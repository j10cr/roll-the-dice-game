/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores,
    roundScore,
    activePlayer,
    isPlaying,
    prevRoll,
    prevRoll2,
    inputValue

function init () {
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0

    document.getElementById('dice-1').style.display = 'none'
    document.getElementById('dice-2').style.display = 'none'

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'

    document.querySelector('.player-0-panel')
        .classList
        .remove('winner')
    document.querySelector('.player-1-panel')
        .classList
        .remove('winner')
    document.querySelector('.player-0-panel')
        .classList
        .remove('active')
    document.querySelector('.player-0-panel')
        .classList
        .add('active')
    document.querySelector('.player-1-panel')
        .classList
        .remove('active')

    isPlaying = true

    prevRoll = 0
    prevRoll2 = 0
}

init()

function nextPlayer () {
    // Next player
    activePlayer = activePlayer === 0 ? 1 : 0
    roundScore = 0

    document.getElementById('current-0').textContent = roundScore
    document.getElementById('current-1').textContent = roundScore

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.getElementById('dice-1').style.display = 'none'
    document.getElementById('dice-2').style.display = 'none'

    prevRoll = 0
    prevRoll2 = 0
}

document.querySelector('.btn-roll')
    .addEventListener('click', () => {
        if (isPlaying) {
        // 1. Random number
            const dice = Math.floor(Math.random() * 6) + 1
            const dice2 = Math.floor(Math.random() * 6) + 1

            // 2. Display result
            const diceDOM = document.getElementById('dice-1')
            const diceDOM2 = document.getElementById('dice-2')
            diceDOM.style.display = 'block'
            diceDOM2.style.display = 'block'
            diceDOM.src = `dice-${dice}.png`
            diceDOM2.src = `dice-${dice2}.png`

            // 3. Update the round score IF the rolled number was NOT 1
            if ((prevRoll === 6 && dice === 6)
                || (prevRoll2 === 6 && dice2 === 6)) {
                scores[activePlayer] = 0
                document.querySelector(`#score-${activePlayer}`)
                    .textContent = scores[activePlayer]
                console.log('Double 6!')
                nextPlayer()
            } else if (dice !== 1 && dice2 !== 1) {
                // Add score
                const bothDices = dice + dice2
                roundScore += bothDices
                document.querySelector(`#current-${activePlayer}`).textContent = roundScore
            } else {
                nextPlayer()
            }
            prevRoll = dice
            prevRoll2 = dice2
        }
    })

document.querySelector('.btn-hold')
    .addEventListener('click', () => {
        if (isPlaying) {
        // Add current score to global score.
            scores[activePlayer] += roundScore

            // Update the UI
            document.querySelector(`#score-${activePlayer}`)
                .textContent = scores[activePlayer]

            inputValue = document.querySelector('.winning-score').value
            let winningScore = 0
            if (inputValue) {
                winningScore = inputValue
            } else {
                winningScore = 20
            }

            // Check if player won the game.
            if (scores[activePlayer] >= winningScore) {
                document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!'
                document.getElementById('dice-1').style.display = 'none'
                document.getElementById('dice-2').style.display = 'none'
                document.querySelector(`.player-${activePlayer}-panel`)
                    .classList
                    .add('winner')
                document.querySelector(`.player-${activePlayer}-panel`)
                    .classList
                    .remove('active')
                isPlaying = false
            } else {
            // Next player
                nextPlayer()
            }
        }
    })

document.querySelector('.btn-new')
    .addEventListener('click', init)

