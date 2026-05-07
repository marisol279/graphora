import { useCartStore } from "@/store/cartStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

const BG_TOP = "#1A0533";
const BG_MID = "#0E1A3A";
const BG_BOT = "#0A0A1A";

const GRADIENT = [BG_TOP, BG_MID, BG_BOT] as const;

export default function CarritoScreen() {
  const { cart, removeItem, clearCart } = useCartStore();

  // 🧪 CHECKOUT FICTICIO
  const handleFakeCheckout = () => {
    Alert.alert(
      "Finalizar compra",
      "¿Querés confirmar la compra?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            clearCart();

            setTimeout(() => {
              router.push("/success");
            }, 400);
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={GRADIENT} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* BOTON CERRAR */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.push("/servicios")}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* TITULO */}
      <Text style={styles.title}>Tu carrito</Text>

      {/* CARRITO VACIO */}
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay productos</Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 160 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* IMAGEN */}
              <Image source={item.image} style={styles.image} />

              {/* INFO */}
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>

                <Text style={styles.text}>
                  Tamaño: {item.size}
                </Text>

                <Text style={styles.text}>
                  Cantidad: {item.quantity}
                </Text>

                <Text style={styles.price}>
                  ${item.price * item.quantity}
                </Text>
              </View>

              {/* ELIMINAR */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.deleteText}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.total}>
          Total: $
          {cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </Text>

        {/* BOTON FINALIZAR COMPRA */}
        <TouchableOpacity
          style={styles.buyButton}
          onPress={handleFakeCheckout}
        >
          <LinearGradient
            colors={["#FF3B3B", "#D500F9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBtn}
          >
            <Text style={styles.buyText}>
              Finalizar compra
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* VACIAR CARRITO */}
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCart}
        >
          <LinearGradient
            colors={["#FF3B3B", "#FF8C00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.clearGradient}
          >
            <Text style={styles.clearText}>
              Vaciar carrito
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D500F9",
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 18,
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },

  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 4,
  },

  price: {
    color: "#00E676",
    fontSize: 18,
    fontWeight: "900",
    marginTop: 6,
  },

  deleteBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FF3B3B",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: {
    fontSize: 18,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(10,10,20,0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },

  total: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 16,
  },

  buyButton: {
    borderRadius: 16,
    overflow: "hidden",
  },

  gradientBtn: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 16,
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

  clearButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 12,
  },

  clearGradient: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 16,
  },

  clearText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
  },
});