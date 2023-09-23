$(document).ready(function () {
    if(document.querySelector('.app-body')){
        var navbarHeight = document.querySelector('.navbar').offsetHeight;
        var app_body = document.querySelector('.app-body');
        app_body.style.top = navbarHeight + 'px';
        const newHeight = `calc(100vh - ${navbarHeight}px)`;
        app_body.style.height = newHeight;
    }
});