const deleteData = async (customerName) => {
    try {
        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
const handleDeleteButtonClick = (customerName) => {
    return () => {
        deleteData(customerName);
    };
};

const fetchData = async () => {
    try {
        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/get');
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
        } else {
            console.error('Failed to fetch data:', data.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Event delegation for delete buttons
document.getElementById('dataBody').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const customerName = event.target.dataset.customername;
        deleteData(customerName);
    }
});

// Fetch initial data
fetchData();