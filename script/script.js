fetch('./script/dataKopi.json')
  .then(response => response.json())
  .then(data => {
    // Menghitung total metrik
    let totalRevenue = 0;
    let totalProductSold = 0;
    let totalTransaction = data.length;  // Menghitung jumlah total transaksi (count of rows)

    const storeSet = new Set(); // Set untuk menyimpan store yang unik

    data.forEach(item => {
      totalRevenue += parseFloat(item.Revenue);
      totalProductSold += parseInt(item.transaction_qty);
      storeSet.add(item.store_location); // Menambahkan store_location ke dalam set
    });

    let totalStore = storeSet.size; // Menghitung jumlah store unik

    // Memperbarui elemen HTML dengan nilai metrik
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
    document.getElementById('totalProductSold').textContent = totalProductSold.toLocaleString();
    document.getElementById('totalTransaction').textContent = totalTransaction.toLocaleString();
    document.getElementById('totalStore').textContent = totalStore.toLocaleString();
  })
  .catch(error => {
    console.error('Error:', error);
  });







// Trend
fetch('./script/dataKopi.json')
  .then(response => response.json())
  .then(data => {
    // Mengelompokkan data berdasarkan Month, lalu menjumlahkan revenue dan transaction_qty
    const revenueAndQtyByMonth = data.reduce((acc, item) => {
        const month = item.Month;
        if (!acc[month]) {
            acc[month] = { revenue: 0, quantity: 0 };
        }
        acc[month].revenue += parseFloat(item.Revenue);
        acc[month].quantity += parseInt(item.transaction_qty);
        return acc;
    }, {});

    // Mendapatkan daftar bulan
    const months = Object.keys(revenueAndQtyByMonth);

    // Mendapatkan data revenue dan quantity untuk setiap bulan
    const revenueData = months.map(month => revenueAndQtyByMonth[month].revenue);
    const quantityData = months.map(month => revenueAndQtyByMonth[month].quantity);

    // Data untuk chart
    const revenueAndQtyChartData = {
        labels: months,
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: '#5CAFFC',
                borderColor: '#fff',
                data: quantityData
            },
            {
                label: 'Total Quantity Sold',
                backgroundColor: '#725CFF',
                borderColor: '#fff',
                data: revenueData
            }
        ]
    };

    // Membuat chart
    const ctxRevenueAndQty = document.getElementById('revenueSales').getContext('2d');
    const revenueAndQtyChart = new Chart(ctxRevenueAndQty, {
        type: 'bar',
        data: revenueAndQtyChartData,
        options: {
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });
})
.catch(error => {
    console.error('Error:', error);
});









