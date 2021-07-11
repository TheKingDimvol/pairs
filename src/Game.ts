export class Game {
    protected _time: number = 15;
    protected _timer: number;
    protected _field: HTMLElement;
    protected _score: number = 0;
    protected _pairs: number = 0;
    protected _pairsFound: number = 0;
    protected _cards: Element[];
    protected _openedCard: HTMLElement | null;


	constructor (pairs: number) {
        this._field = document.getElementById('field') as HTMLElement;
        this._pairs = pairs;
        this._cards = this._fillField(pairs);

        this._field.style.pointerEvents = "none";
    }

    protected _fillField(count: number): HTMLElement[] {
        let cards: HTMLElement[] = []

        for (let i = 0; i < count*2; i++) {         
            const card = this._createCard(Math.floor(i / 2));
            card.addEventListener('click', this._cardClicked.bind(this));
            cards.push(card);
        }
        
        this._shuffle();
        return cards;
    }
    
    protected _createCard(index: number): HTMLElement {
        // cardHolder - класс, в котором лежит карточка, нужно чтобы рассчитывать ширину
        const cardHolder: HTMLElement = document.createElement('div');
        cardHolder.className = 'card-holder';

        cardHolder.style.width = `${Math.floor(100 / this._pairs) - 5}%`;
        
        // card - класс самой карточки
        const card: HTMLElement = document.createElement('div');
        card.className = 'card';
        
        // Определяем какое изображение будет у карточки
        const image = imageArray[Math.floor(index % imageArray.length)];
        
        const img: Element = document.createElement('img');
        img.setAttribute('src', image.src);
        img.setAttribute('alt', image.alt);
        
        card.appendChild(img);
        cardHolder.appendChild(card);
        this._field.appendChild(cardHolder);
        
        return card;
    }

    protected _cardClicked(e: Event): void {
        const card: HTMLElement = e.target as HTMLElement;
        
        const image: HTMLImageElement = card.firstElementChild as HTMLImageElement;
    
        if (image.style.visibility === 'visible') {
            return;
        }
            
        card.classList.add('rotateAnimation');
        this._flipCard(image);

        if (this._openedCard) {
            const openedImage: HTMLImageElement = this._openedCard.firstElementChild as HTMLImageElement;
            if (openedImage.alt === image.alt) {
                this._changeScore(10 * (this._pairs - 1));
                this._openedCard.removeEventListener('click', this._cardClicked);
                card.removeEventListener('click', this._cardClicked);
                this._openedCard.style.backgroundColor = 'rgb(0, 160, 0)';
                card.style.backgroundColor = 'rgb(0, 160, 0)';

                this._openedCard = null;
                this._pairsFound++;

                if (this._pairsFound === this._pairs) {
                    setTimeout(() => {
                        this._nextLevel();
                    }, 600);
                }

                return;
            }
            
            this._field.style.pointerEvents = "none";
            setTimeout(() => {
                this._changeScore(-2);
                card.classList.remove('rotateAnimation');
                this._openedCard.classList.remove('rotateAnimation');
                this._flipCard(this._openedCard.firstElementChild as HTMLElement);
                this._flipCard(image);
                this._openedCard = null;
                if (this._time !== 0) this._field.style.pointerEvents = "auto";
            }, 600)
            return;
        }
        
        this._openedCard = e.target as HTMLElement;
    }

    protected _flipCard(image: HTMLElement): void {
        if (image.style.visibility === 'visible') {
            image.style.visibility = 'hidden';
        } else {
            image.style.visibility = 'visible';
        }
    }

    protected _shuffle(): void {
        document.querySelectorAll('.card-holder').forEach(cardHolder => {
            const card = cardHolder as HTMLElement;
            const ramdomPos = Math.floor(Math.random() * (this._pairs * 2));
            card.style.order = `${ramdomPos}`;
        })
    }

    protected _changeScore(points: number): void {
        this._score += points;
        document.getElementById('score').innerHTML = `${this._score}`;
    }
    
    protected _startTimer(): void {
        this._timer = setInterval(() => {
            if (this._time === 0) {
                clearInterval(this._timer);
                alert(`Время вышло!\nВы дошли до ${this._pairs - 1} уровня.\nВаш счёт: ${this._score}`);
                this._field.style.pointerEvents = "none";
                return;
            }

            this._time--;
            let minutes = Math.floor(this._time / 60);
            let seconds = this._time % 60;
            document.getElementById('timer')
                .innerText = `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
        }, 1000);
    }
    
    protected _nextLevel(): void {
        this._cards.forEach(card => {
            card.parentElement.remove();
        });
        this._pairs++;
        this._pairsFound = 0;
        this._cards = this._fillField(this._pairs);
    }

    start(): void {
        this._startTimer();
        this._field.style.pointerEvents = "auto";
    }

    restart(): void {
        this._field.style.pointerEvents = "none";
        clearInterval(this._timer);
        document.getElementById('timer').innerText = `00:00`;
        document.getElementById('score').innerText = `0`;
        this._cards.forEach(card => {
            card.parentElement.remove();
        });
        this._score = 0;
        this._time = 10;
        this._pairs = 2;
        this._pairsFound = 0;
        this._openedCard = null;
        this._cards = this._fillField(this._pairs);
    }
}

interface Image {
    src: string;
    alt: string;
}

const imageArray: Image[] = [
    {src: "https://img.icons8.com/fluent/48/000000/finn.png", alt: "Finn"},
    {src: "https://img.icons8.com/fluent/48/000000/jake.png", alt: "Jake"},
    {src: "https://img.icons8.com/fluent/48/000000/ice-king.png", alt: "Ice King"},
    {src: "https://img.icons8.com/fluent/48/000000/princess-bubblegum.png", alt: "Princess Bubblegum"}
]