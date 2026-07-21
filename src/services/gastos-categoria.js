import API_URL from './api';

export default async function gastosCategoria(id){
    try{

        const res = await fetch(`${API_URL}/dash/gastos-categoria/${id}`, {
            method: 'GET',

        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error || "Error al obtener gastos");
        }
        return data;
        
    }
    catch(error){
        throw error;
    }
}