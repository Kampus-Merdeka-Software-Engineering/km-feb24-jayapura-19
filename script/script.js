let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');
let textElements = document.querySelectorAll('.sidebar span, .sidebar p');
let footer = document.querySelector('.footer');
let mainContent = document.querySelector('.main-content');
let metrics = document.querySelector('.metrics');
let boxes = document.querySelectorAll('.metrics .box');
let chartContainers = document.querySelectorAll('.chart-container'); // Tambahkan ini

btn.onclick = function () {
    sidebar.classList.toggle('active');
    btn.classList.toggle('rotate');

    if (sidebar.classList.contains('active')) {
        textElements.forEach(function (element) {
            element.style.display = 'block';
        });
        footer.style.left = '260px';
        mainContent.style.marginLeft = '260px';
        mainContent.style.width = 'calc(100% - 260px)';
        metrics.style.marginLeft = '260px';
        chartContainers.forEach(function (container) { // Tambahkan ini
            container.style.marginLeft = '80px'; // Tambahkan ini
        }); // Tambahkan ini
        boxes.forEach(function (box) {
            box.style.transform = 'translateX(0)';
        });
    } else {
        textElements.forEach(function (element) {
            element.style.display = 'none';
        });
        footer.style.left = '80px';
        mainContent.style.marginLeft = '80px';
        mainContent.style.width = 'calc(100% - 80px)';
        metrics.style.marginLeft = '80px';
        chartContainers.forEach(function (container) { // Tambahkan ini
            container.style.marginLeft = '0'; // Tambahkan ini
        }); // Tambahkan ini
        boxes.forEach(function (box) {
            box.style.transform = 'translateX(-180px)';
        });
    }
};

// Data dan inisialisasi Chart tetap sama seperti sebelumnya


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

let priceRange = {
    labels: ['< $5', '$5 - $10', '$11 - $15','$16 - $20', '> $20'],
    datasets: [{
        label: 'Sales by Price Range',
        backgroundColor: ['#725CFF'],
        borderColor: '#725CFF',
        data: [60, 20, 10,5,5]
    }]
};

var ctxpriceRange = document.getElementById('priceRange').getContext('2d');
var priceRangeChart = new Chart(ctxpriceRange, {
    type: 'bar',
    data: priceRange,
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

let season = {
    labels: ['Spring','Summer','Winter'],
    datasets: [{
        label: 'Sales by Season',
        backgroundColor: '#725CFF',
        borderColor: '#725CFF',
        data: [60, 20, 10]
    }]
};

var ctxseason = document.getElementById('season').getContext('2d');
var seasonChart = new Chart(ctxseason, {
    type: 'bar',
    data: season,
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

let busyHour= {
    labels: ['Jan', 'Feb','Mar','Apr','Mei','Jun'],
    datasets: [{
        label: 'Morning',
        backgroundColor: '#7C5CFC',
        borderColor: '#fff',
        data: [60, 60, 60, 60, 60, 60] 
    }, {
        label: 'Afternoon',
        backgroundColor: '#5CAFFC',
        borderColor: '#fff',
        data: [25, 25, 25, 25, 25, 25] 
    }, {
        label: 'Evening',
        backgroundColor: '#EB7CA6',
        borderColor: '#fff',
        data: [15, 15, 15, 15, 15, 15]
    }]
};

var ctxbusyHour = document.getElementById('busyHour').getContext('2d');
var productTypeChart = new Chart(ctxbusyHour, {
    type: 'bar',
    data: busyHour,
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

let busyWeek = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Week 1',
        backgroundColor: '#725CFF',
        data: [200, 300, 400, 500, 600, 700]
    }, {
        label: 'Week 2',
        backgroundColor: '#5CAFFC',
        data: [300, 400, 500, 600, 700, 800]
    },{
        label: 'Week 3',
        backgroundColor: '#EB7CA6',
        data: [400, 500, 600, 700, 800, 900]
    },{
        label: 'Week 4',
        backgroundColor: '#FF7262',
        data: [500, 600, 700, 800, 900, 1000]
    }]
};

var ctxBusyWeek = document.getElementById('busyWeek').getContext('2d');
var busyWeekChart = new Chart(ctxBusyWeek, {
    type: 'bar',
    data: busyWeek,
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

let category = {
    labels: ['Category 1','Category 2','Category 3','Category 4','Category 5','Category 6','Category 7', 'Category 8','Category 9'],
    datasets: [{
        label: 'Sales by Category',
        backgroundColor: ['#725CFF'],
        borderColor: '#725CFF',
        data: [200, 100, 75,50,25,100, 75,50,25]
    }]
};

var ctxpcategory = document.getElementById('category').getContext('2d');
var priceRangeChart = new Chart(ctxpcategory, {
    type: 'bar',
    data: category,
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

let topTen = {
    labels: ['Top 1','Top 2','Top 3','Top 4','Top 5','Top 6','Top 7', 'Top 8','Top 9','Top 10'],
    datasets: [{
        label: 'Top 10 Product',
        backgroundColor: ['#725CFF'],
        borderColor: '#725CFF',
        data: [200, 100, 75,50,25,100, 75,50,25, 75]
    }]
};

var ctxtop = document.getElementById('top').getContext('2d');
var priceRangeChart = new Chart(ctxtop, {
    type: 'bar',
    data: topTen,
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







