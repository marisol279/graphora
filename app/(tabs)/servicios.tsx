import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { router } from "expo-router";

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
} from "react-native";

const { width } = Dimensions.get("window");

// ── Palette ───────────────────────────────────────────────────
const BG_TOP = "#1A0533";
const BG_MID = "#0E1A3A";
const BG_BOT = "#0A0A1A";

const INK_LIGHT = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.48)";
const GLASS = "rgba(255,255,255,0.07)";
const GLASS_BORDER = "rgba(255,255,255,0.18)";

const GRADIENT = [BG_TOP, BG_MID, BG_BOT] as const;

const RAINBOW = [
  "#FF3B3B",
  "#FF8C00",
  "#FFD93D",
  "#00E676",
  "#00B0FF",
  "#D500F9",
  "#FF2DA3",
] as const;

// ── Category gradients ────────────────────────────────────────
const CAT_GRADIENTS: readonly [string, string][] = [
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
  | "anime"
  | "amor"
  | "kawaii"
  | "humor"
  | "gaming"
  | "musica"
  | "lifestyle"
  | "naturaleza"
  | "mascotas"
  | "comida"
  | "frases"
  | "eventos"
  | "personalizados";

type SizeType = "small" | "medium" | "large";

type Sticker = {
  id: number;
  image: any;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
};

const categories = [
  { id: "humor", title: "😂 Memes" },
  { id: "pais", title: "Argentina" },
  { id: "futbol", title: "Futbol" },
  { id: "series", title: "Series/Peliculas" },
  { id: "aesthetic", title: "Aesthetic" },
  { id: "paijases", title: "Paijases" },
  { id: "universidad", title: "Carreras Universitarias" },
  { id: "amor", title: "Amor"},
  { id: "anime", title: "👾 Anime" },
  { id: "kawaii", title: "🍬 Kawaii" },
  { id: "gaming", title: "🎮 Gaming" },
  { id: "musica", title: "🎵 Música" },
  { id: "lifestyle", title: "😎 Lifestyle" },
  { id: "naturaleza", title: "🌿 Naturaleza" },
  { id: "mascotas", title: "🐶 Mascotas" },
  { id: "comida", title: "🍔 Comida" },
  { id: "frases", title: "🧠 Frases" },
  { id: "eventos", title: "🎉 Eventos" },
  { id: "personalizados", title: "✨ Personalizados" },
] as const;

// ── Category Button ───────────────────────────────────────────
function CatButton({
  cat,
  isActive,
  index,
  onPress,
}: {
  cat: { id: CategoryId; title: string };
  isActive: boolean;
  index: number;
  onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, {
        toValue: 1,
        duration: 480,
        delay: index * 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.spring(scale, {
        toValue: 1,
        delay: index * 60,
        tension: 65,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [anim, scale, index]);

  const colors = CAT_GRADIENTS[index % CAT_GRADIENTS.length];

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [{ scale }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.82}
        style={[styles.catBtn, isActive && styles.catBtnActive]}
      >
        {isActive ? (
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.catBtnGradient}
          >
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.18)",
                "rgba(255,255,255,0.00)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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

// ── MAIN ──────────────────────────────────────────────────────
export default function TabTwoScreen() {
  const { cart, addItem, removeItem, clearCart, getTotal } =
    useCartStore();

  const images = {
    anime: { 1: require("@/assets/images/anime/1.png") },
    amor: { 1: require("@/assets/images/Amor/1.png") },
    kawaii: { 1: require("@/assets/images/Kawaii/1.png") },
    gaming: { 1: require("@/assets/images/Gaming/1.png") },
    musica: { 1: require("@/assets/images/Musica/1.png") },
    mascotas: { 1: require("@/assets/images/Mascotas/1.png") },
    comida: { 1: require("@/assets/images/Comida/1.png") },
    frases: { 1: require("@/assets/images/Frases/1.png") },
    eventos: { 1: require("@/assets/images/Eventos/1.png") },
  };

  const stickers: Partial<Record<CategoryId, Sticker[]>> = {
    anime: [
      {
        id: 1,
        image: images.anime[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    amor: [
      {
        id: 2,
        image: images.amor[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    kawaii: [
      {
        id: 3,
        image: images.kawaii[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    gaming: [
      {
        id: 4,
        image: images.gaming[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    musica: [
      {
        id: 5,
        image: images.musica[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    mascotas: [
      {
        id: 6,
        image: images.mascotas[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    comida: [
      {
        id: 7,
        image: images.comida[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    frases: [
      {
        id: 8,
        image: images.frases[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],

    eventos: [
      {
        id: 9,
        image: images.eventos[1],
        prices: {
          small: 600,
          medium: 800,
          large: 1000,
        },
      },
    ],
  };

  const [category, setCategory] =
    useState<CategoryId>("anime");

  const [modalVisible, setModalVisible] =
    useState(false);

  const [selectedSize, setSelectedSize] =
    useState<Record<number, SizeType>>({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <LinearGradient colors={GRADIENT} style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* ORBS */}
      <View style={styles.orb1} pointerEvents="none" />
      <View style={styles.orb2} pointerEvents="none" />
      <View style={styles.orb3} pointerEvents="none" />

      {/* HEADER */}
      <Animated.View
        style={[
          styles.headerWrap,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.tagRow}>
          <View style={styles.tagDot} />
          <Text style={styles.tagLabel}>CATÁLOGO</Text>
        </View>

        <Text style={styles.title}>
          Stickers{"\n"}
          <Text style={styles.titleAccent}>
            únicos
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Elegí diseño, tamaño y cantidad
        </Text>
      </Animated.View>

      {/* CATEGORIES */}
      <Animated.View
        style={[
          styles.buttonContainer,
          { opacity: fadeAnim },
        ]}
      >
        {categories.map((cat, i) => (
          <CatButton
            key={cat.id}
            cat={cat as {
              id: CategoryId;
              title: string;
            }}
            isActive={category === cat.id}
            index={i}
            onPress={() => {

              // ELIMINA EL CARRITO ANTERIOR
              clearCart();

              // CAMBIA CATEGORIA
              setCategory(cat.id as CategoryId);

              // ABRE MODAL
              setModalVisible(true);
            }}
          />
        ))}
      </Animated.View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent
      >
        <LinearGradient
          colors={GRADIENT}
          style={styles.modalContainer}
        >
          <View
            style={[styles.orb1, { opacity: 0.13 }]}
            pointerEvents="none"
          />

          <View
            style={[styles.orb2, { opacity: 0.09 }]}
            pointerEvents="none"
          />

          {/* CLOSE */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#FF3B3B", "#D500F9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.closeGradient}
            >
              <Text style={styles.closeButtonText}>
                ✕
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* TITLE */}
          <View style={styles.modalTitleWrap}>
            <View style={styles.tagRow}>
              <View
                style={[
                  styles.tagDot,
                  {
                    backgroundColor: "#FF3B3B",
                  },
                ]}
              />

              <Text style={styles.tagLabel}>
                CATEGORÍA
              </Text>
            </View>

            <Text style={styles.modalTitle}>
              {category.toUpperCase()}
            </Text>

            <LinearGradient
              colors={["#FF3B3B", "#D500F9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.modalTitleUnderline}
            />
          </View>

          {/* STICKERS */}
          <FlatList
            data={stickers[category] || []}
            numColumns={2}
            keyExtractor={(item) =>
              item.id.toString()
            }
            contentContainerStyle={
              styles.stickerList
            }
            renderItem={({ item }) => {
              const currentSize =
                selectedSize[item.id] || "small";

              const cartItem = cart.find(
                (i) => i.id === item.id
              );

              const quantity =
                cartItem?.quantity || 0;

              return (
                <View style={styles.stickerWrapper}>
                  <View style={styles.stickerItem}>
                    <Image
                      source={item.image}
                      style={styles.stickerImage}
                    />
                  </View>

                  <Text style={styles.priceTitle}>
                    Precios
                  </Text>

                  <Text style={styles.stickerPrice}>
                    Chico $600
                  </Text>

                  <Text style={styles.stickerPrice}>
                    Mediano $800
                  </Text>

                  <Text style={styles.stickerPrice}>
                    Grande $1000
                  </Text>

                  {/* SIZE BUTTONS */}
                  <View style={styles.sizeContainer}>
                    {/* CHICO */}
                    <TouchableOpacity
                      style={[
                        styles.sizeButton,
                        currentSize === "small" &&
                          styles.activeSizeButton,
                      ]}
                      onPress={() => {

                        setSelectedSize((prev) => ({
                          ...prev,
                          [item.id]: "small",
                        }));

                        removeItem(item.id);

                        addItem({
                          id: item.id,
                          title: `${category} Chico`,
                          image: item.image,
                          size: "small",
                          price: item.prices.small,
                          quantity: 1,
                        });
                      }}
                    >
                      <Text style={styles.sizeButtonText}>
                        Chico
                      </Text>
                    </TouchableOpacity>

                    {/* MEDIANO */}
                    <TouchableOpacity
                      style={[
                        styles.sizeButton,
                        currentSize === "medium" &&
                          styles.activeSizeButton,
                      ]}
                      onPress={() => {

                        setSelectedSize((prev) => ({
                          ...prev,
                          [item.id]: "medium",
                        }));

                        removeItem(item.id);

                        addItem({
                          id: item.id,
                          title: `${category} Mediano`,
                          image: item.image,
                          size: "medium",
                          price: item.prices.medium,
                          quantity: 1,
                        });
                      }}
                    >
                      <Text style={styles.sizeButtonText}>
                        Medio
                      </Text>
                    </TouchableOpacity>

                    {/* GRANDE */}
                    <TouchableOpacity
                      style={[
                        styles.sizeButton,
                        currentSize === "large" &&
                          styles.activeSizeButton,
                      ]}
                      onPress={() => {

                        setSelectedSize((prev) => ({
                          ...prev,
                          [item.id]: "large",
                        }));

                        removeItem(item.id);

                        addItem({
                          id: item.id,
                          title: `${category} Grande`,
                          image: item.image,
                          size: "large",
                          price: item.prices.large,
                          quantity: 1,
                        });
                      }}
                    >
                      <Text style={styles.sizeButtonText}>
                        Grande
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* QUANTITY */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() =>
                        removeItem(item.id)
                      }
                    >
                      <Text style={styles.qtyButtonText}>
                        -
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>
                      {quantity}
                    </Text>

                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => {

                        removeItem(item.id);

                        addItem({
                          id: item.id,
                          title: `${category} ${
                            currentSize === "small"
                              ? "Chico"
                              : currentSize === "medium"
                              ? "Mediano"
                              : "Grande"
                          }`,
                          image: item.image,
                          size: currentSize,
                          price:
                            item.prices[currentSize],
                          quantity: quantity + 1,
                        });
                      }}
                    >
                      <Text style={styles.qtyButtonText}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />

          {/* BOTTOM */}
          <View style={styles.bottomBar}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Total
              </Text>

              <Text style={styles.totalAmount}>
                ${getTotal()}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.buyBtnWrapper}
              onPress={()=> router.push("/carrito")}
            >
              <LinearGradient
                colors={["#FF3B3B", "#D500F9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyButton}
              >
                <Text style={styles.buyText}>
                  Comprar ({cart.length})
                </Text>

                <Text style={styles.buyArrow}>
                  →
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient
              colors={RAINBOW}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.rainbow}
            />
          </View>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  orb1: {
    position: "absolute",
    top: -60,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#D500F9",
    opacity: 0.16,
  },

  orb2: {
    position: "absolute",
    top: 260,
    left: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FF3B3B",
    opacity: 0.11,
  },

  orb3: {
    position: "absolute",
    bottom: 100,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#00B0FF",
    opacity: 0.1,
  },

  headerWrap: {
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 24,
  },

  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  tagDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#D500F9",
  },

  tagLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    color: MUTED,
  },

  title: {
    fontSize: 44,
    fontWeight: "900",
    color: INK_LIGHT,
    letterSpacing: -1.2,
    lineHeight: 50,
    marginBottom: 10,
  },

  titleAccent: {
    color: "#FFD93D",
  },

  subtitle: {
    fontSize: 14,
    color: MUTED,
    letterSpacing: 0.2,
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
    fontSize: 13,
    fontWeight: "700",
    color: MUTED,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  catBtnTextActive: {
    fontSize: 13,
    fontWeight: "800",
    color: INK_LIGHT,
  },

  modalContainer: {
    flex: 1,
  },

  modalTitleWrap: {
    paddingHorizontal: 28,
    paddingTop: 68,
    paddingBottom: 12,
  },

  modalTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: INK_LIGHT,
    letterSpacing: -0.8,
    marginBottom: 10,
  },

  modalTitleUnderline: {
    height: 3,
    width: 48,
    borderRadius: 2,
  },

  closeButton: {
    position: "absolute",
    top: 54,
    right: 20,
    borderRadius: 20,
    overflow: "hidden",
    zIndex: 10,
  },

  closeGradient: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    color: INK_LIGHT,
    fontSize: 16,
    fontWeight: "800",
  },

  stickerList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },

  stickerWrapper: {
    margin: 6,
    alignItems: "center",
    backgroundColor: GLASS,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    width: width / 2 - 24,
  },

  stickerItem: {
    borderRadius: 16,
    overflow: "hidden",
  },

  stickerImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  priceTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 4,
  },

  stickerPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: MUTED,
  },

  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    flexWrap: "wrap",
  },

  sizeButton: {
    backgroundColor: "#D500F9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  activeSizeButton: {
    backgroundColor: "#00E676",
  },

  sizeButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 10,
  },

  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#D500F9",
    justifyContent: "center",
    alignItems: "center",
  },

  qtyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },

  qtyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    minWidth: 20,
    textAlign: "center",
  },

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
    fontSize: 14,
    fontWeight: "700",
    color: MUTED,
  },

  totalAmount: {
    fontSize: 26,
    fontWeight: "900",
    color: INK_LIGHT,
  },

  buyBtnWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
  },

  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },

  buyText: {
    color: INK_LIGHT,
    fontSize: 16,
    fontWeight: "800",
  },

  buyArrow: {
    color: INK_LIGHT,
    fontSize: 18,
    fontWeight: "700",
  },

  rainbow: {
    height: 4,
    borderRadius: 2,
  },
});