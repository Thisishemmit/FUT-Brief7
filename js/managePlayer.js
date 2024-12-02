function openEditForm(player) {
  const popup = document.getElementById("add-player-popup");
  const form = popup.querySelector("form");
  popup.classList.remove("hidden");

  // Update form title and submit button text
  popup.querySelector("h2").textContent = "Edit Player";
  popup.querySelector('button[type="submit"]').textContent = "Save Changes";

  // Populate form fields
  form.querySelector("#first-name").value = player.firstName;
  form.querySelector("#last-name").value = player.lastName;
  form.querySelector("#overall-rating").value = player.rating;
  form.querySelector("#position-select").value = player.position;
  form.querySelector("#player-image").value = player.photo;
  form.querySelector("#country-image").value = player.flag;
  form.querySelector("#club-image").value = player.logo;
  form.querySelector("#country-name").value = player.nationality;
  form.querySelector("#club-name").value = player.club;

  // Trigger position change to show skills
  form.querySelector("#position-select").dispatchEvent(new Event("change"));

  // Set selected names for preview
  selectedCountryName = player.nationality;
  selectedClubName = player.club;

  let playerSkillSet =
    player.position === "GK" ? positionSkills.GK : positionSkills.ANY;
  playerSkillSet = player.skills.map((skill) => ({
    id: playerSkillSet.find((s) => s.name === skill.name).id,
    value: skill.value,
    name: skill.name,
  }));

  // Update skills after position select event has processed
  setTimeout(() => {
    playerSkillSet.forEach((skill) => {
      const input = form.querySelector(`[data-skill="${skill.id}"]`);
      if (input) {
        input.value = skill.value;
        updatePreviewSkill(skill.id, skill.value);
      }
    });
  }, 0);

  // Update preview
  updatePreviewImage(player.photo);
  updatePreviewCountry(player.flag);
  updatePreviewClub(player.logo);
  updatePreviewName(player.lastName);
  updatePreviewOvr(player.rating);

  // Set edit mode
  form.dataset.editMode = "true";
  form.dataset.editId = player.id;

  // Remove any existing submit handlers
  const oldHandler = form.onsubmit;
  form.onsubmit = null;

  // Add new submit handler
  form.onsubmit = function (e) {
    e.preventDefault();
    console.log("Edit form submitted"); // Debug log

    if (!validatePlayerForm(true)) {
      console.log("Form validation failed"); // Debug log
      return false;
    }

    console.log("Form validation passed"); // Debug log
    const updatedPlayer = createPlayerObjectFromForm();
    console.log("Updated player:", updatedPlayer); // Debug log

    // Update localStorage
    let players = JSON.parse(localStorage.getItem("players")) || [];
    const index = players.findIndex((p) => p.id === parseInt(form.dataset.editId));

    if (index !== -1) {
      players[index] = updatedPlayer;
      localStorage.setItem("players", JSON.stringify(players));
      window.players = players; // Update global players array
      console.log("Player updated in storage"); // Debug log
    }

    // Update UI
    selectPlayer(players[index]);
    displayPlayers(players);

    // Reset form
    form.reset();
    resetPreview();
    popup.classList.add("hidden");

    // Reset form state
    popup.querySelector("h2").textContent = "Add New Player";
    popup.querySelector('button[type="submit"]').textContent = "Add Player";
    form.dataset.editMode = "false";
    delete form.dataset.editId;

    // Restore original submit handler if needed
    form.onsubmit = oldHandler;

    return false;
  };
}

function deletePlayer(playerId) {
  if (confirm("Are you sure you want to delete this player?")) {
    let players = JSON.parse(localStorage.getItem("players")) || [];
    players = players.filter((p) => p.id !== parseInt(playerId));

    // Update storage and global array
    localStorage.setItem("players", JSON.stringify(players));
    players = players;

    // Update UI
    selectedPlayer = null;
    updatePlayerDisplay();
    displayPlayers(players );
  }
}
