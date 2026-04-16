import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function StickerCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  title: {
    fontSize: 13,
    textAlign: "center",
    marginVertical: 5,
  },
  price: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
  },
});