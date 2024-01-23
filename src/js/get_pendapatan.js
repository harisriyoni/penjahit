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

const deleteData = async (customerName) => {
    try {
        const token = getTokenFromCookies('login');

        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'login': token
            },
            body: JSON.stringify({
                customerName: customerName
            }),
        });

        const data = await response.json();

        if (data.code === 200 && data.success) {
            // Menampilkan SweetAlert
            Swal.fire({
                title: 'Success',
                text: 'Data successfully deleted!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });

            // Fetch data again after deletion
            fetchData();
        } else {
            console.error('Failed to delete data:', data.status);
            // Menampilkan SweetAlert untuk kesalahan
            Swal.fire({
                title: 'Error',
                text: `Failed to delete data: ${data.status}`,
                icon: 'error',
                showConfirmButton: true
            });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        // Menampilkan SweetAlert untuk kesalahan
        Swal.fire({
            title: 'Error',
            text: 'Error deleting data. Please try again.',
            icon: 'error',
            showConfirmButton: true
        });
    }
};

const updateData = async (idNotes) => {
    try {
        const token = getTokenFromCookies('login');

        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/getid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'login': token
            },
            body: JSON.stringify({
                idNotes: idNotes,
            }),
        });

        const data = await response.json();

        if (data.code === 200 && data.success) {
            // Pastikan nilai yang diperlukan tersedia dan bukan "undefined"
            const { customerName, datetime, nominal, ordersData } = data.data;

            if (customerName && datetime && nominal && ordersData) {
                // Menampilkan SweetAlert
                Swal.fire({
                    title: 'Success',
                    text: 'Data successfully updated!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Mengarahkan ke halaman pend_update.html dan mengirim data sebagai parameter URL
                const queryParams = new URLSearchParams({
                    customerName: customerName,
                    ordersData: ordersData.join(','), // Menggabungkan array menjadi string
                    nominal: nominal,
                    datetime: datetime,
                });

                window.location.href = `pend_update.html?${queryParams.toString()}`;
            } else {
                console.error('Some data is undefined or null:', data.data);
                // Menampilkan SweetAlert untuk kesalahan
                Swal.fire({
                    title: 'Error',
                    text: 'Some data is undefined or null. Please try again.',
                    icon: 'error',
                    showConfirmButton: true
                });
            }
        } else {
            console.error('Failed to update data:', data.status);
            // Menampilkan SweetAlert untuk kesalahan
            Swal.fire({
                title: 'Error',
                text: `Failed to update data: ${data.status}`,
                icon: 'error',
                showConfirmButton: true
            });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        // Menampilkan SweetAlert untuk kesalahan
        Swal.fire({
            title: 'Error',
            text: 'Error updating data. Please try again.',
            icon: 'error',
            showConfirmButton: true
        });
    }
};





const handleDeleteButtonClick = (customerName) => {
    return () => {
        deleteData(customerName);
    };
};

const handleUpdateButtonClick = (idNotes) => {
    return () => {
        // Mendapatkan data yang ingin diubah dari pengguna (misalnya, formulir input)
        updateData(idNotes);
    };
};

const fetchData = async () => {
    try {
        const token = getTokenFromCookies('login');

        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'login': token
            },
        });

        const data = await response.json();

        if (data.code === 200 && data.success) {
            const tbody = document.getElementById('dataBody');
            tbody.innerHTML = '';

            data.data.forEach(entry => {
                const orders = entry.ordersData.join(', ');

                const row = `
                  <tr class="data-row transition-all hover:bg-gray-100 hover:shadow-lg">
                      <td class="py-2 px-4 whitespace-nowrap">
                          <div class="flex items-center">
                              <div class="flex-shrink-0 w-10 h-10">
                                  <img class="w-10 h-10 rounded-full"
                                      src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                      alt="" />
                              </div>
                              <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">${entry.customerName}</div>
                              </div>
                          </div>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">
                          <div class="text-sm text-gray-900">${orders}</div>
                          <div class="text-sm text-gray-500"></div>
                      </td>
                      <td class="py-2 px-4 whitespace-nowrap">
                          <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                              ${entry.nominal}
                          </span>
                      </td>
                      <td class="py-2 px-4 text-sm text-gray-500 whitespace-nowrap">${entry.datetime}</td>
                      <td class="py-2 px-4 text-sm font-medium text-right whitespace-nowrap">
                          <button class="delete-button text-red-600 hover:text-red-900" data-customername="${entry.customerName}">Delete</button>
                          <button class="update-button text-blue-600 hover:text-blue-900" data-idnotes="${entry.idNotes}">Update</button>
                      </td>
                  </tr>
              `;

                tbody.innerHTML += row;
            });

            // Set up event listeners for delete buttons
            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                const customerName = button.dataset.customername;
                button.addEventListener('click', handleDeleteButtonClick(customerName));
            });

            // Set up event listeners for update buttons
            const updateButtons = document.querySelectorAll('.update-button');
            updateButtons.forEach(button => {
                const idNotes = button.dataset.idnotes;
                button.addEventListener('click', handleUpdateButtonClick(idNotes));
            });
        } else {
            console.error('Failed to fetch data:', data.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Event delegation for delete and update buttons
document.getElementById('dataBody').addEventListener('click', (event) => {
    const actionMapping = {
        'delete-button': deleteData,
        'update-button': (target) => handleUpdateButtonClick(target.dataset.idnotes)(),
    };

    const action = actionMapping[event.target.classList[0]];
    if (action) {
        action(event.target);
    }
});

// Fetch initial data
fetchData();
