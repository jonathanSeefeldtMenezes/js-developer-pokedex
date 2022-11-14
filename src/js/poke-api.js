
const pokeapi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities

    pokeDetail.stats.map((statsSlot) =>
        pokemon.stats.push({
            name_stat: statsSlot.stat.name,
            base_stat: statsSlot.base_stat
        })
    )

    return pokemon
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeapi.getPokemons = (offset = 0, limit = 30) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetail) => pokemonsDetail)
}