import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from '../services/login';

export default function HomeScreen() {
  const route = useRouter();
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleLogin = async ()=>{

    if(!user || !password){
      Alert.alert("Favor de llenar todos los campos!");
      return;
    }
    try{
      const data = await Login({user, password});
      const id = data.usuario.id;
      await AsyncStorage.setItem('id_usuario', String(id));
      await AsyncStorage.setItem('nombre_usuario', data.usuario.nombre);
      route.push("/dashboard");
    }
    catch(error:any){
      const mensajeError = error.message || "Ocurrió un problema inesperado.";
      Alert.alert("Error al iniciar sesión", mensajeError);
    }
  }
  return (
    <KeyboardAvoidingView
      style={styles.key}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/background.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.container}>
            <View>
              <Text style={styles.title}>Fintrack!</Text>
              <Text style={styles.subtitle}>
                {" "}
                Su rastreador de finanzas de confianza.
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.formtitle}> Bienvenido! </Text>
              <Text style={styles.formsubtitle}>
                Ingrese sus credenciales para iniciar.
              </Text>

              <Text style={styles.labeltext}>Correo:</Text>
              <TextInput
                style={styles.forminput}
                placeholder="Correo:"
                value={user}
                onChangeText={setUser}
                autoCapitalize="none"
              />
              <Text style={styles.labeltext}>Contraseña</Text>
              <TextInput
                style={styles.forminput}
                placeholder="Contraseña: "
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
              />

              <Pressable onPress={() => route.push("/register")}>
                <Text style={styles.formlinktext}>
                  ¿No estas registrado? <Text>Registrate aqui</Text>
                </Text>
              </Pressable>

              <Pressable style={styles.formbutton} onPress={handleLogin}>
                <Text style={styles.formbuttontext}>Iniciar sesíon</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  key: {
    height: "100%",
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    paddingTop: 180,
  },

  form: {
    flex: 1,
    margin: 20,
    padding: 15,
    alignContent: "center",
    alignItems: "center",
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
    fontSize: 24,
  },
  labeltext: {
    color: "#ffff",
    fontSize: 18,
    padding: 5,
  },
  formsubtitle: {
    color: "#e8e8e8dd",
    fontWeight: "bold",
    fontSize: 15,
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
  formbutton: {
    margin: 10,
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
    color: "#ffff",
    fontSize: 18,
  },
});
