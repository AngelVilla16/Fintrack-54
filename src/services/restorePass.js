import API_URL from './api';

export async function getCodigo(correo){
    const res = await fetch(`${API_URL}/auth/reset`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({correo})

    });
    const data = await res.json();

    if(!res.ok){
        throw new Error(data.message || "Error al solicitar el código");
    }
    return data;
}
export async function verificarCodigo(correo, codigo) {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, codigo }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error al verificar el código');
  }

  return data;
}

export async function nuevaPass(correo,codigo, password){
  const res = await fetch(`${API_URL}/auth/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, codigo, password }),
  });

  const data = await res.json();

  if(!res.ok){
    throw new Error(data.message || 'Error al actualizar la contraseña');
  }

}