console.log('client side js loaded.');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const tempData = document.querySelector(".degree");
const result_1 = document.querySelector('.result1')
const result_2 = document.querySelector('.result2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    tempData.textContent = '--'



    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = '';
                messageTwo.textContent = data.forecast;
                tempData.textContent = data.location
                result_1.textContent = data.forecast
                result_2.textContent = location
            }
        })
    })
})