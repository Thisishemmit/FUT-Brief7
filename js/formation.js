let selectedFormation = {
    forward: [],
    midfield: [],
    defense: [],
    goalkeeper: [],
    formation: "4-3-3"
};

const formations = [
    {
        formation: "4-4-2",
        forward: 2,
        midfield: 4,
        defense: 4,
        goalkeeper: 1,
        prototype: {
            forward: [{ pos: 'st', x: 35, y: 30 }, { pos: 'st', x: 65, y: 30 }],
            midfield: [{ pos: 'cm', x: 15, y: 45 }, { pos: 'cm', x: 35, y: 50 }, { pos: 'cm', x: 65, y: 50 }, { pos: 'cm', x: 85, y: 45 }],
            defense: [{ pos: 'cb', x: 20, y: 70 }, { pos: 'cb', x: 40, y: 75 }, { pos: 'cb', x: 60, y: 75 }, { pos: 'cb', x: 80, y: 70 }],
            goalkeeper: [{ pos: 'gk', x: 50, y: 95 }]
        }
    },
    {
        formation: "4-3-3",
        forward: 3,
        midfield: 3,
        defense: 4,
        goalkeeper: 1,
        prototype: {
            forward: [{ pos: 'st', x: 20, y: 30 }, { pos: 'st', x: 50, y: 25 }, { pos: 'st', x: 80, y: 30 }],
            midfield: [{ pos: 'cm', x: 30, y: 55 }, { pos: 'cm', x: 50, y: 50 }, { pos: 'cm', x: 70, y: 55 }],
            defense: [{ pos: 'cb', x: 20, y: 70 }, { pos: 'cb', x: 40, y: 75 }, { pos: 'cb', x: 60, y: 75 }, { pos: 'cb', x: 80, y: 70 }],
            goalkeeper: [{ pos: 'gk', x: 50, y: 95 }]
        }
    },
    {
        formation: "4-5-1",
        forward: 1,
        midfield: 5,
        defense: 4,
        goalkeeper: 1,
        prototype: {
            forward: [{ pos: 'st', x: 50, y: 30 }],
            midfield: [{ pos: 'cm', x: 20, y: 50 }, { pos: 'cm', x: 30, y: 50 }, { pos: 'cm', x: 40, y: 50 }, { pos: 'cm', x: 60, y: 50 }, { pos: 'cm', x: 70, y: 50 }],
            defense: [{ pos: 'cb', x: 20, y: 70 }, { pos: 'cb', x: 40, y: 70 }, { pos: 'cb', x: 60, y: 70 }, { pos: 'cb', x: 80, y: 70 }],
            goalkeeper: [{ pos: 'gk', x: 50, y: 95 }]
        }
    }
]


// atahtaj players o formation bash tht l players f formation
function populateFormation() {
}


function updateCardsPosition() {
    let cards = document.querySelectorAll('.player-card');
    let formationLines = Object.keys(formations.find(f => f.formation === selectedFormation.formation).prototype);
    let cardIndex = 0;
    for (let lines = 0; lines < 4; lines++) {
        const line = formationLines[lines];
        const prototypeLine = formations.find(f => f.formation === selectedFormation.formation).prototype[line];
        for (let i = 0; i < prototypeLine.length; i++) {
            const prototypePlayer = prototypeLine[i];
            let x = prototypePlayer.x;
            let y = prototypePlayer.y;
            let card = cards[cardIndex];
            card.style.left = `${x}%`;
            card.style.top = `${y}%`;
            card.style.transform = 'translateY(-100%) translateX(-50%)';
            cardIndex++;
        }
    }
}

updateCardsPosition();
