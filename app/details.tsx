import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();

  console.log("params: ", params);
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      <Text>Pokemon details</Text>
      <Text>Name: {params.name}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
