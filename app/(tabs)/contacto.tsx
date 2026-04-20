import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Linking,
  Modal,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Colores
const LAVENDER = "#8B9DC3";
const LAVENDER_LIGHT = "#9AADD0";
const LAVENDER_DARK = "#7A8DB5";
const BLACK = "#111111";
const WHITE = "#FFFFFF";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"instagram" | "map" | null>(null);

  // ✅ WhatsApp con formulario
  const enviarWhatsApp = () => {
    if (!nombre || !email || !mensaje) {
      Alert.alert("Error", "Completá todos los campos");
      return;
    }

    
  };

  // ✅ Abrir modales
  const openInstagramModal = () => {
    setModalType("instagram");
    setModalVisible(true);
  };

  const openMapModal = () => {
    setModalType("map");
    setModalVisible(true);
  };

  // ✅ Abrir externo (desde modal)
  const openInstagram = () => {
    Linking.openURL("https://instagram.com/");
  };

  const openMaps = () => {
    const query = "Resistencia Chaco Argentina";

    const url =
      Platform.OS === "web"
        ? `https://www.google.com/maps/search/?api=1&query=${query}`
        : `geo:0,0?q=${query}`;

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacto</Text>

      <View style={styles.content}>
        {/* FORMULARIO */}
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={18} color={LAVENDER_DARK} />
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={18} color={LAVENDER_DARK} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="chatbubble" size={18} color={LAVENDER_DARK} />
          <TextInput
            placeholder="Mensaje"
            style={[styles.input, { height: 80 }]}
            multiline
            value={mensaje}
            onChangeText={setMensaje}
          />
        </View>

        {/* BOTÓN */}
        <Pressable style={styles.button} onPress={enviarWhatsApp}>
          <Ionicons name="logo-whatsapp" size={18} color={WHITE} />
          <Text style={styles.buttonText}>Enviar WhatsApp</Text>
        </Pressable>

        {/* ICONOS */}
        <View style={styles.actions}>
          <Pressable style={styles.iconButton} onPress={openInstagramModal}>
            <Ionicons name="logo-instagram" size={22} color="#E1306C" />
          </Pressable>

          <Pressable style={styles.iconButton} onPress={openMapModal}>
            <Ionicons name="location" size={22} color="#4285F4" />
          </Pressable>
        </View>

        <Text style={styles.info}>
          📍 Resistencia, Chaco, Argentina
        </Text>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>Cerrar</Text>
            </Pressable>

            {modalType === "instagram" && (
              <>
                <Text style={styles.modalTitle}>Instagram</Text>
                <Text style={styles.modalText}>
                  Seguinos para ver nuevos stickers 🎨
                </Text>

                <Pressable style={styles.modalButton} onPress={openInstagram}>
                  <Text style={styles.buttonText}>Abrir Instagram</Text>
                </Pressable>
              </>
            )}

            {modalType === "map" && (
              <>
                <Text style={styles.modalTitle}>Ubicación</Text>
                <Text style={styles.modalText}>
                  Estamos en Resistencia, Chaco 📍
                </Text>

                <Pressable style={styles.modalButton} onPress={openMaps}>
                  <Text style={styles.buttonText}>Abrir en Maps</Text>
                </Pressable>
              </>
            )}

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LAVENDER_LIGHT,
    paddingTop: 50,
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 500,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: WHITE,
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: BLACK,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#25D366",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 5,
  },
  buttonText: {
    color: WHITE,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: WHITE,
    padding: 12,
    borderRadius: 50,
  },

  info: {
    textAlign: "center",
    marginTop: 15,
    color: WHITE,
    fontSize: 13,
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: LAVENDER,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  close: {
    alignSelf: "flex-end",
    marginBottom: 10,
    color: LAVENDER_DARK,
  },
});