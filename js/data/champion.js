import { URL, urlImage, urlImgChampion } from "../config.js";

async function fetchChampionDetails(id) {
    try {
        const res = await fetch(`${URL}/champion/${id}.json`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data.data[id])
        return data.data[id];
    } catch (error) {
        console.error('Error al obtener los datos del campeón:', error);
    }
}

function displayChampionDetails(champion) {
    const content = document.getElementById('detail-content');
    const bgImg = document.getElementById('bg-img');
    const imgSrc = `${urlImage}champion/${champion.image.full}`;
    const baseSkinImgSrc = `${urlImgChampion}splash/${champion.id}_0.jpg`;
    const passiveImgSrc = `${urlImage}passive/${champion.passive.image.full}`;

    bgImg.style.backgroundImage = `url(${baseSkinImgSrc})`;

    // Formateo de title para que la 1er letra de la frase sea mayúscula
    const titleChampion = champion.title;
    const changeTitle = titleChampion.charAt(0).toUpperCase() + titleChampion.slice(1);

    // Crear HTML para spells
    let spellsHTML = '';
    champion.spells.forEach((spell, index) => {
        const spellImgSrc = `${urlImage}spell/${spell.image.full}`;
        const keyToSelect = (() => {
            switch (index) {
                case 0:
                    return 'Q';
                case 1:
                    return 'W';
                case 2:
                    return 'E';
                case 3:
                    return 'R';
                default:
                    break;
            }
        })()
        
        spellsHTML += `
            <div class="card-spell">
                <h4>${spell.name}</h4>
                <p> ${keyToSelect} <p>
                <img src="${spellImgSrc}" alt="${spell.name}">
                <div class="card-spell-description">
                    <p>${spell.description}</p>
                </div>
            </div>
        `;
    });

    // Ordenar los stats a mi placer
    const statOrder = [
        'hp', 'hpperlevel', 'mp', 'mpperlevel', 'movespeed', 'attackrange', 'armor', 'armorperlevel', 
        'spellblock', 'spellblockperlevel', 'hpregen', 'hpregenperlevel', 
        'mpregen', 'mpregenperlevel', 'crit', 'critperlevel', 'attackdamage', 
        'attackdamageperlevel', 'attackspeed', 'attackspeedperlevel'
    ];
    
    // Crear HTML para stats
    let statsHTML = '';
    statOrder.forEach(stat => {
        if (champion.stats[stat] !== undefined) {
            statsHTML += `
            <div class="stat">
                <h5>${formatStatName(stat)}:</h5>
                <p>${champion.stats[stat]}</p>
            </div>
         `;
        }
    });
    
    // Crear HTML para tips
    const allyTipsHTML = champion.allytips.length === 0 ? `<li>Ningun consejo para este Campeon</li>` : champion.allytips.map(tip => `<li>${tip}</li>`).join('');
    const enemyTipsHTML = champion.allytips.length === 0 ? `<li>Ningun consejo  en contra para este Campeon</li>` : champion.enemytips.map(tip => `<li>${tip}</li>`).join('');

    // Función para obtener el HTML de los skins
    const getSkinsHTML = (skins, championId) => {
        let skinsHTML = '';
        skins.forEach((skin, index) => {
            const skinImgSrc = `${urlImgChampion}splash/${championId}_${skin.num}.jpg`;
            const skinName = index === 0 ? champion.name : skin.name;
            skinsHTML += `
                <div class="carousel-item">
                    <p>${skinName}</p>
                    <img src="${skinImgSrc}" alt="${skinName}">
                </div>
            `;
        });
        return skinsHTML;
    }

    function initializeCarousel() {
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const carousel = document.querySelector('.carousel');
        const items = document.querySelectorAll('.carousel-item');
    
        let currentIndex = 0;
    
        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }
    
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = items.length - 1;
            }
            updateCarousel();
        });
    
        nextButton.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });
    }

    // Sección de info
    let infoHTML = '<div class="champion-info"><h2>Información</h2>';
    for (let stat in champion.info) {
        infoHTML += `<p><strong>${formatStatName(stat)}:</strong> ${champion.info[stat]}</p>`;
    }
    infoHTML += '</div>';

    // Sección de partype
    const partypeHTML = `<div class="champion-partype"><h5>Tipo de Recurso</h5><p>${champion.partype === '' ? 'Ninguno' : champion.partype}</p></div>`;

    // Sección de tags
    const tagsHTML = `<div class="champion-tags"><h5>Rol</h5><p>${formatTagName(champion.tags.join(', '))}</p></div>`;
    

    content.innerHTML = `
        <div class="champion-title">
            <h1>${champion.name}</h1>
            <img src="${imgSrc}" alt="${champion.name}">
            <p>${changeTitle}</p>
            ${tagsHTML}
            ${partypeHTML}
        </div>

        <div>
            <h2>Lore:</h2>
            <p>${champion.lore}</p>
        </div>

        ${infoHTML}

        <div>
            <h2>Habilidades:</h2>
            <div class="cards-spells">
                <div class="card-spell">
                    <h4>Pasiva: <strong>${champion.passive.name}:</strong> </h4>
                    <p> Pasiva: <p>
                    <img src="${passiveImgSrc}" alt="${champion.passive.name}">
                    <div class="card-spell-description">
                        <p>${champion.passive.description}</p>
                    </div>
                </div>
                ${spellsHTML}
            </div>
        </div>

        <div class="champion-stats">
            <h2>Estadísticas</h2>
            <div class="stats">
                ${statsHTML}
            </div>
        </div>

        <div>
            <h2>Consejos al usarlo:</h2>
            <ul>
                ${allyTipsHTML}
            </ul>
            <h2>Consejos al enfrentarlo:</h2>
            <ul>
                ${enemyTipsHTML}
            </ul>
        </div>

        <div>
            <h2>Aspectos:</h2>
            <div class="carousel-container">
                <button class="carousel-button prev">❮</button>
                <div class="carousel">
                    ${getSkinsHTML(champion.skins, champion.id)}
                </div>
                <button class="carousel-button next">❯</button>
            </div>
        </div>
    `;

    // Evento para que se muestre la descripción de las habilidades
    document.querySelectorAll('.card-spell').forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('fixed');
        });
    });

    initializeCarousel()
}

