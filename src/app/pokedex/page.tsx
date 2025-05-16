import { prisma } from '@/lib/prisma';
import { PokemonHeader } from '@/components/PokemonHeader';
import { PokemonCard } from '@/components/PokemonCard';
import styles from '@/styles/Pokedex.module.css';

export default async function PokedexPage() {
  const allPokemon = await prisma.pokemon.findMany({
    orderBy: { pokedexId: 'asc' }
  });

  return (
    <div className={styles.pageContainer}>
      <PokemonHeader />
      
      <div className={styles.contentContainer}>
        <div className={styles.grid}>
          {allPokemon.map((pokemon, index) => (
            <PokemonCard
              key={pokemon.pokedexId}
              pokedexId={pokemon.pokedexId}
              name={pokemon.name}
              spriteUrl={pokemon.spriteUrl}
              types={pokemon.types}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}