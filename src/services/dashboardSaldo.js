import API_URL from './api';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saldo(id){
    try{
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(`${API_URL}/dash/saldo/${id}`,{
           method:'GET',
           headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error("Error al obtener saldo");
        }
        return data;
    }
    catch(error){
        throw error;
    }
}