$(document).ready(function()
{
    // Array dónde se irán guardando los Pokémon de forma ordenada por id
    let sortedPokemon = [];

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
                fetchAndSortPokemon(pokemon);
            });
        })
        .catch(function(err)
        {
            console.log(err);
        });

    // Función que pide a la API los datos de un Pokémon y los va ordenando en un array
    function fetchAndSortPokemon(pokemon)
    {
        let urlPokemon = pokemon.url;

        // Con esta llamada pedimos los detalles de cada Pokémon
        fetch(urlPokemon)
            .then(function(response)
            {
                return response.json();
            })
            .then(function(pokemonDetails)
            {
                console.log(pokemonDetails);

                // Insertamos el Pokémon con sus datos en el array sortedPokemon
                sortedPokemon.push(pokemonDetails);
                sortedPokemon.sort(function(a, b)
                {
                    return a.id - b.id; // Ordenar por id en orden ascendente
                });

                // Llamamos a la función para renderizar el HTML de cada card
                renderPokemonCard();
            })
            .catch(function(err)
            {
                console.log(err);
            });
    }

    // Función para renderizar los datos de cada Pokémonen un card de BS
    // Esta recorrera el el array sortedPokemon
    function renderPokemonCard()
    {
        $("#pokeCont").empty();
        sortedPokemon.forEach(function(pokemonDetails)
        {
            let pokeHTML = 
            `
                <div class="card justify-content-center col-6 col-md-4 col-lg-3 card-body m-4" style="width: 18rem; max-width: 18rem;">
                    <img src="${pokemonDetails.sprites.front_default}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${pokemonDetails.name[0].toUpperCase()+pokemonDetails.name.slice(1)}</h5>
                        <p class="card-text">#${pokemonDetails.id}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `;
        $("#pokeCont").append(pokeHTML);
        });
    }

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