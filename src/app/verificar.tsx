import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { verificarCodigo } from '../services/restorePass';

export default function Verificar() {
  const { correo } = useLocalSearchParams<{ correo: string }>();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const route = useRouter();

  const handleVerificar = async () => {
    setLoad(true);
    try {
      await verificarCodigo(correo, codigo);
      route.push({ pathname: '/nueva-password', params: { correo, codigo } });
    } catch (err: any) {
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/images/background.png")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={{ fontSize: 24, color: "white" }}>Ingresa el código:</Text>
        <TextInput
          style={styles.forminput}
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="123456"
        />
        <Pressable style={styles.btn} onPress={handleVerificar}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
            {load ? "Verificando..." : "Verificar código"}
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  background: { flex: 1, width: "100%", height: "100%" },
  forminput: { padding: 10, margin: 8, backgroundColor: "#ffffff84", borderColor: "#0000", borderRadius: 10, width: 280, height: 40, fontSize: 16 },
  btn: { margin: 5, padding: 5, borderWidth: 0, borderRadius: 10, width: "50%", height: "auto", backgroundColor: "rgba(212, 194, 194, 0.21)" },
});