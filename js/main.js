// Questions Array
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type: 'password' }
];

//Transition Times
const shakeTime = 100; //Shake Transition Time
const switchTime = 200; //Transition Between Questions

//Init Position at First Question
let position = 0;

//Init DOM Elements
const formBox = document.querySelector('#form-box');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//Events

//Get Question on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

//Next Btn Click
nextBtn.addEventListener('click', validate)

//Prev Btn Click
prevBtn.addEventListener('click', showPrevQuestion)

//Input Field Enter Click
inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13){
        validate()
    }
})

//Functions

//Get Question From Array and Add to Markup
function getQuestion() {
    console.log('get question')
    inputLabel.innerHTML = questions[position].question;
    inputField.type = questions[position].type || 'text';
    inputField.value = questions[position].answer || '';
    inputField.focus()

    progress.style.width = position / questions.length * 100 + '%';
    
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user'

    showQuestion()
}

//Display Question To User
function showQuestion() {
    inputGroup.style.opacity = 1
    inputProgress.style.width = '100%'
}

//Moving to Prev Question On Click Of Prev Btn
function showPrevQuestion() {
    position--
    hideQuestion()
    getQuestion()
}

//Hide Question From User
function hideQuestion() {
    inputGroup.style.opacity = 0
    // inputProgress.style.transition = 'none'
    // inputProgress.style.width = 0
    // inputLabel.style.marginLeft = 0
    // inputGroup.style.border = null
}

//Validate Field
function validate() {
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail()
    } else {
        inputPass()
    }
}

function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`
}

function inputFail() {
    formBox.className = 'error'

    for (let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0)
        inputField.focus()
    }
}

function inputPass() {
    formBox.className = ''

    setTimeout(transform, shakeTime * 0, 0, 10)
    setTimeout(transform, shakeTime * 1, 0, 0)

    questions[position].answer = inputField.value
    position++

    if(questions[position]){
        hideQuestion()
        getQuestion()
    } else {
        formBox.className = 'close'
        progress.style.width = '100%'
    }
}
