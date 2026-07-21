import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ImageBackground,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { PieChart } from 'react-native-gifted-charts';
import { SafeAreaView } from "react-native-safe-area-context";
import regGasto from '../services/dashboardGasto';
import regIngreso from '../services/dashboardIngreso';
import getSaldo from '../services/dashboardSaldo';
import gastosPorCategoria from '../services/gastos-categoria';

export default function Dashboard() {
  const [id, setId] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [name, setName] = useState("");
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
  
  //Definir colores para la grafica
  const COLORES_CATEGORIA: Record<string, string> ={
    comida: '#00a465',
    vivienda: '#1B6E76',
    servicios: '#3E9BA8',
    salud: '#E7B448',
    ocio: '#D8664F',
    otros: '#8A94A6', 
  };
  const [gastosData, setGastosData] = useState<
  { value: number; color: string; label: string; text: string }[]
>([]);

useEffect(() => {
  if (!id) return;

  async function fetchGastos() {
    try {
      const data = await gastosPorCategoria(id);

      const total = data.reduce((sum: number, item: any) => sum + Number(item.total), 0);

      const formatted = data.map((item: any) => {
        const valor = Number(item.total);
        const porcentaje = total > 0 ? (valor / total) * 100 : 0;
        return {
          value: valor,
          color: COLORES_CATEGORIA[item.concepto] || '#8A94A6',
          label: item.concepto,
          text: `${porcentaje.toFixed(0)}%`,
        };
      });

      setGastosData(formatted);
    } catch (error) {
      console.error("Error al traer gastos por categoría", error);
    }
  }

  fetchGastos();
}, [id, saldo]); // 👈 se vuelve a calcular cuando cambia el saldo (tras un nuevo gasto)


  useEffect(() => {
    const getUsuario = async () => {
      try {
        const idGuardado = await AsyncStorage.getItem('id_usuario');
        const nombreUsuario: any = await AsyncStorage.getItem('nombre_usuario');
        if (idGuardado !== null) {
          setId(idGuardado);
          setName(nombreUsuario);
        } 
      } catch (e) {
        console.error("Error al leer el ID de AsyncStorage", e);
      }
    };
    getUsuario();
  }, []);

  //funcion para traer el saldo desde la base de datos JAJA
  useEffect(()=>{
    async function fetchSaldo(){
      try{
        const data = await getSaldo(id);
        setSaldo(Number(data.saldo) || 0);

      }
      catch(error){
        console.error("Error al traer el saldo del usuario", error);
      }

    }
    fetchSaldo();
  },[id]);

  // Función para calcular el saldo acorde a la operación
  const handleIngreso = async () => {
    const monto = Number(ingreso);
    const concepto: string = selected;
    const sumaIngreso: number = Number(saldo) + monto;
    const tipo: string = "ingreso";

    if(!monto || monto<=0){
      Alert.alert("Se requiere ingresar una cantidad valida");
      return;
    }
    if (!concepto) {
      Alert.alert("Categoría requerida", "Por favor selecciona un tipo de ingreso.");
      return;
    }

    try {
      setModalIngreso(false); 

      const data = await regIngreso({ tipo, concepto, id, sumaIngreso, monto });
    
      setIngreso("");
      setSelected(""); 
      setSaldo(sumaIngreso);
      Alert.alert("Ingreso registrado", concepto);
    }
    catch (error) {
      setModalIngreso(true); 
      console.log("Error en handleIngreso:", error);
      Alert.alert("Error", "Ocurrió un problema al registrar tu ingreso en el servidor.");
    }
  };

  const handleGasto = async ()=>{
    const monto = Number(gasto);

    const concepto: string = selected;
    const restaGasto: number = Number(saldo) - monto;
    const tipo:string = "gasto";

    if(!monto || monto<=0){
      Alert.alert("Se requiere ingresar una cantidad valida");
    }
    if (!concepto) {
      Alert.alert("Categoría requerida", "Por favor selecciona un tipo de gasto.");
      return;
    }

    try{
      setModalGasto(false);
      const data = await regGasto({tipo, concepto, id, restaGasto, monto });
      setGasto("");
      setModalGasto(false);
      setSelected("");
      Alert.alert("Gasto registrado", concepto);
    }
    catch (error) {
      setModalGasto(true);
      console.log("Error en handleIngreso:", error);
      Alert.alert("Error", "Ocurrió un problema al registrar tu ingreso en el servidor.");
    }


    setModalGasto(false);
    setSaldo(restaGasto);
    setGasto("");
    setSelected(""); // Limpiamos la categoría seleccionada
  };

  // Helpers para abrir modales y limpiar la categoría anterior
  const abrirModalIngreso = () => {
    setSelected(""); 
    setModalIngreso(true);
  };

  const abrirModalGasto = () => {
    setSelected(""); 
    setModalGasto(true);
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.Background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        
        {/* Modales para añadir gasto e ingreso */}
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
                  <Text style={styles.modalButtonText}>Nómina</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("freelance")}
                  style={[
                    styles.modalButtonList,
                    selected === "freelance" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Freelance</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("inversion")}
                  style={[
                    styles.modalButtonList,
                    selected === "inversion" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Inversión</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("otros")}
                  style={[
                    styles.modalButtonList,
                    selected === "otros" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Otros </Text>
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
                  onPress={() => { setModalIngreso(false); }}
                >
                  <Text>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Gasto */}
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
                  <Text style={styles.modalButtonText}>Comida</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("vivienda")}
                  style={[
                    styles.modalButtonList,
                    selected === "vivienda" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Vivienda</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("servicios")}
                  style={[
                    styles.modalButtonList,
                    selected === "servicios" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Servicios</Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("salud")}
                  style={[
                    styles.modalButtonList,
                    selected === "salud" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Salud</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelected("ocio")}
                  style={[
                    styles.modalButtonList,
                    selected === "ocio" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Ocio</Text>
                </Pressable>
                <Pressable
                  onPress={() => setSelected("otros")}
                  style={[
                    styles.modalButtonList,
                    selected === "otros" && styles.modalButtonListPressable,
                  ]}
                >
                  <Text style={styles.modalButtonText}>Otros</Text>
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

        {/* Vista principal del Dashboard */}
        <View>
          <Text style={styles.title}>Bienvenido!</Text>
          <Text style={styles.subtitle}>{name}</Text>
          
          {/* Sección de saldo disponible */}
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
                $ <Text>{Number(saldo).toFixed(2)}</Text>
              </Text>
            </View>
          </View>

          {/* Sección de botones */}
          <View style={styles.PressablesSection}>
            <Pressable
              style={styles.pressableButton}
              onPress={abrirModalIngreso}
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
              onPress={abrirModalGasto}
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
            {gastosData.length > 0 ? (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <PieChart
                  data={gastosData}
                  donut
                  radius={80}
                  innerRadius={50}
                  showText
                  textColor="#fff"
                  textSize={12}
                  centerLabelComponent={() => (
                    <Text style={{ color: '#fff', fontSize: 12 }}>Gastos</Text>
                  )}
                />
                {/* Leyenda manual debajo */}
                <View style={{ marginTop: 16, width: '100%' }}>
                  {gastosData.map((item, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}
                    >
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: item.color,
                          marginRight: 8,
                        }}
                      />
                      <Text style={{ color: '#fff', fontSize: 13, flex: 1 }}>
                        {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 13 }}>{item.text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <Text style={{ color: '#ffffffaa', marginTop: 10 }}>
                Aún no tienes gastos registrados.
              </Text>
            )}
          </View>

          <View style={{ marginTop: 15 }}>
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
    marginTop: 10,
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
    margin: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "50%",
    height: 40,
    textAlign: "center",
  },
  modalList: {
    padding: 6,
    width: 250,
    height: 130,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  modalButton: {
    margin: 5,
    padding: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  modalButtonList: {
    padding: 5,
    width: "40%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    margin: 3,
    alignItems: "center",
  },
  modalButtonText: {
    textAlign: 'center',
  },
  modalButtonListPressable: {
    backgroundColor: "#9a9a9a76",
  },
});