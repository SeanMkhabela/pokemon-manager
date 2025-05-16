'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/PokemonCard.module.css';

type PokemonCardProps = {
  pokedexId: number;
  name: string;
  spriteUrl: string;
  types: string[];
  index: number;
};

export function PokemonCard({ pokedexId, name, spriteUrl, types, index }: PokemonCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Get the type-specific background class
  const getTypeClassName = (type: string): string => {
    const typeClass = `typeBg${type.charAt(0).toUpperCase() + type.slice(1)}`;
    return styles[typeClass] || '';
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 50);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Get primary type for background
  const primaryType = types[0];
  const typeClassName = getTypeClassName(primaryType);
  
  return (
    <div 
      className={`${styles.card} ${typeClassName} ${styles.fadeIn} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.cardContent}>
        <div className={styles.pokedexNumber}>
          #{pokedexId}
        </div>
        
        <div className={styles.contentWrapper}>
          <img 
            src={spriteUrl} 
            alt={name} 
            className={styles.sprite}
          />
          
          <h3 className={styles.name}>{name}</h3>
          
          <div className={styles.typeContainer}>
            {types.map((type) => (
              <span 
                key={type} 
                className={styles.typeTag}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 