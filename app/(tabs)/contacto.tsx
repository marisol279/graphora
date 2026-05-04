import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ── Palette ───────────────────────────────────────────────────
const BG_TOP       = "#1A0533";
const BG_MID       = "#0E1A3A";
const BG_BOT       = "#0A0A1A";
const INK_LIGHT    = "#FFFFFF";
const MUTED        = "rgba(255,255,255,0.48)";
const GLASS        = "rgba(255,255,255,0.07)";
const GLASS_BORDER = "rgba(255,255,255,0.18)";

const GRADIENT = [BG_TOP, BG_MID, BG_BOT] as const;
const RAINBOW = [
  "#FF3B3B", "#FF8C00", "#FFD93D",
  "#00E676", "#00B0FF", "#D500F9", "#FF2DA3",
] as const;

// ── Animated input field ──────────────────────────────────────
function GlassInput({
  icon, placeholder, value, onChangeText, multiline, index,
}: {
  icon: any; placeholder: string; value: string;
  onChangeText: (t: string) => void;
  multiline?: boolean; index: number;
}) {
  const anim  = useRef(new Animated.Value(0)).current;
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1, duration: 500,
      delay: index * 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        marginBottom: 14,
      }}
    >
      {focused ? (
        <LinearGradient
          colors={["#FF3B3B", "#D500F9"]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.inputBorderGradient}
        >
          <View style={styles.inputInner}>
            <Ionicons name={icon} size={17} color="rgba(255,255,255,0.5)" style={{ marginRight: 10 }} />
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="rgba(255,255,255,0.30)"
              style={[styles.input, multiline && { height: 88, textAlignVertical: "top" }]}
              value={value}
              onChangeText={onChangeText}
              multiline={multiline}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.inputUnfocused}>
          <Ionicons name={icon} size={17} color="rgba(255,255,255,0.35)" style={{ marginRight: 10 }} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.30)"
            style={[styles.input, multiline && { height: 88, textAlignVertical: "top" }]}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
      )}
    </Animated.View>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function Contacto() {
  const [nombre,  setNombre]  = useState("");
  const [email,   setEmail]   = useState("");
  const [mensaje, setMensaje] = useState("");
  const [modalVisible,  setModalVisible]  = useState(false);
  const [modalType, setModalType] = useState<"instagram" | "map" | null>(null);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  const enviarWhatsApp = () => {
    if (!nombre || !email || !mensaje) {
      Alert.alert("Campos incompletos", "Completá todos los campos antes de enviar.");
      return;
    }
    const text = `Hola! Soy ${nombre} (${email}):\n${mensaje}`;
    Linking.openURL(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  return (
    <LinearGradient colors={GRADIENT} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Ambient orbs */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />
      <View style={styles.orb3} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], width: "100%" }}>

          {/* Header */}
          <View style={styles.tagRow}>
            <View style={styles.tagDot} />
            <Text style={styles.tagLabel}>CONTACTO</Text>
          </View>
          <Text style={styles.title}>
            Hablemos de{"\n"}
            <Text style={styles.titleAccent}>tu proyecto.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Completá el formulario y te respondo por WhatsApp.
          </Text>

          {/* Form card con borde gradiente */}
          <LinearGradient
            colors={["#FF3B3B", "#D500F9", "#00B0FF"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.formBorder}
          >
            <View style={styles.formCard}>
              <GlassInput
                icon="person-outline"
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                index={0}
              />
              <GlassInput
                icon="mail-outline"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                index={1}
              />
              <GlassInput
                icon="chatbubble-outline"
                placeholder="Mensaje"
                value={mensaje}
                onChangeText={setMensaje}
                multiline
                index={2}
              />

              {/* WhatsApp CTA */}
              <TouchableOpacity
                onPress={enviarWhatsApp}
                activeOpacity={0.85}
                style={styles.ctaWrapper}
              >
                <LinearGradient
                  colors={["#25D366", "#128C7E"]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.ctaButton}
                >
                  <LinearGradient
                    colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0.00)"]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                  <Text style={styles.ctaText}>Enviar por WhatsApp</Text>
                  <Text style={styles.ctaArrow}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Acciones rápidas */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => { setModalType("instagram"); setModalVisible(true); }}
              activeOpacity={0.82}
            >
              <LinearGradient
                colors={["#F9437A", "#FCAF45"]}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                style={styles.actionIconCircle}
              >
                <Ionicons name="logo-instagram" size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.actionLabel}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => { setModalType("map"); setModalVisible(true); }}
              activeOpacity={0.82}
            >
              <LinearGradient
                colors={["#4285F4", "#0F9D58"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.actionIconCircle}
              >
                <Ionicons name="location-outline" size={20} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.actionLabel}>Ubicación</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
          <View style={styles.infoRow}>
            <View style={styles.infoDot} />
            <Text style={styles.infoText}>Resistencia, Chaco, Argentina</Text>
          </View>

          {/* Rainbow */}
          <LinearGradient
            colors={RAINBOW}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.rainbow}
          />

        </Animated.View>
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="fade" transparent statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={["#FF3B3B", "#D500F9"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.modalBorder}
          >
            <View style={styles.modalContent}>

              {/* Close */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalClose}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>

              {modalType === "instagram" && (
                <>
                  <LinearGradient
                    colors={["#F9437A", "#FCAF45"]}
                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                    style={styles.modalIconCircle}
                  >
                    <Ionicons name="logo-instagram" size={28} color="#FFFFFF" />
                  </LinearGradient>
                  <Text style={styles.modalTitle}>Instagram</Text>
                  <Text style={styles.modalText}>
                    Seguinos para ver nuevos stickers y proyectos 🎨
                  </Text>
                  <TouchableOpacity
                    style={styles.modalCtaWrapper}
                    onPress={() => Linking.openURL("https://instagram.com/")}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={["#F9437A", "#FCAF45"]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.modalCta}
                    >
                      <Text style={styles.modalCtaText}>Abrir Instagram</Text>
                      <Text style={styles.ctaArrow}>→</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

              {modalType === "map" && (
                <>
                  <LinearGradient
                    colors={["#4285F4", "#0F9D58"]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.modalIconCircle}
                  >
                    <Ionicons name="location-outline" size={28} color="#FFFFFF" />
                  </LinearGradient>
                  <Text style={styles.modalTitle}>Ubicación</Text>
                  <Text style={styles.modalText}>
                    Estamos en Resistencia, Chaco 📍
                  </Text>
                  <TouchableOpacity
                    style={styles.modalCtaWrapper}
                    onPress={() => {
                      const query = "Resistencia Chaco Argentina";
                      Linking.openURL(
                        Platform.OS === "web"
                          ? `https://www.google.com/maps/search/?api=1&query=${query}`
                          : `geo:0,0?q=${query}`
                      );
                    }}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={["#4285F4", "#0F9D58"]}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                      style={styles.modalCta}
                    >
                      <Text style={styles.modalCtaText}>Abrir en Maps</Text>
                      <Text style={styles.ctaArrow}>→</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

            </View>
          </LinearGradient>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 68,
    paddingBottom: 60,
    alignItems: "center",
  },

  // Orbs
  orb1: {
    position: "absolute", top: -50, right: -40,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: "#D500F9", opacity: 0.16,
  },
  orb2: {
    position: "absolute", top: 300, left: -60,
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: "#FF3B3B", opacity: 0.11,
  },
  orb3: {
    position: "absolute", bottom: 80, right: -50,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "#00B0FF", opacity: 0.10,
  },

  // Header
  tagRow: {
    flexDirection: "row", alignItems: "center",
    gap: 8, marginBottom: 12, alignSelf: "flex-start",
  },
  tagDot: {
    width: 5, height: 5, borderRadius: 2.5,
    backgroundColor: "#D500F9",
  },
  tagLabel: {
    fontSize: 10, fontWeight: "800",
    letterSpacing: 3, color: MUTED,
  },
  title: {
    fontSize: 38, fontWeight: "900",
    color: INK_LIGHT, letterSpacing: -1,
    lineHeight: 44, marginBottom: 12,
  },
  titleAccent: { color: "#FFD93D" },
  subtitle: {
    fontSize: 14, color: MUTED,
    lineHeight: 21, marginBottom: 28,
  },

  // Form
  formBorder: {
    borderRadius: 22, padding: 2,
    width: "100%", marginBottom: 20,
  },
  formCard: {
    backgroundColor: "rgba(14,8,30,0.94)",
    borderRadius: 20, padding: 20,
  },
  inputBorderGradient: {
    borderRadius: 14, padding: 2,
  },
  inputInner: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(14,8,30,0.95)",
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4,
  },
  inputUnfocused: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: GLASS,
    borderWidth: 1, borderColor: GLASS_BORDER,
    borderRadius: 14, paddingHorizontal: 14, paddingVertical: 4,
  },
  input: {
    flex: 1, paddingVertical: 12,
    fontSize: 14, color: INK_LIGHT,
  },

  // CTA WhatsApp
  ctaWrapper: { borderRadius: 14, overflow: "hidden", marginTop: 4 },
  ctaButton: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 10,
    paddingVertical: 15, borderRadius: 14, overflow: "hidden",
  },
  ctaText: { color: INK_LIGHT, fontSize: 15, fontWeight: "800" },
  ctaArrow: { color: INK_LIGHT, fontSize: 17, fontWeight: "700" },

  // Actions
  actionsRow: {
    flexDirection: "row", gap: 12,
    width: "100%", marginBottom: 18,
  },
  actionCard: {
    flex: 1, alignItems: "center",
    backgroundColor: GLASS,
    borderWidth: 1, borderColor: GLASS_BORDER,
    borderRadius: 18, paddingVertical: 18, gap: 10,
  },
  actionIconCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: "center", justifyContent: "center",
  },
  actionLabel: {
    fontSize: 13, fontWeight: "700", color: MUTED,
  },

  // Info
  infoRow: {
    flexDirection: "row", alignItems: "center",
    gap: 8, marginBottom: 28, alignSelf: "center",
  },
  infoDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: "#00E676",
  },
  infoText: { fontSize: 13, color: MUTED },

  rainbow: { height: 4, borderRadius: 2, width: "100%" },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center", alignItems: "center",
  },
  modalBorder: {
    borderRadius: 26, padding: 2.5,
    width: width * 0.85,
  },
  modalContent: {
    backgroundColor: "rgba(14,8,30,0.97)",
    borderRadius: 24, padding: 28,
    alignItems: "center",
  },
  modalClose: {
    position: "absolute", top: 16, right: 16,
    backgroundColor: GLASS,
    borderWidth: 1, borderColor: GLASS_BORDER,
    borderRadius: 20, width: 34, height: 34,
    alignItems: "center", justifyContent: "center",
  },
  modalCloseText: { color: MUTED, fontSize: 14, fontWeight: "800" },
  modalIconCircle: {
    width: 60, height: 60, borderRadius: 30,
    alignItems: "center", justifyContent: "center",
    marginBottom: 16, marginTop: 8,
  },
  modalTitle: {
    fontSize: 22, fontWeight: "900",
    color: INK_LIGHT, letterSpacing: -0.5,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14, color: MUTED,
    textAlign: "center", lineHeight: 21,
    marginBottom: 22,
  },
  modalCtaWrapper: { borderRadius: 14, overflow: "hidden", width: "100%" },
  modalCta: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 10,
    paddingVertical: 14, borderRadius: 14,
  },
  modalCtaText: { color: INK_LIGHT, fontSize: 15, fontWeight: "800" },
});