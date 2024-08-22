const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); 

const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Function to read data from JSON file
function readSuppliers() {
    const dataPath = path.join(__dirname, 'data.json');
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
}

// API endpoint to handle supplier queries
app.post('/api/supplier/query', (req, res) => {
    const { location, nature_of_business, manufacturing_process, limit } = req.body;
    const suppliers = readSuppliers(); // Read suppliers from the JSON file

    // Filter suppliers based on the provided criteria
    let results = suppliers.filter(supplier =>
        supplier.location.toLowerCase() === location.toLowerCase() &&
        supplier.nature_of_business === nature_of_business &&
        supplier.manufacturing_processes.includes(manufacturing_process)
    );

    // Limit the number of results returned
    results = results.slice(0, limit || results.length);

    res.json(results);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
