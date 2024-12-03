let clickedFieldCard = null;
let fieldPlayers = JSON.parse(localStorage.getItem('fieldPlayers')) || [];
let currentFormation = localStorage.getItem('currentFormation') || '4-3-3';
const formations = [
    {
        formation: "4-4-2",
        prototype: [
            { pos: 'ST', x: 35, y: 20 },
            { pos: 'ST', x: 65, y: 20 },
            { pos: 'LM', x: 15, y: 45 },
            { pos: 'CM', x: 35, y: 50 },
            { pos: 'CM', x: 65, y: 50 },
            { pos: 'RM', x: 85, y: 45 },
            { pos: 'LB', x: 20, y: 70 },
            { pos: 'CB', x: 40, y: 75 },
            { pos: 'CB', x: 60, y: 75 },
            { pos: 'RB', x: 80, y: 70 },
            { pos: 'GK', x: 50, y: 95 }
        ],

        //represents array of indexes of players that are close to each other
        links: [
            [1, 5, 4],
            [3, 2, 0],
            [1, 0],
            [4, 5, 9, 8],
            [3, 2, 6, 7],
            [8, 10, 7],
            [3, 4, 5]
        ]

    },
    {
        formation: "4-3-3",
        prototype: [
            { pos: 'LW', x: 20, y: 30 },
            { pos: 'ST', x: 50, y: 20 },
            { pos: 'RW', x: 80, y: 30 },
            { pos: 'CM', x: 30, y: 55 },
            { pos: 'CM', x: 50, y: 50 },
            { pos: 'CM', x: 70, y: 55 },
            { pos: 'LB', x: 15, y: 70 },
            { pos: 'CB', x: 40, y: 75 },
            { pos: 'CB', x: 60, y: 75 },
            { pos: 'RB', x: 85, y: 70 },
            { pos: 'GK', x: 50, y: 95 }
        ],
        links: [
            [1, 0, 2],
            [0, 3, 1],
            [4, 3, 5],
            [5, 2, 9],
            [5, 9, 8, 4],
            [3, 4, 7, 6],
            [7, 10, 8]
        ]

    }

];

document.addEventListener('DOMContentLoaded', () => {
    const closeSubstituteButton = document.getElementById('close-substitute-modal');
    const substituteModal = document.getElementById('substitute-players');

    closeSubstituteButton.addEventListener('click', () => {
        substituteModal.classList.add('hidden');
        clickedFieldCard = null;
    });

    updateChemistryDisplay();
});






