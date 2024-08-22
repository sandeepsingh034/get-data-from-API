document.getElementById('supplierForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const nature_of_business = document.getElementById('nature_of_business').value;
    const manufacturing_process = document.getElementById('manufacturing_process').value;

    fetch('/api/supplier/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location,
            nature_of_business,
            manufacturing_process,
            limit: 10
        })
    })
    .then(response => response.json())
    .then(data => {
        const supplierList = document.getElementById('supplierList');
        supplierList.innerHTML = '';

        data.forEach(supplier => {
            const li = document.createElement('li');
            li.textContent = `${supplier.company_name} - ${supplier.location} - ${supplier.nature_of_business} - Processes: ${supplier.manufacturing_processes.join(', ')}`;
            supplierList.appendChild(li);
        });
    });
});