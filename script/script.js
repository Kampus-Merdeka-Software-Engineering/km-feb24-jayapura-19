fetch('./script/dataKopi.json')
  .then(response => response.json())
  .then(data => {
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

 // Mengelompokkan data transaksi berdasarkan bulan dan minggu dengan spasi
 const salesByWeekAndMonth = data.reduce((acc, transaction) => {
    const month = transaction.Month;
    const week = transaction.Week.trim(); // Trim any leading or trailing spaces

    if (!acc[month]) {
        acc[month] = { "Week 1": 0, "Week 2": 0, "Week 3": 0, "Week 4": 0 };
    }

    // Check if week is valid and falls within the expected range
    if (week === "1" || week === "2" || week === "3" || week === "4") {
        acc[month][`Week ${week}`] += parseFloat(transaction.Revenue);
    }
    return acc;
}, {});

// Debug log hasil pengelompokan
console.log('Sales by Week and Month:', salesByWeekAndMonth);

// Array labels berdasarkan bulan
const monthLabels = Object.keys(salesByWeekAndMonth);

// Array data total penjualan per minggu berdasarkan bulan
const week1SalesData = monthLabels.map(month => salesByWeekAndMonth[month]["Week 1"]);
const week2SalesData = monthLabels.map(month => salesByWeekAndMonth[month]["Week 2"]);
const week3SalesData = monthLabels.map(month => salesByWeekAndMonth[month]["Week 3"]);
const week4SalesData = monthLabels.map(month => salesByWeekAndMonth[month]["Week 4"]);

// Data untuk chart Sales by Week
const weeklySalesData = {
    labels: monthLabels,
    datasets: [
        {
            label: 'Week 1',
            backgroundColor: '#725CFF',
            data: week1SalesData
        },
        {
            label: 'Week 2',
            backgroundColor: '#5CAFFC',
            data: week2SalesData
        },
        {
            label: 'Week 3',
            backgroundColor: '#EB7CA6',
            data: week3SalesData
        },
        {
            label: 'Week 4',
            backgroundColor: '#FF7262',
            data: week4SalesData
        }
    ]
};

// Debug log data untuk chart
console.log('Weekly Sales Data:', weeklySalesData);

// Menggambar chart Sales by Week
var ctxBusyWeek = document.getElementById('busyWeek').getContext('2d');
var busyWeekChart = new Chart(ctxBusyWeek, {
    type: 'bar',
    data: weeklySalesData,
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


let revenueSalesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Total Revenue',
        backgroundColor: 'rgba(114, 92, 255, 1)',
        borderWidth: 1,
        data: [500, 600, 700, 800, 900, 1000]
    }, {
        label: 'Total Product Sold',
        backgroundColor: 'rgba(92, 175, 252, 1)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [200, 250, 300, 350, 400, 450]
    }]
};

var ctxRevenueSales = document.getElementById('revenueSales').getContext('2d');
var revenueSalesChart = new Chart(ctxRevenueSales, {
    type: 'bar',
    data: revenueSalesData,
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

let storeData = {
    labels: ['Hells Kitchen', 'Lower Manhattan', 'Astoria'],
    datasets: [{
        label: 'Sales by Store',
        backgroundColor: ['#EB7CA6', '#5CAFFC', '#7C5CFC'],
        borderColor: '#fff',
        data: [500, 500, 500]
    }]
};

var ctxStore = document.getElementById('store').getContext('2d');
var storeChart = new Chart(ctxStore, {
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

let productType = {
    labels: ['Jan', 'Feb','Mar','Apr','Mei','Jun'],
    datasets: [{
        label: 'Food',
        backgroundColor: '#7C5CFC',
        borderColor: '#fff',
        data: [40, 40, 40, 50, 40, 40] 
    }, {
        label: 'Beverage',
        backgroundColor: '#5CAFFC',
        borderColor: '#fff',
        data: [20, 10, 10, 5, 30, 10] 
    }, {
        label: 'Merchandise',
        backgroundColor: '#EB7CA6',
        borderColor: '#fff',
        data: [30, 30, 30, 30, 30, 30]
    }]
};

var ctxproductType = document.getElementById('productType').getContext('2d');
var productTypeChart = new Chart(ctxproductType, {
    type: 'bar',
    data: productType,
    options: {
        indexAxis: 'x',
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    },
});

// let busyHour= {
//     labels: ['Jan', 'Feb','Mar','Apr','Mei','Jun'],
//     datasets: [{
//         label: 'Morning',
//         backgroundColor: '#7C5CFC',
//         borderColor: '#fff',
//         data: [60, 60, 60, 60, 60, 60] 
//     }, {
//         label: 'Afternoon',
//         backgroundColor: '#5CAFFC',
//         borderColor: '#fff',
//         data: [25, 25, 25, 25, 25, 25] 
//     }, {
//         label: 'Evening',
//         backgroundColor: '#EB7CA6',
//         borderColor: '#fff',
//         data: [15, 15, 15, 15, 15, 15]
//     }]
// };

// var ctxbusyHour = document.getElementById('busyHour').getContext('2d');
// var productTypeChart = new Chart(ctxbusyHour, {
//     type: 'bar',
//     data: busyHour,
//     options: {
//         indexAxis: 'x',
//         scales: {
//             x: {
//                 stacked: true
//             },
//             y: {
//                 stacked: true
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             },
//         },
//     },
// });

// let busyWeek = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [{
//         label: 'Week 1',
//         backgroundColor: '#725CFF',
//         data: [200, 300, 400, 500, 600, 700]
//     }, {
//         label: 'Week 2',
//         backgroundColor: '#5CAFFC',
//         data: [300, 400, 500, 600, 700, 800]
//     },{
//         label: 'Week 3',
//         backgroundColor: '#EB7CA6',
//         data: [400, 500, 600, 700, 800, 900]
//     },{
//         label: 'Week 4',
//         backgroundColor: '#FF7262',
//         data: [500, 600, 700, 800, 900, 1000]
//     }]
// };

// var ctxBusyWeek = document.getElementById('busyWeek').getContext('2d');
// var busyWeekChart = new Chart(ctxBusyWeek, {
//     type: 'bar',
//     data: busyWeek,
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             },
//         },
//     },
// });

let weekenddays = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Weekdays',
        backgroundColor: '#725CFF',
        data: [600, 800, 1000, 1200, 1400, 1600]
    }, {
        label: 'Weekend',
        backgroundColor: '#5CAFFC',
        data: [300, 400, 500, 600, 700, 800]
    }]
};

