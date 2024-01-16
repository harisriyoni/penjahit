document.getElementById('umkmForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const formData = {
            datetime: document.getElementById('datetime').value,
            customerName: document.getElementById('customerName').value,
            ordersData: document.getElementById('ordersData').value.split(','),
            nominal: document.getElementById('nominal').value
        };

        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.code === 200 && data.success) {
            // Menggunakan SweetAlert untuk notifikasi
            Swal.fire({
                title: 'Success',
                text: 'Data successfully posted!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            console.error('Failed to post data:', data.status);
            // Menggunakan SweetAlert untuk notifikasi error
            Swal.fire({
                title: 'Error',
                text: `Failed to post data: ${data.status}`,
                icon: 'error',
                showConfirmButton: true
            });
        }
    } catch (error) {
        console.error('Error posting data:', error);
        // Menggunakan SweetAlert untuk notifikasi error
        Swal.fire({
            title: 'Error',
            text: 'Error posting data. Please try again.',
            icon: 'error',
            showConfirmButton: true
        });
    }
});
