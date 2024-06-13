import { URL } from "../config.js";

async function fetchRuneDetails(id) {
    try {
        const res = await fetch(`${URL}/runesReforged.json`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data.find(rune => rune.id === parseInt(id));
    } catch (error) {
        console.error('Error al obtener los datos de la runa:', error);
    }
}

function displayRuneDetails(rune) {
    const content = document.getElementById('detail-content');
    const imgSrc = `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
    content.innerHTML = `
        <img src="${imgSrc}" alt="${rune.name}">
        <h2>${rune.name}</h2>
        <p>${rune.shortDesc}</p>
        <p>${rune.longDesc}</p>
    `;
}

export {
    fetchRuneDetails,
    displayRuneDetails
}