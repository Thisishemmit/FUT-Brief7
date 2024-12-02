let clickedFieldCard = null;
let fieldPlayers = [];
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
});






let currentFormation;
function updateCardsPosition(formationId) {
    currentFormation = formationId
    let cards = document.querySelectorAll('.field-card');
    let formation = formations.find(f => f.formation === formationId);

    formation.prototype.forEach((position, index) => {
        if (index < cards.length) {
            let card = cards[index];
            card.style.left = `${position.x}%`;
            card.style.top = `${position.y}%`;
            card.style.transform = 'translateY(-100%) translateX(-50%)';


            card.querySelector('.card-prototype-position span').innerText = `${position.pos}`;
            card.addEventListener('click', () => {
                clickedFieldCard = index;
                showSubstituteModal(position.pos);
            });
            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                card.innerHTML = '';
                card.appendChild(
                  createPlayerCard(fieldPlayerCardConfig, true, null, null)
                );
                let cardPosition = `
                    <div class="absolute lg:-bottom-14 md:-bottom-14 -bottom-10 card-prototype-position">
                        <span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] -translate-x-1/2 px-2 py-0.5 rounded-full shadow-sm"></span>
                    </div>
                `;
                card.innerHTML += cardPosition;
                card.querySelector('.card-prototype-position span').innerText = `${position.pos}`;
                fieldPlayers = fieldPlayers.filter(fp => fp.cardId !== index);
            });
        }
    });
}

function showSubstituteModal(position) {
    const substituteModal = document.getElementById('substitute-players');
    const substituteDisplay = document.getElementById('substitute-players-display');

    substituteDisplay.innerHTML = '';

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

        fieldPlayers = fieldPlayers.filter(fp => fp.c);

        fieldPlayers.push({cardId: clickedFieldCard, player: newPlayer});

        const pos = formations.find(f => f.formation === currentFormation).prototype[clickedFieldCard].pos
        card.innerHTML += `<div class="absolute lg:-bottom-14 md:-bottom-14 -bottom-10 card-prototype-position"><span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] -translate-x-1/2 px-2 py-0.5 rounded-full shadow-sm">${pos}</span></div>`;

    }
}
