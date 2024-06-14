import { URL } from "../config.js";

const runesUrl = `${URL}/runesReforged.json`;

export async function fetchRunes() {
    try {
        const response = await fetch(runesUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const runesData = await response.json();
        displayRunes(runesData);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayRunes(data) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    data.forEach(rune => {
        const div = document.createElement('div');
        div.classList.add('rune');
        const imgSrc = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
        div.innerHTML = `
            <img src="${imgSrc}" alt="${rune.name}">
            <h2>${rune.name}</h2>
            <button onclick="window.location.href='./details.html?type=rune&id=${rune.id}'">Más información</button>
        `;
        content.appendChild(div);
    });
}
