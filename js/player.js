let players = [];

async function loadPlayers() {
    try {
        const response = await fetch('assets/players.json');
        if (!response.ok) {
            throw new Error('Failed to load players data');
        }
        const data = await response.json();
        players = data.players;
        
        displayPlayers();
    } catch (error) {
        console.error('Error loading players:', error);
    }
}

function displayPlayers() {
    const playersContainer = document.getElementById('players');
    const playerListCardConfig = { sm: { w: "80px", scale: 0.537 }, md: { w: "110px", scale: 0.738 }, lg: { w: "149px", scale: 1 }, class: "player-card" };
    
    playersContainer.innerHTML = '';
    
    playersContainer.innerHTML = `
        <div class="w-[80px] md:w-[110px] lg:w-[149px] aspect-[149/208]">
            <div id="add-player-to-list" class="w-full h-full relative player-card cursor-pointer">
                <button class="w-1/2 aspect-square absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3C3C3C] border-2 border-[#ffffff10] rounded-full text-white flex justify-center items-center hover:bg-[#4C4C4C] transition-colors">
                    <span class="material-symbols-outlined text-3xl">
                        add
                    </span>
                </button>
            </div>
        </div>
    `;

    // Add event listener after creating the button
    const addPlayerButton = document.querySelector("#add-player-to-list");
    const addPlayerPopup = document.getElementById("add-player-popup");
    
    addPlayerButton.addEventListener("click", () => {
        addPlayerPopup.classList.remove("hidden");
    });

    players.forEach(player => {
        playersContainer.appendChild(createPlayerCard(playerListCardConfig, false, player));
    });
}

// Load players when the document is ready
document.addEventListener('DOMContentLoaded', loadPlayers); 





function createPlayerObjectFromForm() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const position = document.getElementById("position-select").value;

    const skillInputs = document.querySelectorAll('#skills-inputs input');
    const skills = [];
    skillInputs.forEach((input) => {
        const skillId = input.dataset.skill;

        const skillName = positionSkills.GK.concat(positionSkills.ANY).find(
            (skill) => skill.id === skillId
        ).name;

        const skill = {
            id: skillId,
            name: skillName,
            value: parseInt(input.value) || 0,
        }

        skills.push(skill);
    });


    const overallRating = document.getElementById("overall-rating").value;

    return {
        id: Date.now(),
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        position,
        skills,
        overall: overallRating,
        nationality: selectedCountryName,
        flag: document.getElementById("preview-country").querySelector("img").src,
        club: selectedClubName,
        logo: document.getElementById("preview-club").querySelector("img").src,
        photo: document.getElementById("preview-img").src || null,
    };
}