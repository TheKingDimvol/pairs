let openedCard = null
let cards = []
let pairsFound = 0
let timer

function flipCard(image) {
    if (image.style.visibility === 'visible') {
        image.style.visibility = 'hidden'
    } else {
        image.style.visibility = 'visible'
    }
}

function checkVictory() {
    if (pairsFound === 2) {
        pairsFound = 0
        clearInterval(timer)
    }
}

function cardClicked() {
    const image = this.firstElementChild
    
    if (image.style.visibility === 'visible') {
        return
    }
    
    flipCard(image)
    
    if (openedCard) {
        if (openedCard.firstElementChild.src === image.src) {
            openedCard.removeEventListener('click', cardClicked)
            this.removeEventListener('click', cardClicked)
            openedCard = null
            pairsFound++
            checkVictory()
            return
        }
        
        document.getElementById('field').style.pointerEvents = "none"
        setTimeout(() => {
            flipCard(openedCard.firstElementChild)
            flipCard(image)
            openedCard = null
            document.getElementById('field').style.pointerEvents = "auto"
        }, 1000)
        return
    }
    
    openedCard = this
}

function startTimer() {
    let time = 0
    timer = setInterval(() => {
        time++
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        document.getElementById('timer')
            .innerText = `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
    }, 1000)
}

function shuffle() {
    document.querySelectorAll('.card-holder').forEach(card => {
         let ramdomPos = Math.floor(Math.random() * 4)
         card.style.order = ramdomPos
    })
}

function restart() {
    clearInterval(timer)
    startTimer()
    openedCard = null
    cards.forEach(card => {
        card.firstElementChild.style.visibility = 'hidden'
        card.addEventListener('click', cardClicked)
    })
    shuffle()
}

function start() {
    startTimer()
    cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        card.addEventListener('click', cardClicked)
    })
    shuffle()
    document.getElementById('start').disabled = true
}
