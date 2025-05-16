import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">The Pokémon Bestiary</h1>
        
        <div className="space-y-4 text-lg">
          <p>My Lord, I humbly present unto thee this Pokémon Manager, crafted with mine own hands in hopes of joining thy noble guild of SpaceCode Studios.</p>
          
          <p>I have ventured forth unto the domains of Next.js 15, embraced the wisdom of TypeScript, and harnessed the power of Server Actions to build this sacred compendium of creatures.</p>
          
          <p>As commanded, I have gathered data from the Pokédex API, validated it with the mighty Zod, stored it within a Neon PostgreSQL database through Prisma, and presented it with the elegant components of Shadcn/UI.</p>
          
          <p>The creatures are categorized by their elemental types, as ordained in thy decree, and the interface doth respond to the light or darkness of thy preference.</p>
        </div>
        
        <div className="flex justify-center w-full mt-6">
          <Link
            href="/pokedex"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-lg h-16 px-8"
          >
            ENTER THE POKÉDEX
          </Link>
        </div>
        
        <p className="text-sm font-[family-name:var(--font-geist-mono)] mt-6 text-gray-600 dark:text-gray-400">
          I await thy judgment with great anticipation, and pray this humble creation meets thy standards of excellence.
        </p>
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <p>Crafted in the year two thousand and twenty-three</p>
      </footer>
    </div>
  );
}
