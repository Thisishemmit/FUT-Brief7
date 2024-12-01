function createPlayerCard(config = { sm: { w: "80px", scale: 0.537 }, md: { w: "110px", scale: 0.738 }, lg: { w: "149px", scale: 1 }, class: "player-card" }, empty = false, player = null, emptyButCallback = null) {
    const card = document.createElement("div");
    card.className = `${config.class} w-[${config.sm.w}] md:w-[${config.md.w}] lg:w-[${config.lg.w}] h-[calc(${config.sm.w}px*208/149)] md:h-[calc(${config.md.w}px*208/149)] lg:h-[calc(${config.lg.w}px*208/149)] relative flex justify-center items-center`;
    card.dataset.id = player?.id;
    let lastName = '';
    if (player) {
        lastName = player.name.split(' ');
        lastName = lastName[lastName.length - 1];
    }

    card.innerHTML = `
        <div class="w-[149px] h-[208px] relative scale-[${config.sm.scale}] md:scale-[${config.md.scale}] lg:scale-[${config.lg.scale}] flex-shrink-0">
            <img src="assets/badge_gold.webp" alt="" class="w-full h-full">
            <div class="card-details absolute w-full h-full top-0">
            </div>
        </div>
    `;

    if (empty) {
        card.querySelector('.card-details').innerHTML = `
            <button class="w-1/2 aspect-square absolute top-1/2 md:hidden left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3C3C3C] border-2 border-[#ffffff10] rounded-full text-white flex justify-center items-center hover:bg-[#4C4C4C] transition-colors">
                <span class="material-symbols-outlined text-3xl">
                    add
                </span>
            </button>
        `;
        card.querySelector('button').addEventListener('click', emptyButCallback);
    } else {
        card.querySelector('.card-details').innerHTML = `
                <div class="flex flex-col w-fit items-center absolute top-12 left-5 -space-y-2">
                    <span class="text-xl font-black text-[#393218]">${player.rating}</span>
                    <span class="text-sm font-bold text-[#393218]">${player.position}</span>
                </div>
                <div class="flex flex-col w-24 absolute left-1/2 -translate-x-1/2 top-9">
                    <img src="${player.photo}" alt="${lastName}" class="w-full">
                </div>
                <div class="text-[#393218] font-bold absolute bottom-[54px] left-1/2 -translate-x-1/2">
                    ${lastName}
                </div>
                <div class="w-28 flex absolute left-1/2 -translate-x-1/2 bottom-7 leading-3 h-10 justify-between">
                    ${player.skills.map(skill => `
                        <div class="flex flex-col items-center justify-center -space-y-0.5">
                            <span class="text-[8px] font-bold text-[#393218]">${skill.name.substring(0, 3).toUpperCase()}</span>
                            <span class="text-[11px] font-black text-[#393218]">${skill.value}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="absolute bottom-[22px] left-1/2 -translate-x-1/2 flex gap-1 justify-center items-center">
                    <div class="w-3">
                        <img src="${player.flag}" alt="${player.nationality}" class="w-full">
                    </div>
                    <span class="w-3 h-3">
                        <img src="${player.logo}" alt="${player.club}" class="w-full">
                    </span>
                </div>
            `;
    }
    return card;
}


