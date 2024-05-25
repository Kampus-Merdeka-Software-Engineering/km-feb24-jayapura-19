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
