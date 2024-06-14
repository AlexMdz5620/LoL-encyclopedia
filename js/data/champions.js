import { URL } from "../config.js";
import { formatTagName } from "./champion.js";

const championsUrl = `${URL}/champion.json`;

let championsData = []

export const fetchChampions = async () => {
    try {
        const res = await fetch(championsUrl);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        championsData = Object.values(data.data)
        displayChampions(championsData);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

export function displayChampions(champions) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    for (const champ in champions) {
        const champion = champions[champ];
        const titleChampion = champion.title;
        const changeTitle = titleChampion.charAt(0).toUpperCase() + titleChampion.slice(1);

        const div = document.createElement('div');
        div.classList.add('champion');
        const imgSrc = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
        div.innerHTML = `
            <img src="${imgSrc}" alt="${champion.name}">
            <h2>${champion.name}</h2>
            <h4>${changeTitle}</h4>
            <p>${formatTagName(champion.tags.join(', '))}</p>
            <button onclick="window.location.href='./details.html?type=champion&id=${champion.id}'">Más información</button>
        `;
        content.appendChild(div);
    }
}

export const getUniqueTags = () => {
    const tags = new Set();
    championsData.forEach(champion => {
        champion.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
};
