var jsonData;
var link; 
const YEAR_CURRENT = parseInt(new Date().getFullYear()) - parseInt(1);
const NUM_YEARS_SUPPORTED = 4;

window.onload = function() {
    var fedStateSelect = document.getElementById('fs-select');
    var yearSelect = document.getElementById('year-select');
    var formTypeSelect = document.getElementById('form-type-select');
    var formSelect = document.getElementById('form-select');

    var request = new XMLHttpRequest();
    request.open("GET", "../json/forms.json", false);
    request.send(null);
    jsonData = JSON.parse(request.responseText);

    initYears();
 
    yearSelect.addEventListener("change", createLink);
    fedStateSelect.addEventListener("change", initStateOrFed);
    formTypeSelect.addEventListener("change", initStateOrFed);
    formSelect.addEventListener("change", createLink);
    document.getElementById('link-button').addEventListener("click", openWindow);
    document.getElementById('state-select').addEventListener("change", fillStateForms);

    if (fedStateSelect.selectedOptions[0].value === "fed") fillFed;
    else if (fedStateSelect.selctedOptions[0].value === "state") fillStates;
   
}

function initYears() {
    var yearSelect = document.getElementById('year-select');
    for (var i = 0; i < NUM_YEARS_SUPPORTED; i++) {
        var y = parseFloat(YEAR_CURRENT) - parseFloat(i);
        var opt = document.createElement('option');
        opt.classList.add('yList');
        opt.innerText = y;
        opt.value = y;
        if (y == YEAR_CURRENT) { opt.selected = true; }
        
        yearSelect.insertBefore(opt, document.getElementById('year-select-base'));
    }
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

        if (stateInd == 0) { 
            console.log(stateInd);
            link = createLinkAl(stateInd, formType, form, year);
        } else if (stateInd == 1) {
            link = createLinkAz(stateInd, form);
        } else if (stateInd == 2) {
            link = createLinkAr(stateInd, formType, form, year);
        } else if (stateInd == 3) {
            link = createLinkCa(stateInd, formType, form, year);
        } else if (stateInd == 4) {
            link = createLinkCo();
        } else if (stateInd == 5) {
            link = createLinkCt(stateInd, year);
        } else if (stateInd == 6) {
            link = createLinkDe();
        } else if (stateInd == 7) {
            link = createLinkDc();
        } else if (stateInd == 8) {
            link = createLinkGa();
        } else if (stateInd == 9) {
            link = createLinkHi();
        } else if(stateInd == 10) {
            link = createLinkId();
        } else if(stateInd == 11) {
            link = createLinkIl();
        }
    }
    
    document.getElementById('link-text').innerText = link;
    document.getElementById('link-button').innerText = "Open " + year + " " + document.getElementById('form-select').selectedOptions[0].innerText;
}

function openWindow() {
    createLink();
    window.open(link, '_blank', 'location=yes,height=620,width=560,scrollbars=yes,status=yes');
}

function fillFed() {
    var formTypeSelect = document.getElementById('form-type-select');
    var formType = formTypeSelect.selectedOptions[0].value;

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

    createLink();
}

function fillFedPub() {
    clearForms();
}

function fillStates() {
    var stateSelect = document.getElementById('state-select');

    var i = 0;
    jsonData.states.forEach(e => {
        var opt = document.createElement('option');
        opt.classList.add('sList');;
        opt.innerText = e['state-name'];
        opt.value = i++;
        
        stateSelect.insertBefore(opt, document.getElementById('state-select-base'));
    });
}

function fillStateForms() {
    var stateIndex = document.getElementById('state-select').selectedOptions[0].value;
    var formSelect = document.getElementById('form-select');

    clearForms();

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
        jsonData.states[stateIndex]['forms'].forEach(e => {
            var opt = document.createElement('option');
            opt.classList.add('fList');
            opt.innerText = e.name;
            opt.value = i++;
            
            formSelect.insertBefore(opt, document.getElementById('form-select-base'));
        });
    }

    createLink();
}

function initStateOrFed() {
    var val = document.getElementById('fs-select').selectedOptions[0].value;
  
    if (val === 'fed') {
        document.getElementById('pubs').classList.remove('d_none');
        var stateSelect = document.getElementById('state-select-wrapper')
        
        if (!stateSelect.classList.contains('d_none')) {
            stateSelect.classList.add('d_none');
            clearForms();
        }
        fillFed();
    } else if (val === 'state') {
        var stateSelect = document.getElementById('state-select-wrapper')
        document.getElementById('pubs').classList.add('d_none');
        
        if (stateSelect.classList.contains('d_none')) {
            stateSelect.classList.remove('d_none');
            clearForms();
        }
        fillStates();
    }
}

function clearForms() {
    var ele = document.getElementsByClassName('fList');
    while(ele[0]) { ele[0].remove(); }
    document.getElementById('link-text').innerText = "";
}

function copyLink() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }






function createLinkAl(stateInd, type, form, year) {

    if (type === "i") type = "instructions";
    else if (type === "f") type = "forms";
    return jsonData.states[stateInd][type][form][year];
}

function createLinkAz(stateInd, form) {
    return jsonData.states[stateInd]['forms'][form]['link'];
}

function createLinkAr(stateInd, type, form, year) {
    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";  

    return "https://www.dfa.arkansas.gov/images/uploads/incomeTaxOffice/" + jsonData.states[stateInd]['forms'][form][type].replace("{year}", year);
}

function createLinkCa(stateInd, type, form, year) {
    if (type === "i") type = "instructions";
    else if (type === "f") type = "link"; 

    return `https://www.ftb.ca.gov/forms/${year}/${year}-` + jsonData.states[stateInd]['forms'][form][type];
}

function createLinkCt(stateInd, year) {
    return jsonData.states[stateInd]['link'].replace("{year}", year)
}