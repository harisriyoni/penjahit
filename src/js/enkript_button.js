const getToken = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
          return value;
      }
  }
  return null;
};

document.getElementById('executeButton').addEventListener('click', async () => {
  const targetURL = 'https://lap-umkm.herokuapp.com/ksi/rekapencypt';

  const token = getToken('login');

  const myHeaders = new Headers({
      'login': token,
  });

  try {
      const response = await fetch(targetURL, {
          method: 'POST',
          headers: myHeaders,
      });

      if (response.ok) {
          const responseData = await response.json();

          console.log('API Response:', responseData);

          Swal.fire({
              icon: 'success',
              title: 'API executed successfully',
              showConfirmButton: false,
              timer: 1500
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to execute API',
              text: 'Please try again',
          });
      }
  } catch (error) {
      // Show error SweetAlert
      Swal.fire({
          icon: 'error',
          title: 'Error during API execution',
          text: error.message,
      });
  }
});
