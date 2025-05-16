import { fetchPokemonById } from '../lib/api/fetchPokemon';

async function main() {
  try {
    const pokemon = await fetchPokemonById(1);
    console.log('Fetched Pokémon:', pokemon.name);
  } catch (error) {
    console.error('Validation failed:', error);
  }
}

main();
