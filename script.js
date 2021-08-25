const forma = document.querySelector('#forma');
const inputFname = document.querySelector('#fname');
const inputSurname = document.querySelector('#sname');
const inputRadio = document.querySelector('input[name="gender"]:checked')  //NOVO
const select = document.querySelector('#select');
const inputPass = document.querySelector('#password');
const inputConfirm = document.querySelector('#confirm_p');
const checkboxes = document.querySelectorAll('input[type=checkbox]');  //NOVO


//paragrafi za ispis greske
const firstNameError = document.querySelector('#name-error')
const lastNameError = document.querySelector('#surname-error')
const selectError = document.querySelector('#select-error')
const passwordError = document.querySelector('#password-error')
const courseError = document.querySelector('#course-error')

const divZaNiz = document.querySelector('#ispis_niza');
const dugmeZaNiz = document.querySelector('button');

//funkcija za ispis na stranici
const addToPage = (el) => {
    divZaNiz.innerHTML += `ime: ${el.ime}<br>
    prezime: ${el.prezime}<br>
    pol: ${el.pol}<br>
    prebivaliste: ${el.prebivaliste}<br>
    sifra: ${el.sifra}<br>
    obuke: ${el.obuke}<br>
    ---------------------------<br>`
}
//DVE NOVE FUNKCIJE ZA BROJ I VELIKO SLOVO (RegEx)
function stringHasNumber(str) {
    number = /\d/
    return number.test(str)  //vraca True/False
}

function stringHasUpperCase(str) {
    chars = /[A-Z]/
    return chars.test(str)  //vraca True/False
}

//funkcija za validaciju
const isValid = el => el.ime.length >= 5      //Maksimalnu duzinu sam resila u HTML sa maxlength
    && el.prezime.length >= 5  //Maksimalnu duzinu sam resila u HTML sa maxlength
    && select.selectedIndex != 0 //da je izabrana neka opcija selecta
    && el.sifra.length >= 8
    && stringHasNumber(el.sifra)
    && stringHasUpperCase(el.sifra)
    && el.potvrda.length >= 8
    && stringHasNumber(el.potvrda)
    && stringHasUpperCase(el.potvrda)
    && el.sifra === el.potvrda  //da su sifra i potvrda iste
    && el.obuke.length != 0  //da je bar neki checkbox obelezen

let nizKandidata = [];

forma.addEventListener('submit', (event) => {
    //MORA TACNO TU GORE DA STOJI A NE DOLE KOD OSTALIH RESET 
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    selectError.textContent = "";
    passwordError.textContent = "";
    courseError.textContent = ""

    event.preventDefault();
    let nizObuka = [];
    //upisivanje u niz svih obelezenih obuka
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked)
            nizObuka.push(checkboxes[i].value)
    }
    // setovanje
    inputFname.value.trim();
    let x = inputFname.value.charAt(0).toUpperCase()
    inputFname.value = x + inputFname.value.substr(1, inputFname.value.length).toLowerCase();

    inputSurname.value.trim();
    let y = inputSurname.value.charAt(0).toUpperCase()
    inputSurname.value = y + inputSurname.value.substr(1, inputSurname.value.length).toLowerCase();


    let kandidat = {
        ime: inputFname.value,
        prezime: inputSurname.value,
        pol: inputRadio.value,
        prebivaliste: select[select.selectedIndex].value,
        sifra: inputPass.value,
        potvrda: inputConfirm.value,
        obuke: nizObuka  //ispise ceo niz cekiranih obuka
    }

    if (isValid(kandidat)) {
        nizKandidata.push(kandidat);
        console.log(nizKandidata);
        divZaNiz.innerHTML = "";  //prvo da ocisti pa da ispise niz
        addToPage(kandidat);
    } else {
        //ime
        if (kandidat.ime == "") {
            // firstNameError.textContent = "";
            firstNameError.textContent = "Morate uneti ime";
        } else if (kandidat.ime < 5) {
            // firstNameError.textContent = "";
            firstNameError.textContent = "Ime nije dovoljno dugacko";
        }
        //prezime
        if (kandidat.prezime == "") {
            // lastNameError.textContent = "";
            lastNameError.textContent = "Morate uneti prezime";
        } else if (kandidat.prezime < 5) {
            // lastNameError.textContent = "";
            lastNameError.textContent = "Prezime nije dovoljno dugacko";
        }
        //select opcije
        if (select.selectedIndex == 0) {
            // selectError.textContent = "";
            selectError.textContent = "Morate odabrati grad";
        }
        //sifra
        if (kandidat.sifra.length < 8) {
            // passwordError.textContent = "";
            passwordError.textContent = "Sifra je kratka";
        } else if (stringHasNumber(kandidat.sifra) == false) {
            // passwordError.textContent = "";
            passwordError.textContent = "Mora sadrzati bar jedan broj";
        } else if (stringHasUpperCase(kandidat.sifra) == false) {
            // passwordError.textContent = "";
            passwordError.textContent = "Mora sadrzati bar jedno veliko slovo";
        }
        //potvrda sifre   - ima smisla samo da je poredimo sa sifrom
        //ZA POTVRDU OVI USLOVI NEMAJU MNOGO SMISLA sem da je potvrda jednaka sifri
        if (kandidat.sifra != kandidat.potvrda) {
            // passwordError.textContent = "";
            passwordError.textContent = "Ne poklapa se sa sifrom";
        } else if (stringHasNumber(kandidat.potvrda) == false) {
            // passwordError.textContent = ""
            passwordError.textContent = "Mora sadrzati bar jedan broj"
        } else if (stringHasUpperCase(kandidat.potvrda) == false) {
            // passwordError.textContent = ""
            passwordError.textContent = "Mora sadrzati bar jedno veliko slovo"
        } else if (kandidat.potvrda.length < 8) {
            // passwordError.textContent = ""
            passwordError.textContent = "Ponovljena sifra je kratka"
        }
        //obuke => checkbox
        if (kandidat.obuke.length == 0) {
            // courseError.textContent = ""
            courseError.textContent = "Morate oznaciti neku od obuka"
        }
    }


    //resetovanje polja nakon unosa
    inputFname.value = '';
    inputSurname.value = '';
    inputPass.value = '';
    inputConfirm.value = '';
    select.selectedIndex = 0;
    //NOVO: RESET CHECKBOX-ova
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxes[i].checked = false
        }
    }
})
//vidljivost sifre
const prviFavicon = document.querySelector('#prvi');
const drugiFavicon = document.querySelector('#drugi');
prviFavicon.addEventListener('click', () => {
    if (inputPass.type === "password") {
        inputPass.type = "text";
    } else {
        inputPass.type = "password";
    }
})
drugiFavicon.addEventListener('click', () => {
    if (inputConfirm.type === "password") {
        inputConfirm.type = "text";
    } else {
        inputConfirm.type = "password";
    }
})

//ispis celog niza
dugmeZaNiz.addEventListener('click', () => {
    divZaNiz.innerHTML = "";  //prvo da ocisti pa da ispise niz
    nizKandidata.forEach(kandidat => {
        addToPage(kandidat);
    })
})

