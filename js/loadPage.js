function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <img src="./assets/the_Summoner's_Encyclopedia.png" alt="Loading" />
        </div>
    `;
    document.body.appendChild(loadingScreen);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.remove();
    }
}

function initializeLoadingScreen() {
    showLoadingScreen();
    setTimeout(hideLoadingScreen, 3000);
}

export { initializeLoadingScreen, showLoadingScreen, hideLoadingScreen };
