import { URL } from "../config.js";

async function fetchItemDetails(id) {
    try {
        const res = await fetch(`${URL}/item.json`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data.data[id];
    } catch (error) {
        console.error('Error al obtener los datos del ítem:', error);
    }
}

function displayItemDetails(item) {
    const content = document.getElementById('detail-content');
    const imgSrc = `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${item.image.full}`;
    content.innerHTML = `
        <img src="${imgSrc}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
    `;
}


export {
    fetchItemDetails,
    displayItemDetails
}