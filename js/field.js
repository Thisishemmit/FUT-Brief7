const fieldPlayerCardConfig = {
  sm: { w: "60px", scale: 0.537 },
  md: { w: "80px", scale: 0.675 },
  lg: { w: "100px", scale: 0.749 },
  class: "field-player-card absolute",
};

function createEmptyFieldCard() {

  const cardContainer = document.createElement("div");
  cardContainer.classList.add(
    "absolute",
    "w-[9%]",
    "h-[9%]",
    "field-card",
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    'duration-300',
    'ease-in-out'
  );

  cardContainer.appendChild(
    createPlayerCard(fieldPlayerCardConfig, true, null, null)
  );
  let cardPosition = `
        <div class="absolute lg:-bottom-14 md:-bottom-14 -bottom-10 card-prototype-position">
            <span class="text-[11px] text-[#2C2C2C] font-semibold bg-[#ffffff80] -translate-x-1/2 px-2 py-0.5 rounded-full shadow-sm"></span>
        </div>  
  `;
  cardContainer.innerHTML += cardPosition;
  return cardContainer;
}

let container = document.getElementById("pitch-cards-container");
for (let i = 0; i < 11; i++) {
  container.appendChild(createEmptyFieldCard());

}
updateCardsPosition("4-3-3");


