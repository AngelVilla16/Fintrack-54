import API_URL from './api';

export default async function saldo(id){
    try{
        const res = await fetch(`${API_URL}/dash/saldo/${id}`,{
           method:'GET'
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