import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const [category, setCategory] = useState<
    'anime' | 'kawaii' | 'personalizados'
  >('anime');

  return (
    <>
      {/* TÍTULO */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded }}
        >
          Catálogo de Stickers
        </ThemedText>
      </ThemedView>

      {/* BOTONES */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, category === 'anime' && styles.active]}
          onPress={() => setCategory('anime')}
        >
          <ThemedText>Anime</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, category === 'kawaii' && styles.active]}
          onPress={() => setCategory('kawaii')}
        >
          <ThemedText>Kawaii</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            category === 'personalizados' && styles.active,
          ]}
          onPress={() => setCategory('personalizados')}
        >
          <ThemedText>Personalizados</ThemedText>
        </TouchableOpacity>
      </View>

      {/* CONTENIDO DINÁMICO */}
      <View style={styles.content}>
        {category === 'anime' && (
          <ThemedText>
            Aquí encontrarás stickers estilo anime llenos de energía y expresión.
          </ThemedText>
        )}

        {category === 'kawaii' && (
          <ThemedText>
            Diseños kawaii tiernos, coloridos y llenos de personalidad.
          </ThemedText>
        )}

        {category === 'personalizados' && (
          <ThemedText>
            Stickers personalizados creados a partir de tus ideas.
          </ThemedText>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    marginTop: 50,
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#0f0f0fff',
  },

  active: {
    backgroundColor: '#6c5ce7',
  },

  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});