fetch('./script/dataKopi.json')
  .then(response => response.json())
  .then(data => {


    // STORE LOCATION
        // Mengelompokkan dan menjumlahkan revenue berdasarkan store_location
        const revenueByStore = data.reduce((acc, item) => {
            if (!acc[item.store_location]) {
                acc[item.store_location] = 0;
            }
            acc[item.store_location] += parseFloat(item.Revenue);
            return acc;
        }, {});

        // Mendapatkan label dan data dari objek yang dikelompokkan
        const labels = Object.keys(revenueByStore);
        const salesData = Object.values(revenueByStore);

        // Membuat data untuk chart
        const storeData = {
            labels: labels,
            datasets: [{
                label: 'Revenue by Store',
                backgroundColor: ['#EB7CA6', '#5CAFFC', '#7C5CFC'],
                borderColor: '#fff',
                data: salesData
            }]
        };

        // Membuat chart
        const ctxStore = document.getElementById('store').getContext('2d');
        const storeChart = new Chart(ctxStore, {
            type: 'bar',
            data: storeData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });








// PRICE RANGE
    // Mengelompokkan data transaksi berdasarkan rentang harga
    const salesByPriceRange = data.reduce((acc, transaction) => {
        const priceRange = transaction.Price_Range;
        if (!acc[priceRange]) {
            acc[priceRange] = 0;
        }
        acc[priceRange] += parseFloat(transaction.Revenue);
        return acc;
    }, {});

    // Array labels berdasarkan rentang harga
    const priceRangeLabels = Object.keys(salesByPriceRange);

    // Array data total penjualan berdasarkan rentang harga
    const priceRangeSalesData = priceRangeLabels.map(priceRange => salesByPriceRange[priceRange]);

    // Data untuk chart Sales by Price Range
    const priceRangeData = {
        labels: priceRangeLabels,
        datasets: [{
            label: 'Sales by Price Range',
            backgroundColor: '#725CFF',
            borderColor: '#fff',
            data: priceRangeSalesData
        }]
    };

    // Menggambar chart Sales by Price Range
    var ctxPriceRange = document.getElementById('priceRange').getContext('2d');
    var priceRangeChart = new Chart(ctxPriceRange, {
        type: 'bar',
        data: priceRangeData,
        options: {
            indexAxis : 'y',
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });






    // SEASON
    // Mengelompokkan data transaksi berdasarkan musim (season)
    const salesBySeason = data.reduce((acc, transaction) => {
        const season = transaction.Season;
        if (!acc[season]) {
            acc[season] = 0;
        }
        acc[season] += parseFloat(transaction.Revenue);
        return acc;
    }, {});

    // Array labels berdasarkan musim
    const seasonLabels = Object.keys(salesBySeason);

    // Array data total penjualan berdasarkan musim
    const seasonSalesData = seasonLabels.map(season => salesBySeason[season]);

    // Data untuk chart Sales by Season
    const seasonData = {
        labels: seasonLabels,
        datasets: [{
            label: 'Sales by Season',
            backgroundColor: '#725CFF',
            borderColor: '#725CFF',
            data: seasonSalesData
        }]
    };

    // Menggambar chart Sales by Season
    var ctxSeason = document.getElementById('season').getContext('2d');
    var seasonChart = new Chart(ctxSeason, {
        type: 'bar',
        data: seasonData,
        options: {
            indexAxis :'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });







    // Product Type
// Mengelompokkan data berdasarkan product_type dan Month, lalu menjumlahkan revenue
const revenueByProductType = data.reduce((acc, item) => {
    const key = `${item.Month}-${item.food_baverages}`;
    if (!acc[key]) {
        acc[key] = 0;
    }
    acc[key] += parseFloat(item.Revenue);
    return acc;
}, {});

// Mendapatkan daftar bulan dan jenis produk
const months = [...new Set(data.map(item => item.Month))];
const productTypes = [...new Set(data.map(item => item.food_baverages))];

// Warna yang akan digunakan untuk dataset
const colors = ['#7C5CFC', '#5CAFFC', '#EB7CA6'];

// Mengelompokkan data untuk chart product type
const productTypeData = productTypes.map((type, index) => {
    return {
        label: type,
        data: months.map(month => revenueByProductType[`${month}-${type}`] || 0),
        backgroundColor: colors[index % colors.length]  // Menggunakan warna secara berulang jika jenis produk lebih dari jumlah warna
    };
});

// Data untuk chart product type
const productTypeChartData = {
    labels: months,
    datasets: productTypeData
};

// Membuat chart product type
const ctxProductType = document.getElementById('productType').getContext('2d');
const productTypeChart = new Chart(ctxProductType, {
    type: 'bar',
    data: productTypeChartData,
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});







// BUSY HOUR
// Mengelompokkan data transaksi berdasarkan waktu (Time)
const salesByTime = data.reduce((acc, transaction) => {
    const time = transaction.Time;
    if (!acc[time]) {
        acc[time] = 0;
    }
    acc[time] += parseFloat(transaction.Revenue);
    return acc;
}, {});

// Array labels berdasarkan waktu (Time)
const timeLabels = Object.keys(salesByTime);

// Array data total penjualan berdasarkan waktu (Time)
const timeSalesData = timeLabels.map(time => salesByTime[time]);

// Data untuk chart Sales by Time
const salesByTimeData = {
    labels: timeLabels,
    datasets: [{
        label: 'Sales in Time',
        backgroundColor: ['#7C5CFC', '#5CAFFC', '#EB7CA6'], // Anda dapat menambahkan lebih banyak warna jika diperlukan
        borderColor: '#fff',
        data: timeSalesData
    }]
};

// Menggambar chart Sales by Time
var ctxSalesByTime = document.getElementById('busyHour').getContext('2d');
var salesByTimeChart = new Chart(ctxSalesByTime, {
    type: 'bar',
    data: salesByTimeData,
    options: {
        indexAxis: 'x',
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});




// BUSY WEEK
// Mengelompokkan data berdasarkan week dan Month, lalu menjumlahkan revenue
const revenueByBusyWeek = data.reduce((acc, item) => {
    const key = `${item.Month}-${item.Week}`;
    if (!acc[key]) {
        acc[key] = {};
    }
    if (!acc[key][item.Week]) {
        acc[key][item.Week] = 0;
    }
    acc[key][item.Week] += parseFloat(item.Revenue);
    return acc;
}, {});

// Mendapatkan daftar bulan dan minggu
const busyWeekMonths = [...new Set(data.map(item => item.Month))];
const busyWeeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

// Warna yang akan digunakan untuk dataset
const busyWeekColors = ['#7C5CFC', '#5CAFFC', '#EB7CA6', '#FF7262']; // Ditambahkan warna untuk masing-masing minggu

// Mengelompokkan data untuk chart busy week
const busyWeekData = busyWeeks.map((week, index) => {
    return {
        label: week,
        data: busyWeekMonths.map(month => {
            const revenue = revenueByBusyWeek[`${month}-${week}`];
            return revenue ? revenue[week] || 0 : 0; // Menggunakan variabel 'week' sebagai kunci objek, bukan 'item.Week'
        }),
        backgroundColor: busyWeekColors[index % busyWeekColors.length]  // Menggunakan warna secara berulang jika jumlah minggu lebih dari jumlah warna
    };
});

// Data untuk chart busy week
const busyWeekChartData = {
    labels: busyWeekMonths,
    datasets: busyWeekData
};

// Membuat chart busy week
const ctxBusyWeek = document.getElementById('busyWeek').getContext('2d');
const busyWeekChart = new Chart(ctxBusyWeek, {
    type: 'bar',
    data: busyWeekChartData,
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});





// Weekdays / Weekends
fetch('./script/dataKopi.json')
  .then(response => response.json())
  .then(data => {
    // Weekend and Weekdays
    // Mengelompokkan data berdasarkan Weekdays_End dan Month, lalu menjumlahkan revenue
    const revenueByWeekendWeekdays = data.reduce((acc, item) => {
        const key = `${item.Month}-${item.Weekdays_End}`;
        if (!acc[key]) {
            acc[key] = 0;
        }
        acc[key] += parseFloat(item.Revenue);
        return acc;
    }, {});

    // Mendapatkan daftar bulan dan tipe hari (Weekdays atau Weekend)
    const weekendWeekdaysMonths = [...new Set(data.map(item => item.Month))];
    const weekendWeekdaysTypes = ['Weekdays', 'Weekend'];

    // Warna yang akan digunakan untuk dataset
    const weekendWeekdaysColors = ['#725CFF', '#5CAFFC'];

    // Mengelompokkan data untuk chart weekend dan weekdays
    const weekendWeekdaysData = weekendWeekdaysTypes.map((type, index) => {
        return {
            label: type,
            data: weekendWeekdaysMonths.map(month => revenueByWeekendWeekdays[`${month}-${type}`] || 0),
            backgroundColor: weekendWeekdaysColors[index % weekendWeekdaysColors.length]
        };
    });

    // Data untuk chart weekend dan weekdays
    const weekendWeekdaysChartData = {
        labels: weekendWeekdaysMonths,
        datasets: weekendWeekdaysData
    };

    // Membuat chart weekend dan weekdays
    const ctxWeekendWeekdays = document.getElementById('weekenddays').getContext('2d');
    const weekendWeekdaysChart = new Chart(ctxWeekendWeekdays, {
        type: 'bar',
        data: weekendWeekdaysChartData,
        options: {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });
})
.catch(error => {
    console.error('Error:', error);
});














// PRODUCT CATEGORY
 // Mengelompokkan data transaksi berdasarkan kategori produk
    const salesByCategory = data.reduce((acc, transaction) => {
        const category = transaction.product_category;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += parseFloat(transaction.Revenue);
        return acc;
    }, {});

    // Mengurutkan kategori berdasarkan total penjualan dalam urutan menurun
    const sortedCategories = Object.keys(salesByCategory).sort((a, b) => salesByCategory[b] - salesByCategory[a]);

    // Memilih top 10 kategori
    const topCategories = sortedCategories.slice(0, 10);

    // Array data total penjualan untuk top 10 kategori
    const topCategorySalesData = topCategories.map(category => salesByCategory[category]);

    // Data untuk chart Top Sales by Category
    const topSalesByCategoryData = {
        labels: topCategories,
        datasets: [{
            label: 'Top Sales by Category',
            backgroundColor: '#725CFF',
            borderColor: '#fff',
            data: topCategorySalesData
        }]
    };

    // Menggambar chart Top Sales by Category
    var ctxTopSalesByCategory = document.getElementById('category').getContext('2d');
    var topSalesByCategoryChart = new Chart(ctxTopSalesByCategory, {
        type: 'bar',
        data: topSalesByCategoryData,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });








    // TOP 10 PRODUCT
    // Mengelompokkan data transaksi berdasarkan rincian produk
    const salesByProductDetail = data.reduce((acc, transaction) => {
        const productDetail = transaction.product_detail;
        if (!acc[productDetail]) {
            acc[productDetail] = 0;
        }
        acc[productDetail] += parseFloat(transaction.Revenue);
        return acc;
    }, {});

    // Mengurutkan rincian produk berdasarkan total penjualan dalam urutan menurun
    const sortedProductDetails = Object.keys(salesByProductDetail).sort((a, b) => salesByProductDetail[b] - salesByProductDetail[a]);

    // Memilih top 10 rincian produk
    const topProductDetails = sortedProductDetails.slice(0, 10);

    // Array data total penjualan untuk top 10 rincian produk
    const topProductDetailSalesData = topProductDetails.map(productDetail => salesByProductDetail[productDetail]);

    // Data untuk chart Top Sales by Product Detail
    const topSalesByProductDetailData = {
        labels: topProductDetails,
        datasets: [{
            label: 'Top Sales by Product Detail',
            backgroundColor: '#725CFF',
            borderColor: '#fff',
            data: topProductDetailSalesData
        }]
    };

    // Menggambar chart Top Sales by Product Detail
    var ctxTopSalesByProductDetail = document.getElementById('top').getContext('2d');
    var topSalesByProductDetailChart = new Chart(ctxTopSalesByProductDetail, {
        type: 'bar',
        data: topSalesByProductDetailData,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });

})
.catch(error => {
console.error('Error:', error);
});
