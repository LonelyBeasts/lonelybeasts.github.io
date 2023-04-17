function openNav() {
    document.getElementById("sidebar").style.width = "150px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

function updateImgSize() {
    const Img = document.getElementById("image-content");
    const containerWidth = Img.parentElement.clientWidth;
    Img.style.width = containerWidth + "px";
    Img.style.height = containerWidth + "px";
}

window.addEventListener("resize", updateImgSize);
updateImgSize();


const images = ["Budget Chart.jpeg", "FuturesBot.jpeg", "PetCare.jpeg"];
const texts = ["Budget And Projection Calulator", "Futures Trading Bot", "Pet Care Software"];

let currentIndex = 0;
let contentInterval;

setContent();

function startContentInterval() {
    contentInterval = setInterval(changeContent, 6000);
}

function resetContentInterval() {
    clearInterval(contentInterval);
    startContentInterval();
}

function setContent() {
    const imageElement = document.getElementById("image-content");
    const textElement = document.getElementById("text-content");
    const dots = document.getElementsByClassName("dot");

    imageElement.style.opacity = 0;
    textElement.style.opacity = 0;

    setTimeout(() => {
        imageElement.src = images[currentIndex];
        textElement.innerHTML = texts[currentIndex];
        imageElement.style.opacity = 1;
        textElement.style.opacity = 1;

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        dots[currentIndex].classList.add("active");
    }, 1000); // Wait for the transition to complete
}

function scrollToRowWithOffset(element, offset) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
}

function scrollToRow() {
    const rowId = currentIndex === 0 ? 'row1' : (currentIndex === 1 ? 'row2' : 'row3');
    const rowElement = document.getElementById(rowId);
    const offset = -100;
    scrollToRowWithOffset(rowElement, offset);
}

document.getElementById("text-content").addEventListener("click", scrollToRow);

function changeContent() {
    currentIndex = (currentIndex + 1) % images.length;
    setContent();
}

function nextContent() {
    currentIndex = (currentIndex + 1) % images.length;
    setContent();
    resetContentInterval();
}

function previousContent() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setContent();
    resetContentInterval();
}

startContentInterval(); // Start the interval

const carousel = document.getElementById('carousel');

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  if (touchStartX - touchEndX > 100) { // Swipe left
    nextContent();
  } else if (touchEndX - touchStartX > 100) { // Swipe right
    previousContent();
  }
  touchStartX = 0;
  touchEndX = 0;
}

carousel.addEventListener('touchstart', handleTouchStart, false);
carousel.addEventListener('touchmove', handleTouchMove, false);
carousel.addEventListener('touchend', handleTouchEnd, false);

