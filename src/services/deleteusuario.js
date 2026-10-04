import API_URL from './api';

export default async function eliminar(id){
    try{
        const res = await fetch(`${API_URL}/deleteusuario/${id}`,{
            method: "DELETE",
            headers:{'Content-Type': 'application/json'},
        });

        const data = await res.json().catch(()=>({}));

        if(!res.ok){
            throw new Error(data.error || "Error al eliminar la cuenta");
        }

        return {ok:true, message: data.message};
    }
    catch(error){
        console.error("Error al eliminar al usuario: ", error);
        throw error;
    }
}