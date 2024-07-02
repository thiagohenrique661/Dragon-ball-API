const planetDB = "https://dragonball-api.com/api/planets";

export default async function fetchAllPlanets() { // função que busca todos os planetas existentes
    let allPlanets = [];
    let currentPage = 1;
    const totalPage = 6;

    while (currentPage <= totalPage) { // enquanto página atual for menor que o total de páginas realize o fetch 
        try {
            const response = await fetch(`${planetDB}?page=${currentPage}`);
            if (!response.ok) {
                throw new Error("Error fetching");
            }
            const data = await response.json();
            const items = data.items;
            allPlanets = [...allPlanets, ...items];
            currentPage++;
        } catch (error) {
            console.log("ERROR: " + error);
            break;
        }
    }

    allPlanets = correctNames(allPlanets);
    allPlanets = correctState(allPlanets);
    allPlanets = correctDescription(allPlanets);

    return allPlanets;
}
function correctNames(planetList) { // função para correção dos nomes dos planetas
    return planetList.map((planet) => {
        let correctNames = planet.name;

        switch (correctNames) {
            case "Namek":
                correctNames = "Namekusei";
                break;
            case "Tierra":
                correctNames = "Terra";
                break;
            case "Freezer No. 79":
                correctNames = "Planeta Freeza";
                break;
            case "Kaiō del Norte":
                correctNames = "Kaio do norte";
                break;
            case "Desconocido":
                correctNames = "Desconhecido";
                break;
            case "Otro Mundo":
                correctNames = "Outro mundo";
                break;
            case "Planeta del Gran Kaio":
                correctNames = "Grande Kaio";
                break;
            case "Nucleo del Mundo":
                correctNames = "Núcleo do mundo";
                break;
            case "Nuevo Planeta Tsufrui":
                correctNames = "Novo Tsufrui";
                break;
            case "Templo móvil del Rey de Todo":
                correctNames = "Castelo Zeno";
                break;
        }
        return {
            ...planet,
            name: correctNames
        }
    });
}

function correctState(planetList) { // retorna o estado do planeta
    return planetList.map((planet) => {
        let state = planet.isDestroyed ? "Destruído" : "Preservado";
        return {
            ...planet,
            isDestroyed: state
        }
    });
}

