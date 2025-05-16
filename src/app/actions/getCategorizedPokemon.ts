'use server';

import { prisma } from '@/lib/prisma';

export async function getCategorizedPokemon() {
  try {
    const allPokemon = await prisma.pokemon.findMany();

    const categories: Record<string, typeof allPokemon> = {};

    for (const poke of allPokemon) {
      for (const type of poke.types) {
        if (!categories[type]) categories[type] = [];
        categories[type].push(poke);
      }
    }

    return { success: true, data: categories };
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Check if it's a database connection error
    if (error instanceof Error && 
        (error.message.includes("Can't reach database server") || 
         error.message.includes("PrismaClientInitializationError"))) {
      return { 
        success: false, 
        error: "Database connection failed. Please try again later." 
      };
    }
    
    // Other errors
    return { 
      success: false, 
      error: "An unexpected error occurred." 
    };
  }
}