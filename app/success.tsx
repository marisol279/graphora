import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import React from "react";

export default function Success() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉</Text>

      <Text style={styles.title}>
        ¡Compra realizada!
      </Text>

      <Text style={styles.subtitle}>
        Tu pedido fue procesado correctamente
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/servicios")}
      >
        <Text style={styles.buttonText}>
          Volver al inicio
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A1A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#D500F9",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});