import { fetchItems } from "./data/items.js";
import { fetchRunes } from "./data/runes.js";
import { fetchChampions, displayChampions, getUniqueTags, championsData } from "./data/champions.js";
import { formatTagName } from "./data/champion.js";

document.addEventListener('DOMContentLoaded', async () => {
    const selector = document.getElementById('selector');
    const content = document.getElementById('content');
    const btnFilter = document.querySelector('.container-filter-btn');
    const searchInput = document.getElementById('input-name');
    const rolesBtn = document.getElementById('roles-btn');
    const rolesCheckboxes = document.getElementById('roles-checkboxes');
    
    const containerFilter = document.querySelector('.container-filter');

    // Función para cambiar el placeholder del buscador
    const updateSearchPlaceholder = (value) => {
        if (value === 'champions') {
            searchInput.placeholder = "Buscar Campeón";
        } else if (value === 'items') {
            searchInput.placeholder = "Buscar Item";
        } else if (value === 'runes') {
            searchInput.placeholder = "Buscar Runa";
        }
    };

    // Función para actualizar los checkboxes
    const updateCheckboxes = (tags) => {
        rolesCheckboxes.innerHTML = '';
        tags.forEach(tag => {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="checkbox" value="${tag}"> ${formatTagName(tag)}
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

    // Mostrar/Ocultar checkboxes al hacer click en el botón de roles
    rolesBtn.addEventListener('click', () => {
        rolesCheckboxes.classList.toggle('hidden');
    });

    // Evento para filtrar campeones por roles seleccionados
    rolesCheckboxes.addEventListener('change', filterChampionsByRoles);

    // Cargar campeones por defecto
    await fetchChampions();
    updateSearchPlaceholder('champions');
    updateCheckboxes(getUniqueTags());
    

    selector.addEventListener('change', async () => {
        const value = selector.value;
        content.innerHTML = ''; 
        updateSearchPlaceholder(value);

        if (value === 'champions') {
            await fetchChampions();
            updateCheckboxes(getUniqueTags());
        } else if (value === 'items') {
            await fetchItems();
            rolesCheckboxes.innerHTML = '';
        } else if (value === 'runes') {
            await fetchRunes();
            rolesCheckboxes.innerHTML = '';
        }
    });

    // Botón para mostrar el Filtrador
    btnFilter.addEventListener('click', () => {
        containerFilter.classList.toggle('active');
    });

     // Búsqueda en tiempo real
     searchInput.addEventListener('keyup', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('.champion').forEach(champion => {
            const name = champion.querySelector('h4').textContent.toLowerCase();
            const title = champion.querySelector('p').textContent.toLowerCase();
            if (name.includes(query) || title.includes(query)) {
                champion.classList.remove('hidden');
            } else {
                champion.classList.add('hidden');
            }
        });
    });

});
