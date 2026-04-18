import { PokemonType } from "@/types/pokemon";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10",
      );
      const data = await response.json();

      const dtoPekemons = await Promise.all(
        data.results.map(async (pokemon: PokemonType) => {
          const res = await fetch(pokemon.url);
          const dto = await res.json();

          return {
            name: pokemon.name,
            image: dto.sprites.front_default,
          };
        }),
      );
      console.log("data: ", dtoPekemons);
      setPokemons(dtoPekemons);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <ScrollView>
      <Text>Pokemons</Text>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
          <Text>{pokemon.image}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
