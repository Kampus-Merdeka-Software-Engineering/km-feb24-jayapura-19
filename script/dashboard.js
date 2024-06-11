let data = [];
let revenueSalesChart = null;
let storeSalesChart = null;
let priceRangeChart = null;
let seasonChart = null;
let productTypeChart = null;
let busyHourChart = null; 
let busyWeekChart = null; 
let weekenddaysChart = null; 
let categoryChart = null; 
let topChart = null; 

function filterData() {
    const storeFilter = document.getElementById('storeFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;

    const filteredData = data.filter(item =>
        (storeFilter === '' || item.store_location === storeFilter) &&
        (monthFilter === '' || item.Month === monthFilter)
    );

    updateMetrics(filteredData);
}

function updateMetrics(filteredData) {
    const totalRevenue = filteredData.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    const totalProductSold = filteredData.reduce((acc, cur) => acc + parseInt(cur.transaction_qty), 0);
    const totalTransaction = filteredData.length;
    const totalStore = new Set(filteredData.map(item => item.store_location)).size;

    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    document.getElementById('totalProductSold').textContent = totalProductSold.toLocaleString();
    document.getElementById('totalTransaction').textContent = totalTransaction.toLocaleString();
    document.getElementById('totalStore').textContent = totalStore.toLocaleString();

    updateChart(filteredData);
    updateStoreChart(filteredData);
    createPriceRangeChart(filteredData);
    createSeasonChart(filteredData);
    createProductTypeChart(filteredData);
    createBusyHourChart(filteredData); 
    createBusyWeekChart(filteredData); 
    createWeekenddaysChart(filteredData);
    createCategoryChart(filteredData);
    createTopChart(filteredData);
}

function updateChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Month))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Month === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });
    const productSoldData = labels.map(label => {
        const items = filteredData.filter(item => item.Month === label);
        return items.reduce((acc, cur) => acc + parseInt(cur.transaction_qty), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: '#F4A100',
            borderColor: '#fff',
            yAxisID: 'y',
        }, {
            label: 'Product Sold',
            data: productSoldData,
            backgroundColor: '#FA643F',
            borderColor: '#fff',
            yAxisID: 'y1',
        }]
    };

    if (revenueSalesChart) {
        revenueSalesChart.data = data;
        revenueSalesChart.update();
    } else {
        const ctx = document.getElementById('revenueSales').getContext('2d');
        revenueSalesChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                },
            },
        });
    }
}

function updateStoreChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.store_location))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.store_location === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });
    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: ['#EFC136','#F4A100', '#FA643F'],
            borderColor: '#fff',
        }]
    };

    if (storeSalesChart) {
        storeSalesChart.data = data;
        storeSalesChart.update();
    } else {
        const ctx = document.getElementById('store').getContext('2d');
        storeSalesChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createPriceRangeChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Price_Range))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Price_Range === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: '#F4A100',
            borderColor: '#fff',
        }]
    };

    if (priceRangeChart) {
        priceRangeChart.data = data;
        priceRangeChart.update();
    } else {
        const ctx = document.getElementById('priceRange').getContext('2d');
        priceRangeChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                indexAxis : 'y',
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createSeasonChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Season))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Season === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: ['#EFC136','#F4A100', '#FA643F'],
            borderColor: '#fff',
        }]
    };

    if (seasonChart) {
        seasonChart.data = data;
        seasonChart.update();
    } else {
        const ctx = document.getElementById('season').getContext('2d');
        seasonChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                indexAxis : 'y',
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createProductTypeChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.food_baverages))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item    .food_baverages === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: ['#EFC136','#F4A100', '#FA643F'],
                borderColor: '#fff',
        }]
    };

    if (productTypeChart) {
        productTypeChart.data = data;
        productTypeChart.update();
    } else {
        const ctx = document.getElementById('productType').getContext('2d');
        productTypeChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createBusyHourChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Time))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Time === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: ['#EFC136','#F4A100', '#FA643F'],
            borderColor: '#fff',
        }]
    };

    if (busyHourChart) {
        busyHourChart.data = data;
        busyHourChart.update();
    } else {
        const ctx = document.getElementById('busyHour').getContext('2d');
        busyHourChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createBusyWeekChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Week))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Week === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: ['#FADB7A','#EFC136','#F4A100', '#FA643F'],
            borderColor: '#fff',
        }]
    };

    if (busyWeekChart) {
        busyWeekChart.data = data;
        busyWeekChart.update();
    } else {
        const ctx = document.getElementById('busyWeek').getContext('2d');
        busyWeekChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createWeekenddaysChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Weekdays_End))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Weekdays_End === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: ['#F4A100', '#FA643F'],
            borderColor: '#fff',
        }]
    };

    if (weekenddaysChart) {
        weekenddaysChart.data = data;
        weekenddaysChart.update();
    } else {
        const ctx = document.getElementById('weekenddays').getContext('2d');
        weekenddaysChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createCategoryChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.product_category))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.product_category === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: '#F4A100',
                borderColor: '#fff',
        }]
    };

    if (categoryChart) {
        categoryChart.data = data;
        categoryChart.update();
    } else {
        const ctx = document.getElementById('category').getContext('2d');
        categoryChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                indexAxis : 'y',
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function createTopChart(filteredData) {
    const productRevenues = filteredData.reduce((acc, cur) => {
        if (!acc[cur.product_detail]) {
            acc[cur.product_detail] = 0;
        }
        acc[cur.product_detail] += parseFloat(cur.Revenue);
        return acc;
    }, {});

    const topProducts = Object.entries(productRevenues)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labels = topProducts.map(item => item[0]);
    const revenueData = topProducts.map(item => item[1]);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Revenue',
            data: revenueData,
            backgroundColor: '#F4A100',
            borderColor: '#fff',
        }]
    };

    if (topChart) {
        topChart.data = data;
        topChart.update();
    } else {
        const ctx = document.getElementById('top').getContext('2d');
        topChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                indexAxis : 'y',
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
}

function updateProductTypeChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.food_baverages))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.food_baverages === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    productTypeChart.data.labels = labels;
    productTypeChart.data.datasets[0].data = revenueData;
    productTypeChart.update();
}

function updateBusyHourChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Time))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Time === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    busyHourChart.data.labels = labels;
    busyHourChart.data.datasets[0].data = revenueData;
    busyHourChart.update();
}

function updateBusyWeekChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Week))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Week === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    busyWeekChart.data.labels = labels;
    busyWeekChart.data.datasets[0].data = revenueData;
    busyWeekChart.update();
}

function updateWeekenddaysChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.Week))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.Week === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    weekenddaysChart.data.labels = labels;
    weekenddaysChart.data.datasets[0].data = revenueData;
    weekenddaysChart.update();
}

function updateCategoryChart(filteredData) {
    const labels = [...new Set(filteredData.map(item => item.product_category))];
    const revenueData = labels.map(label => {
        const items = filteredData.filter(item => item.product_category === label);
        return items.reduce((acc, cur) => acc + parseFloat(cur.Revenue), 0);
    });

    categoryChart.data.labels = labels;
    categoryChart.data.datasets[0].data = revenueData;
    categoryChart.update();
}

function updateTopChart(filteredData) {
    const productRevenues = filteredData.reduce((acc, cur) => {
        if (!acc[cur.product_detail]) {
            acc[cur.product_detail] = 0;
        }
        acc[cur.product_detail] += parseFloat(cur.Revenue);
        return acc;
    }, {});

    const topProducts = Object.entries(productRevenues)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const labels = topProducts.map(item => item[0]);
    const revenueData = topProducts.map(item => item[1]);

    topChart.data.labels = labels;
    topChart.data.datasets[0].data = revenueData;
    topChart.update();
}

function initializeFiltersAndCharts() {
    fetch('./script/finalDataCoffee.json')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            updateMetrics(data);
            createProductTypeChart(data);
            createBusyHourChart(data);
            createBusyWeekChart(data);
            createWeekenddaysChart(data); 
            createCategoryChart(data); 
            createTopChart(data);

            const storeFilter = document.getElementById('storeFilter');
            const uniqueStores = [...new Set(data.map(item => item.store_location))];
            uniqueStores.forEach(store => {
                const option = document.createElement('option');
                option.value = store;
                option.textContent = store;
                storeFilter.appendChild(option);
            });

            const monthFilter = document.getElementById('monthFilter');
            const uniqueMonths = [...new Set(data.map(item => item.Month))];
            uniqueMonths.forEach(month => {
                const option = document.createElement('option');
                option.value = month;
                option.textContent = month;
                monthFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById('storeFilter').addEventListener('change', filterData);
    document.getElementById('monthFilter').addEventListener('change', filterData);
}

initializeFiltersAndCharts();


