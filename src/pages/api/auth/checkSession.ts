export async function checkSession() {
    const response = await fetch('http://localhost:8101/valida_sesion.php', {
      method: 'GET',
      credentials: 'include', // para enviar la cookie al servidor
    });
  
    const data = await response.json();
  
    if (response.ok && data.status === 'success') {
      return data.user;
    } else {
      throw new Error(data.message || 'Sesión no válida');
    }
  }
  