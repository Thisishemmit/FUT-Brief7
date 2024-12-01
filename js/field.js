const fieldPlayerCardConfig = {
  sm: { w: "60px", scale: 0.537 },
  md: { w: "80px", scale: 0.675 },
  lg: { w: "100px", scale: 0.749 },
  class: "field-player-card absolute",
};

for (let i = 0; i < 11; i++) {
  let container = document.getElementById("pitch-cards-container");
  const cardContainer = document.createElement("div");
  cardContainer.classList.add(
    "absolute",
    "w-[10%]",
    "h-[10%]",
    "field-card",
    "flex",
    "flex-col",
    "justify-center",
    "items-center"
  );
  const cardCallback = () => {
    console.log("add player to card id", i);
  };
  cardContainer.appendChild(
    createPlayerCard(fieldPlayerCardConfig, true, null, cardCallback)
  );
  let cardPosition = `
        <div class="relative lg:-top-[50%] md:-top-[60%] -top-[80%] card-prototype-position">
            
        </div>
  `;
  cardContainer.innerHTML += cardPosition;
  container.appendChild(cardContainer);
}
updateCardsPosition("4-3-3");


