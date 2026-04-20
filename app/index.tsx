import { colorsByType } from "@/lib/colors";
import { Pokemon } from "@/types/pokemon";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
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
        data.results.map(async (pokemon: Pokemon) => {
          const res = await fetch(pokemon.url);
          const dto = await res.json();

          return {
            name: pokemon.name,
            image: dto.sprites.front_default,
            imageBack: dto.sprites.back_default,
            type: dto.types,
          };
        }),
      );
      // console.log("data: ", dtoPekemons);
      setPokemons(dtoPekemons);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Pokemon</Text>
      </View>

      <View style={styles.container}>
        {pokemons.map((pokemon) => (
          <Link
            href={{ pathname: "/details", params: { name: pokemon.name } }}
            key={pokemon.name}
            // @ts-ignore
            style={{
              backgroundColor:
                colorsByType[pokemon.type[0].type.name] || "#7F8C8D",
              padding: 20,
              borderRadius: 20,
              width: "45%",
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: pokemon.image }}
                  style={{ width: 170, height: 170 }}
                />
                {/* <Image
                  source={{ uri: pokemon.imageBack }}
                  style={{ width: 150, height: 150 }}
                /> */}
              </View>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.type}>{pokemon.type[0].type.name}</Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 16,
  },
  link: {
    width: "50%",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C3E50",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
  },
});
