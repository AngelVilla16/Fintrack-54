import API_URL from './api';
export default async function gasto({
    tipo,
    concepto,
    id,
    restaGasto,
    monto
}){
    try{
        const res = await fetch(`${API_URL}/dash/gasto`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tipo, concepto, id, restaGasto, monto})
        });

        const data = await res.json();

        if(!res.ok){
            console.log("Error al registrar el gasto", Error);
        }
    }
    catch(error){
        throw error;
    }
}