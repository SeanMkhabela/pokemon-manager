'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { seedPokemon } from '@/app/actions/seed';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from '@/styles/PokemonHeader.module.css';

// Array of some popular Pokémon sprite URLs
const POKEMON_SPRITES = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', // Pikachu
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',  // Bulbasaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',  // Charmander
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',  // Squirtle
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png', // Snorlax
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',  // Jigglypuff
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',  // Psyduck
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png', // Eevee
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',  // Gengar
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png', // Mewtwo
];

// Result type from the seedPokemon function
type SeedResult = {
  total: number;
  added: number;
  skipped: number;
  failed: number;
};

export function PokemonHeader() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(10);
  const [startingId, setStartingId] = useState(1);
  const [isSeedDialogOpen, setIsSeedDialogOpen] = useState(false);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
  const [seedResults, setSeedResults] = useState<SeedResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Cycle through Pokémon sprites during loading
  useEffect(() => {
    if (!isLoading) return;
    
    const intervalId = setInterval(() => {
      setCurrentSpriteIndex((prevIndex) => (prevIndex + 1) % POKEMON_SPRITES.length);
    }, 800);
    
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const handleSeedPokemon = async () => {
    setIsLoading(true);
    setProgress(0);
    setSeedResults(null);
    setShowResults(false);
    
    // Generate array of IDs to seed starting from the user-selected ID
    const pokemonIds = Array.from({ length: pokemonCount }, (_, i) => i + startingId);
    const batchSize = 10; // Increased batch size for faster processing
    const batches = [];
    
    // Split into batches for progress updates
    for (let i = 0; i < pokemonIds.length; i += batchSize) {
      batches.push(pokemonIds.slice(i, i + batchSize));
    }
    
    const overallResults: SeedResult = { total: pokemonIds.length, added: 0, skipped: 0, failed: 0 };
    
    // Process each batch and update progress
    for (let i = 0; i < batches.length; i++) {
      const batchResults = await seedPokemon(batches[i]);
      
      // Accumulate results
      overallResults.added += batchResults.added;
      overallResults.skipped += batchResults.skipped;
      overallResults.failed += batchResults.failed;
      
      // Update progress
      setProgress(Math.round(((i + 1) / batches.length) * 100));
    }
    
    // Store the final results
    setSeedResults(overallResults);
    setShowResults(true);
    setIsLoading(false);
    
    // Don't automatically close the dialog so user can see results
    if (overallResults.added === 0 && overallResults.failed === 0) {
      // If nothing was added or failed, auto-close after a delay
      setTimeout(() => {
        setIsSeedDialogOpen(false);
        // Force a page reload to ensure UI is updated properly
        window.location.reload();
      }, 2000);
    }
  };

  const handleCloseResults = () => {
    setIsSeedDialogOpen(false);
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Pokédex</h1>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Dialog open={isSeedDialogOpen} onOpenChange={setIsSeedDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Add Pokémon</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  {showResults ? 'Seeding Results' : 'Seed Pokémon'}
                </DialogTitle>
              </DialogHeader>
              
              <div className={styles.dialogContent}>
                {isLoading && (
                  <div className={styles.spriteContainer}>
                    <img
                      src={POKEMON_SPRITES[currentSpriteIndex]}
                      alt="Loading Pokémon"
                      className={styles.spriteImage}
                    />
                    <div className={styles.pokeballSpin}>
                      <div className={styles.pokeball}></div>
                    </div>
                  </div>
                )}
                
                {showResults && seedResults ? (
                  <div className={styles.resultsContainer}>
                    <h3 className={styles.resultsTitle}>Seeding Complete</h3>
                    <div className={styles.resultsGrid}>
                      <div className={styles.resultTotal}>
                        <span className={styles.resultLabel}>Total:</span> {seedResults.total}
                      </div>
                      <div className={styles.resultAdded}>
                        <span className={styles.resultLabel}>Added:</span> {seedResults.added}
                      </div>
                      <div className={styles.resultSkipped}>
                        <span className={styles.resultLabel}>Skipped:</span> {seedResults.skipped}
                      </div>
                      <div className={styles.resultFailed}>
                        <span className={styles.resultLabel}>Failed:</span> {seedResults.failed}
                      </div>
                    </div>
                    <p className={styles.resultMessage}>
                      {seedResults.added > 0 
                        ? 'New Pokémon have been added to your Pokédex!' 
                        : 'All requested Pokémon were already in your Pokédex.'}
                    </p>
                  </div>
                ) : !isLoading && (
                  <div className="space-y-4">
                    <div className={styles.inputGroup}>
                      <label htmlFor="starting-id" className={styles.inputLabel}>
                        Starting ID:
                      </label>
                      <input
                        id="starting-id"
                        type="number"
                        min="1"
                        max="1000"
                        value={startingId}
                        onChange={(e) => setStartingId(parseInt(e.target.value))}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="pokemon-count" className={styles.inputLabel}>
                        Number to Add:
                      </label>
                      <input
                        id="pokemon-count"
                        type="number"
                        min="1"
                        max="151"
                        value={pokemonCount}
                        onChange={(e) => setPokemonCount(parseInt(e.target.value))}
                        className={styles.input}
                      />
                    </div>
                    
                    <div className={styles.infoBox}>
                      <p>Will add Pokémon #{startingId} through #{startingId + pokemonCount - 1}</p>
                      <p className={styles.helperText}>
                        If you already have some of these Pokémon, they will be skipped.
                      </p>
                    </div>
                  </div>
                )}
                
                {isLoading && (
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className={styles.progressText}>
                      Seeding Pokémon... {progress}%
                    </p>
                  </div>
                )}
              </div>
              
              <DialogFooter className="sm:justify-end">
                {showResults ? (
                  <Button onClick={handleCloseResults}>
                    Close & Refresh
                  </Button>
                ) : (
                  <>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isLoading}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button 
                      onClick={handleSeedPokemon} 
                      disabled={isLoading || pokemonCount < 1}
                      className={isLoading ? styles.pulse : ""}
                    >
                      {isLoading ? 'Processing...' : 'Seed Pokémon'}
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
} 