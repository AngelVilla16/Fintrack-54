//import { supabase } from '@/lib/supabase';
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const [selected, setSelected] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [saldo, setSaldo] = useState<number>(0.0);
  const [modalGasto, setModalGasto] = useState<boolean>(false);
  const [ingreso, setIngreso] = useState<string>("");
  const [gasto, setGasto] = useState<string>("");
  const [modalIngreso, setModalIngreso] = useState<boolean>(false);
  const datasection = [
    {
      title: "gastos",
      data: ["Vivienda", "salud", "ocio"],
    },
  ];
  const ingresolist = [
    {
      title: "categorias",
      data: ["Nómina", "Trabajo", "Donativo", "Inversión", "Otros"],
    },
  ];
  
  //funcion para agregar ingreso
  function handleIngreso() {
    
    const ingresoActual = Number(ingreso);
    const nuevoSaldo:number = saldo + ingresoActual;
    
    setModalIngreso(false);
    setSaldo(nuevoSaldo);
    setIngreso("");
  }
  function handleGasto(){
    const gastoActual = Number(gasto);
    const restaGasto:number = saldo - gastoActual;

    setModalGasto(false);
    setSaldo(restaGasto);
    setGasto("");
  }
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.Background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        // Modales para añadir gasto e ingreso
        <Modal animationType="fade" transparent={true} visible={modalIngreso}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTextTitle}>Registrar nuevo ingreso</Text>

              <TextInput
                placeholder="$ 0.00"
                value={ingreso}
                onChangeText={setIngreso}
                keyboardType="numeric"
                style={styles.modalInput}
              />
              <Text style={styles.modalTextTitle}>
                Seleccione tipo de ingreso
              </Text>
              <View style={styles.modalList}>
                <Pressable
                  onPress={() => setSelected("nomina")}
                  style={[
                    styles.modalButtonList,
                    selected === "nomina" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Nómina</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("freelance")}
                  style={[
                    styles.modalButtonList,
                    selected === "freelance" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Freelance</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("inversion")}
                  style={[
                    styles.modalButtonList,
                    selected === "inversion" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Inversión</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("otros")}
                  style={[
                    styles.modalButtonList,
                    selected === "otros" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Otros </Text>
                </Pressable>
              </View>
              <View style={styles.modalContentButtons}>
                <Pressable
                  style={styles.modalButton}
                  onPress={handleIngreso}
                >
                  <Text>Añadir Ingreso</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={()=> {setModalIngreso(false);}}
                >
                  <Text>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>

        </Modal>
        //Gasto modal
        <Modal animationType="slide" transparent={true} visible={modalGasto}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTextTitle}>Registrar nuevo gasto</Text>

              <TextInput
                placeholder="$ 0.00"
                value={gasto}
                onChangeText={setGasto}
                keyboardType="numeric"
                style={styles.modalInput}
              />
              <Text style={styles.modalTextTitle}>
                Seleccione tipo de gasto
              </Text>
              <View style={styles.modalList}>
                <Pressable
                  onPress={() => setSelected("comida")}
                  style={[
                    styles.modalButtonList,
                    selected === "comida" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Comida</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("vivienda")}
                  style={[
                    styles.modalButtonList,
                    selected === "vivienda" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Vivienda</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("servicios")}
                  style={[
                    styles.modalButtonList,
                    selected === "servicios" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Servicios</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("salud")}
                  style={[
                    styles.modalButtonList,
                    selected === "salud" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Salud</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelected("ocio")}
                  style={[
                    styles.modalButtonList,
                    selected === "ocio" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Ocio</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelected("otros")}
                  style={[
                    styles.modalButtonList,
                    selected === "otros" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text>Otros</Text>
                </Pressable>
              </View>

              <Pressable
                style={styles.modalButton}
                onPress={handleGasto}
              >
                <Text>Añadir gasto</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => {
                  setModalGasto(false);
                }}
              >
                <Text>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View>
          <Text style={styles.title}>Bienvenido!</Text>
          <Text style={styles.subtitle}>{name}</Text>
                //Seccion de saldo disponible
          <View style={styles.saldosection}>
            <View>
              <Image
                source={require("../assets/images/creditcard.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={styles.titulosectionsaldo}>
              <Text style={styles.text}>Saldo disponible</Text>
              <Text style={styles.saldo}>
                $<Text> {saldo}</Text>
              </Text>
            </View>
          </View>
          //seccion de botones 
          <View style={styles.PressablesSection}>
            <Pressable
              style={styles.pressableButton}
              onPress={() => setModalIngreso(true)}
            >
              <Image
                source={require("../assets/images/agregar.png")}
                style={{ width: 25, height: 25, marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 20, color: "#ffff", textAlign: "center" }}
              >
                Ingreso
              </Text>
            </Pressable>
            <Pressable
              style={styles.pressableButton}
              onPress={() => setModalGasto(true)}
            >
              <Image
                source={require("../assets/images/eliminar.png")}
                style={{ width: 25, height: 25, marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 20, color: "#ffff", textAlign: "center" }}
              >
                Gasto
              </Text>
            </Pressable>
          </View>

          <View style={styles.gastossection}>
            <Text style={styles.subtitle}>Gasto por categoria</Text>
            <View>
              <View />
              <View>
                <SectionList
                  sections={datasection}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => (
                    <View>
                      <Text>{item}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.title}>Ultimas transacciones:</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "left",
    color: "#ffff",
  },
  subtitle: {
    fontSize: 22,
    textAlign: "left",
    color: "#ffff",
  },
  text: {
    color: "#ffff",
    fontSize: 20,
  },
  saldosection: {
    padding: 25,
    margin: 10,
    backgroundColor: "#0000009e",
    flexDirection: "row",

    width: 355,
    height: 100,
    borderRadius: 15,
  },
  titulosectionsaldo: {
    justifyContent: "flex-start",
    alignContent: "flex-start",
    padding: 10,
    alignSelf: "flex-start",
  },
  saldo: {
    fontSize: 28,
    color: "#ffff",
    textAlign: "center",
  },
  PressablesSection: {
    padding: 3,
    margin: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  pressableButton: {
    padding: 3,
    marginRight: 1,
    borderColor: "#000000",
    borderRadius: 10,
    backgroundColor: "#0000005a",
    width: 150,
    height: 30,
    justifyContent: "center",
    flexDirection: "row",
  },
  gastossection: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#05386b74",
    borderRadius: 10,
    height: "auto",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 35,
    borderRadius: 20,
  },
  modalContentButtons: {
    margin: 3,
    padding: 3,
  },
  modalTextTitle: {
    fontSize: 20,
    textAlign: "center",
    margin: 3,
  },
  modalInput: {
    margin: 3,
    padding: 3,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "50%",
    height: 30,
    alignItems: "center",
  },
  modalList: {
    padding: 6,
    width: 200,
    height: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  modalButton: {
    margin: 3,
    padding: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
  },
  modalButtonList: {
    padding: 1,
    width: "37%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 3,
    flexDirection: "column",
    textAlign: "center",
  },
  modalButtonListPressable: {
    backgroundColor: "#9a9a9a76",
  },
});
