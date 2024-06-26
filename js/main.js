import { fetchChampions, displayChampions, getUniqueTagsChampions, championsData } from "./data/champions.js";
import { fetchItems, displayItems, getUniqueTagsItems, itemsData, itemsKeys } from "./data/items.js";
import { fetchRunes } from "./data/runes.js";
import { formatTagName } from "./data/champion.js";

document.addEventListener('DOMContentLoaded', async () => {
    const selector = document.getElementById('selector');
    const content = document.getElementById('content');
    const btnFilter = document.querySelector('.container-filter-btn');
    const closeBtn = document.querySelector('.close-btn');
    const searchInput = document.getElementById('input-name');
    const search = document.getElementById('search');
    const rolesBtn = document.getElementById('roles-btn');
    const rolesCheckboxes = document.getElementById('roles-checkboxes');
    const containerFilter = document.querySelector('.container-filter');

    // Función para cambiar el placeholder del buscador
    const updateSearchPlaceholder = (value) => {
        if (value === 'champions') {
            searchInput.placeholder = "Buscar Campeón";
            search.style.display = 'block';
            searchInput.style.display = 'block';
            rolesBtn.style.display = 'block';
            rolesBtn.innerText = 'Filtrar por Rol';
        } else if (value === 'items') {
            searchInput.placeholder = "Buscar Item";
            search.style.display = 'block';
            searchInput.style.display = 'block';
            rolesBtn.style.display = 'block';
            rolesBtn.innerText = 'Filtrar por Función';
        } else if (value === 'runes') {
            search.style.display = 'none';
            searchInput.style.display = 'none';
            rolesBtn.style.display = 'none';
        }
    };

    // Función para actualizar los checkboxes campeones
    const updateCheckboxesChampions = (tags) => {
        rolesCheckboxes.innerHTML = '';
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" value="${tag}"> ${formatTagName(tag)}
            `;
            rolesCheckboxes.appendChild(label);
        });
    };

    // Función para actualizar los checkboxes items
    const updateCheckboxesItems = (tags) => {
        rolesCheckboxes.innerHTML = '';
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" value="${tag}"> ${tag}
            `;
            rolesCheckboxes.appendChild(label);
        });
    };

    // Función para filtrar campeones por roles seleccionados
    const filterChampionsByRoles = () => {
        const checkedRoles = Array.from(rolesCheckboxes.querySelectorAll('input:checked')).map(input => input.value);

        if (checkedRoles.length > 2) {
            content.innerHTML = '<p>No existe campeones con más de tres roles.</p>';
            return;
        }

        if (checkedRoles.length > 0) {
            const filteredChampions = championsData.filter(champion => checkedRoles.some(role => champion.tags.includes(role)));
            displayChampions(filteredChampions);
        } else {
            displayChampions(championsData);
        }
    };

    // Función para filtrar items por función del mismo
const filterItemsByFunction = () => {
    const checkedRoles = Array.from(rolesCheckboxes.querySelectorAll('input:checked')).map(input => input.value);

    if (checkedRoles.length > 0) {
        const filteredItems = itemsData.filter(item => checkedRoles.some(role => item.tags.includes(role)));
        const filteredKeys = itemsKeys.filter((key, index) => filteredItems.includes(itemsData[index]));
        displayItems(filteredItems, filteredKeys);
    } else {
        displayItems(itemsData, itemsKeys);
    }
};

    // Mostrar/Ocultar checkboxes al hacer click en el botón de roles
    rolesBtn.addEventListener('click', () => {
        rolesCheckboxes.classList.toggle('hidden');
    });

    // Evento para filtrar campeones por roles seleccionados
    rolesCheckboxes.addEventListener('change', () => {
        const value = selector.value;
        if (value === 'champions') {
            filterChampionsByRoles();
        } else if (value === 'items') {
            filterItemsByFunction();
        }
    });

    // Cargar campeones por defecto
    await fetchChampions();
    updateSearchPlaceholder('champions');
    updateCheckboxesChampions(getUniqueTagsChampions());

    selector.addEventListener('change', async () => {
        const value = selector.value;
        content.innerHTML = ''; 
        updateSearchPlaceholder(value);

        if (value === 'champions') {
            await fetchChampions();
            updateCheckboxesChampions(getUniqueTagsChampions());
        } else if (value === 'items') {
            await fetchItems();
            updateCheckboxesItems(getUniqueTagsItems());
        } else if (value === 'runes') {
            await fetchRunes();
        }
    });

    // Botón para mostrar el Filtrador
    btnFilter.addEventListener('click', () => {
        containerFilter.classList.toggle('active');
    });

    // Botón para cerrar el Filtrador
    closeBtn.addEventListener('click', () => {
        containerFilter.classList.remove('active');
    });

    // Búsqueda en tiempo real
    searchInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        const value = selector.value;

        if (value === 'champions') {
            document.querySelectorAll('.champion').forEach(champion => {
                const name = champion.querySelector('h4').textContent.toLowerCase();
                const title = champion.querySelector('p').textContent.toLowerCase();
                if (name.includes(query) || title.includes(query)) {
                    champion.classList.remove('hidden');
                } else {
                    champion.classList.add('hidden');
                }
            });
        } else if (value === 'items') {
            document.querySelectorAll('.item').forEach(item => {
                const name = item.querySelector('h2').textContent.toLowerCase();
                if (name.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    });
});
