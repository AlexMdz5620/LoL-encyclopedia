import { URL } from "../config.js";

async function fetchItemDetails(id) {
    try {
        const res = await fetch(`${URL}/item.json`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        const items = data.data
        for(const item in items){
            if(id === item){
                return items[id]
            }
        }
    } catch (error) {
        console.error('Error al obtener los datos del ítem:', error);
    }
}


const displayItemDetails = (item) => {
    const content = document.getElementById('detail-content');
    const bgImg = document.getElementById('bg-img');
    const imgSrc = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2015/02/447638-guia-league-legends-grieta-invocador.jpg?tf=1200x'
    content.innerHTML = '';

    bgImg.style.backgroundImage = `url(${imgSrc})`;

    if (item) {
        const div = document.createElement('div');
        div.classList.add('item-details');
        const imgSrc = `https://ddragon.leagueoflegends.com/cdn/14.11.1/img/item/${item.image.full}`;
        div.innerHTML = `
            <div class="item">
                <img src="${imgSrc}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.plaintext}</p>
                <p>${item.description}</p>
                <p>Cost: ${item.gold.total} gold</p>
            </div>
        `;
        content.appendChild(div);
    } else {
        content.innerHTML = '<p>Item no encontrado</p>';
    }
};


export {
    fetchItemDetails,
    displayItemDetails
}