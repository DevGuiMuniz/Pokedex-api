 // => = arrow function(função)

const pokeapi = {}


function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon= new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types =types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}



pokeapi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)

    
}

pokeapi.getPokemons =  (offset = 0, limit= 10) => {
  
   const url  = `https://pokeapi.co/api/v2/pokemon?offset${offset}&limit${limit}`
   return fetch(url)
   .then((response) => response.json())
   .then((jsonBody) => jsonBody.results)
   .then((pokemons) => pokemons.map(pokeapi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
   
}


// Promise.all([
//     fetch('https;//pokeaapi.co/api/v2/pokemon/1'),
//     fetch('https;//pokeaapi.co/api/v2/pokemon/2'),
//     fetch('https;//pokeaapi.co/api/v2/pokemon/3'), 
//     fetch('https;//pokeaapi.co/api/v2/pokemon/4'),
//     fetch('https;//pokeaapi.co/api/v2/pokemon/5'),
//     fetch('https;//pokeaapi.co/api/v2/pokemon/6'), 

// ]).then((results) => {
//     console.log(results)
// }) 