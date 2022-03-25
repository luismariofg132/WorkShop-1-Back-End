import { characters } from "../data/data.js";
// import { showCards } from "../scripts/showCards.js";
const cards = document.querySelector(".cards");

document.addEventListener("DOMContentLoaded", () => {
    showCards();
})

const showCards = () => {
    cards.innerHTML = '';
    characters.sort(() => Math.random() - 0.5);
    characters.forEach(item => {
        cards.innerHTML += `
        <div class="cardBox">
            <div class="card">
                <div class="front">
                    <img src="https://res.cloudinary.com/ddgyxfetd/image/upload/v1648220876/Back-End/image1_pzrgx7.png" class="carta" id=${item.id}>
                </div>
                <div class="back" id=${item.id}>
                    <img src="${item.image}" alt="">
                </div>
            </div>
        </div>
        `
    })
}



document.addEventListener("click", ({ target }) => {
    if (target.classList.contains('carta')) {
        let id = target.id;
        const card = document.querySelectorAll(".card");
        card.style.transform = "rotateY(180deg)";
    }
})