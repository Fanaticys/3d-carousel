import Carousel from './carousel';
import "../sass/style.sass";

const obj = { radius: 250, height: 157.5, width: 252, lines: 24 };
const slideChunks = document.querySelector('.slide-chunks');
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
 
//Just for github page
class GhPageCarousel extends Carousel {
    constructor(slideChunks, rightArrow, leftArrow, { radius, height, width, lines }){
        super(slideChunks, rightArrow, leftArrow, { radius, height, width, lines });
    }

    reinit({ radius = this.radius, count = 6 }) {
        this.radius = radius;
        this.__init();
    }
}

const images = document.querySelector('.slide-chunks').querySelectorAll('img');
const carousel = new GhPageCarousel(slideChunks, rightArrow, leftArrow, obj);
reinit.addEventListener('submit', function(e){
    e.preventDefault();
    
    let count = document.forms.reinit.count.value;
    if(count > 6) count = 6;
    if(count < 1) count = 1;
    for(let i = 0; i < count; i++){
        slideChunks.appendChild(images[i]);
    }

    carousel.reinit({
        radius: document.forms.reinit.radius.value
    });
});
