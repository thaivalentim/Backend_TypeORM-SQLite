// Vetores de nomes válidos
const NOMES_VALIDOS = [
    "Superman", "Batman", "Wonder Woman", "Flash", "Aquaman",
    "Green Lantern", "Cyborg", "Martian Manhunter", "Shazam",
    "Green Arrow", "Black Canary", "Hawkman", "Hawkgirl",
    "Spider-Man", "Iron Man", "Captain America", "Thor", "Hulk",
    "Black Widow", "Hawkeye", "Doctor Strange", "Scarlet Witch",
    "Vision", "Falcon", "Winter Soldier", "Ant-Man", "Wasp",
    "Captain Marvel", "Black Panther", "Daredevil", "Punisher"
];

// Vetores de habilidades válidas
const HABILIDADES_VALIDAS = [
    "Voo", "Super Força", "Velocidade", "Invisibilidade",
    "Telepatia", "Teletransporte", "Controle Mental", "Regeneração",
    "Visão de Raio-X", "Visão Térmica", "Super Audição",
    "Respiração Congelante", "Elasticidade", "Intangibilidade",
    "Controle do Tempo", "Controle Elemental", "Magia",
    "Tecnologia Avançada", "Artes Marciais", "Pontaria Perfeita",
    "Agilidade Sobrehumana", "Resistência", "Cura Acelerada",
    "Comunicação Animal", "Controle da Gravidade"
];

// Vetores de categorias válidas
const CATEGORIAS_VALIDAS = [
    "Herói", "Anti-Herói", "Vigilante", "Mutante", 
    "Alienígena", "Deus", "Mago", "Cientista"
];

// Vetores de origens válidas
const ORIGENS_VALIDAS = [
    "Terra", "Krypton", "Asgard", "Atlantis", "Themyscira",
    "Oa", "Marte", "Laboratório", "Acidente", "Nascimento",
    "Treinamento", "Magia", "Tecnologia", "Mutação"
];

// Funções de validação
const validarNome = (nome) => {
    return NOMES_VALIDOS.includes(nome);
};

const validarHabilidade = (habilidade) => {
    return HABILIDADES_VALIDAS.includes(habilidade);
};

const validarCategoria = (categoria) => {
    return CATEGORIAS_VALIDAS.includes(categoria);
};

const validarOrigem = (origem) => {
    return !origem || ORIGENS_VALIDAS.includes(origem);
};

const validarNivel = (nivel) => {
    return nivel >= 1 && nivel <= 100;
};

module.exports = {
    NOMES_VALIDOS,
    HABILIDADES_VALIDAS,
    CATEGORIAS_VALIDAS,
    ORIGENS_VALIDAS,
    validarNome,
    validarHabilidade,
    validarCategoria,
    validarOrigem,
    validarNivel
};