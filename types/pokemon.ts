export interface Pokemon {
  name: string;
  image: string;
  url: string;
  imageBack: string;
  type: PokemonType[];
}

export interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
