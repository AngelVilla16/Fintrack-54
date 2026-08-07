import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Change() {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 24, color: "white" }}>
          {" "}
          Ingrese su correo:{" "}
        </Text>
        <TextInput style={styles.forminput} autoCapitalize="none" />
        <Pressable style={styles.btn}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
              wordWrap: "break-word",
            }}
          >
            Reestablecer contraseña
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

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
