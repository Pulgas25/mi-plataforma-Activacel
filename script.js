document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = '/admin/dashboard.html';  // Redirige a la página de administración
  } else {
    document.getElementById('error-message').innerText = data.message || 'Error al iniciar sesión';
  }
});
