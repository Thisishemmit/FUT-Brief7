// those are the skills for each position
// id is the key to be showen in the preview
// mais the name of the skill name to be shown in the input label
const positionSkills = {
    GK: [
        { id: "DIV", name: "diving" },
        { id: "HAN", name: "handling" },
        { id: "KIC", name: "kicking" },
        { id: "REF", name: "reflexes" },
        { id: "SPD", name: "speed" },
        { id: "POS", name: "positioning" },
    ],
    ANY: [
        { id: "PAC", name: "pace" },
        { id: "SHO", name: "shooting" },
        { id: "PAS", name: "passing" },
        { id: "DRI", name: "dribbling" },
        { id: "DEF", name: "defending" },
        { id: "PHY", name: "physical" },
    ],
};

let selectedCountryName = "";
let selectedClubName = "";

document.addEventListener("DOMContentLoaded", () => {

    // those elements should be hidden by default till we select the position of the player
    const positionSelect = document.getElementById("position-select");
    const skillsInputs = document.getElementById("skills-inputs");
    const previewSkills = document.getElementById("preview-skills");

    // on position chosen;
    positionSelect.addEventListener("change", (e) => {
        const position = e.target.value;

        // this is good for the case of going back to the default value of the select
        document.getElementById("preview-pos").textContent = position || "--";

        // if no position is selected we should hide the skills inputs and preview
        if (!position) {
            skillsInputs.innerHTML = "";
            previewSkills.innerHTML = "";
            return;
        }

        // if the position is selected we should show the skills inputs and preview
        const skills = position === "GK" ? positionSkills.GK : positionSkills.ANY;
        skillsInputs.innerHTML = skills
            .map((skill) => `
            <div>
                <label class="block text-sm font-medium text-[#2C2C2C] mb-1">${skill.name}</label>
                <input type="number"
                    class="skill-input w-full px-3 py-2 bg-white/50 rounded-lg border border-[#ffffff40]"
                    data-skill="${skill.id}"
                    oninput="updatePreviewSkill('${skill.id}', this.value)">
            </div> `
            )
            .join("");

        // i fill the preview with the skills mais empty values at the start and i give the id of the skill to find it when i put some
        previewSkills.innerHTML = skills
            .map((skill) => `
            <div class="skill-preview flex flex-col items-center justify-center -space-y-0.5">
                <span class="text-[8px] font-bold text-[#393218]">${skill.id}</span>
                <span class="text-[11px] font-black text-[#393218]" id="preview-${skill.id}">--</span>
            </div> `
            )
            .join("");
    });

    // get popup controliing
    const addPlayerPopup = document.getElementById("add-player-popup");
    const cancelButton = addPlayerPopup.querySelector('button[type="button"]'); // btn for hiding popup
    cancelButton.addEventListener("click", () => {
        addPlayerPopup.classList.add("hidden");
        document.querySelector("#add-player-form form").reset();
        resetPreview();
    });

    // form element
    const playerForm = document.querySelector("#add-player-form form");


    playerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validatePlayerForm()) {
            const playerData = createPlayerObjectFromForm(); //needs to be added to the local storage

            const players = JSON.parse(localStorage.getItem("players")) || [];
            players.push(playerData);
            localStorage.setItem("players", JSON.stringify(players));

            playerForm.reset();
            resetPreview();
        }
    });
});

function updatePreviewSkill(skillId, value) {
    const previewElement = document.getElementById(`preview-${skillId}`);
    previewElement.textContent = value || "--";
}

function updatePreviewOvr(rating) {
    document.getElementById("preview-ovr").textContent = rating || "--";
}

function updatePreviewImage(imageUrl) {
    const previewImg = document.getElementById("preview-img");
    if (imageUrl) {
        previewImg.src = imageUrl;
        previewImg.classList.remove("opacity-0");
    } else {
        previewImg.src = "";
        previewImg.classList.add("opacity-0");
    }
}

function updatePreviewCountry(imageUrl) {
    const countryPreview = document.getElementById("preview-country");

    if (imageUrl) {
        countryPreview.querySelector("img").src = imageUrl;
        countryPreview.classList.remove("opacity-0");
    } else {
        countryPreview.querySelector("img").src = "";
        countryPreview.classList.add("opacity-0");
    }
}

