import API_URL from './api';


export default async function ingreso({
    tipo,
    concepto,
    id,
    saldo,
    monto 
}){
    try{
        const res = await fetch(`${API_URL}/dash/ingreso`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tipo, concepto, id, saldo, monto})
        });
        const data = await res.json();

        if(!res.ok){
            throw new Error("Error al registrar ingreso");
        }
        return data;

    }
    catch(error){
        throw error;
    }
}