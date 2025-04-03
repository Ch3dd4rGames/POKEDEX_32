$(document).ready(function()
{
    // Primera llamada a la API para conseguir el listado
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(function(response)
        {
            return response.json();
        })
        .then(function(result)
        {   
            console.log(result);
            let pokemonList = result.results;

            // Lanzamos una nueva petición a la API por cada Pokémon del primer listado que hemos recibido
            pokemonList.forEach(function(pokemon)
            {
                fetchPokemonDetails(pokemon);
            });
        })
        .catch(function(err)
        {
            console.log(err);
        });
    // Función que se encarga de pedir los datos de cada Pokémon
    function fetchPokemonDetails(pokemon)
    {
        let urlPokemon = pokemon.url;
        console.log(urlPokemon);

        // Con esta llamada pedimos los detalles de cada Pokémon
        fetch(urlPokemon)
            .then(function(response)
            {
                return response.json();
            })
            .then(function(pokemonDetails)
            {
                console.log(pokemonDetails);
                let pokeHTML = 
                `
                    <div class="card justify-content-center col-6 col-md-4 col-lg-3 card-body m-4" style="width: 18rem;">
                        <img src="${pokemonDetails.sprites.front_default}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${pokemonDetails.name}</h5>
                            <p class="card-text">#${pokemonDetails.id}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                `;
                $("#pokeCont").append(pokeHTML);
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }
});