function correctDescription(planetList) { // retorna a história do planeta
    return planetList.map((planet) => {
        let correctDescription = planet.description;
        let correctNames = planet.name;

        switch (correctNames) {
            case "Namekusei":
                correctDescription = "Planeta Namekusei era um lindo planeta coberto por Ajisa. No Ano 261 ocorreu uma horrível mudança climática dizimando todos os Namekuseijins exceto o Grande Patriarca. Um Namekuseijin sem nome, o filho de Katattsu, uma criança superdotada do Clã Dragão, foi enviado para a Terra como um filho para garantir sua sobrevivência. Grande Patriarca acredita ser o último Namekuseijin vivo até que ele ouviu que o filho de Katattsu tinha chegado à Terra com segurança. Felizmente, ele foi capaz de repopular o planeta, já que Namekuseijins se reproduzem assexuadamente, e deu à luz a 109 Namekuseijins. Os filhos do Grande Patriarca começaram a reconstruir o planeta, especialmente a vegetação exuberante que havia sido destruída nas tempestades.";
                break;
            case "Terra":
                correctDescription = "Terra é o planeta 4032-877, e é parte do Sétimo Universo. É um planeta bem avançado da Galáxia Norte (o quadrante norte do universo) e dentro da zona administrativa do Deus da Destruição Beerus. Os eventos que ocorrem na Terra são observados de um ponto neutro pelo Senhor Kaioh (o rei da galáxia norte), e os Kaiohshins (reis do universo inteiro). Veículos voadores, cápsulas que podem diminuir objetos de tamanho, robôs, e outros objetos de ficção científica são comuns na Terra. A arquitetura também é mais avançada. Os prédios são redondos, geralmente empregando seções esféricas ou ovoides em um sistema cilíndrico. Certos elementos de magia coexistem com ciência avançada.";
                break;
            case "Vegeta":
                correctDescription = "Planeta Vegeta (惑星ベジータ, Wakusei Bejīta), antes conhecido como Planeta Planta, é o planeta natal de Goku, Vegeta e todos os Saiyajins nativos, Tsufurujins, e Plantas na franquia de Dragon Ball.";
        
                break;
            case "Planeta Freeza":
                correctDescription = "Planeta Freeza Nº 79 é um planeta dominado por Freeza. Os únicos habitantes vistos no planeta são homens sob o comando de Freeza. Este planeta também parece ser uma base de operações no império de Freeza.";
                break;
            case "Kanassa": 
                correctDescription = "Kanassa é um planeta rochoso na qual há várias cidades modernas habitadas por alienígenas chamados Kanassanos. Esses seres possuem habilidades telepáticas. Antes de sua destruição, os habitantes previram que a destrução viria num dia de lua cheia. Acabou que eles estavam certos, Bardock e seus companheiros usaram a lua cheia pra se transformarem em Oozarus e exterminarem os residentes do planeta."
                break;
            case "Monmar":
                correctDescription = "O planeta é habitado por seres gigantes, desde humanoides a animais (águias, bodes, crocodilos) e insetos (abelhas, besouros, borboletas, e aranhas). Durante a busca de Goku, Trunks, e Pan pelas Esferas do Dragão, uma das esferas estava neste planeta, a Esfera de Quatro Estrelas, que ficou presa no dente de um gigante."    
            break;
            case "Yadrat":
                correctDescription = "Yardrat é o planeta que as Forças Especiais Ginyu estava marcada para invadir antes de serem relocados para Namekusei. Goku não conseguia ligar a Nave de Freeza, e então ele encontra as naves da Força Ginyu por perto e entra em uma delas. As coordenadas de Yardrat já estava programada no computador da nave, e então leva Goku para este planeta.";
                break;
            case "Kaio do norte":
                correctDescription = "Este planeta é o lar do Senhor Kaioh. Sua característica mais notável é que sua gravidade é mais ou menos dez vezes a gravidade da Terra, fazendo dele um campo de treinamento ideal. O planeta costumava ser 100 vezes maior, mas é desconhecido se isso implica uma gravidade maior, mas devido à peculiar proporção tamanho e gravidade, provavelmente era o mesmo. O planeta contém nada além de gramas, meia dúzia de árvores (algumas das quais produzem frutos), uma estrada ao redor do planeta, a casa do Senhor Kaioh, seu carro, um poço, e um outro prédio pequeno. O Deus da Destruição, Beerus visitou o planeta do Senhor Kaioh pelo menos uma vez antes de Dragon Ball Z: A Batalha dos Deuses. ";
                break;
            case "Makyo":
                correctDescription  = "Makyo é um planeta que se move pelo espaço, aproximando-se da Terra a cada 5.000 anos , coincidindo com um alinhamento de diversas estrelas, o que provoca um aumento de poder nas pessoas malévolas que habitam a Terra.";
                break;
            case "Babari":
                correctDescription = "Babari é mostrado como um planeta verdejante habitado pelos Babarianos. Em 1000 anos , eles formaram uma tribo, descobriram o fogo, usaram árvores para fazer porretes e começaram a usar roupas. Eles até criam instrumentos musicais e desenvolvem algum tipo de escrita rudimentar."
                break;
            case "Tsufur (Universo 6)": 
                correctDescription = "Novo Planeta Planta, também chamado Planeta Tsufuru (ツフル星, Tsufuru-boshi) é o nome dado ao planeta que Baby deseja em Dragon Ball GT. Ele deseja por uma réplica exata do original Planeta Planta, antes da Guerra dos Saiyajins e Tsufurujins começar."
                break;
            case "Desconhecido":
                correctDescription = "Sem informações.";
                break;
            case "Outro mundo":
                correctDescription = "O Outro Mundo (あの世, Anoyo), também chamado de Mundo dos Mortos, é o local da vida após a morte na série Dragon Ball. É onde os personagens vão quando morrem, e também onde as altas divindades do universo residem.";
                break;
            case "Planeta de Bills ":
                correctDescription = "O planeta Beerus se localiza no mundo dos vivos ao invés do Outro Mundo. Ele está localizado a 26 minutos de distância do Planeta do Senhor Kaioh com a velocidade de Whis, e a 35 minutos da Terra, mas a localidade exata de seu planeta não é mostrada, sendo uma localidade super secreta. A parte inferior possui uma forma similar à uma pirâmide invertida, e a parte superior é uma árvore vazia gigante. Vários quartos e salas estão localizados na árvore. Ao redor do templo há um lago que possui vários animais, como o Peixe Oráculo e vários monstros aquáticos, e também animais terrestres. Ao redor do planeta também existem várias luas, que foram destruídas por Beerus após ingerir wasabi.";
                break;
            case "Grande Kaio":
                correctDescription = "O Planeta do Grande Kaioh (大界王星, Dai Kaiō-sei) é o lar de Grande Kaioh, o rei das galáxias. Foi introduzido em uma saga exclusiva em Dragon Ball Z."
            
                break;
            case "Núcleo do mundo":
                correctDescription = " Núcleo do Mundo (界芯星Kaishin-sei ? ) é o planeta nativo de toda a espécie nucleica , de onde surgem os benevolentes Kaio e Kaio-shin , bem como os malévolos Makaio , Makaio-shin e Deuses Demoníacos em troca .";
                break;
            case "Planeta sagrado":
                correctDescription = "O Planeta Sagrado é onde os quatro Kaiohshins e o Grande Supremo Senhor Kaioh viviam, e possívelmente onde todos os outros Kaiohshins viveram. A maioria dos Kaiohshins não vivem mais aqui, pois a Kaiohshin do Oeste e o Kaiohshin do Norte foram mortos por Kid Boo, enquanto o Kaiohshin do Sul e o Grande Kaiohshin foram absorvidos por Kid Boo, durante a missão de Bibidi de dominar a galáxia.";
                break;
            case "Novo Tsufrui":
                correctDescription =  "Novo Planeta Planta, também chamado Planeta Tsufuru (ツフル星, Tsufuru-boshi) é o nome dado ao planeta que Baby deseja em Dragon Ball GT. Ele deseja por uma réplica exata do original Planeta Planta, antes da Guerra dos Saiyajins e Tsufurujins começar."
                break;
            case "Castelo Zeno":
                correctDescription = "Palácio de Zenão (全王ぜんおうさまの宮殿きゅうでん Zen-ō-sama no Kyūden, aceso. A localização exata do Palácio do Rei de Todos) é desconhecida, mas ele reside acima de uma enorme água-viva que está localizada entre nuvens douradas e o que parece ser o espaço sideral. É também um local separado dos  universos  e muito distante deles, sendo que até mesmo os Anjos , como afirma Whis , levam dois dias inteiros a toda velocidade para fazer uma viagem só de ida e quatro dias inteiros para uma única viagem de ida e volta, e sendo mais acessível através de teletransporte, como o Kai Kai usado pelos Supremos Kais ."
                break;
            case "Universo 11":
                correctDescription = "Essa é a representação do universo 11. Um dos univeross que compõe o grupo dos universos de Dragon ball super.";
                break;
            }

        return {
            ...planet,
            description: correctDescription
        }
    });
}
export const listPlanets = fetchAllPlanets().then((allItems) => { // retorna a promise da lista dos planetas, corrigindo os campos para português
    const planets = allItems.map( item => ({ 
            nome: item.name,
            situacao: item.isDestroyed,
            descricao: item.description,
            image: item.image

        }));

        return planets;
}).catch((error) => {
    console.log("Error in getting all items: " + error);
    return [];
});