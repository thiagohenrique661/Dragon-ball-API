import { listPlanets } from '../js/planets.js';

const planetContainer = document.getElementById("planetsContainer");
const nameInput = document.querySelector("#search-box .search-text");

function displayplanets(planets) {
    planetContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards

    if (planets.length === 0) {
        // Exibe a mensagem de fundo se não houver planetas
        const noPlanetMessage = document.createElement("div");
        noPlanetMessage.classList.add("no-planet-message");
        noPlanetMessage.textContent = "Planeta não encontrado.";
        planetContainer.appendChild(noPlanetMessage);
        return;
    }

    const allBox = document.createElement("div");
    allBox.classList.add("multi-box-planet"); // Adiciona a classe multi-box a allBox
    planetContainer.appendChild(allBox); // Adiciona allBox ao planetContainer

    for (const planet of planets) {
        const card = document.createElement("div");
        card.classList.add("formated-Box-planet"); // Adiciona a classe formated-Box ao card

        const imageBox = document.createElement("div");
        imageBox.classList.add("header-box-planet"); // Adiciona a classe header-box ao imageBox

        const planetImage = document.createElement("img");
        planetImage.src = planet.image;
        planetImage.classList.add("image-planet"); // Adiciona a classe image
        planetImage.alt = planet.nome;
        imageBox.appendChild(planetImage);

        const popUp = document.createElement("div");
        popUp.classList.add("pop-up");
        popUp.textContent = planet.descricao;
        card.appendChild(popUp);

        const nameBox = document.createElement("div");
        nameBox.classList.add("name-box-planet"); // Adiciona a classe name-box ao nameBox
        const nomeElement = document.createElement("h1");
        nomeElement.textContent = `${planet.nome}`;
        nameBox.appendChild(nomeElement); // Adiciona o nome ao nameBox

        const informationsBox = document.createElement("div");
        informationsBox.classList.add("informations-box-planet"); // Adiciona a classe informations-box ao informationsBox
        const situacionElement = document.createElement("h2");
        situacionElement.textContent = `${planet.situacao}`;
        informationsBox.appendChild(situacionElement); // Adiciona a situação ao informationsBox

        card.appendChild(imageBox);
        card.appendChild(nameBox);
        card.appendChild(informationsBox);

        allBox.appendChild(card);
    }
}

// Exibe todos os planetas ao carregar a página
setTimeout(() => {
    displayplanets(listPlanets);
}, 1000);

function filterPlanets() {
    const searchValue = nameInput.value.toLowerCase();
    
    const filteredPlanets = listPlanets.filter(planet => {
        return planet.nome.toLowerCase().includes(searchValue);
    });
    displayplanets(filteredPlanets);
}
nameInput.addEventListener("input", filterPlanets);