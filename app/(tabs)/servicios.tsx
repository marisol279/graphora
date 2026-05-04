import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get("window");

// ── Palette (igual al sistema) ────────────────────────────────
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

// Gradiente para cada categoría (cíclicos)
const CAT_GRADIENTS: Array<readonly [string, string]> = [
  ["#FF3B3B", "#FF8C00"],
  ["#FFD93D", "#00E676"],
  ["#00B0FF", "#D500F9"],
  ["#D500F9", "#FF2DA3"],
  ["#FF3B3B", "#D500F9"],
  ["#00E676", "#00B0FF"],
  ["#FF8C00", "#FFD93D"],
  ["#D500F9", "#FF3B3B"],
  ["#00B0FF", "#00E676"],
  ["#FF2DA3", "#FF8C00"],
  ["#FFD93D", "#FF3B3B"],
  ["#00E676", "#D500F9"],
  ["#FF3B3B", "#00B0FF"],
];

type CategoryId =
  | 'anime' | 'amor' | 'kawaii' | 'humor' | 'gaming'
  | 'musica' | 'lifestyle' | 'naturaleza' | 'mascotas'
  | 'comida' | 'frases' | 'eventos' | 'personalizados';

type Sticker = { id: number; image: any; price: number };

const categories = [
  { id: 'anime',        title: '🎌 Anime' },
  { id: 'amor',         title: '💖 Amor' },
  { id: 'kawaii',       title: '🍬 Kawaii' },
  { id: 'humor',        title: '😂 Humor' },
  { id: 'gaming',       title: '🎮 Gaming' },
  { id: 'musica',       title: '🎵 Música' },
  { id: 'lifestyle',    title: '😎 Lifestyle' },
  { id: 'naturaleza',   title: '🌿 Naturaleza' },
  { id: 'mascotas',     title: '🐶 Mascotas' },
  { id: 'comida',       title: '🍔 Comida' },
  { id: 'frases',       title: '🧠 Frases' },
  { id: 'eventos',      title: '🎉 Eventos' },
  { id: 'personalizados', title: '✨ Personalizados' },
] as const;

