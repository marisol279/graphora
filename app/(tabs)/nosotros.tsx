import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ── Palette (igual al HomeScreen) ─────────────────────────────
const BG_TOP = "#1A0533";
const BG_MID = "#0E1A3A";
const BG_BOT = "#0A0A1A";
const INK_LIGHT = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.48)";
const GLASS = "rgba(255,255,255,0.07)";
const GLASS_BORDER = "rgba(255,255,255,0.18)";
const BLACK = "#111111";

const GRADIENT = [BG_TOP, BG_MID, BG_BOT] as const;

const RAINBOW = [
  "#FF3B3B", "#FF8C00", "#FFD93D",
  "#00E676", "#00B0FF", "#D500F9", "#FF2DA3",
] as const;

// Gradientes para las value cards
const VALUE_GRADIENTS: Array<readonly [string, string]> = [
  ["#FF3B3B", "#FF8C00"],
  ["#FFD93D", "#00E676"],
  ["#00B0FF", "#D500F9"],
  ["#D500F9", "#FF2DA3"],
];

const VALUES = [
  { emoji: "🎨", text: "Creatividad" },
  { emoji: "💡", text: "Originalidad" },
  { emoji: "🤝", text: "Compromiso" },
  { emoji: "✨", text: "Detalle" },
];

// ── Animated value card ───────────────────────────────────────
function ValueCard({ item, index, colors }: {
  item: { emoji: string; text: string };
  index: number;
  colors: readonly [string, string];
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.84)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1,
        duration: 550,
        delay: index * 120,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: index * 120,
        tension: 70,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.valueCard,
        {
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
            { scale },
          ],
        },
      ]}
    >
      {/* Glow detrás */}
      <View style={[styles.cardGlow, { backgroundColor: colors[0] }]} />

      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.valueCardGradient}
      >
        {/* Shine */}
        <LinearGradient
          colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0.00)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <Text style={styles.valueEmoji}>{item.emoji}</Text>
        <Text style={styles.valueText}>{item.text}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

