const rowsPerPage = 1000; // Jumlah baris per halaman
let currentPage = 1;
let data = [];
let filteredData = [];

// Fungsi untuk mengurutkan data berdasarkan transaction_id
function sortData(data) {
    return data.sort((a, b) => parseInt(a.transaction_id) - parseInt(b.transaction_id));
}

// Fungsi untuk menampilkan tabel
function displayTable(data, page) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum mengisi data baru
    
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach(item => {
        const row = document.createElement('tr');

        const columns = [
            "transaction_id", "transaction_date", "Month", "Week", "Day", "Weekdays_End",
            "transaction_time", "Time", "Season", "transaction_qty", "store_id", "store_location",
            "product_id", "unit_price", "Price_Range", "Revenue", "product_category",
            "food_baverages", "product_type", "product_detail"
        ];

        columns.forEach(column => {
            const cell = document.createElement('td');
            cell.textContent = item[column] || ''; // Menangani nilai null atau undefined
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    document.getElementById('page-number').textContent = `${page} / ${Math.ceil(data.length / rowsPerPage)}`;
}

// Fungsi untuk memperbarui navigasi pagination
function updatePagination(totalPages, filteredData) {
    const pageNumberElement = document.getElementById('page-number');
    pageNumberElement.textContent = `${currentPage} / ${totalPages}`;

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Remove existing event listeners to avoid multiple event handlers
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));

    document.getElementById('prev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayTable(filteredData, currentPage);
            pageNumberElement.textContent = `${currentPage} / ${totalPages}`;
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayTable(filteredData, currentPage);
            pageNumberElement.textContent = `${currentPage} / ${totalPages}`;
        }
    });
}

function updateDropdownOptions(data) {
    const storeOptions = [...new Set(data.map(item => item.store_location))];
    const categoryOptions = [...new Set(data.map(item => item.product_category))];
    const priceRangeOptions = [...new Set(data.map(item => item.Price_Range))];
    const typeOptions = [...new Set(data.map(item => item.product_type))];
    const seasonOptions = [...new Set(data.map(item => item.Season))];
    const weekdaysEndOptions = [...new Set(data.map(item => item.Weekdays_End))];
    const monthOptions = [...new Set(data.map(item => item.Month))];
    const timeOptions = [...new Set(data.map(item => item.Time))];

    updateDropdown('storeFilter', storeOptions, 'All Locations');
    updateDropdown('categoryFilter', categoryOptions, 'All Categories');
    updateDropdown('priceRangeFilter', priceRangeOptions, 'All Price Ranges');
    updateDropdown('typeFilter', typeOptions, 'All Types');
    updateDropdown('seasonFilter', seasonOptions, 'All Seasons');
    updateDropdown('weekdaysEndFilter', weekdaysEndOptions, 'All Weekdays/Ends');
    updateDropdown('monthFilter', monthOptions, 'All Months');
    updateDropdown('timeFilter', timeOptions, 'All Times');
}

function updateDropdown(selectId, options, allText) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ''; // Kosongkan dropdown sebelum memasukkan opsi baru
    
    // Tambahkan opsi "All"
    const allOption = document.createElement('option');
    allOption.value = '';
    allOption.textContent = allText;
    selectElement.appendChild(allOption);
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// Fungsi untuk memfilter data berdasarkan kriteria yang dipilih
function filterData() {
    const storeFilter = document.getElementById('storeFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceRangeFilter = document.getElementById('priceRangeFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const seasonFilter = document.getElementById('seasonFilter').value;
    const weekdaysEndFilter = document.getElementById('weekdaysEndFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;
    const timeFilter = document.getElementById('timeFilter').value;

    filteredData = data.filter(item => {
        return (storeFilter === '' || item.store_location === storeFilter) &&
            (categoryFilter === '' || item.product_category === categoryFilter) &&
            (priceRangeFilter === '' || item.Price_Range === priceRangeFilter) &&
            (typeFilter === '' || item.product_type === typeFilter) &&
            (seasonFilter === '' || item.Season === seasonFilter) &&
            (weekdaysEndFilter === '' || item.Weekdays_End === weekdaysEndFilter) &&
            (monthFilter === '' || item.Month === monthFilter) &&
            (timeFilter === '' || item.Time === timeFilter);
    });

    currentPage = 1; // Reset halaman ke halaman pertama setelah filtering
    displayTable(filteredData, currentPage); // Tampilkan tabel dengan data yang difilter
    updatePagination(Math.ceil(filteredData.length / rowsPerPage), filteredData); // Perbarui navigasi pagination berdasarkan data yang difilter
}

// Fetch data dari file JSON dan inisialisasi halaman
fetch('./script/finalDataCoffee.json')
    .then(response => response.json())
    .then(fetchedData => {
        data = sortData(fetchedData); // Mengurutkan data
        filteredData = data; // Inisialisasi filteredData dengan semua data
        displayTable(filteredData, currentPage);

        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        updatePagination(totalPages, filteredData);

        // Update filter options
        updateDropdownOptions(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Event listener untuk dropdown filter
document.querySelectorAll('select').forEach(selectElement => {
    selectElement.addEventListener('change', filterData);
});
