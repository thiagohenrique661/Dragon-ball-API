import { listCharacters } from "./person.js";

const characterContainer = document.getElementById("characterContainer");
const nameInput = document.querySelector("#search-box .search-text");
const raceSelect = document.querySelector("#box-race #select-race");
const genderSelect = document.querySelector("#box-gender #select-gender");

function displayCharacters(characters) {
    characterContainer.innerHTML = '';

    if (characters.length === 0) {
        const noPersonMessage = document.createElement("div");
        noPersonMessage.classList.add("no-person-message");
        noPersonMessage.textContent = "Personagem não encontrado.";
        characterContainer.appendChild(noPersonMessage);
        return;
    }

    const allBox = document.createElement("div");
    allBox.classList.add("multi-box");

    characterContainer.appendChild(allBox);

    for (const character of characters) {
        const card = document.createElement("div");
        card.classList.add("formated-Box");

        const imageBox = document.createElement("div");
        imageBox.classList.add("header-box");

        const characterImage = document.createElement("img");
        characterImage.src = character.image;
        characterImage.classList.add("image");
        characterImage.alt = character.nome;
        imageBox.appendChild(characterImage);

        const nameBox = document.createElement("div");
        nameBox.classList.add("name-box");
        const nomeElement = document.createElement("h1");
        nomeElement.textContent = `${character.nome}`;
        nameBox.appendChild(nomeElement);

        const informationsBox = document.createElement("div");
        informationsBox.classList.add("informations-box");
        const raceElement = document.createElement("h2");
        raceElement.textContent = `${character.raça}`;
        informationsBox.appendChild(raceElement);

        const genderElement = document.createElement("h3");
        genderElement.textContent = `${character.gênero}`;
        informationsBox.appendChild(genderElement);

        card.appendChild(imageBox);
        card.appendChild(nameBox);
        card.appendChild(informationsBox);

        allBox.appendChild(card);
    }
}

function filterCharacters() {
    const searchValue = nameInput.value.toLowerCase();
    const raceValue = raceSelect.value.toLowerCase();
    const genderValue = genderSelect ? genderSelect.value.toLowerCase() : '';

    listCharacters.then(characters => {
        const filteredCharacters = characters.filter(character =>
            character.nome.toLowerCase().includes(searchValue) &&
            (raceValue === 'todos' || raceValue === '' || character.raça.toLowerCase().includes(raceValue)) &&
            (genderValue === 'todos' || genderValue === '' || character.gênero.toLowerCase().includes(genderValue))
        );

        displayCharacters(filteredCharacters);
    }).catch(error => {
        console.error("Erro ao filtrar personagens:", error);
    });
}

nameInput.addEventListener("input", filterCharacters);
raceSelect.addEventListener("change", filterCharacters);
if (genderSelect) genderSelect.addEventListener("change", filterCharacters);

listCharacters.then(characters => {
    displayCharacters(characters);
}).catch(error => {
    console.error("Erro ao inicializar a página:", error);
});