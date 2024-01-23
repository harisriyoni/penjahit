const getTokenFromCookies = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
          return value;
      }
  }
  return null;
};

const getData = async () => {
  const waktu = document.getElementById('waktu').value;
  const token = getTokenFromCookies('login');

  const targetURL = 'https://lap-umkm.herokuapp.com/ksi/get/rekapencrypt';

  try {
      const response = await fetch(targetURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Login': token,
          },
          body: JSON.stringify({ waktu }),
      });

      if (response.ok) {
          const responseData = await response.json();

          console.log('API Response:', responseData);

          displayDataInTable(responseData.data.data);

          Swal.fire({
              icon: 'success',
              title: 'Data loaded successfully',
              showConfirmButton: false,
              timer: 1500
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to get data',
              text: 'Please try again',
          });
      }
  } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Error during API request',
          text: error.message,
      });
  }
};

const displayDataInTable = (data) => {
  const tableBody = document.querySelector('#dataTable tbody');
  tableBody.innerHTML = '';

  data.forEach(item => {
      const row = `
          <tr class="data-row transition-all hover:bg-gray-100 hover:shadow-lg">
              <td class="py-2 px-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">${item.idNotes}</div>
                  <div class="text-sm text-gray-500"></div>
              </td>
              <td class="py-2 px-4 whitespace-nowrap">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      ${item.datetime}
                  </span>
              </td>
              <td class="py-2 px-4 text-sm text-gray-500 whitespace-nowrap">${item.ordersData.join(', ')}</td>
              <td class="py-2 px-4 text-sm text-gray-500 whitespace-nowrap">${item.nominal}</td>
          </tr>
      `;
      tableBody.innerHTML += row;
  });
};
