import { fetchChampionDetails, displayChampionDetails } from "./data/champion.js";
import { fetchItemDetails, displayItemDetails } from "./data/item.js";
import { fetchRuneDetails, displayRuneDetails } from "./data/rune.js";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const id = urlParams.get('id');

    if (type === 'champion') {
        const championData = await fetchChampionDetails(id);
        console.log(championData);
        displayChampionDetails(championData);

    } else if (type === 'item') {
        const itemData = await fetchItemDetails(id);
        console.log(itemData);
        displayItemDetails(itemData);

    } else if (type === 'rune') {
        const runeData = await fetchRuneDetails(id);
        console.log(runeData);
        displayRuneDetails(runeData);
    }
});