var ctxweekenddays = document.getElementById('weekenddays').getContext('2d');
var weekenddaysChart = new Chart(ctxweekenddays, {
    type: 'bar',
    data: weekenddays,
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

// let category = {
//     labels: ['Category 1','Category 2','Category 3','Category 4','Category 5','Category 6','Category 7', 'Category 8','Category 9'],
//     datasets: [{
//         label: 'Sales by Category',
//         backgroundColor: ['#725CFF'],
//         borderColor: '#725CFF',
//         data: [200, 100, 75,50,25,100, 75,50,25]
//     }]
// };

// var ctxpcategory = document.getElementById('category').getContext('2d');
// var priceRangeChart = new Chart(ctxpcategory, {
//     type: 'bar',
//     data: category,
//     options: {
//         indexAxis :'y',
//         scales: {
//             x: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             },
//         },
//     },
// });

// let topTen = {
//     labels: ['Top 1','Top 2','Top 3','Top 4','Top 5','Top 6','Top 7', 'Top 8','Top 9','Top 10'],
//     datasets: [{
//         label: 'Top 10 Product',
//         backgroundColor: ['#725CFF'],
//         borderColor: '#725CFF',
//         data: [200, 100, 75,50,25,100, 75,50,25, 75]
//     }]
// };

// var ctxtop = document.getElementById('top').getContext('2d');
// var priceRangeChart = new Chart(ctxtop, {
//     type: 'bar',
//     data: topTen,
//     options: {
//         indexAxis :'y',
//         scales: {
//             x: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 position: 'bottom',
//             },
//         },
//     },
// });