// ── Componente principal ──────────────────────────────────────
export default function Nosotros() {
  const [section, setSection] = useState<"mision" | "vision">("mision");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  // Animación al cambiar sección
  const cardAnim = useRef(new Animated.Value(1)).current;
  const switchSection = (s: "mision" | "vision") => {
    Animated.sequence([
      Animated.timing(cardAnim, { toValue: 0, duration: 140, useNativeDriver: true }),
      Animated.timing(cardAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
    setSection(s);
  };

  return (
    <LinearGradient colors={GRADIENT} style={{ flex: 1 }}>

      {/* Ambient orbs */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />
      <View style={styles.orb3} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], width: "100%" }}
        >
          {/* Tag */}
          <View style={styles.tagRow}>
            <View style={styles.tagDot} />
            <Text style={styles.label}>NOSOTROS</Text>
          </View>

          {/* Título */}
          <Text style={styles.title}>
            Creamos ilustraciones{"\n"}
            <Text style={styles.titleAccent}>con identidad</Text>
          </Text>

          <Text style={styles.subtitle}>
            En Graphora Studios transformamos ideas en piezas visuales que conectan, comunican y destacan.
          </Text>

          {/* ── BOTONES ── */}
          <View style={styles.buttonContainer}>
            {(["mision", "vision"] as const).map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => switchSection(s)}
                activeOpacity={0.8}
                style={styles.btnWrapper}
              >
                {section === s ? (
                  <LinearGradient
                    colors={["#FF3B3B", "#D500F9"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.activeButton}
                  >
                    <Text style={styles.activeButtonText}>
                      {s === "mision" ? "Misión" : "Visión"}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {s === "mision" ? "Misión" : "Visión"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* ── CARD ── */}
          <Animated.View style={[styles.card, { opacity: cardAnim }]}>
            {/* Borde arcoíris animado */}
            <LinearGradient
              colors={["#FF3B3B", "#FFD93D", "#00E676", "#00B0FF", "#D500F9", "#FF2DA3"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardBorderGradient}
            >
              <View style={styles.cardInner}>
                {/* Icono grande */}
                <Text style={styles.cardBigEmoji}>
                  {section === "mision" ? "🎯" : "🚀"}
                </Text>
                <Text style={styles.cardSectionLabel}>
                  {section === "mision" ? "MISIÓN" : "VISIÓN"}
                </Text>
                <Text style={styles.description}>
                  {section === "mision"
                    ? "Nuestra misión es transformar ideas en ilustraciones únicas que transmitan identidad, emoción y creatividad. Cada proyecto se desarrolla de forma personalizada, cuidando cada detalle para lograr un resultado auténtico."
                    : "Nuestra visión es convertirnos en un estudio creativo reconocido por su estilo distintivo y su capacidad de contar historias a través del arte, generando conexión real con cada cliente."}
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* ── VALORES ── */}
          <View style={styles.valuesContainer}>
            <View style={styles.valuesHeaderRow}>
              <View style={[styles.tagDot, { backgroundColor: "#FFD93D" }]} />
              <Text style={styles.valuesTitle}>Valores</Text>
            </View>

            <View style={styles.valuesGrid}>
              {VALUES.map((item, i) => (
                <ValueCard key={i} item={item} index={i} colors={VALUE_GRADIENTS[i]} />
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
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const CARD_W = (width - 48 - 12) / 2;

const styles = StyleSheet.create({
  scroll: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 60,
    alignItems: "center",
  },

  // Orbs
  orb1: {
    position: "absolute", top: -60, right: -50,
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: "#D500F9", opacity: 0.16,
  },
  orb2: {
    position: "absolute", top: 280, left: -80,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: "#FF3B3B", opacity: 0.11,
  },
  orb3: {
    position: "absolute", top: 560, right: -60,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: "#00B0FF", opacity: 0.12,
  },

  // Tag
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
    alignSelf: "center",
  },
  tagDot: {
    width: 5, height: 5, borderRadius: 2.5,
    backgroundColor: "#D500F9",
  },
  label: {
    fontSize: 10, fontWeight: "800",
    letterSpacing: 3, color: MUTED,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: INK_LIGHT,
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -0.8,
    marginBottom: 14,
  },
  titleAccent: {
    color: "#FFD93D",
  },

  subtitle: {
    fontSize: 15,
    color: MUTED,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 8,
  },

  // Botones
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  btnWrapper: {
    borderRadius: 30,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 30,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
  },
  activeButton: {
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 30,
  },
  buttonText: {
    color: MUTED,
    fontWeight: "700",
    fontSize: 14,
  },
  activeButtonText: {
    color: INK_LIGHT,
    fontWeight: "800",
    fontSize: 14,
  },

  // Card con borde gradiente
  card: {
    width: "100%",
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 32,
  },
  cardBorderGradient: {
    padding: 2,
    borderRadius: 22,
  },
  cardInner: {
    backgroundColor: "rgba(14, 8, 30, 0.92)",
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
  },
  cardBigEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardSectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    color: MUTED,
    marginBottom: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "rgba(255,255,255,0.80)",
    textAlign: "center",
  },

  // Valores
  valuesContainer: {
    width: "100%",
    marginBottom: 30,
  },
  valuesHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  valuesTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: INK_LIGHT,
    letterSpacing: -0.4,
  },
  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  valueCard: {
    width: CARD_W,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardGlow: {
    position: "absolute",
    top: 8, left: 8, right: 8, bottom: -6,
    borderRadius: 20,
    opacity: 0.20,
    zIndex: -1,
  },
  valueCardGradient: {
    padding: 22,
    minHeight: 110,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 20,
    overflow: "hidden",
  },
  valueEmoji: {
    fontSize: 30,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "900",
    color: INK_LIGHT,
    letterSpacing: -0.2,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  rainbow: {
    height: 4,
    borderRadius: 2,
    width: "100%",
  },
});