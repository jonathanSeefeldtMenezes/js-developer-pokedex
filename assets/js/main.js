
const pokemonListHTML = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetailModal = document.getElementById('modal')

const limit = 8
let offset = 0
let varPokemonList = []

loadPokemonItens(offset, limit)

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemonList) => {
        //Cria a lista html de pokemons 
        const newHtml = pokemonList.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="openModal(${pokemon.number});">
                <span class="number">${pokemon.numberFormat()}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        //Vincula ao DOM a lista dos pokemons carregados
        pokemonListHTML.innerHTML += newHtml
        //Armazena na variável os pokemons carregados
        varPokemonList.push(...pokemonList)
    })
}

function loadPokemonDetailModal(pokemon) {

    const modalAbilities = pokemon.abilities.map((ability) =>
        `<li>${ability}</li>`).join('')

    const modalStats = pokemon.stats.map((stat) =>
        `<li>
            <p style="width: 60vw">${stat.name_stat}</p>
            <p style="width: 15vw">${stat.base_stat}</p>
            <div class="progress-bar">
                <span class="progress-bar-fill" 
                      style="width: ${calcPercentBaseStats(stat.base_stat)}%;"></span>
            </div>
         </li>
        `).join('')

    const newHtml = `
        <div id="modalContent" class="pokemonDetailModalContent ${pokemon.type}">
            <a href="#" class="modalClose" title="Fechar" onclick="closeModal();">X</a>
            
            <p class="title">${pokemon.name}</p>
            
            <div class="pokemonDetailModalContentBody">
                <div>
                    <p class="cap">Abilities</p>
                    <ol>${modalAbilities}</ol>
                </div>

                <div class="modalStats">
                    <p class="cap">Stats</p>    
                    <ol>${modalStats}</ol>
                </div>
            </div>
            
        </div>
    `

    pokemonDetailModal.innerHTML = newHtml
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

/* Functions Modal */
function openModal(number) {
    const pokemon = varPokemonList.filter((el) => el.number === number)[0]

    loadPokemonDetailModal(pokemon)

    pokemonDetailModal.style.display = 'block'
}

function closeModal() {
    pokemonDetailModal.style.display = 'none'
}

/* Functions Aux */
function calcPercentBaseStats(baseStats) {
    return (baseStats * 100) / 255
}