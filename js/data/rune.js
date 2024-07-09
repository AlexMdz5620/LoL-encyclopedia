import { URL, urlImgRune } from "../config.js";

// Obtener detalles de las runas
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

// Función para mostrar/ocultar la descripción
function toggleDescription(event) {
    const card = event.currentTarget;
    const cardSlotsContainer = card.closest('.card-slots-container');
    const index = parseInt(card.dataset.index);

    // Eliminar todas las descripciones visibles
    const existingDescriptions = cardSlotsContainer.querySelectorAll('.card-description-container');
    existingDescriptions.forEach(desc => desc.remove());

    // Si se hace clic en la misma tarjeta, ocultar y no mostrar de nuevo
    if (card.classList.contains('active')) {
        card.classList.remove('active');
        return;
    }

    // Eliminar clase activa de cualquier tarjeta
    cardSlotsContainer.querySelectorAll('.card-slots').forEach(c => c.classList.remove('active'));

    // Crear y mostrar la nueva descripción
    const description = document.createElement('div');
    description.classList.add('card-description-container', 'show');
    description.innerHTML = `
        <h4>${card.dataset.name}</h4>
        <p>${card.dataset.description}</p>
    `;

    // Encuentra la posición correcta para insertar la descripción
    const rowIndex = Math.floor(index / 3) * 3; // La primera tarjeta en el grupo de tres
    const rowInsertIndex = rowIndex + 2; // Insertar después del grupo de tres

    const rows = Array.from(cardSlotsContainer.children);
    if (rows[rowInsertIndex]) {
        rows[rowInsertIndex].after(description);
    } else {
        cardSlotsContainer.appendChild(description);
        description.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Añadir clase activa a la tarjeta actual
    card.classList.add('active');

}

// Mostrar detalles de las runas
function displayRuneDetails(rune) {
    const content = document.getElementById('detail-content');
    const bgImg = document.getElementById('bg-img');
    const imgSrc = 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2015/02/447638-guia-league-legends-grieta-invocador.jpg?tf=1200x';

    bgImg.style.backgroundImage = `url(${imgSrc})`;
    content.innerHTML = '';

    let slotsHTML = '<div class="card-slots-container">';
    rune.slots.forEach((slot, index) => {
        slot.runes.forEach((rune, runeIndex) => {
            const runeImgSrc = `${urlImgRune}${rune.icon}`;
            slotsHTML += `
                <div class="card-slots" data-name="${rune.name}" data-description="${rune.longDesc}" data-index="${index * 100 + runeIndex}">
                    <h4>${rune.name}</h4>
                    <img src="${runeImgSrc}" alt="${rune.name}">
                </div>
            `;
        });
    });
    slotsHTML += '</div>';

    const imgRune = `${urlImgRune}${rune.icon}`;
    content.innerHTML = `
        <img src="${imgRune}" alt="${rune.name}">
        <h2>${rune.name}</h2>
        <div>${slotsHTML}</div>
    `;

    // Añadir el evento click a cada tarjeta
    document.querySelectorAll('.card-slots').forEach(card => {
        card.addEventListener('click', toggleDescription);
    });
}

export {
    fetchRuneDetails,
    displayRuneDetails
};
