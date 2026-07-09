//import la url
import API_URL from "./api";

//Creamos funcion asincrona de javascript con los parametros que vamos a registrar

export default async function registerUser({
  name,
  lastname,
  email,
  password,
}) {
  try {
    //peticion fetch con la URL
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastname, email, password }),
    });
    //esperar resupuesta
    const data = await res.json();
    //error
    if (!res.ok) {
      throw new Error(data.error || "Error al registrar");
    }
    return data; //Aqui viene el mensaje que definimos en el archivo de auth
  } catch (error) {
    throw error;
  }
}
