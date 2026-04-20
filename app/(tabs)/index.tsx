import React, { useRef, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const BG           = "#8FA3D1";
const BG_DARK      = "#7A8FB8";
const INK          = "#0D0D0D";
const WHITE        = "#FFFFFF";
const MUTED        = "rgba(13,13,13,0.50)";
const GLASS        = "rgba(255,255,255,0.18)";
const GLASS_BORDER = "rgba(255,255,255,0.38)";

const RAINBOW: readonly [string, string, ...string[]] = [
  "#FF3B3B", "#FF8C00", "#FFD93D", "#00C853", "#00B0FF", "#D500F9", "#FF2DA3",
];

const STEP_COLORS: Array<readonly [string, string]> = [
  ["#FF3B3B", "#FF8C00"],
  ["#FFD93D", "#00C853"],
  ["#00B0FF", "#D500F9"],
  ["#D500F9", "#FF2DA3"],
];

const STEPS = [
  { num: "01", title: "Consulta inicial", desc: "Me contás tu idea, referencias y lo que querés transmitir.", icon: "💬" },
  { num: "02", title: "Boceto",           desc: "Un boceto inicial para validar la dirección antes de avanzar.", icon: "✏️" },
  { num: "03", title: "Revisión",         desc: "Ajustamos juntos cada detalle hasta que quede perfecto.", icon: "🔍" },
  { num: "04", title: "Entrega",          desc: "Archivos en alta resolución listos para imprimir o usar.", icon: "✨" },
];

// ── Animated step card ────────────────────────────────────────
function StepCard({ step, index, colors }: {
  step: typeof STEPS[0];
  index: number;
  colors: readonly [string, string];
}) {
  const anim  = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 130,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: index * 130,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.stepCard,
        {
          opacity: anim,
          transform: [
            { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [-30, 0] }) },
            { scale },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.stepCardGradient}
      >
        {/* Top row: número + emoji */}
        <View style={styles.stepCardTop}>
          <Text style={styles.stepCardNum}>{step.num}</Text>
          <Text style={styles.stepCardIcon}>{step.icon}</Text>
        </View>

        {/* Título */}
        <Text style={styles.stepCardTitle}>{step.title}</Text>

        {/* Descripción */}
        <Text style={styles.stepCardDesc}>{step.desc}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

// ── Componente principal ──────────────────────────────────────
export default function HomeScreen() {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={[BG, "#9AADD0", BG_DARK]} style={styles.root}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── NAV ─────────────────────────────────────────── */}
        <View style={styles.nav}>
          <Text style={styles.navLogo}>Graphora{"\n"}Studios</Text>
          <View style={styles.navDot} />
        </View>

        {/* ── HERO ─────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.hero,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
          ]}
        >
          {/* Splash arcoíris */}
          <View style={styles.splashRing} pointerEvents="none">
            {RAINBOW.map((color, i) => (
              <View
                key={i}
                style={[
                  styles.splashBlob,
                  {
                    backgroundColor: color,
                    transform: [
                      { rotate: `${i * 51.4}deg` },
                      { translateX: width * 0.17 },
                      { scaleX: 2.6 },
                      { scaleY: 0.45 },
                    ],
                    opacity: 0.45,
                  },
                ]}
              />
            ))}
            <View style={styles.logoCircle}>
              <View style={styles.bezierLeft} />
              <View style={styles.bezierRight} />
              <View style={styles.nibTip} />
              <View style={styles.nibBody} />
              <View style={styles.nibBase} />
            </View>
          </View>

          {/* Pill */}
          <View style={styles.pill}>
            <View style={styles.pillDot} />
            <Text style={styles.pillText}>Ilustración digital · Stickers · Branding</Text>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>
            Tu idea{"\n"}merece{"\n"}
            <Text style={styles.headlineAccent}>cobrar{"\n"}vida.</Text>
          </Text>

          <Text style={styles.sub}>
            Transformo conceptos en ilustraciones únicas — kawaii,
            anime y diseños personalizados para tu marca o proyecto.
          </Text>

          
        </Animated.View>

        {/* ── RAINBOW BAR ─────────────────────────────────── */}
        <RainbowBar style={styles.rainbowBar} />

        {/* ── PROCESO ──────────────────────────────────────── */}
        <View style={styles.processSection}>

          {/* Header */}
          <View style={styles.processHeader}>
            <Text style={styles.sectionTag}>PROCESO</Text>
            <Text style={styles.sectionHeading}>4 pasos.{"\n"}1 resultado{"\n"}increíble.</Text>
          </View>

          {/* Cards en grid 2×2 */}
          <View style={styles.stepGrid}>
            {STEPS.map((step, i) => (
              <StepCard key={i} step={step} index={i} colors={STEP_COLORS[i]} />
            ))}
          </View>
        </View>

        {/* ── RAINBOW BAR ─────────────────────────────────── */}
        <RainbowBar style={styles.rainbowBar} />

        {/* ── FOOTER ───────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Graphora Studios</Text>
          <Text style={styles.footerSub}>Diseño e ilustración digital · 2026</Text>
          <View style={styles.footerLine} />
          <Text style={styles.footerCopy}>Hecho con amor y muchos colores ✦</Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

// ── Rainbow bar ───────────────────────────────────────────────
function RainbowBar({ style }: { style?: object }) {
  return (
    <LinearGradient
      colors={RAINBOW}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.rainbowBarBase, style]}
    />
  );
}

// ── Styles ────────────────────────────────────────────────────
const CARD_W = (width - 28 * 2 - 12) / 2;

const styles = StyleSheet.create({
  root:   { flex: 1 },
  scroll: { paddingBottom: 60 },

  // NAV
  nav: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingTop: 58,
    paddingBottom: 10,
  },
  navLogo: {
    fontSize: 15,
    fontWeight: "800",
    color: INK,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    lineHeight: 20,
  },
  navDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: INK,
    marginTop: 5,
  },

  // HERO
  hero: {
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 32,
    minHeight: height * 0.44,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  splashRing: {
    position: "absolute",
    top: -20,
    right: -30,
    width: width * 0.55,
    height: width * 0.55,
    alignItems: "center",
    justifyContent: "center",
  },
  splashBlob: {
    position: "absolute",
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
  },
  logoCircle: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    backgroundColor: INK,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  bezierLeft: {
    position: "absolute",
    top: "28%",
    left: "12%",
    width: "38%",
    height: 2,
    backgroundColor: WHITE,
    borderRadius: 2,
    transform: [{ rotate: "-18deg" }],
    opacity: 0.85,
  },
  bezierRight: {
    position: "absolute",
    top: "28%",
    right: "10%",
    width: "38%",
    height: 2,
    backgroundColor: WHITE,
    borderRadius: 2,
    transform: [{ rotate: "18deg" }],
    opacity: 0.85,
  },
  nibTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 22,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: WHITE,
    marginTop: 14,
  },
  nibBody: { width: 20, height: 10, backgroundColor: WHITE },
  nibBase: { width: 26, height: 6, backgroundColor: WHITE, borderRadius: 2, marginTop: 2 },

  // Pill
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    borderRadius: 40,
    paddingHorizontal: 14,
    paddingVertical: 7,
    gap: 8,
    marginBottom: 22,
  },
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#00C853" },
  pillText: { fontSize: 11, fontWeight: "600", color: INK, letterSpacing: 0.2 },

  // Headline
  headline: {
    fontSize: 54,
    fontWeight: "900",
    color: INK,
    lineHeight: 58,
    letterSpacing: -1.5,
    marginBottom: 20,
  },
  headlineAccent: { color: WHITE },

  sub: {
    fontSize: 14,
    lineHeight: 22,
    color: MUTED,
    marginBottom: 32,
    maxWidth: width * 0.78,
  },

  // CTA
  heroCta: { alignSelf: "flex-start", borderRadius: 14, overflow: "hidden" },
  heroCtaGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 15,
  },
  heroCtaText: { color: WHITE, fontSize: 15, fontWeight: "700", letterSpacing: 0.2 },
  heroCtaArrow: { color: WHITE, fontSize: 18 },

  // RAINBOW BAR
  rainbowBarBase: { height: 3, borderRadius: 2 },
  rainbowBar: { marginHorizontal: 28, marginVertical: 2 },

  // PROCESO
  processSection: {
    paddingHorizontal: 28,
    paddingTop: 44,
    paddingBottom: 8,
  },
  processHeader: {
    marginBottom: 28,
  },
  sectionTag: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    color: MUTED,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 38,
    fontWeight: "900",
    color: INK,
    lineHeight: 43,
    letterSpacing: -1.2,
  },

  // Step grid 2×2
  stepGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  stepCard: {
    width: CARD_W,
    borderRadius: 20,
    overflow: "hidden",
  },
  stepCardGradient: {
    padding: 20,
    minHeight: 160,
    justifyContent: "space-between",
  },
  stepCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  stepCardNum: {
    fontSize: 13,
    fontWeight: "900",
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 1,
  },
  stepCardIcon: {
    fontSize: 22,
  },
  stepCardTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: WHITE,
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  stepCardDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: "rgba(255,255,255,0.82)",
  },

  // FOOTER
  footer: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 24,
    gap: 6,
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: "900",
    color: INK,
    letterSpacing: -0.5,
    textTransform: "uppercase",
  },
  footerSub: { fontSize: 12, color: MUTED, letterSpacing: 0.3 },
  footerLine: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(13,13,13,0.2)",
    marginVertical: 8,
  },
  footerCopy: { fontSize: 12, color: MUTED },
});