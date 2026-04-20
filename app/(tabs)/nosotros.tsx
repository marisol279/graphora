/* eslint-disable import/no-duplicates */
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";


// Colores del Home
const LAVENDER = "#8B9DC3";
const LAVENDER_DARK = "#7A8DB5";
const BLACK = "#111111";
const WHITE = "#FFFFFF";

// ✅ FIX 1: tipado correcto
const GRADIENT = [LAVENDER, "#9AADD0", LAVENDER_DARK] as const;

// ✅ FIX 2: tipado correcto
const RAINBOW = [
  "#FF3B3B",
  "#FF8C00",
  "#FFD93D",
  "#00C853",
  "#00B0FF",
  "#D500F9",
  "#FF2DA3",
] as const;

export default function Nosotros() {
  const [section, setSection] = useState<"mision" | "vision">("mision");

  return (
    <LinearGradient colors={GRADIENT} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        

        <Text style={styles.title}>
          Creamos ilustraciones{"\n"}
          <Text style={styles.titleAccent}>con identidad</Text>
        </Text>

        <Text style={styles.subtitle}>
          En Graphora Studios transformamos ideas en piezas visuales que conectan, comunican y destacan.
        </Text>

        {/* ── BOTONES ── */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              section === "mision" && styles.activeButton,
            ]}
            onPress={() => setSection("mision")}
          >
            <Text
              style={[
                styles.buttonText,
                section === "mision" && styles.activeButtonText,
              ]}
            >
              Misión
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              section === "vision" && styles.activeButton,
            ]}
            onPress={() => setSection("vision")}
          >
            <Text
              style={[
                styles.buttonText,
                section === "vision" && styles.activeButtonText,
              ]}
            >
              Visión
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── CARD ── */}
        <View style={styles.card}>
          <Text style={styles.description}>
            {section === "mision"
              ? "Nuestra misión es transformar ideas en ilustraciones únicas que transmitan identidad, emoción y creatividad. Cada proyecto se desarrolla de forma personalizada, cuidando cada detalle para lograr un resultado auténtico."
              : "Nuestra visión es convertirnos en un estudio creativo reconocido por su estilo distintivo y su capacidad de contar historias a través del arte, generando conexión real con cada cliente."}
          </Text>
        </View>

        {/* ── VALORES ── */}
        <View style={styles.valuesContainer}>
          <Text style={styles.valuesTitle}>Valores</Text>

          <View style={styles.valuesGrid}>
            {[
              { emoji: "🎨", text: "Creatividad" },
              { emoji: "💡", text: "Originalidad" },
              { emoji: "🤝", text: "Compromiso" },
              { emoji: "✨", text: "Detalle" },
            ].map((item, i) => (
              <View key={i} style={styles.valueCard}>
                <Text style={styles.valueEmoji}>{item.emoji}</Text>
                <Text style={styles.valueText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── RAINBOW ── */}
        <LinearGradient
          colors={RAINBOW}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.rainbow}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 24,
    paddingBottom: 60,
    alignItems: "center",
  },

  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: "rgba(17,17,17,0.5)",
    marginBottom: 10,
    textAlign: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: BLACK,
    textAlign: "center",
    lineHeight: 44,
    marginBottom: 14,
    fontFamily: "serif",
  },

  titleAccent: {
    color: "#D500F9",
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(17,17,17,0.75)",
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },

  activeButton: {
    backgroundColor: BLACK,
  },

  buttonText: {
    color: BLACK,
    fontWeight: "600",
  },

  activeButtonText: {
    color: WHITE,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    marginBottom: 30,
    width: "100%",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(17,17,17,0.8)",
    textAlign: "center",
  },

  valuesContainer: {
    width: "100%",
    marginBottom: 30,
  },

  valuesTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: BLACK,
    marginBottom: 16,
    textAlign: "center",
  },

  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  valueCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
  },

  valueEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },

  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: BLACK,
  },

  rainbow: {
    height: 5,
    borderRadius: 3,
    marginTop: 10,
    width: "100%",
  },
});