function updateCardsPosition(formationId) {
    localStorage.setItem('currentFormation', formationId);
    currentFormation = formationId;

    let cards = document.querySelectorAll('.field-card');
    let formation = formations.find(f => f.formation === formationId);

    formation.prototype.forEach((position, index) => {
        if (index < cards.length) {
            let card = cards[index];
            card.style.left = `${position.x}%`;
            card.style.top = `${position.y}%`;
            card.style.transform = 'translateY(-100%) translateX(-50%)';

            const savedPlayer = fieldPlayers.find(fp => fp.cardId === index);
            if (savedPlayer) {
                card.innerHTML = '';
                card.appendChild(
                    createPlayerCard(
                        {
                            sm: { w: "60px", scale: 0.537 },
                            md: { w: "80px", scale: 0.675 },
                            lg: { w: "100px", scale: 0.749 },
                            class: "player-card cursor-pointer",
                        },
                        false,
                        savedPlayer.player,
                        null,
                    )
                );
            } else {
                card.innerHTML = '';
                card.appendChild(createPlayerCard(fieldPlayerCardConfig, true, null, null));
            }

            card.innerHTML += `
                <div class="absolute lg:-bottom-14 md:-bottom-14 -bottom-10 card-prototype-position">
                    <span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] -translate-x-1/2 px-2 py-0.5 rounded-full shadow-sm">${position.pos}</span>
                </div>
            `;

            card.addEventListener('click', () => {
                clickedFieldCard = index;
                showSubstituteModal(position.pos);
            });
            // card.addEventListener('mouseenter', () => {
            //     console.log('node index', index);
            // });
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                clearFieldPlayer(index);
            });

        }
    });

    updateChemistryDisplay();
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'l') {
        let frmtn = formations.find(f => f.formation === currentFormation);
        let chem = calculatePlayersChemistry(frmtn, fieldPlayers);
    }
});
function showSubstituteModal(position) {
    const substituteModal = document.getElementById('substitute-players');
    const substituteDisplay = document.getElementById('substitute-players-display');

    substituteDisplay.innerHTML = '';

    let players = JSON.parse(localStorage.getItem('players')) || [];
    const substitutes = players.filter(player => player.position === position && !fieldPlayers.find(fp => fp.player.id === player.id));

    substitutes.forEach(substitute => {
        const clickCallback = () => {
            substitutePlayer(substitute);
            substituteModal.classList.add('hidden', '-z-50');
        }
        const substituteCard = createPlayerCard({
            sm: { w: "80px", scale: 0.537 },
            md: { w: "110px", scale: 0.738 },
            lg: { w: "149px", scale: 1 },
            class: "player-card cursor-pointer"
        }, false, substitute, clickCallback);

        substituteDisplay.appendChild(substituteCard);
    });

    substituteModal.classList.remove('hidden', '-z-50');
    substituteModal.classList.add('z-50');
}



function substitutePlayer(newPlayer) {
    if (clickedFieldCard !== null) {
        const card = document.querySelectorAll('.field-card')[clickedFieldCard];
        card.innerHTML = '';

        card.appendChild(
            createPlayerCard(
                {
                    sm: { w: "60px", scale: 0.537 },
                    md: { w: "80px", scale: 0.675 },
                    lg: { w: "100px", scale: 0.749 },
                    class: "player-card cursor-pointer",
                },
                false,
                newPlayer,
                null,
            )
        );

        fieldPlayers = fieldPlayers.filter(fp => fp.cardId !== clickedFieldCard);
        fieldPlayers.push({ cardId: clickedFieldCard, player: newPlayer });

        localStorage.setItem('fieldPlayers', JSON.stringify(fieldPlayers));
        updateChemistryDisplay();

        const pos = formations.find(f => f.formation === currentFormation).prototype[clickedFieldCard].pos;
        card.innerHTML += `
            <div class="absolute lg:-bottom-14 md:-bottom-14 -bottom-10 card-prototype-position">
                <span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] -translate-x-1/2 px-2 py-0.5 rounded-full shadow-sm">${pos}</span>
            </div>
        `;
    }
}

function clearFieldPlayer(cardIndex) {
    const card = document.querySelectorAll('.field-card')[cardIndex];
    card.innerHTML = '';
    card.appendChild(createPlayerCard(fieldPlayerCardConfig, true, null, null));

    const pos = formations.find(f => f.formation === currentFormation).prototype[cardIndex].pos;
    card.innerHTML += `
        <div class="absolute lg:-bottom-14 md:-bottom-14 -bottom-10 card-prototype-position">
            <span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] -translate-x-1/2 px-2 py-0.5 rounded-full shadow-sm">${pos}</span>
        </div>
    `;

    fieldPlayers = fieldPlayers.filter(fp => fp.cardId !== cardIndex);
    localStorage.setItem('fieldPlayers', JSON.stringify(fieldPlayers));
    updateChemistryDisplay();
}

function updateChemistryDisplay() {
    const chemistryDisplay = document.getElementById('pitch-chemistry');
    const formation = formations.find(f => f.formation === currentFormation);
    const currentChemistry = calculatePlayersChemistry(formation, fieldPlayers);

    const chemistryValue = chemistryDisplay.querySelector('.text-lg');
    chemistryValue.textContent = currentChemistry;
}
