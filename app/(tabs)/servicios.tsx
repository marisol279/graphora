import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Image,
  FlatList,
  Text,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

// 🎨 COLORES HOME
const LAVENDER = "#8B9DC3";
const LAVENDER_LIGHT = "#9AADD0";
const LAVENDER_DARK = "#7A8DB5";
const BLACK = "#111111";
const WHITE = "#FFFFFF";

const GRADIENT = [LAVENDER, LAVENDER_LIGHT, LAVENDER_DARK] as const;

const RAINBOW = [
  "#FF3B3B",
  "#FF8C00",
  "#FFD93D",
  "#00C853",
  "#00B0FF",
  "#D500F9",
  "#FF2DA3",
] as const;

type CategoryId =
  | 'anime'
  | 'amor'
  | 'kawaii'
  | 'humor'
  | 'gaming'
  | 'musica'
  | 'lifestyle'
  | 'naturaleza'
  | 'mascotas'
  | 'comida'
  | 'frases'
  | 'eventos'
  | 'personalizados';

type Sticker = {
  id: number;
  image: any;
  price: number;
};

export default function TabTwoScreen() {
  const categories = [
    { id: 'anime', title: '🎌 Anime' },
    { id: 'amor', title: '💖 Amor' },
    { id: 'kawaii', title: '🍬 Kawaii' },
    { id: 'humor', title: '😂 Humor' },
    { id: 'gaming', title: '🎮 Gaming' },
    { id: 'musica', title: '🎵 Música' },
    { id: 'lifestyle', title: '😎 Lifestyle' },
    { id: 'naturaleza', title: '🌿 Naturaleza' },
    { id: 'mascotas', title: '🐶 Mascotas' },
    { id: 'comida', title: '🍔 Comida' },
    { id: 'frases', title: '🧠 Frases' },
    { id: 'eventos', title: '🎉 Eventos' },
    { id: 'personalizados', title: '✨ Personalizados' },
  ] as const;

  const images = {
    anime: { 1: require('@/assets/images/anime/1.png') },
    amor: { 1: require('@/assets/images/Amor/1.png') },
    kawaii: { 1: require('@/assets/images/Kawaii/1.png') },
    gaming: { 1: require('@/assets/images/Gaming/1.png') },
    musica: { 1: require('@/assets/images/Musica/1.png') },
    mascotas: { 1: require('@/assets/images/Mascotas/1.png') },
    comida: { 1: require('@/assets/images/Comida/1.png') },
    frases: { 1: require('@/assets/images/Frases/1.png') },
    eventos: { 1: require('@/assets/images/Eventos/1.png') },
  };

  const stickers: Partial<Record<CategoryId, Sticker[]>> = {
    anime: [{ id: 1, image: images.anime[1], price: 500 }],
    amor: [{ id: 1, image: images.amor[1], price: 300 }],
    kawaii: [{ id: 1, image: images.kawaii[1], price: 400 }],
    gaming: [{ id: 1, image: images.gaming[1], price: 200 }],
    musica: [{ id: 1, image: images.musica[1], price: 200 }],
    mascotas: [{ id: 1, image: images.mascotas[1], price: 200 }],
    comida: [{ id: 1, image: images.comida[1], price: 200 }],
    frases: [{ id: 1, image: images.frases[1], price: 200 }],
    eventos: [{ id: 1, image: images.eventos[1], price: 300 }],
  };

  const [category, setCategory] = useState<CategoryId>('anime');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStickers, setSelectedStickers] = useState<number[]>([]);

  const total =
    (stickers[category] || [])
      .filter((s) => selectedStickers.includes(s.id))
      .reduce((sum, s) => sum + s.price, 0) || 0;

  return (
    <LinearGradient colors={GRADIENT} style={{ flex: 1 }}>

      {/* HEADER */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Catálogo de Stickers</Text>
      </View>

      {/* BOTONES */}
      <View style={styles.buttonContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.button,
              category === cat.id && styles.active,
            ]}
            onPress={() => {
              setCategory(cat.id);
              setSelectedStickers([]);
              setModalVisible(true);
            }}
          >
            <Text style={[
              styles.buttonText,
              category === cat.id && styles.activeText
            ]}>
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <LinearGradient colors={GRADIENT} style={styles.modalContainer}>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>
            {category.toUpperCase()}
          </Text>

          <FlatList
            data={stickers[category] || []}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginTop: 20 }}
            renderItem={({ item }) => {
              const isSelected = selectedStickers.includes(item.id);

              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedStickers((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((id) => id !== item.id)
                        : [...prev, item.id]
                    );
                  }}
                  style={[
                    styles.stickerItem,
                    isSelected && styles.stickerSelected,
                  ]}
                >
                  <Image source={item.image} style={styles.stickerImage} />
                </TouchableOpacity>
              );
            }}
          />

          <Text style={styles.total}>Total: ${total}</Text>

          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>
              Comprar ({selectedStickers.length})
            </Text>
          </TouchableOpacity>

          {/* 🌈 BARRA */}
          <LinearGradient
            colors={RAINBOW}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rainbow}
          />

        </LinearGradient>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: BLACK,
    fontFamily: "serif",
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },

  button: {
    width: '30%',
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.45)",
    alignItems: 'center',
  },

  active: {
    backgroundColor: BLACK,
  },

  buttonText: {
    fontSize: 14,
    color: BLACK,
    fontWeight: "600",
  },

  activeText: {
    color: WHITE,
  },

  modalContainer: {
    flex: 1,
    padding: 20,
  },

  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: BLACK,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  closeButtonText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: 26,
    color: BLACK,
    marginTop: 60,
    fontFamily: "serif",
  },

  stickerItem: {
    margin: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  stickerSelected: {
    borderWidth: 2,
    borderColor: "#D500F9",
  },

  stickerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  total: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: BLACK,
    fontWeight: "600",
  },

  buyButton: {
    backgroundColor: BLACK,
    padding: 15,
    borderRadius: 40,
    marginTop: 10,
  },

  buyText: {
    textAlign: 'center',
    color: WHITE,
    fontWeight: 'bold',
  },

  rainbow: {
    height: 5,
    borderRadius: 3,
    marginTop: 12,
  },
});