var jsonData;
var link; 
const YEAR_CURRENT = new Date().getFullYear();

window.onload = function() {
    var fedStateSelect = document.getElementById('fs-select');
    var yearSelect = document.getElementById('year-select');
    var formTypeSelect = document.getElementById('form-type-select');
    var formSelect = document.getElementById('form-select');

    var request = new XMLHttpRequest();
    request.open("GET", "../json/forms.json", false);
    request.send(null);
    jsonData = JSON.parse(request.responseText);
 
    fedStateSelect.addEventListener("change", initStateOrFed);
    formTypeSelect.addEventListener("change", initStateOrFed);
    formSelect.addEventListener("change", createLink);
    document.getElementById('link-button').addEventListener("click", openWindow);
    document.getElementById('state-select').addEventListener("change", fillStateForms);

    if (fedStateSelect.selectedOptions[0].value === "fed") fillFed;
    else if (fedStateSelect.selctedOptions[0].value === "state") fillStates;
   
}

function createLink() {
    var year = document.getElementById('year-select').selectedOptions[0].value;
    var fedState = document.getElementById('fs-select').selectedOptions[0].value;
    var formType = document.getElementById('form-type-select').selectedOptions[0].value;
    var form = document.getElementById('form-select').selectedOptions[0].value;

    if (fedState === "fed") {
        if (formType === 'i') {
            var formName = document.getElementById('form-select').selectedOptions[0].innerText;
            form = jsonData.federal[form]['i-value'];
        } else if (formType === 'p') {
            //form = jsonData.federal[form]['p-value'];
            //link = `https://www.irs.gov/pub/irs-pdf/${form}.pdf`;
        }
        else if (formType === 'f') {
            form = jsonData.federal[form]['f-value'];
        }

        if (year < YEAR_CURRENT) {
            link = `https://www.irs.gov/pub/irs-prior/${form}--${year}.pdf`
        } else {
            link = `https://www.irs.gov/pub/irs-pdf/${form}.pdf`;
        }
    } else if (fedState === "state") {
        var stateInd = document.getElementById('state-select').selectedOptions[0].value;
        link = jsonData.states[stateInd]['instructions'][form][year];
    }
    
    document.getElementById('link-button').innerText = document.getElementById('form-select').selectedOptions[0].innerText;
}

function openWindow() {
    createLink();
    window.open(link, '_blank', 'location=yes,height=620,width=560,scrollbars=yes,status=yes');
}

function fillFed() {
    var formTypeSelect = document.getElementById('form-type-select');
    var formType = formTypeSelect.selectedOptions[0].value;

    document.getElementById('state-select').classList.add('d-none');

    if (formType === "p") fillFedPub;
    else fillFedForm(formType);

}

function fillFedForm(type) {
    var formSelect = document.getElementById('form-select');

    var i = 0
    jsonData.federal.forEach(e => {
        var opt = document.createElement('option');
        opt.classList.add('fList');
        opt.innerText = e.name;
        opt.value = i++;
        
        formSelect.insertBefore(opt, document.getElementById('form-select-base'));
    });
}

function fillFedPub() {
    clearForms();
}

function fillStates() {
    var stateSelect = document.getElementById('state-select');

    var i = 0;
    jsonData.states.forEach(e => {
        var opt = document.createElement('option');
        opt.classList.add('fList');;
        opt.innerText = e['state-name'];
        opt.value = i++;
        
        stateSelect.insertBefore(opt, document.getElementById('state-select-base'));
    });
}

function fillStateForms() {
    var stateIndex = document.getElementById('state-select').selectedOptions[0].value;
    var formSelect = document.getElementById('form-select');

    var i = 0
    if (document.getElementById('form-type-select').selectedOptions[0].value === 'f') {
        jsonData.states[stateIndex]['forms'].forEach(e => {
            var opt = document.createElement('option');
            opt.classList.add('fList');
            opt.innerText = e.name;
            opt.value = i++;
            
            formSelect.insertBefore(opt, document.getElementById('form-select-base'));
        });
    } else if (document.getElementById('form-type-select').selectedOptions[0].value === 'i') {
        jsonData.states[stateIndex]['instructions'].forEach(e => {
            var opt = document.createElement('option');
            opt.classList.add('fList');
            opt.innerText = e.name;
            opt.value = i++;
            
            formSelect.insertBefore(opt, document.getElementById('form-select-base'));
        });
    }
}

function initStateOrFed() {
    var val = document.getElementById('fs-select').selectedOptions[0].value;
  
    if (val === 'fed') {
        document.getElementById('pubs').classList.remove('d-none');
        fillFed();
    } else if (val === 'state') {
        document.getElementById('state-select').classList.remove('d-none');
        document.getElementById('pubs').classList.add('d-none');
        
        clearForms();
        fillStates();
    }
}

function clearForms() {
    var ele = document.getElementsByClassName('fList');
    while(ele[0]) { ele[0].remove(); }
}