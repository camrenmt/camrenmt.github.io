window.onload = function() {
    var fedStateSelect = document.getElementById('fs-select');
    var formTypeSelect = document.getElementById('form-type-select');
    var yearSelect = document.getElementById('year-select');
    var formSelect = document.getElementById('form-select');

    var request = new XMLHttpRequest();
    request.open("GET", "../json/forms.json", false);
    request.send(null);
    var jsonForms = JSON.parse(request.responseText);

    console.log(jsonForms);
}