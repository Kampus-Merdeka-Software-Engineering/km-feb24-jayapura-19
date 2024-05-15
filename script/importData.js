fetch('dataKopi.json')
    .then(response => response.json())
    .then(jsonData => {
        const numberOfLines = jsonData.length;
        console.log("Jumlah baris pada file JSON:", numberOfLines);
    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });
