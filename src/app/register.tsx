import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import registerUser from "../services/register";

export default function Register() {
  const route = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const handleRegister = async () => {
    try {
      const data = await registerUser({ name, lastname, email, password });
      Alert.alert("Éxito", data.message);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Bienvenido a FinTrack</Text>
          <Text style={styles.subtitle}>
            Su rastreador de finanzas de confianza.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formtitle}>Registrese para continuar.</Text>

          <Text style={styles.labeltext}>Nombre:</Text>
          <TextInput
            style={styles.forminput}
            placeholder="Nombre:"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.labeltext}>Apellido:</Text>
          <TextInput
            style={styles.forminput}
            placeholder="Apellido:"
            value={lastname}
            onChangeText={setLastname}
          />

          <Text style={styles.labeltext}>Correo:</Text>
          <TextInput
            style={styles.forminput}
            placeholder="Correo:"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.labeltext}>Contraseña:</Text>
          <TextInput
            style={styles.forminput}
            placeholder="Contraseña:"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <Pressable onPress={() => route.push("/")}>
            <Text style={styles.formlinktext}>
              ¿Ya tienes una cuenta? <Text>Inicia sesión aqui</Text>
            </Text>
          </Pressable>

          <Pressable style={styles.formbutton} onPress={handleRegister}>
            <Text style={styles.formbuttontext}>Registrarse</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },

  form: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    margin: 10,
    padding: 10,
    color: "#ffff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#e8e8e8dd",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  formtitle: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  labeltext: {
    color: "#ffff",
    fontSize: 18,
    padding: 5,
    textAlign: "center",
  },

  forminput: {
    padding: 10,
    margin: 10,
    marginLeft: 50,
    backgroundColor: "#ffffff84",
    borderColor: "#0000",
    borderRadius: 10,
    width: 280,
    height: 40,
    fontSize: 16,
  },
  formbutton: {
    margin: 10,
    marginLeft: 90,
    backgroundColor: "#bbfbbf",
    width: 180,
    height: 25,
    borderColor: "#0000",
    borderRadius: 10,
  },
  formbuttontext: {
    fontSize: 18,
    textAlign: "center",
    margin: 2,
    fontWeight: "bold",
  },
  formlinktext: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 18,
  },
});
