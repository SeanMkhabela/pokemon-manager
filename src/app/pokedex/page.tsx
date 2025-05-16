import { PokemonHeader } from '@/components/PokemonHeader';
import { PokemonCard } from '@/components/PokemonCard';
import { DatabaseErrorBoundary } from '@/components/DatabaseErrorBoundary';
import { getCategorizedPokemon } from '../actions/getCategorizedPokemon';
import { redirect } from 'next/navigation';
import styles from '@/styles/Pokedex.module.css';

export default async function PokedexPage() {
  // Get categorized Pokémon data from the database with error handling
  const response = await getCategorizedPokemon();
  
  // If there was a database error, redirect with error parameter
  if (!response.success) {
    console.error('Database error in Pokédex page:', response.error);
    redirect('/pokedex?db_error=true');
  }
  
  // Get categories and sort them alphabetically
  const categories = response.data || {};
  const types = Object.keys(categories).sort();

  return (
    <DatabaseErrorBoundary>
      <div className={styles.pageContainer}>
        <PokemonHeader />
        
        <div className={styles.contentContainer}>
          {types.length > 0 ? (
            types.map(type => (
              <section key={type}>
                <h2 className="text-2xl font-bold mb-4 capitalize">{type} Type</h2>
                
                <div className={styles.grid}>
                  {categories[type]?.map(pokemon => (
                    <PokemonCard
                      key={pokemon.pokedexId}
                      pokedexId={pokemon.pokedexId}
                      name={pokemon.name}
                      spriteUrl={pokemon.spriteUrl}
                      types={pokemon.types}
                      index={categories[type].indexOf(pokemon)}
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p className="text-lg">No Pokémon found. Try adding some using the &quot;Add Pokémon&quot; button.</p>
            </div>
          )}
        </div>
      </div>
    </DatabaseErrorBoundary>
  );
}