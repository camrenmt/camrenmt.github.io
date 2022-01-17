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
            form = jsonData.publications[form]['p-value'];
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
            link = createLinkAl(stateInd, formType, form, year);
        } else if (stateInd == 1) {
            link = createLinkAz(stateInd, form);
        } else if (stateInd == 2) {
            link = createLinkAr(stateInd, formType, form, year);
        } else if (stateInd == 3) {
            link = createLinkCa(stateInd, formType, form, year);
        } else if (stateInd == 4) {
            link = createLinkCo(stateInd, year);
        } else if (stateInd == 5) {
            link = createLinkCt(stateInd, year);
        } else if (stateInd == 6) {
            link = createLinkDe(stateInd, year);
        } else if (stateInd == 7) {
            link = createLinkDc(stateInd, year);
        } else if (stateInd == 8) {
            link = createLinkGa(stateInd, form);
        } else if (stateInd == 9) {
            link = createLinkHi(stateInd, formType, form, year);
        } else if(stateInd == 10) {
            link = createLinkId(stateInd, year);
        } else if(stateInd == 11) {
            link = createLinkIl(stateInd, year);
        } else if(stateInd == 12) {
            link = createLinkIn(stateInd, year);
        } else if(stateInd == 13) {
            link = createLinkIa(stateInd);
        } else if(stateInd == 14) {
            link = createLinkKs(stateInd, formType, form, year);
        } else if(stateInd == 15) {
            link = createLinkKy(stateInd);
        } else if(stateInd == 16) {
            link = createLinkLa(stateInd);
        } else if(stateInd == 17) {
            link = createLinkMe(stateInd, year);
        } else if(stateInd == 18) {
            link = createLinkMd(stateInd, formType, form, year);
        } else if(stateInd == 19) {
            link = createLinkMa(stateInd, formType, form, year);
        } else if(stateInd == 20) {
            link = createLinkMi(stateInd);
        } else if(stateInd == 21) {
            link = createLinkMn(stateInd);
        } else if(stateInd == 22) {
            link = createLinkMs(stateInd);
        } else if(stateInd == 23) {
            link = createLinkMo(stateInd, formType, form, year);
        } else if(stateInd == 24) {
            link = createLinkMt(stateInd, form);
        } else if(stateInd == 25) {
            link = createLinkNe(stateInd, formType, form, year);
        } else if(stateInd == 26) {
            link = createLinkNj(stateInd, formType, form, year);
        } else if(stateInd == 27) {
            link = createLinkNm(stateInd);
        } else if(stateInd == 28) {
            link = createLinkNy(stateInd, formType, form, year);
        } else if(stateInd == 29) {
            link = createLinkNc(stateInd, year);
        } else if(stateInd == 30) {
            link = createLinkNd(stateInd, formType, form, year);
        } else if(stateInd == 31) {
            link = createLinkOh(stateInd);
        } else if(stateInd == 32) {
            link = createLinkOk(stateInd, form, year);
        } else if(stateInd == 33) {
            link = createLinkOr(stateInd, formType, form, year);
        } else if(stateInd == 34) {
            link = createLinkPa(stateInd, formType, form, year);
        } else if(stateInd == 35) {
            link = createLinkRi(stateInd, year);
        } else if(stateInd == 36) {
            link = createLinkSc(stateInd, formType, form, year);
        } else if(stateInd == 37) {
            link = createLinkUt(stateInd, formType, form, year);
        } else if(stateInd == 38) {
            link = createLinkVt(stateInd, formType, form, year);
        } else if(stateInd == 39) {
            link = createLinkVi(stateInd, formType, form, year);
        } else if(stateInd == 40) {
            link = createLinkWv(stateInd, formType, form, year);
        } else if(stateInd == 41) {
            link = createLinkWi(stateInd, formType, form, year);
        }
    }
    
    if (link) {
        document.getElementById('link-text').innerText = link;
        document.getElementById('button-text').innerText = "Open " + year + " " + document.getElementById('form-select').selectedOptions[0].innerText;
    }
}

function openWindow() {
    createLink();
    window.open(link, '_blank', 'location=yes,height=700,width=600,scrollbars=yes,status=yes');
}

function fillFed() {
    var formTypeSelect = document.getElementById('form-type-select');
    var formType = formTypeSelect.selectedOptions[0].value;

    fillFedForm(formType);

}

function fillFedForm(type) {
    var formSelect = document.getElementById('form-select');

    clearForms();

    var i = 0
    if (type ==='i' || type === 'f') {
        jsonData.federal.forEach(e => {
            var opt = document.createElement('option');
            opt.classList.add('fList');
            opt.innerText = e.name;
            opt.value = i++;
            
            formSelect.insertBefore(opt, document.getElementById('form-select-base'));
        });
    } else if (type === 'p') {
        jsonData.publications.forEach(e => {
            var opt = document.createElement('option');
            opt.classList.add('fList');
            opt.innerText = e.name;
            opt.value = i++;
            
            formSelect.insertBefore(opt, document.getElementById('form-select-base'));
        });
    } 

    createLink();
}

function fillStates() {
    var stateSelect = document.getElementById('state-select');

    var ele = document.getElementsByClassName('sList');
    while(ele[0]) { ele[0].remove(); }
    document.getElementById('link-text').innerText = "";


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
        var stateSelect = document.getElementById('state-select-wrapper')
        
        if (!stateSelect.classList.contains('d_none')) {
            stateSelect.classList.add('d_none');
            document.getElementById('pubs').classList.remove('d_none');
        }
        clearForms;
        fillFed();
    } else if (val === 'state') {
        var stateSelect = document.getElementById('state-select-wrapper')
        document.getElementById('pubs').classList.add('d_none');
        
        if (stateSelect.classList.contains('d_none')) {
            stateSelect.classList.remove('d_none');
            clearForms;
            fillStates();
        }
    }
    createLink();
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

