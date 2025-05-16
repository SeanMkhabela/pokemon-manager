import { z } from 'zod';

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({ front_default: z.string().url() }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({ name: z.string() }),
    })
  ),
});

export type Pokemon = z.infer<typeof PokemonSchema>;