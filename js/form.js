// those are the skills for each position
// id is the key to be showen in the preview
// mais the name of the skill name to be shown in the input label
const positionSkills = {
    GK: [
        { id: "DIV", name: "diving" },
        { id: "HAN", name: "handling" },
        { id: "KIC", name: "kicking" },
        { id: "POS", name: "positioning" },
        { id: "REF", name: "reflexes" },
        { id: "SPD", name: "speed" },
    ],
    ANY: [
        { id: "PAC", name: "pace" },
        { id: "SHO", name: "shooting" },
        { id: "DRI", name: "dribbling" },
        { id: "PAS", name: "passing" },
        { id: "PHY", name: "physical" },
        { id: "FIN", name: "finishing" },
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
    const addPlayerButton = document.querySelector("#add-player button"); // btn for showing popup
    const addPlayerPopup = document.getElementById("add-player-popup");
    const cancelButton = addPlayerPopup.querySelector('button[type="button"]'); // btn for hiding popup

    addPlayerButton.addEventListener("click", () => {
        addPlayerPopup.classList.remove("hidden");
    });

    cancelButton.addEventListener("click", () => {
        addPlayerPopup.classList.add("hidden");
        document.querySelector("#add-player-form form").reset();
        resetPreview();
    });

    // form element
    const playerForm = document.querySelector("#add-player-form form");


    playerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // mazal mamkhdomash
        if (validatePlayerForm()) {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            const playerData = createPlayerObject(); //needs to be added to the local storage
            console.warn("Player data", playerData);
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

function createPlayerObject() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const position = document.getElementById("position-select").value;

    const skillInputs = document.querySelectorAll('#skills-inputs input');
    const skills = [];
    skillInputs.forEach((input) => {
        const skillId = input.dataset.skill;

        const skillName = positionSkills.GK.concat(positionSkills.ANY).find(
            (skill) => skill.id === skillId
        ).name;

        const skill = {
            id: skillId,
            name: skillName,
            value: parseInt(input.value) || 0,
        }

        skills.push(skill);
    });


    const overallRating = document.getElementById("overall-rating").value;

    return {
        id: Date.now(),
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        position,
        skills,
        overall: overallRating,
        nationality: selectedCountryName,
        flag: document.getElementById("preview-country").querySelector("img").src,
        club: selectedClubName,
        logo: document.getElementById("preview-club").querySelector("img").src,
        photo: document.getElementById("preview-img").src || null,
    };
}


