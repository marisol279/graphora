import { StyleSheet, Text} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  return (
    <LinearGradient 
      colors={["#a57ebbff", "#ffffff"]}
      style={styles.container}
    >
      
      <Text style={styles.title}>✨ Graphora Studios</Text>

      <Text style={styles.description}>
        Detrás de cada sticker hay una idea que merece cobrar vida. En Graphora Studios
        transformo conceptos en ilustraciones únicas, combinando creatividad, estilo y
        atención a cada detalle. Desde diseños kawaii y anime hasta piezas totalmente
        personalizadas, cada creación está pensada para representar tu esencia y hacer
        que tu marca o proyecto destaque de verdad.
      </Text>

      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginVertical: 10,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },

  description: {
  textAlign: "center",
  fontSize: 14,
  lineHeight: 20,
  marginVertical: 10,
  paddingHorizontal: 10,
  color: "#333",
},
});