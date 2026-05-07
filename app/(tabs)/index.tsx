import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// ── Palette ───────────────────────────────────────────────────
const BG_TOP      = "#1A0533";   // deep violet-black
const BG_MID      = "#0E1A3A";   // midnight blue
const BG_BOT      = "#0A0A1A";   // near-black
const INK_LIGHT   = "#FFFFFF";
const MUTED       = "rgba(255,255,255,0.48)";
const GLASS       = "rgba(255,255,255,0.07)";
const GLASS_BORDER= "rgba(255,255,255,0.18)";

const RAINBOW: readonly [string, string, ...string[]] = [
  "#FF3B3B","#FF8C00","#FFD93D","#00E676","#00B0FF","#D500F9","#FF2DA3",
];

// Card gradients — vivid, high-saturation pairs
const STEP_COLORS: Array<readonly [string, string]> = [
  ["#FF3B3B", "#FF8C00"],   // hot red → orange
  ["#FFD93D", "#00E676"],   // yellow → electric green
  ["#00B0FF", "#D500F9"],   // cyan → purple
  ["#D500F9", "#FF2DA3"],   // purple → hot pink
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
  const scale = useRef(new Animated.Value(0.84)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1,
        duration: 550,
        delay: index * 140,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay: index * 140,
        tension: 70,
        friction: 7,
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
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
            { scale },
          ],
        },
      ]}
    >
      {/* Glow ring behind card */}
      <View style={[styles.cardGlow, { backgroundColor: colors[0], opacity: 0.22 }]} />

      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.stepCardGradient}
      >
        {/* Shine overlay */}
        <LinearGradient
          colors={["rgba(255,255,255,0.22)", "rgba(255,255,255,0.00)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Top row */}
        <View style={styles.stepCardTop}>
          <View style={styles.stepNumBadge}>
            <Text style={styles.stepCardNum}>{step.num}</Text>
          </View>
          <Text style={styles.stepCardIcon}>{step.icon}</Text>
        </View>

        <Text style={styles.stepCardTitle}>{step.title}</Text>
        <Text style={styles.stepCardDesc}>{step.desc}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

// ── Main component ────────────────────────────────────────────
export default function HomeScreen() {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={[BG_TOP, BG_MID, BG_BOT]} style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background ambient orbs */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />
      <View style={styles.orb3} pointerEvents="none" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── NAV ─────────────────────────────────────────── */}
        <View style={styles.nav}>
          <View>
            <Text style={styles.navLogo}>GRAPHORA</Text>
            <Text style={styles.navLogoSub}>STUDIOS</Text>
          </View>
          <View style={styles.navPulse}>
            <View style={styles.navPulseInner} />
          </View>
        </View>

        {/* ── HERO ─────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.hero,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
          ]}
        >
          {/* Splash arcoíris — ahora como rayos luminosos */}
          <View style={styles.splashRing} pointerEvents="none">
            {RAINBOW.map((color, i) => (
              <View
                key={i}
                style={[
                  styles.splashBeam,
                  {
                    backgroundColor: color,
                    transform: [
                      { rotate: `${i * 51.4}deg` },
                      { translateX: width * 0.19 },
                      { scaleX: 3.2 },
                      { scaleY: 0.3 },
                    ],
                    opacity: 0.75,
                  },
                ]}
              />
            ))}
            {/* Central logo circle */}
            <LinearGradient
              colors={["#2A0A5E", "#0D1A5C"]}
              style={styles.logoCircle}
            >
              <View style={styles.penNib}>
                <View style={styles.nibTip} />
                <View style={styles.nibBody} />
                <View style={styles.nibBase} />
              </View>
            </LinearGradient>
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

          {/* CTA */}
          <TouchableOpacity style={styles.heroCta} activeOpacity={0.85}>
            <LinearGradient
              colors={["#FF3B3B", "#D500F9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroCtaGradient}
            >
              <Text style={styles.heroCtaText}>Empezar proyecto</Text>
              <Text style={styles.heroCtaArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* ── RAINBOW BAR ─────────────────────────────────── */}
        <RainbowBar style={styles.rainbowBar} />

        {/* ── PROCESO ──────────────────────────────────────── */}
        <View style={styles.processSection}>

          <View style={styles.processHeader}>
            <View style={styles.tagRow}>
              <View style={styles.tagDot} />
              <Text style={styles.sectionTag}>PROCESO</Text>
            </View>
            <Text style={styles.sectionHeading}>4 pasos.{"\n"}1 resultado{"\n"}increíble.</Text>
          </View>

          {/* Grid 2×2 */}
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
          <LinearGradient
            colors={["#FF3B3B", "#D500F9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.footerLogoGradientMask}
          >
            <Text style={styles.footerLogo}>Graphora Studios</Text>
          </LinearGradient>
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

  // Ambient orbs (blurs via opacity stacking)
  orb1: {
    position: "absolute",
    top: -80,
    right: -60,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#D500F9",
    opacity: 0.18,
  },
  orb2: {
    position: "absolute",
    top: 200,
    left: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#FF3B3B",
    opacity: 0.12,
  },
  orb3: {
    position: "absolute",
    top: 420,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#00B0FF",
    opacity: 0.14,
  },

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
    fontSize: 13,
    fontWeight: "900",
    color: INK_LIGHT,
    letterSpacing: 3,
  },
  navLogoSub: {
    fontSize: 10,
    fontWeight: "700",
    color: MUTED,
    letterSpacing: 3,
    marginTop: 1,
  },
  navPulse: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "rgba(0,230,118,0.5)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  navPulseInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00E676",
  },

  // HERO
  hero: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 36,
    minHeight: height * 0.48,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  splashRing: {
    position: "absolute",
    top: -30,
    right: -40,
    width: width * 0.6,
    height: width * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  splashBeam: {
    position: "absolute",
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
  },
  logoCircle: {
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  penNib: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  nibTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
    marginBottom: 2,
  },
  nibBody: { width: 18, height: 8, backgroundColor: "#FFFFFF", borderRadius: 1 },
  nibBase: { width: 24, height: 5, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 2 },

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
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#00E676" },
  pillText: { fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.75)", letterSpacing: 0.3 },

  // Headline
  headline: {
    fontSize: 54,
    fontWeight: "900",
    color: INK_LIGHT,
    lineHeight: 58,
    letterSpacing: -1.5,
    marginBottom: 20,
  },
  headlineAccent: {
    color: "#FF3B3B",
    
  },

  sub: {
    fontSize: 14,
    lineHeight: 22,
    color: MUTED,
    marginBottom: 32,
    maxWidth: width * 0.78,
  },

  // CTA
  heroCta: { alignSelf: "flex-start", borderRadius: 16, overflow: "hidden" },
  heroCtaGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 15,
  },
  heroCtaText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800", letterSpacing: 0.2 },
  heroCtaArrow: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },

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
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#D500F9",
  },
  sectionTag: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    color: MUTED,
  },
  sectionHeading: {
    fontSize: 38,
    fontWeight: "900",
    color: INK_LIGHT,
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
    borderRadius: 22,
    overflow: "hidden",
  },
  cardGlow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    bottom: -6,
    borderRadius: 22,
    zIndex: -1,
  },
  stepCardGradient: {
    padding: 20,
    minHeight: 168,
    justifyContent: "space-between",
    borderRadius: 22,
    overflow: "hidden",
  },
  stepCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  stepNumBadge: {
    backgroundColor: "rgba(0,0,0,0.20)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stepCardNum: {
    fontSize: 11,
    fontWeight: "900",
    color: "rgba(255,255,255,0.90)",
    letterSpacing: 1.5,
  },
  stepCardIcon: {
    fontSize: 24,
  },
  stepCardTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    marginBottom: 8,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  stepCardDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: "rgba(255,255,255,1)",
  },

  // FOOTER
  footer: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 24,
    gap: 6,
  },
  footerLogoGradientMask: {
    borderRadius: 4,
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    textTransform: "uppercase",
    
  },
  footerSub: { fontSize: 12, color: MUTED, letterSpacing: 0.3 },
  footerLine: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 8,
  },
  footerCopy: { fontSize: 12, color: MUTED },
});