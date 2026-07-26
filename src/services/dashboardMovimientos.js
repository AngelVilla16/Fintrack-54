import API_URL from './api';

export default async function movimientos(id) {
    try {
        const res = await fetch(`${API_URL}/dash/movimientos/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json();

        if (!res.ok) {
            console.log("Error al obtener movimientos recientes.")
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}