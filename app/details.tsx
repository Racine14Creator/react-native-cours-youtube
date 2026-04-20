import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Details() {
  const [pokemonDetail, setPokemonDetail] = React.useState(null);
  const params = useLocalSearchParams();

  console.log("params: ", params);

  // useEffect(() => {
  //   if (params.name) {
  //     fetchPokemonDetails(params.name);
  //   }
  // }, [params.name]);

  // const fetchPokemonDetails = async (name: string) => {
  //   try {
  //     await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Pokemon details: ", data);
  //         setPokemonDetail(data);
  //       });
  //   } catch (error) {
  //     console.log("Error fetching pokemon details: ", error);
  //   }
  // };
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text style={styles.heading}>Pokemon details</Text>
      <Text style={styles.subheading}>Name: {params.name}</Text>
      {/* <Text>{JSON.stringify(pokemonDetail, null, 2)}</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
  },
});
