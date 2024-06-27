import { listCharacters } from "./person.js";

const characterContainer = document.getElementById("characterContainer");

// Seleciona o input e o botão de filtro já existente

const nameInput = document.querySelector("#search-box .search-text");
const raceSelect = document.querySelector("#box-race #select-race");
const genderSelect = document.querySelector("#box-gender #select-gender"); // Adicione esta linha se você tiver um select para gênero

// Cria a função para exibir os cards
function displayCharacters(characters) {
    characterContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    if (characters.length === 0) {
        // Exibe a mensagem de fundo se não houver planetas
        const noPersonMessage = document.createElement("div");
        noPersonMessage.classList.add("no-person-message");
        noPersonMessage.textContent = "Personagem não encontrado.";
        characterContainer.appendChild(noPersonMessage);
        return;
    }

    // Cria a div allBox dentro do characterContainer
    const allBox = document.createElement("div");
    allBox.classList.add("multi-box"); // Adiciona a classe multi-box a allBox

    characterContainer.appendChild(allBox); // Adiciona allBox ao characterContainer

    for (const character of characters) {
        // Cria um card para cada personagem
        const card = document.createElement("div");
        card.classList.add("formated-Box"); // Adiciona a classe formated-Box ao card

        // Cria uma caixa para a imagem
        const imageBox = document.createElement("div");
        imageBox.classList.add("header-box"); // Adiciona a classe header-box ao imageBox

        // Cria e adiciona a imagem ao imageBox
        const characterImage = document.createElement("img");
        characterImage.src = character.image;
        characterImage.classList.add("image"); // Adiciona a classe image
        characterImage.alt = character.nome;
        imageBox.appendChild(characterImage);

        // Cria elementos para o nome, raça e gênero
        const nameBox = document.createElement("div");
        nameBox.classList.add("name-box"); // Adiciona a classe name-box ao nameBox
        const nomeElement = document.createElement("h1");
        nomeElement.textContent = `${character.nome}`;
        nameBox.appendChild(nomeElement); // Adiciona o nome ao nameBox

        const informationsBox = document.createElement("div");
        informationsBox.classList.add("informations-box"); // Adiciona a classe informations-box ao informationsBox
        const raceElement = document.createElement("h2");
        raceElement.textContent = `${character.raça}`;
        informationsBox.appendChild(raceElement); // Adiciona a raça ao informationsBox

        const genderElement = document.createElement("h3");
        genderElement.textContent = `${character.gênero}`;
        informationsBox.appendChild(genderElement); // Adiciona o gênero ao informationsBox

        // Adiciona os elementos ao card
        card.appendChild(imageBox);
        card.appendChild(nameBox);
        card.appendChild(informationsBox);

        // Adiciona o card ao contêiner de personagens (allBox)
        allBox.appendChild(card);
    }
}

function filterCharacters() {
    const searchValue = nameInput.value.toLowerCase();
    const raceValue = raceSelect.value.toLowerCase();
    const genderValue = genderSelect ? genderSelect.value.toLowerCase() : ''; // Se tiver um select para gênero

    const filteredCharacters = listCharacters.filter(character =>
        character.nome.toLowerCase().includes(searchValue) &&
        (raceValue === 'todos' || raceValue === '' || character.raça.toLowerCase().includes(raceValue)) &&
        (genderValue === 'todos' || genderValue === '' || character.gênero.toLowerCase().includes(genderValue))
    );

    displayCharacters(filteredCharacters);
}

// Adiciona os eventos de entrada e mudança nos campos de filtro
nameInput.addEventListener("input", filterCharacters);
raceSelect.addEventListener("change", filterCharacters);
if (genderSelect) genderSelect.addEventListener("change", filterCharacters);

// Exibe todos os personagens ao carregar a página
setTimeout(() => {
    displayCharacters(listCharacters);
}, 1000);