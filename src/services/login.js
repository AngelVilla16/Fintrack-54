import API_URL from './api';

//Funcion asincrona para enviar los datos

export default async function Login({user, password}){
    try{
        const res = await fetch(`${API_URL}/auth/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user, password}),
        });

        const data = await res.json();
        if(!res.ok){
            throw new Error(data.error || "Error al iniciar sesión"); 
        }
        return data;
    }
    catch(error){
        throw error;

    }
}

