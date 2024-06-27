const personDB = "https://dragonball-api.com/api/characters";
export let listCharacters = [];

 export default async function fetchAllData() { 
    let allItems = [];
    let currentPage = 1;
    const totalPages = 6;

    while (currentPage <= totalPages) {
        try {
            const response = await fetch(`${personDB}?page=${currentPage}`);
            if (!response.ok) {
                throw new Error("Error fetching");   
            }
            const data = await response.json();
            const items = data.items;
            allItems = [...allItems, ...items];
            currentPage++;
        
        } catch (error) {
            console.log("ERRO: " + error);
            break;
        }
    }

    allItems = correctNames(allItems);
    allItems = correctRaces(allItems);
    allItems = correctGender(allItems);

    return allItems;
}

 fetchAllData().then((allItems) => {
    for (let i = 0; i < allItems.length; i++) { 
        listCharacters.push({
            nome: allItems[i].name,
            raça: allItems[i].race,
            gênero: allItems[i].gender,
            image: allItems[i].image
        });
    }
})
.catch((error) => { 
    console.log("Error in getting all items: ", error);
});

function correctNames(personList) {
    return personList.map(person => {
        let correctedName = person.name;

        switch (true) {
            case correctedName === "Freezer":
                correctedName = "Freeza";
                break;
            case /Grand|Gran/.test(correctedName):
                correctedName = correctedName.replace(/Grand|Gran/g, '').trim();
                break;
            case /del norte/i.test(correctedName):
                correctedName = correctedName.replace(/del norte/gi, 'norte');
                break;
            case /del sur/i.test(correctedName):
                correctedName = correctedName.replace(/del sur/gi, 'norte');
                break;
            case /del este/i.test(correctedName):
                correctedName = correctedName.replace(/del este/gi, 'leste');
                break;
            case /del oeste/i.test(correctedName):
                correctedName = correctedName.replace(/del oeste/gi, 'oeste');
                break;
            case /celula/i.test(correctedName):
                correctedName = "Cell";
                break;
            case /master roshi/i.test(correctedName):
                correctedName = "Mestre Kame";
                
                break;
            case /krillin/i.test(correctedName):
                correctedName = "Kuririn";
                break;
            case /dyspo/i.test(correctedName):
                person.race = "Desconhecido";
                break;    
        }
        
        if (correctedName === "Priest") {
            correctedName = "Daishinkan";
        } 

        correctedName = correctedName.replace(/\(.*\)/g, '').trim();

        return {
            ...person,
            name: correctedName
        };
    });
}

function correctRaces(personList) { 
    return personList.map(person => {
        let raceName = person.race;

        switch (raceName) {
            case "Frieza Race":
                raceName = "Freeza Clã";
                break;
            case "Human":
                raceName = "Humano";
                break;
            case "Saiyan":
                raceName = "Saiyajin";
                break;
            case "Namekian":
                raceName = "Namekuseijin";
                break;
            case "Angel":
                raceName = "Anjo";
                break;
            case "Unknown":
            case "Jiren Race":
                raceName = "Desconhecido";
                break;
            case "God":
            case "Nucleico":
            case "Nucleico benigno":
                raceName = "Deus";
                break;
            case "Evil":
                raceName = "Demônio";
                break;
        }

        return {
            ...person,
            race: raceName
        };
    });
}

function correctGender(personList) {
    return personList.map(person => {
        let genderName = person.gender;

        switch (genderName) {
            case "Male":
                genderName = "Masculino";
                break;
            case "Female":
                genderName = "Feminino";
                break;
        }

        return {
            ...person,
            gender: genderName
        };
    });
}
