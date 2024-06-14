import { URL } from "../config.js";

const itemsUrl = `${URL}/item.json`;

let itemsKeys = []

export async function fetchItems() {
    try {
        const res = await fetch(itemsUrl);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const itemsData = Object.values(data.data);
        itemsKeys = Object.keys(data.data)
        console.log(itemsKeys)
        displayItems(itemsData)
        console.log(itemsData)

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayItems(data) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    for (const id in data) {
        const item = data[id];
        const div = document.createElement('div');
        div.classList.add('item');
        const imgSrc = `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${item.image.full}`;
        div.innerHTML = `
            <img src="${imgSrc}" alt="${item.name}">
            <h4>${item.name}</h4>
            <button onclick="window.location.href='./details.html?type=item&id=${itemsKeys[id]}'">Más información</button>
        `;
        content.appendChild(div);
    };
}
