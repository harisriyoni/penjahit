document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const formData = {
            datetime: document.getElementById('datetime').value,
            customerName: document.getElementById('customerName').value,
            ordersData: document.getElementById('ordersData').value.split(','),
            nominal: document.getElementById('nominal').value
        };

        const response = await fetch('https://lap-umkm.herokuapp.com/ksi/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.code === 200 && data.success) {
            alert('Data successfully updated!');
        } else {
            console.error('Failed to update data:', data.status);
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
});