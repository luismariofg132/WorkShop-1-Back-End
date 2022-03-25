import { characters } from "../data/data.js";
const cards = document.querySelector(".cards");
let vidas = 3;
let vidasDom = document.getElementById("vidas");

document.addEventListener("DOMContentLoaded", () => {
    vidasDom.textContent = `Vidas: ${vidas}`;
    showCards();
})

const showCards = () => {
    cards.innerHTML = '';
    characters.sort(() => Math.random() - 0.5);
    characters.forEach(item => {
        cards.innerHTML += `
        <div class="cardBox">
            <div class="card" id=${item.id2}>
                <div class="front">
                    <img src="https://res.cloudinary.com/ddgyxfetd/image/upload/v1648220876/Back-End/image1_pzrgx7.png" class="carta" id=${item.id} alt=${item.id2} >
                </div>
                <div class="back" id=${item.id}>
                    <img src="${item.image}" class="carta" id=${item.id} alt=${item.id2}>
                </div>
            </div>
        </div>
        `
    })
}

document.addEventListener("click", ({ target }) => {
    if (target.classList.contains('carta')) {
        let id = target.id;
        let id2 = target.alt;
        let card = document.getElementById(`${id2}`);
        let styleCard = window.getComputedStyle(card);
        if (styleCard.transform === "none") {
            card.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                validar(id);
            }, 1000);
        } else {
            card.style.transform = 'none';
        }
    }
})

const validar = (id) => {
    let id1Ls = localStorage.getItem('id1');
    let id2Ls = localStorage.getItem('id2');
    if (id1Ls === null) {
        localStorage.setItem('id1', id);
    } else if (id2Ls === null) {
        localStorage.setItem('id2', id);
    } else {
        if (id1Ls === id2Ls) {
            Swal.fire('Ganaste', '', 'success');
            localStorage.clear();
            vidas++;
            vidasDom.textContent = `Vidas: ${vidas}`;
        } else {
            Swal.fire('Perdiste', '', 'error');
            localStorage.clear();
            vidas--;
            vidasDom.textContent = `Vidas: ${vidas}`;
            if (vidas === 0) {
                Swal.fire('Perdiste tus vidas', '', 'error');
                localStorage.clear();
                vidas = 3;
                vidasDom.textContent = `Vidas: ${vidas}`;
            }
        }
    }
}