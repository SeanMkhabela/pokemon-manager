import { PokemonSchema, Pokemon } from "../schemas/pokemon";

// In-memory cache for Pokemon data
const pokemonCache: Record<number, Pokemon> = {};

export async function fetchPokemonById(id: number) {
  // Check if we already have this Pokemon in our cache
  if (pokemonCache[id]) {
    console.log(`🔄 Using cached data for Pokemon #${id}`);
    return pokemonCache[id];
  }
  
  // Add caching headers for better performance
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 60 * 60 * 24 } // Cache for 24 hours
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon #${id}: ${res.status}`);
  }
  
  const data = await res.json();
  const parsedData = PokemonSchema.parse(data);
  
  // Store in our cache
  pokemonCache[id] = parsedData;
  
  return parsedData;
}