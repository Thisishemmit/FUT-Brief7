let selectedFormation = {
    formation: "4-3-3",
    prototype: []
};

const formations = [
    {
        formation: "4-4-2",
        prototype: [
            { pos: 'ST', x: 35, y: 30 },
            { pos: 'ST', x: 65, y: 30 },
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
            { pos: 'ST', x: 50, y: 25 },
            { pos: 'RW', x: 80, y: 30 },
            { pos: 'CM', x: 30, y: 55 },
            { pos: 'CM', x: 50, y: 50 },
            { pos: 'CM', x: 70, y: 55 },
            { pos: 'LB', x: 20, y: 70 },
            { pos: 'CB', x: 40, y: 75 },
            { pos: 'CB', x: 60, y: 75 },
            { pos: 'RB', x: 80, y: 70 },
            { pos: 'GK', x: 50, y: 95 }
        ]
    },
    {
        formation: "4-5-1",
        prototype: [
            { pos: 'ST', x: 50, y: 30 },
            { pos: 'LM', x: 20, y: 50 },
            { pos: 'CM', x: 35, y: 50 },
            { pos: 'CM', x: 50, y: 45 },
            { pos: 'CM', x: 65, y: 50 },
            { pos: 'RM', x: 80, y: 50 },
            { pos: 'LB', x: 20, y: 70 },
            { pos: 'CB', x: 40, y: 75 },
            { pos: 'CB', x: 60, y: 75 },
            { pos: 'RB', x: 80, y: 70 },
            { pos: 'GK', x: 50, y: 95 }
        ]
    }
];

function updateCardsPosition() {
    let cards = document.querySelectorAll('.player-card');
    let formation = formations.find(f => f.formation === selectedFormation.formation);
    
    formation.prototype.forEach((position, index) => {
        if (index < cards.length) {
            let card = cards[index];
            card.style.left = `${position.x}%`;
            card.style.top = `${position.y}%`;
            card.style.transform = 'translateY(-100%) translateX(-50%)';
        }
    });
}

updateCardsPosition();
