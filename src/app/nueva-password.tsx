import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { nuevaPass } from '../services/restorePass';

export default function NewPassword() {
  const { correo, codigo } = useLocalSearchParams<{ correo: string; codigo: string }>();
  const [password, setPassword] = useState<string>("");
  const [confirmar, setConfirmar] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNew = async () => {
    if (password !== confirmar) {
      Alert.alert('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      Alert.alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await nuevaPass(correo, codigo, password);
      Alert.alert('Contraseña reestablecida con éxito.');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/images/background.png")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={{ fontSize: 24, color: "white" }}>Ingrese su nueva contraseña:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.forminput}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Nueva contraseña"
        />
        <TextInput
          value={confirmar}
          onChangeText={setConfirmar}
          style={styles.forminput}
          autoCapitalize="none"
          secureTextEntry
          placeholder="Confirmar contraseña"
        />
        <Pressable style={styles.btn} onPress={handleNew} disabled={loading}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 18, wordWrap: "break-word" }}>
            {loading ? "Guardando..." : "Confirmar contraseña"}
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

// ... styles igual que los tuyos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  forminput: {
    padding: 10,
    margin: 8,
    backgroundColor: "#ffffff84",
    borderColor: "#0000",
    borderRadius: 10,
    width: 280,
    height: 40,
    fontSize: 16,
  },
  btn: {
    margin: 5,
    padding: 5,
    borderWidth: 0,
    borderRadius: 10,
    width: "50%",
    height: "auto",
    backgroundColor: "rgba(212, 194, 194, 0.21)",
  },
});
