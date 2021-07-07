let openedCard = null
let cardsFound = [false, false, false, false]

const cards = document.querySelectorAll('.card')

cards.forEach(card => card.addEventListener('click', cardClicked))

function flipCard(image) {
    if (image.style.visibility === 'visible') {
        image.style.visibility = 'hidden'
    } else {
        image.style.visibility = 'visible'
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
            cardsFound[openedCard.id] = true
            cardsFound[this.id] = true
            openedCard.removeEventListener('click', cardClicked)
            this.removeEventListener('click', cardClicked)
            openedCard = null
            return
        }
        
        setTimeout(() => {
            flipCard(openedCard.firstElementChild)
            flipCard(image)
            openedCard = null
        }, 1000);
        return
    }
    
    openedCard = this
}

function shuffle() {
    document.querySelectorAll('.card-holder').forEach(card => {
         let ramdomPos = Math.floor(Math.random() * 4)
         card.style.order = ramdomPos
    })
}

shuffle()

function restart() {
    cards.forEach(card => {
        card.firstElementChild.style.visibility = 'hidden'
        card.addEventListener('click', cardClicked)
    })
    shuffle()
}