function createLinkCo(stateInd, year) {
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkCt(stateInd, year) {
    if (year == YEAR_CURRENT) year = "Current-Year";
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkDc(stateInd, year) {
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkDe(stateInd, year) {
    var linkEnd = "";
    if (year != YEAR_CURRENT) {
        var str = jsonData.states[stateInd]['link'].replace("{year}", year);
        link = str.replace("{year+1}", parseFloat(year) + parseFloat1(1)) +  "-personal-income-tax-forms/";
    }
    return "https://revenue.delaware.gov/personal-income-tax-forms/" + linkEnd;
}

function createLinkGa(stateInd, form) {
    var link = jsonData.states[stateInd]['link'];
    
    var formName = jsonData.states[stateInd]['forms'][form]['link'].replace('{yearcurr}', YEAR_CURRENT);

    return link.replace("{form}", formName);
}

function createLinkHi(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 
    
    var formName = jsonData.states[stateInd]['forms'][form][type];

    return link.replace("{form}", formName);
}

function createLinkId(stateInd, year) {
    if (year == YEAR_CURRENT) year = "9999";
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkIl(stateInd, year) {
    if (year == YEAR_CURRENT) year = "CurrentYear";
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkIn(stateInd, year) {
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkIa(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkKs(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{yr}", year.slice(-2));
    var form;
    if (type === "i") {
        form = jsonData.states[stateInd]['instructions'];
    } else if (type === "f") {
        form = jsonData.states[stateInd]['forms'][form]['link'];
    }
    return link.replace("{form}", form);
}

function createLinkKy(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkLa(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkMe(stateInd, year) {
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkMd(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{yr}", year.slice(-2));
    var form;
    if (type === "i") {
        form = jsonData.states[stateInd]['forms'][form]['instructions'];
    } else if (type === "f") {
        form = jsonData.states[stateInd]['forms'][form]['link'];
    }
    return link.replace("{form}", form);
}

function createLinkMa(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 
    
    var formName = jsonData.states[stateInd]['forms'][form][type];

    return link.replace("{form}", formName);
}

function createLinkMi(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkMn(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkMs(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkMo(stateInd, type, form, year) {
    if (form == 6) {
        return 'https://dor.mo.gov/forms/5695.pdf'; 
    }

    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 
    
    var formName = jsonData.states[stateInd]['forms'][form][type];

    return link.replace("{form}", formName);
}

function createLinkMt(stateInd, form) {
    var link = jsonData.states[stateInd]['link'];
    var formName = jsonData.states[stateInd]['forms'][form]['link'];

    return link.replace("{form}", formName);
}

function createLinkNe(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 
    
    var formName = jsonData.states[stateInd]['forms'][form][type].replace("{year}", year);

    return link.replace("{form}", formName);
}

function createLinkNj(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year)
    if (year == YEAR_CURRENT) {
        link = "https://www.state.nj.us/treasury/taxation/pdf/current/{form}.pdf";
    }

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 
    
    var formName = jsonData.states[stateInd]['forms'][form][type];

    return link.replace("{form}", formName)
}

function createLinkNm(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkNy(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName;

    if (year == YEAR_CURRENT) {
        link = `https://www.tax.ny.gov/pdf/current_forms/it/{form}.pdf`;
        formName = jsonData.states[stateInd]['forms'][form][type].replace("{year}", "");

    } else {
        formName = jsonData.states[stateInd]['forms'][form][type].replace("{year}", '_' + year);
    }

    return link.replace("{form}", formName)
}
function createLinkNc(stateInd, year) {
    return jsonData.states[stateInd]['link'].replace("{year}", year);
}

function createLinkNd(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName = jsonData.states[stateInd]['forms'][form][type].replace("{year}", year);

    return link.replace("{form}", formName)
}

function createLinkOh(stateInd) {
    return jsonData.states[stateInd]['link'];
}

function createLinkOk(stateInd, form, year) {
    var link = jsonData.states[stateInd]['link'];
    var formName;

    if (year == YEAR_CURRENT) {
        link = link.replace("{year}", "current");
        formName = jsonData.states[stateInd]['forms'][form]['link'].replace("{year}", "");

    } else {
        link = link.replace("{year}", `past-year/${year}`);
        formName = jsonData.states[stateInd]['forms'][form]['link'].replace("{year}", '-' + year);
    }
    
    return link.replace("{form}", formName);
}

function createLinkOr(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName = jsonData.states[stateInd]['forms'][form][type];

    return link.replace("{form}", formName)
}

function createLinkPa(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName = jsonData.states[stateInd]['forms'][form][type].replace("{year}/{year}", year + "/" + year);

    return link.replace("{form}", formName)
}

function createLinkRi(stateInd, year) {
    var type = "link-current";
    if (year != YEAR_CURRENT) {
        type = "link-prior";
    }
    return link = jsonData.states[stateInd][type].replace("{year}", year);
}

function createLinkSc(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName = jsonData.states[stateInd]['forms'][form][type];
    return link.replace("{form}", formName);
}

function createLinkUt(stateInd, type, form, year) {
    if (year == YEAR_CURRENT) year = "current";
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName = jsonData.states[stateInd]['forms'][form][type];
    return link.replace("{form}", formName);
}

function createLinkVt(stateInd, type, form, year) {
    var link = jsonData.states[stateInd]['link'].replace("{year}", year);

    if (type === "i") type = "instructions";
    else if (type === "f") type = "link";
    else return; 

    var formName = jsonData.states[stateInd]['forms'][form][type];
    return link.replace("{form}", formName);
}