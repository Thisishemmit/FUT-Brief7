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

function updateCardsPosition(formationId) {
    let cards = document.querySelectorAll('.field-card');
    let formation = formations.find(f => f.formation === formationId);
    
    formation.prototype.forEach((position, index) => {
        if (index < cards.length) {
            let card = cards[index];
            card.style.left = `${position.x}%`;
            card.style.top = `${position.y}%`;
            card.style.transform = 'translateY(-100%) translateX(-50%)';
            card.querySelector('.card-prototype-position').innerHTML = `
                <span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] px-2 py-0.5 rounded-full shadow-sm">${position.pos}</span>
            `
        }
    });
}
