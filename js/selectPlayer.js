let selectedPlayer = null;

function initializePlayerSelection() {

    updatePlayerDisplay();
}

function selectPlayer(player) {
    selectedPlayer = player;
    updatePlayerDisplay();
}

function updatePlayerDisplay() {
    const playerDisplay = document.querySelector('#selected-player-display');
    
    if (!selectedPlayer) {
        playerDisplay.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="assets/avatar.png" alt="No player" class="w-28 h-28 object-cover">
                <span class="text-[#A2A2A2] font-semibold text-2xl">No<br>player<br>selected</span>
            </div>
        `;
    } else {
        playerDisplay.innerHTML = '';
              
        const cardConfig = {
            sm: { w: "100px", scale: 0.7 },
            md: { w: "120px", scale: 0.9 },
            lg: { w: "149px", scale: 1.1 },
            class: "player-card"
        };
        
        const playerCard = createPlayerCard(cardConfig, false, selectedPlayer, null, false);
        playerDisplay.appendChild(playerCard);
        
        // name and actions section
        const nameSection = document.createElement('div');
        nameSection.className = 'flex-grow pl-4 md:pl-6 lg:pl-8';
        nameSection.innerHTML = `
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[0.9]">
                ${selectedPlayer.name.split(' ').join('<br/>')}
            </h1>
            <div class="flex gap-3 md:gap-4 lg:gap-5 pt-3 md:pt-4 lg:pt-5">
                <button class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#3C3C3C] border-2 border-[#ffffff10] rounded-full text-white flex justify-center items-center hover:bg-[#4C4C4C] transition-colors">
                    <span class="material-symbols-outlined text-xl md:text-2xl lg:text-3xl">
                        edit_square
                    </span>
                </button>
                <button class="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#FA3113] border-2 border-[#ffffff10] rounded-full text-white flex justify-center items-center hover:bg-[#FF4124] transition-colors">
                    <span class="material-symbols-outlined text-xl md:text-2xl lg:text-3xl">
                        delete
                    </span>
                </button>
            </div>
        `;
        
        playerDisplay.appendChild(nameSection);
    }
}


document.addEventListener('DOMContentLoaded', initializePlayerSelection); 