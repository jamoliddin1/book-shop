const form = document.getElementById('form');
const fname = document.getElementById('fname');
const surname = document.getElementById('surname');
const date = document.getElementById('date');
const street = document.getElementById('street');
const house = document.getElementById('house-num');
const flat = document.getElementById('flat-num');
const btnComplete = document.querySelector('button')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  checkInput()
})

function checkInput() {
  const fnameVal = fname.value.trim();
  const surnameVal = surname.value.trim();
  const dateVal = date.value;
  const streetVal = street.value;
  const houseVal = house.value;
  const flatVal = flat.value;
  const validationStr = /^[A-Za-z]+$/;
  // const validationNum = /^[0-9]+$/;

  if (fnameVal === '') {
    setErrorFor(fname, 'Name cannot be blank')
  } else if (fnameVal.length < 4) {
    setErrorFor(fname, 'Name less than 4 symbols')
  } else if (!fnameVal.match(validationStr)) {
    setErrorFor(fname, 'Only string allowed')
  } else {
    setSuccessFor(fname)
  }

  if (surnameVal === '') {
    setErrorFor(surname, 'Surname cannot be blank')
  } else if (surnameVal.length < 5) {
    setErrorFor(surname, 'Surname less than 5 symbols')
  } else if (!surnameVal.match(validationStr)) {
    setErrorFor(surname, 'Only string allowed')
  } else {
    setSuccessFor(surname)
  }

  if (dateVal === '') {
    setErrorFor(date, 'Date cannot be blank')
  } else {
    setSuccessFor(date)
  }

  if (streetVal === '') {
    setErrorFor(street, 'Street cannot be blank')
  } else if (streetVal.length < 5) {
    setErrorFor(street, 'Street less than 5 symbols')
  } else {
    setSuccessFor(street)
  }

  if (houseVal === '' || houseVal === "0") {
    setErrorFor(house, 'House cannot be blank or 0')
  } else {
    setSuccessFor(house)
  }

  if (flatVal === '' || houseVal === "0") {
    setErrorFor(flat, 'Flat cannot be blank or 0')
  } else {
    setSuccessFor(flat)
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small')

  small.innerText = message

  formControl.className = 'form-control error'

}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success'

}