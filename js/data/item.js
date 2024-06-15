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
                return { item: items[id], allItems: items}
            }
        }
    } catch (error) {
        console.error('Error al obtener los datos del ítem:', error);
    }
}

const getItemsToUpgrade = (item, allItems) => {
    const upgradeItems = [];
    if (item.into) {
        for (const upgradeId of item.into) {
            if (allItems[upgradeId]) {
                upgradeItems.push(allItems[upgradeId]);
            }
        }
    }
    return upgradeItems;
};


const displayItemDetails = ({ item, allItems }) => {
    const content = document.getElementById('detail-content');
    const bgImg = document.getElementById('bg-img');
    const imgSrc = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2015/02/447638-guia-league-legends-grieta-invocador.jpg?tf=1200x'
    content.innerHTML = '';

    bgImg.style.backgroundImage = `url(${imgSrc})`;

    if (item) {
        const div = document.createElement('div');
        div.classList.add('item-details');
        const imgSrc = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/${item.image.full}`;
        div.innerHTML = `
            <div class="item">
                <div>
                    <img src="${imgSrc}" alt="${item.name}" style="width:70px;height:70px;">
                    <h2>${item.name}</h2>
                </div>
                <p>${item.plaintext}</p>
                <p>${item.description}</p>
                <ul>
                    <li>Costo: ${item.gold.total} oro</li>
                    <li>Venta: ${item.gold.sell} oro</li>
                </ul>
            </div>
        `;
        
        
        const upgradeItems = getItemsToUpgrade(item, allItems);
        if (upgradeItems.length > 0) {
            const upgradeDiv = document.createElement('div');
            upgradeDiv.classList.add('upgrade-items');
            let upgradeContent = `<h3>Se puede mejorar a:</h3>`;
            upgradeItems.forEach(upgradeItem => {
                const upgradeImgSrc = `https://ddragon.leagueoflegends.com/cdn/14.12.1/img/item/${upgradeItem.image.full}`;
                upgradeContent += `
                    <div class="upgrade-items">
                        <h5>${upgradeItem.name}</h5>
                        <img src="${upgradeImgSrc}" alt="${upgradeItem.name}" style="width:70px;height:70px;">
                    </div>
                `;
            });
            upgradeDiv.innerHTML = upgradeContent;
            div.appendChild(upgradeDiv);
        }

        content.appendChild(div);
    } else {
        content.innerHTML = '<p>Item no encontrado</p>';
    }    
};


export {
    fetchItemDetails,
    displayItemDetails
}