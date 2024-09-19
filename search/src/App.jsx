
// import React, { useState } from 'react';
// import './App.css';
// import Searchbar from './componets/Searchbar';
// import SearchResult from './componets/SearchResult';

// function App() {
//   const [result,setResult]=useState([])
//   return (
//     <div className="App">
//       <div className="search-cont">
//       <Searchbar setResult={setResult}/>
//       <SearchResult result={result}/>
//     </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch data from PokeAPI
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        // Fetch detailed info for each Pokemon
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            return await pokemonResponse.json();
          })
        );
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching the Pokémon data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Filter pokemons based on search term
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>

      <input
        type="text"
        placeholder="Search Pokémon by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

// Pokemon Card component
const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
};

export default App;
