import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Nosotros() {
  const [section, setSection] = useState<"mision" | "vision">("mision");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Nosotros</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, section === "mision" && styles.activeButton]}
          onPress={() => setSection("mision")}
        >
          <Text style={styles.buttonText}>Misión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, section === "vision" && styles.activeButton]}
          onPress={() => setSection("vision")}
        >
          <Text style={styles.buttonText}>Visión</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        {section === "mision"
          ? "En Graphora Studios, liderado por Luciana Carballo, la misión es transformar ideas en ilustraciones únicas que transmitan identidad, emoción y creatividad en cada diseño."
          : "La visión es convertirse en un estudio creativo reconocido por su estilo auténtico, donde cada ilustración cuente una historia y conecte con la esencia de cada cliente."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },

  activeButton: {
    backgroundColor: "#6c5ce7",
  },

  buttonText: {
    color: "#0f0f0fff",
    fontWeight: "600",
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});