import "../sass/carousel.sass";

export default class Carousel {

    constructor(slideChunks, rightArrow, leftArrow, { radius, height, width, lines }) {
        Object.assign(this, {radius, height, width, lines, slideChunks, rightArrow, leftArrow});
        this.__init();
    } 

    __init() {
        this.slides = this.slideChunks.querySelectorAll('img');
        this.length = 2 * Math.PI * this.radius;
        this.chunkWidth = this.width / this.lines;
        this.degInPx = 360 / this.length;
        this.spaceInPx = this.length / this.slides.length;

        while (this.slideChunks.firstChild) {
            this.slideChunks.removeChild(this.slideChunks.firstChild);
        }

        this.slides.forEach((slide, j) => {
            const imageName = slide.src.replace(/^.*[\\\/]/, '');
            for (let i = 0; i < this.lines; i++) {
                const deg = this.degInPx * (i * this.chunkWidth - (this.width - this.chunkWidth) / 2 + j * this.spaceInPx);
                const chunk = document.createElement('div');
                chunk.classList = `slide-chunk sc-${i}`;
                chunk.style.height = `${this.height}px`;
                chunk.style.width = `${this.chunkWidth}px`;
                chunk.style.backgroundImage = `url(./img/${imageName})`;
                chunk.style.backgroundPosition = `${-this.chunkWidth * i}px 0`;
                chunk.style.transform = `rotateY(${deg}deg) translateZ(${this.radius}px)`;
                chunk.dataset.deg = deg;
                this.slideChunks.appendChild(chunk);
            }
        });

        this.__initArrows();
    }

    __initArrows(){
        const chunks = this.slideChunks.querySelectorAll('.slide-chunk');
        const k = 360 / this.slides.length;

        this.rightArrow.addEventListener('click', () => {
            chunks.forEach((chunk) => {
                const chunkDeg = chunk.dataset.deg;
                const deg = parseFloat(chunkDeg) + k;
                chunk.style.transform = `rotateY(${deg}deg) translateZ(${this.radius}px)`;
                chunk.dataset.deg = deg;
            });
        });
        this.leftArrow.addEventListener('click', () => {
            chunks.forEach((chunk) => {
                const chunkDeg = chunk.dataset.deg;
                const deg = parseFloat(chunkDeg) - k;
                chunk.style.transform = `rotateY(${deg}deg) translateZ(${this.radius}px)`;
                chunk.dataset.deg = deg;
            });
        });
    }

}