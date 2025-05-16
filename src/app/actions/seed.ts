'use server';

import { prisma } from '@/lib/prisma';
import { fetchPokemonById } from '@/lib/api/fetchPokemon';

type PokemonType = {
  slot: number;
  type: { name: string };
};

export async function seedPokemon(ids: number[]) {
  if (ids.length === 0) {
    return { total: 0, added: 0, skipped: 0, failed: 0 };
  }

  console.log(`🔍 Attempting to seed Pokémon IDs: ${ids.join(', ')}`);
  
  // First, check which Pokémon are already in the database
  const existingPokemon = await prisma.pokemon.findMany({
    where: {
      pokedexId: {
        in: ids
      }
    },
    select: {
      pokedexId: true
    }
  });

  // Create a Set of existing IDs for fast lookup
  const existingIds = new Set(existingPokemon.map(p => p.pokedexId));
  
  // Filter out the IDs that already exist
  const newIds = ids.filter(id => !existingIds.has(id));
  
  // Log some info
  console.log(`👉 Total requested: ${ids.length}, Already in DB: ${existingIds.size}, New to fetch: ${newIds.length}`);
  console.log(`🆕 New IDs to fetch: ${newIds.join(', ')}`);
  
  // Process only the new Pokémon
  const results = { added: 0, skipped: existingIds.size, failed: 0 };
  
  // Fetch and seed the new Pokémon in parallel for better performance
  if (newIds.length > 0) {
    await Promise.all(newIds.map(async (id) => {
      try {
        const data = await fetchPokemonById(id);
        
        // Double-check the Pokemon doesn't exist before creating
        const exists = await prisma.pokemon.findUnique({
          where: { pokedexId: data.id }
        });
        
        if (exists) {
          console.log(`⏩ Pokémon #${id} already exists, skipping`);
          results.skipped++;
          return;
        }
        
        // Create the new Pokemon
        await prisma.pokemon.create({
          data: {
            pokedexId: data.id,
            name: data.name,
            spriteUrl: data.sprites.front_default,
            types: data.types.map((t: PokemonType) => t.type.name),
          }
        });
        
        results.added++;
        console.log(`✅ Seeded #${id}: ${data.name}`);
      } catch (err) {
        results.failed++;
        console.error(`❌ Error seeding Pokémon ${id}:`, err);
      }
    }));
  }
  
  console.log(`📊 Seeding complete - Added: ${results.added}, Skipped: ${results.skipped}, Failed: ${results.failed}`);
  
  return {
    total: ids.length,
    added: results.added, 
    skipped: results.skipped, 
    failed: results.failed
  };
}