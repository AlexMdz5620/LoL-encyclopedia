import { URL, urlImage } from "../config.js";

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
                // console.log(items[id])
                return { item: items[id], allItems: items}
            }
        }
    } catch (error) {
        console.error('Error al obtener los datos del ítem:', error);
    }
}

const displayItemDetails = ({ item, allItems }) => {
    const content = document.getElementById('detail-content');
    const bgImg = document.getElementById('bg-img');
    const imgSrc = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2015/02/447638-guia-league-legends-grieta-invocador.jpg?tf=1200x'
    content.innerHTML = '';

    bgImg.style.backgroundImage = `url(${imgSrc})`;

    // Sección de Tags
    let infoHTML = '<div class="item-info"><h2>Función</h2>';
    for (let tag of item.tags) {
        infoHTML += `<p><strong>${formatTagsName(tag)}</strong></p>`;
    }
    infoHTML += '</div>';

    if (item) {
        const div = document.createElement('div');
        div.classList.add('item-details');
        const imgSrc = `${urlImage}item/${item.image.full}`;
        div.innerHTML = `
            <div class="item">
                <div>
                    <img src="${imgSrc}" alt="${item.name}" style="width:70px;height:70px;">
                    <h2>${item.name}</h2>
                </div>

                ${infoHTML}
                
                <h2>Descripción</h2>
                <p>${item.plaintext}</p>

                <h2>Estadisticas</h2>
                <p>${item.description}</p>
                
                <p>Costo: ${item.gold.total} oro</p>
                <p>Venta: ${item.gold.sell} oro</p>
                
            </div>
        `;
        
        
        const upgradeItems = getItemsToUpgrade(item, allItems);
        if (upgradeItems.length > 0) {
            const upgradeDiv = document.createElement('div');
            upgradeDiv.classList.add('upgrade-items');
            let upgradeContent = `<h3>Se puede mejorar a:</h3>`;
            upgradeItems.forEach(upgradeItem => {
                const upgradeImgSrc = `${urlImage}item/${upgradeItem.image.full}`;
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

function formatTagsName(tag) {
    switch (tag) {
        case 'Boots':
            return 'Botas';
        case 'ManaRegen':
            return 'Regeneración de Maná';
        case 'HealthRegen':
            return 'Regeneración de Vida';
        case 'Health':
            return 'Vida';
        case 'CriticalStrike':
            return 'Golpe Crítico';
        case 'SpellDamage':
            return 'Daño Mágico';
        case 'Mana':
            return 'Maná';
        case 'Armor':
            return 'Armadura';
        case 'SpellBlock':
            return 'Resistencia Mágica';
        case 'LifeSteal':
            return 'Robo de Vida';
        case 'SpellVamp':
            return 'Omnivampirismo';
        case 'Jungle':
            return 'Jungla';
        case 'Damage':
            return 'Daño';
        case 'Lane':
            return 'En Línea';
        case 'AttackSpeed':
            return 'Velocidad de Ataque';
        case 'OnHit':
            return 'Efecto de Impacto';
        case 'Trinket':
            return 'Baratija';
        case 'Active':
            return 'Activa';
        case 'Consumable':
            return 'Consumible';
        case 'CooldownReduction':
            return 'Reducción de Enfriamiento';

        case 'ArmorPenetration':
            return 'Penetración de Armadura';
        case 'AbilityHaste':
            return 'Aceleración de Habilidad';
        case 'Stealth':
            return 'Sigilo';
        case 'Vision':
            return 'Visión';
        case 'NonbootsMovement':
            return 'Velocidad de Movimiento';
        case 'Tenacity':
            return 'Tenacidad';
        case 'MagicPenetration':
            return 'Penetración Mágica';
        case 'Aura':
            return 'Aura';
        case 'Slow':
            return 'Ralentización';
        case 'MagicResist':
            return 'Resistencia Mágica';
        default:
            return tag;
    }
}

export {
    fetchItemDetails,
    displayItemDetails,
    formatTagsName
}