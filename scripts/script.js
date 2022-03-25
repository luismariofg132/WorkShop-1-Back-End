// Importa el archivo de la base de datos
import { characters } from "../data/data.js";
// Seleccionamos los elementos del html
const cards = document.querySelector(".cards");
// Variable que contiene el número de vidas
let vidas = 3;
// Variable que contienen los puntos
let puntos = 0;
// variable que contiene el boton donde se muestra el numerod de vidas
let vidasDom = document.getElementById("vidas");
let puntosDom = document.getElementById("puntos");
// Función que se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Muestra en el html el numero de las vidas
    vidasDom.textContent = `Vidas: ${vidas}`;
    // Llama a la función que muestra las cartas
    showCards();
})

// Función que muestra las cartas
const showCards = () => {
    cards.innerHTML = '';
    // Desorneda el array de personajes
    characters.sort(() => Math.random() - 0.5);
    // Recorre el array de personajes
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

// Evento que se ejecuta al hacer click en una carta
document.addEventListener("click", ({ target }) => {
    // Si el elemento clickeado es una carta
    if (target.classList.contains('carta')) {
        let id = target.id;
        let id2 = target.alt;
        let card = document.getElementById(`${id2}`);
        let styleCard = window.getComputedStyle(card);
        // Si la carta esta en la posicion de la izquierda
        if (styleCard.transform === "none") {
            card.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                setTimeout(() => {
                    card.style.transform = 'none';
                }, 2000);
                validar(id);
            }, 500);
        }
        // Si la carta esta en la posicion de la derecha
        else {
            card.style.transform = 'none';
        }
    }
})

// Función que valida si la carta es correcta
const validar = (id) => {
    let id1Ls = localStorage.getItem('id1');
    let id2Ls = localStorage.getItem('id2');
    if (id1Ls === null) {
        localStorage.setItem('id1', id);
    } else if (id2Ls === null) {
        localStorage.setItem('id2', id);
        validar()
    } else {
        if (id1Ls === id2Ls) {
            Swal.fire('Ganaste', '', 'success');
            localStorage.clear();
            vidas++;
            puntos = puntos + 2;
            puntosDom.textContent = `Puntos: ${puntos}`;
            vidasDom.textContent = `Vidas: ${vidas}`;
            deleteCard(id1Ls);
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

const deleteCard = (id, id2) => {
    let indice1 = characters.indexOf(characters.find(item => item.id === id));
    characters.splice(indice1, 1);
    let indice2 = characters.indexOf(characters.find(item => item.id === id2));
    characters.splice(indice2, 1);
    showCards();
}