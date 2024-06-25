import { URL } from "../config.js";

const itemsUrl = `${URL}/item.json`;

let itemsKeys = []
let itemsData;

async function fetchItems() {
    try {
        const res = await fetch(itemsUrl);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        itemsData = Object.values(data.data);
        itemsKeys = Object.keys(data.data)
        displayItems(itemsData)
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayItems(data) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    for (const id in data) {
        const item = data[id];

        if(item.colloq !== '' && item.description !== '' && item.plaintext !== '' && item.inStore !== false){
            const div = document.createElement('div');
            div.classList.add('item');
            const imgSrc = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/${item.image.full}`;
            div.innerHTML = `
                <img src="${imgSrc}" alt="${item.name}">
                <h2>${item.name}</h2>
                <button onclick="window.location.href='./detailsItem.html?type=item&id=${itemsKeys[id]}'">Más información</button>
            `;
            content.appendChild(div);
        }
    };
}

const getUniqueTagsItems = () => {
    const tags = new Set();
    itemsData.forEach(item => {
        console.log(item)
        item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
};

export {
    fetchItems,
    displayItems,
    getUniqueTagsItems,
    itemsData
}