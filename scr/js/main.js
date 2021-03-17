'use strict';

//smooth scroll
function anchors() {
    const anchors = document.querySelectorAll('a[href*="#"]');
    for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        let blockID = anchor.getAttribute('href').substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    }
}

anchors();


//slider portfolio

let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll('.slide'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    wrapper = document.querySelector('.slider'),
    width = window.getComputedStyle(wrapper).width,
    slidesField = document.querySelector('.slider__wrapper');


slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

wrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

next.addEventListener('click', () => {
    if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
});

//parallax 

function parallax(event) {
    this.querySelectorAll('.parallax').forEach(layer => {
        let speed = layer.getAttribute('data-speed');
        layer.style.transform = `translateX(${event.clientX*speed/1000}px)`

    })
}

document.addEventListener('mousemove', parallax);

//scroll + back button anim
const bodyWidth = document.body.clientWidth;
console.log(bodyWidth);
if (bodyWidth > 415)  {
    console.log(true);
    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 372) {
            const photo = document.querySelector('.photo');
            photo.classList.add('photo__show');
            const descr = document.querySelectorAll('.textAnimation');
            const backbtn = document.querySelector('.backbutton');
            backbtn.classList.add('backbtn_show');
            descr.forEach(item => {
                item.classList.add('textAnimation__show');
            })
        } else if (window.pageYOffset < 372) {
            const photo = document.querySelector('.photo');
            photo.classList.remove('photo__show');
            const descr = document.querySelectorAll('.textAnimation');
            const backbtn = document.querySelector('.backbutton');
            backbtn.classList.remove('backbtn_show');
            descr.forEach(item => {
                item.classList.remove('textAnimation__show');
            })
        } 
    });
} else {
    const photo = document.querySelector('.photo');
    photo.style.opacity = "1"
            const descr = document.querySelectorAll('.textAnimation');
            const backbtn = document.querySelector('.backbutton');
            photo.style.opacity = "1"
            backbtn.classList.add('backbtn_show');
            descr.forEach(item => {
                item.style.opacity = "1"
            })
    console.log(false);
}


//animation skills cards

const cards = document.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', endRotate);
}

function startRotate(event) {
    const cardItem = this.querySelector('.skills__items-cont');
    const halfHeight = cardItem.offsetHeight / 2;
    cardItem.style.transform = 'rotateX(' + -(event.offsetY - halfHeight) / 10 + 'deg) rotateY(' + (event.offsetX - halfHeight) / 10 + 'deg)';
}

function endRotate(event) {
    const cardItem = this.querySelector('.skills__items-cont');
    cardItem.style.transform = 'rotate(0)';
}

//progress line

const progress = document.querySelector('.progress');
window.addEventListener('scroll', progressBar);

function progressBar(e) {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let per = windowScroll / windowHeight * 100;

    progress.style.width = per + '%';
}