// ── Animated category button ──────────────────────────────────
function CatButton({ cat, isActive, index, onPress }: {
  cat: { id: CategoryId; title: string };
  isActive: boolean;
  index: number;
  onPress: () => void;
}) {
  const anim  = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1, duration: 480,
        delay: index * 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1, delay: index * 60,
        tension: 65, friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const colors = CAT_GRADIENTS[index % CAT_GRADIENTS.length];

  return (
    <Animated.View style={{ opacity: anim, transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.82}
        style={[styles.catBtn, isActive && styles.catBtnActive]}
      >
        {isActive ? (
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.catBtnGradient}
          >
            <LinearGradient
              colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0.00)"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.catBtnTextActive}>{cat.title}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.catBtnText}>{cat.title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function TabTwoScreen() {
  const images = {
    anime:    { 1: require('@/assets/images/anime/1.png') },
    amor:     { 1: require('@/assets/images/Amor/1.png') },
    kawaii:   { 1: require('@/assets/images/Kawaii/1.png') },
    gaming:   { 1: require('@/assets/images/Gaming/1.png') },
    musica:   { 1: require('@/assets/images/Musica/1.png') },
    mascotas: { 1: require('@/assets/images/Mascotas/1.png') },
    comida:   { 1: require('@/assets/images/Comida/1.png') },
    frases:   { 1: require('@/assets/images/Frases/1.png') },
    eventos:  { 1: require('@/assets/images/Eventos/1.png') },
  };

  const stickers: Partial<Record<CategoryId, Sticker[]>> = {
    anime:    [{ id: 1, image: images.anime[1],    price: 500 }],
    amor:     [{ id: 1, image: images.amor[1],     price: 300 }],
    kawaii:   [{ id: 1, image: images.kawaii[1],   price: 400 }],
    gaming:   [{ id: 1, image: images.gaming[1],   price: 200 }],
    musica:   [{ id: 1, image: images.musica[1],   price: 200 }],
    mascotas: [{ id: 1, image: images.mascotas[1], price: 200 }],
    comida:   [{ id: 1, image: images.comida[1],   price: 200 }],
    frases:   [{ id: 1, image: images.frases[1],   price: 200 }],
    eventos:  [{ id: 1, image: images.eventos[1],  price: 300 }],
  };

  const [category, setCategory]             = useState<CategoryId>('anime');
  const [modalVisible, setModalVisible]     = useState(false);
  const [selectedStickers, setSelectedStickers] = useState<number[]>([]);

  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, []);

  const total = (stickers[category] || [])
    .filter((s) => selectedStickers.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  const activeCatIndex = categories.findIndex(c => c.id === category);
  const activeColors = CAT_GRADIENTS[activeCatIndex % CAT_GRADIENTS.length];

  return (
    <LinearGradient colors={GRADIENT} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Ambient orbs */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />
      <View style={styles.orb3} pointerEvents="none" />

      {/* HEADER */}
      <Animated.View
        style={[styles.headerWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.tagRow}>
          <View style={styles.tagDot} />
          <Text style={styles.tagLabel}>CATÁLOGO</Text>
        </View>
        <Text style={styles.title}>
          Stickers{"\n"}
          <Text style={styles.titleAccent}>únicos</Text>
        </Text>
        <Text style={styles.subtitle}>Elegí tu estilo, seleccioná y pedí</Text>
      </Animated.View>

      {/* CATEGORÍAS */}
      <Animated.View
        style={[styles.buttonContainer, { opacity: fadeAnim }]}
      >
        {categories.map((cat, i) => (
          <CatButton
            key={cat.id}
            cat={cat as { id: CategoryId; title: string }}
            isActive={category === cat.id}
            index={i}
            onPress={() => {
              setCategory(cat.id as CategoryId);
              setSelectedStickers([]);
              setModalVisible(true);
            }}
          />
        ))}
      </Animated.View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" statusBarTranslucent>
        <LinearGradient colors={GRADIENT} style={styles.modalContainer}>

          {/* Orbs en el modal */}
          <View style={[styles.orb1, { opacity: 0.13 }]} pointerEvents="none" />
          <View style={[styles.orb2, { opacity: 0.09 }]} pointerEvents="none" />

          {/* Close */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#FF3B3B", "#D500F9"]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.closeGradient}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Modal title */}
          <View style={styles.modalTitleWrap}>
            <View style={styles.tagRow}>
              <View style={[styles.tagDot, { backgroundColor: activeColors[0] }]} />
              <Text style={styles.tagLabel}>CATEGORÍA</Text>
            </View>
            <Text style={styles.modalTitle}>{category.toUpperCase()}</Text>
            <LinearGradient
              colors={activeColors}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.modalTitleUnderline}
            />
          </View>

          {/* Stickers */}
          <FlatList
            data={stickers[category] || []}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.stickerList}
            renderItem={({ item }) => {
              const isSelected = selectedStickers.includes(item.id);
              return (
                <TouchableOpacity
                  onPress={() => setSelectedStickers((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id]
                  )}
                  activeOpacity={0.85}
                  style={styles.stickerWrapper}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={activeColors}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                      style={styles.stickerSelectedBorder}
                    >
                      <View style={styles.stickerInner}>
                        <Image source={item.image} style={styles.stickerImage} />
                        <View style={styles.checkBadge}>
                          <Text style={styles.checkText}>✓</Text>
                        </View>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.stickerItem}>
                      <Image source={item.image} style={styles.stickerImage} />
                    </View>
                  )}
                  <Text style={styles.stickerPrice}>${item.price}</Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Total + Buy */}
          <View style={styles.bottomBar}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>${total}</Text>
            </View>

            <TouchableOpacity activeOpacity={0.85} style={styles.buyBtnWrapper}>
              <LinearGradient
                colors={["#FF3B3B", "#D500F9"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.buyButton}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0.00)"]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
                <Text style={styles.buyText}>
                  Comprar ({selectedStickers.length})
                </Text>
                <Text style={styles.buyArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient
              colors={RAINBOW}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.rainbow}
            />
          </View>

        </LinearGradient>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Orbs
  orb1: {
    position: "absolute", top: -60, right: -50,
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: "#D500F9", opacity: 0.16,
  },
  orb2: {
    position: "absolute", top: 260, left: -70,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: "#FF3B3B", opacity: 0.11,
  },
  orb3: {
    position: "absolute", bottom: 100, right: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "#00B0FF", opacity: 0.10,
  },

  // Header
  headerWrap: {
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 24,
  },
  tagRow: {
    flexDirection: "row", alignItems: "center",
    gap: 8, marginBottom: 10,
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
    fontSize: 44, fontWeight: "900",
    color: INK_LIGHT, letterSpacing: -1.2,
    lineHeight: 50, marginBottom: 10,
  },
  titleAccent: { color: "#FFD93D" },
  subtitle: {
    fontSize: 14, color: MUTED, letterSpacing: 0.2,
  },

  // Category buttons
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  catBtn: {
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
  },
  catBtnActive: {
    borderWidth: 0,
  },
  catBtnGradient: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
  catBtnText: {
    fontSize: 13, fontWeight: "700",
    color: MUTED,
    paddingHorizontal: 18, paddingVertical: 10,
  },
  catBtnTextActive: {
    fontSize: 13, fontWeight: "800",
    color: INK_LIGHT,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // Modal
  modalContainer: { flex: 1, paddingTop: 0 },
  modalTitleWrap: {
    paddingHorizontal: 28,
    paddingTop: 68,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 32, fontWeight: "900",
    color: INK_LIGHT, letterSpacing: -0.8,
    marginBottom: 10,
  },
  modalTitleUnderline: {
    height: 3, width: 48, borderRadius: 2,
  },

  // Close
  closeButton: {
    position: 'absolute', top: 54, right: 20,
    borderRadius: 20, overflow: "hidden",
    zIndex: 10,
  },
  closeGradient: {
    width: 40, height: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  closeButtonText: {
    color: INK_LIGHT, fontSize: 16, fontWeight: "800",
  },

  // Stickers
  stickerList: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 20 },
  stickerWrapper: {
    margin: 6, alignItems: "center",
  },
  stickerItem: {
    backgroundColor: GLASS,
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
  },
  stickerSelectedBorder: {
    borderRadius: 18, padding: 3,
  },
  stickerInner: {
    backgroundColor: "rgba(14,8,30,0.85)",
    borderRadius: 14, padding: 4,
    position: "relative",
  },
  stickerImage: { width: 96, height: 96, borderRadius: 10 },
  checkBadge: {
    position: "absolute", top: -6, right: -6,
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: "#00E676",
    alignItems: "center", justifyContent: "center",
  },
  checkText: { color: "#000", fontSize: 11, fontWeight: "900" },
  stickerPrice: {
    fontSize: 12, fontWeight: "700",
    color: MUTED, marginTop: 5,
  },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: "rgba(10,8,20,0.95)",
    borderTopWidth: 1,
    borderTopColor: GLASS_BORDER,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 14, fontWeight: "700", color: MUTED,
  },
  totalAmount: {
    fontSize: 26, fontWeight: "900",
    color: INK_LIGHT, letterSpacing: -0.5,
  },
  buyBtnWrapper: { borderRadius: 16, overflow: "hidden", marginBottom: 14 },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
  },
  buyText: {
    color: INK_LIGHT, fontSize: 16,
    fontWeight: "800", letterSpacing: 0.2,
  },
  buyArrow: { color: INK_LIGHT, fontSize: 18, fontWeight: "700" },

  rainbow: { height: 4, borderRadius: 2 },
});