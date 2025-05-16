'use server';

import { prisma } from '@/lib/prisma';

export async function getCategorizedPokemon() {
  const allPokemon = await prisma.pokemon.findMany();

  const categories: Record<string, typeof allPokemon> = {};

  for (const poke of allPokemon) {
    for (const type of poke.types) {
      if (!categories[type]) categories[type] = [];
      categories[type].push(poke);
    }
  }

  return categories;
}