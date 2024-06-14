import { fetchItems } from "./data/items.js";
import { fetchRunes } from "./data/runes.js";
import { fetchChampions, displayChampions, getUniqueTags } from "./data/champions.js";
import { formatTagName } from "./data/champion.js";

document.addEventListener('DOMContentLoaded', async () => {
    const selector = document.getElementById('selector');
    const content = document.getElementById('content');
    const btnFilter = document.querySelector('.container-filter-btn');
    const searchInput = document.getElementById('input-name');
    const typesSelect = document.querySelector('.typs select');
    
    const containerFilter = document.querySelector('.container-filter');

    let allChampions = [];

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

    // Función para actualizar los tags
    const updateTags = (tags) => {
        typesSelect.innerHTML = '<option value="">Selecciona un rol</option>';
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = formatTagName(tag);
            typesSelect.appendChild(option);
        });
    };

    // Función para filtrar campeones por rol
    const filterChampionsByRole = (role) => {
        const filteredChampions = allChampions.filter(champion => champion.tags.includes(role));
        displayChampions(filteredChampions);
    };

    // Cargar campeones por defecto
    await fetchChampions();
    updateSearchPlaceholder('champions');
    updateTags(getUniqueTags());
    

    selector.addEventListener('change', async () => {
        const value = selector.value;
        content.innerHTML = ''; 
        updateSearchPlaceholder(value)

        if (value === 'champions') {
            await fetchChampions();
            updateTags(getUniqueTags());
        } else if (value === 'items') {
            await fetchItems();
            typesSelect.innerHTML = '';
        } else if (value === 'runes') {
            await fetchRunes();
            typesSelect.innerHTML = '';
        }
    });

    // Evento para filtrar campeones por rol
    typesSelect.addEventListener('change', () => {
        const selectedRole = typesSelect.value;
        if (selectedRole) {
            filterChampionsByRole(selectedRole);
        } else {
            displayChampions(allChampions);
        }
    });

    // Boton para mostrar el Filtrador
    btnFilter.addEventListener('click', ()=>{
        const containerFilter = document.querySelector('.container-filter');
        containerFilter.classList.toggle('active')
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
