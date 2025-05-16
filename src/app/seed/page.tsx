import { seedPokemon } from '../actions/seed';

   export default function SeedPage() {
    async function handleSeed() {
        'use server';
        const range = Array.from({ length: 150 }, (_, i) => i + 1);
        await seedPokemon(range);
      }

     return (
       <form action={handleSeed}>
         <button type="submit">Seed Pokémon</button>
       </form>
     );
   }