function updatePreviewClub(imageUrl) {
    const clubPreview = document.getElementById("preview-club");

    if (imageUrl) {
        clubPreview.querySelector("img").src = imageUrl;
        clubPreview.classList.remove("opacity-0");
    } else {
        clubPreview.querySelector("img").src = "";
        clubPreview.classList.add("opacity-0");
    }
}

function updateCountryName(name) {
    selectedCountryName = name;
}

function updateClubName(name) {
    selectedClubName = name;
}

function resetPreview() {
    document.getElementById("preview-pos").textContent = "--";

    document.getElementById("preview-ovr").textContent = "--";

    const previewImg = document.getElementById("preview-img");
    previewImg.src = "";
    previewImg.classList.add("opacity-0");

    const countryPreview = document.getElementById("preview-country");
    const clubPreview = document.getElementById("preview-club");
    countryPreview.querySelector("img").src = "";
    clubPreview.querySelector("img").src = "";
    countryPreview.classList.add("opacity-0");
    clubPreview.classList.add("opacity-0");

    const previewSkills = document.getElementById("preview-skills");
    previewSkills.innerHTML = "";

    selectedCountryName = "";
    selectedClubName = "";

    document.getElementById("preview-name").textContent = "--";
}

function updatePreviewName(lastName) {
    const previewName = document.getElementById("preview-name");

    if (lastName) {
        previewName.textContent = lastName;
    } else {
        previewName.textContent = "--";
    }
}



function validatePlayerForm() {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const position = document.getElementById("position-select").value;
    const overallRating = document.getElementById("overall-rating").value;
    const playerImage = document.getElementById("player-image").value;
    const country = document.getElementById("country-image").value;
    const club = document.getElementById("club-image").value;
    const countryName = document.getElementById("country-name").value;
    const clubName = document.getElementById("club-name").value;
    let skills = [];
    if (position) {
        skills = document.querySelectorAll(".skill-input");
    }
    console.log(skills);

    if (!firstName) {
        document.getElementById("first-name").classList.add("border-red-500");
    } else {
        document.getElementById("first-name").classList.remove("border-red-500");
    }

    if (!lastName) {
        document.getElementById("last-name").classList.add("border-red-500");
    } else {
        document.getElementById("last-name").classList.remove("border-red-500");
    }

    if (!position) {
        document.getElementById("position-select").classList.add("border-red-500");
    } else {
        document
            .getElementById("position-select")
            .classList.remove("border-red-500");
    }

    if (!overallRating) {
        document.getElementById("overall-rating").classList.add("border-red-500");
    } else {
        document
            .getElementById("overall-rating")
            .classList.remove("border-red-500");
    }

    if (!playerImage) {
        document.getElementById("player-image").classList.add("border-red-500");
    } else {
        document.getElementById("player-image").classList.remove("border-red-500");
    }

    if (!country) {
        document.getElementById("country-image").classList.add("border-red-500");
    } else {
        document.getElementById("country-image").classList.remove("border-red-500");
    }

    if (!club) {
        document.getElementById("club-image").classList.add("border-red-500");
    } else {
        document.getElementById("club-image").classList.remove("border-red-500");
    }

    if (!countryName) {
        document.getElementById("country-name").classList.add("border-red-500");
    } else {
        document.getElementById("country-name").classList.remove("border-red-500");
    }

    if (!clubName) {
        document.getElementById("club-name").classList.add("border-red-500");
    } else {
        document.getElementById("club-name").classList.remove("border-red-500");
    }

    let validSkills = true;
    console.log(skills);
    if (skills.length > 0) {
        skills.forEach((skill) => {
            if (!skill.value) {
                skill.classList.add("border-red-500");
                validSkills = false;
            } else {
                skill.classList.remove("border-red-500");
            }
        });
    }

    return (
        firstName &&
        lastName &&
        position &&
        overallRating &&
        playerImage &&
        country &&
        club &&
        countryName &&
        clubName &&
        validSkills
    );
}

