var globalPokemonLoadedList = [];

const pokemonListHTML = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonDetailModal = document.getElementById('modal');

const limit = 8;
let offset = 0;

loadPokemonItens(offset, limit);

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemonList) => {
        //Armazena na variável os pokemons carregados
        globalPokemonLoadedList.push(...pokemonList);

        const newHtml = pokemonList.map((pokemon) =>
            `<pokemon-view number="${pokemon.number}"></pokemon-view>`
        ).join('');

        //Vincula ao DOM a lista dos pokemons carregados
        pokemonListHTML.innerHTML += newHtml;
    })
}

function loadPokemonDetailModal(pokemonNumber) {
    const newHtml = `<pokemon-modal-view number="${pokemonNumber}"></pokemon-modal-view>`;
    pokemonDetailModal.innerHTML = newHtml;
}

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
})

/* Functions Modal */
function openModal(pokemonNumber) {
    loadPokemonDetailModal(pokemonNumber);
    pokemonDetailModal.style.display = 'block';
}

function closeModal() {
    pokemonDetailModal.style.display = 'none';
}