// Formateo del idioma de los Stats
function formatStatName(stat) {
    switch (stat) {
        case 'hp':
            return 'HP';
        case 'hpperlevel':
            return 'HP por Nivel';
        case 'mp':
            return 'MP';
        case 'mpperlevel':
            return 'MP por Nivel';
        case 'movespeed':
            return 'Velocidad de Movimiento';
        case 'armor':
            return 'Armadura';
        case 'armorperlevel':
            return 'Armadura por Nivel';
        case 'spellblock':
            return 'Resistencia Mágica';
        case 'spellblockperlevel':
            return 'Resistencia Mágica por Nivel';
        case 'attackrange':
            return 'Rango de Ataque';
        case 'hpregen':
            return 'Regeneración de HP';
        case 'hpregenperlevel':
            return 'Regeneración de HP por Nivel';
        case 'mpregen':
            return 'Regeneración de MP';
        case 'mpregenperlevel':
            return 'Regeneración de MP por Nivel';
        case 'crit':
            return 'Críticos';
        case 'critperlevel':
            return 'Críticos por Nivel';
        case 'attackdamage':
            return 'Daño de Ataque';
        case 'attackdamageperlevel':
            return 'Daño de Ataque por Nivel';
        case 'attackspeedperlevel':
            return 'Velocidad de Ataque por Nivel';
        case 'attackspeed':
            return 'Velocidad de Ataque';
        default:
            return stat;
    }
}

// Formateo del idioma de los Tags
function formatTagName(tag) {
    switch (tag) {
        case 'Fighter':
            return 'Peleador';
        case 'Fighter, Assassin':
            return 'Peleador, Asesino';
        case 'Fighter, Tank':
            return 'Peleador, Tanque';
        case 'Fighter, Mage':
            return 'Peleador, Mago';

        case 'Mage':
            return 'Mago';
        case 'Mage, Assassin':
            return 'Mago, Asesino';
        case 'Mage, Support':
            return 'Mago, Soporte';
        case 'Mage, Marksman':
            return 'Mago, Tirador';

        case 'Assassin':
            return 'Asesino';
        case 'Assassin, Mage':
            return 'Asesino, Mago';
        case 'Assassin, Fighter':
            return 'Asesino, Peleador';
        
        case 'Marksman':
            return 'Tirador';
        case 'Marksman, Assassin':
            return 'Tirador, Asesino';
        case 'Marksman, Support':
            return 'Tirador, Soporte';
        case 'Marksman, Mage':
            return 'Tirador, Mago';
        case 'Marksman, Fighter':
            return 'Tirador, Peleador';
            
        case 'Tank':
            return 'Tanque';
        case 'Tank, Support':
            return 'Tanque, Soporte';
        case 'Tank, Mage':
            return 'Tanque, Mago';
        case 'Tank, Fighter':
            return 'Tanque, Peleador';
        
        case 'Support':
            return 'Soporte';
        case 'Support, Mage':
            return 'Soporte, Mago';
        
        default:
            return tag;
    }
}


export {
    fetchChampionDetails,
    displayChampionDetails,
    formatTagName
}