var jsonData;
window.onload = function() {
    var fedStateSelect = document.getElementById('fs-select');
    var yearSelect = document.getElementById('year-select');
    var formTypeSelect = document.getElementById('form-type-select');

    var request = new XMLHttpRequest();
    request.open("GET", "../json/forms.json", false);
    request.send(null);
    jsonData = JSON.parse(request.responseText);
    
    if (fedStateSelect.selectedOptions[0].value === "fed") fillFed();
    else if (fedStateSelect.selctedOptions[0].value === "state") fillState;

    formTypeSelect.addEventListener("change", fillFed);
}

function fillFed() {
    var formTypeSelect = document.getElementById('form-type-select');
    var formType = formTypeSelect.selectedOptions[0].value;

    var ele = document.getElementsByClassName('fList');
    while(ele[0]) { ele[0].remove(); }

    if (formType === "p") fillFedPub;
    else fillFedForm(formType);

}

function fillFedForm(type) {
    var formSelect = document.getElementById('form-select');

    jsonData.federal.forEach(e => {
        var opt = document.createElement('option');
        opt.classList.add('fList');
        opt.innerText = e.name;

        console.log(e['f-value']);
        
        if (type === "f") {
            opt.value = e['f-value'];
        } else if (type === "i") {
            opt.value = e['i-value'];
        }
        
        formSelect.insertBefore(opt, document.getElementById('form-select-base'));
    });
}

function fillFedPub() {}

function fillState() {}