import { listCharacters } from "./person.js";

const characterContainer = document.getElementById("characterContainer");
const nameInput = document.querySelector("#search-box .search-text");
const raceSelect = document.querySelector("#box-race #select-race");
const genderSelect = document.querySelector("#box-gender #select-gender");

function displayCharacters(characters) {
    characterContainer.innerHTML = ''; // limpa o container antes de criar um novo personagem

    if (characters.length === 0) { // exibe a mensagem de personagem não encontrado no filtro de personagens
        const noPersonMessage = document.createElement("div");
        noPersonMessage.classList.add("no-person-message");
        noPersonMessage.textContent = "Personagem não encontrado.";
        characterContainer.appendChild(noPersonMessage);
        return;
    }

    const allBox = document.createElement("div");
    allBox.classList.add("multi-box");

    characterContainer.appendChild(allBox);

    for (const character of characters) { // percore a lista de personagens individualizando cada personagem da lista

        const card = document.createElement("div"); // elemento pai (div principal)
        card.classList.add("formated-Box");

        const imageBox = document.createElement("div");
        imageBox.classList.add("header-box");

        const characterImage = document.createElement("img"); // cria a div de imagem do personagem
        characterImage.src = character.image;
        characterImage.classList.add("image");
        characterImage.alt = character.nome;
        imageBox.appendChild(characterImage); // insere imageBox como nó filho de characterImage

        const nameBox = document.createElement("div"); // cria a div do nome do personagem
        nameBox.classList.add("name-box");
        const nomeElement = document.createElement("h1");
        nomeElement.textContent = `${character.nome}`; 
        nameBox.appendChild(nomeElement); // insere nameElement como nó filho de nomeBox

        const informationsBox = document.createElement("div"); // cria a div de informações do personagem
        informationsBox.classList.add("informations-box");
        const raceElement = document.createElement("h2");
        raceElement.textContent = `${character.raça}`;
        informationsBox.appendChild(raceElement); // insere raceElement como nó filho de informationsBox

        const genderElement = document.createElement("h3");
        genderElement.textContent = `${character.gênero}`;
        informationsBox.appendChild(genderElement); // insere genderElement como nó filho de informationsBox

        card.appendChild(imageBox); // adiciona imageBox como nó filho do card
        card.appendChild(nameBox); // adiciona nameBox como nó filho do card
        card.appendChild(informationsBox); // adiciona informationsBox como nó filho do card

        allBox.appendChild(card);
    }
}

// função do filte dos personagens NOME || RAÇA || GÊNERO
function filterCharacters() {
    const searchValue = nameInput.value.toLowerCase();
    const raceValue = raceSelect.value.toLowerCase();
    const genderValue = genderSelect ? genderSelect.value.toLowerCase() : '';

    listCharacters.then(characters => { // Promise da página da lista dos personagens
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
raceSelect.addEventListener("change", filterCharacters); // DOM de mudança do valor da BOX do filtro das raças
if (genderSelect) genderSelect.addEventListener("change", filterCharacters); // DOM de mudança do valor da BOX do filtro dos gêneros

listCharacters.then(characters => { // Promise da página de lista dos personagens existentes
    displayCharacters(characters);
}).catch(error => {
    console.error("Erro ao inicializar a página:", error);
});