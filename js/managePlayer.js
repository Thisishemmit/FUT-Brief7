function openEditForm(player) {
  const popup = document.getElementById("add-player-popup");
  const form = popup.querySelector("form");
  popup.classList.remove("hidden");

  popup.querySelector("h2").textContent = "Edit Player";
  popup.querySelector('button[type="submit"]').textContent = "Save Changes";

  form.querySelector("#first-name").value = player.firstName;
  form.querySelector("#last-name").value = player.lastName;
  form.querySelector("#overall-rating").value = player.rating;
  form.querySelector("#position-select").value = player.position;
  form.querySelector("#player-image").value = player.photo;
  form.querySelector("#country-image").value = player.flag;
  form.querySelector("#club-image").value = player.logo;
  form.querySelector("#country-name").value = player.nationality;
  form.querySelector("#club-name").value = player.club;

  form.querySelector("#position-select").dispatchEvent(new Event("change"));

  selectedCountryName = player.nationality;
  selectedClubName = player.club;

  let playerSkillSet =
    player.position === "GK" ? positionSkills.GK : positionSkills.ANY;
  playerSkillSet = player.skills.map((skill) => ({
    id: playerSkillSet.find((s) => s.name === skill.name).id,
    value: skill.value,
    name: skill.name,
  }));

  setTimeout(() => {
    playerSkillSet.forEach((skill) => {
      const input = form.querySelector(`[data-skill="${skill.id}"]`);
      if (input) {
        input.value = skill.value;
        updatePreviewSkill(skill.id, skill.value);
      }
    });
  }, 0);

  updatePreviewImage(player.photo);
  updatePreviewCountry(player.flag);
  updatePreviewClub(player.logo);
  updatePreviewName(player.lastName);
  updatePreviewOvr(player.rating);

  form.dataset.editMode = "true";
  form.dataset.editId = player.id;

  const oldHandler = form.onsubmit;
  form.onsubmit = null;

  form.onsubmit = function (e) {
    e.preventDefault();

    if (!validatePlayerForm(true)) {
      console.log("Form validation failed");
      return false;
    }

    const updatedPlayer = createPlayerObjectFromForm();

    let players = JSON.parse(localStorage.getItem("players")) || [];
    const index = players.findIndex((p) => p.id === parseInt(form.dataset.editId));

    if (index !== -1) {
      players[index] = updatedPlayer;
      localStorage.setItem("players", JSON.stringify(players));
      window.players = players;
      console.log("Player updated in storage");
    }

    selectPlayer(players[index]);
    displayPlayers(players);

    form.reset();
    resetPreview();
    popup.classList.add("hidden");

    popup.querySelector("h2").textContent = "Add New Player";
    popup.querySelector('button[type="submit"]').textContent = "Add Player";
    form.dataset.editMode = "false";
    delete form.dataset.editId;

    form.onsubmit = oldHandler;

    return false;
  };
}

function deletePlayer(playerId) {
  if (confirm("Are you sure you want to delete this player?")) {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    players = players.filter((p) => p.id !== parseInt(playerId));

    localStorage.setItem("players", JSON.stringify(players));
    window.players = players;

    selectedPlayer = null;
    updatePlayerDisplay();
    displayPlayers(players );
  }
}
