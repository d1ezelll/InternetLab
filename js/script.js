// Burger menu //

document.addEventListener('DOMContentLoaded', () => {
    const headerWhite = document.querySelector('.header-logo-white');
    const headerBlack = document.querySelector('.header-logo-black');
    const burgerBtn = document.getElementById('burger');
    const header = document.querySelector('.header');


    burgerBtn.addEventListener('click', () => {
        if (header.classList.toggle('open')) {
            headerWhite.style.display = 'none';
            headerBlack.style.display = 'block';
        } else {
            headerWhite.style.display = 'block';
            headerBlack.style.display = 'none';
        };
    })

    window.addEventListener('click', (e) => {
        if (!header.contains(e.target) && !burgerBtn.contains(e.target)) {
            header.classList.remove('open');
            headerWhite.style.display = 'block';
            headerBlack.style.display = 'none';
        }
    });
})

// Burger menu //


// Slider Feedback //

const sliderGrid = document.querySelector('.feedback-slider');
const sliderItems = Array.from(document.querySelectorAll('.feedback-item'));
const sliderNextBtn = document.querySelector('.feedback-slider-arrow-prev');
const sliderPrevBtn = document.querySelector('.feedback-slider-arrow-next');
const sliderDots = Array.from(document.querySelectorAll('.feedback-slider-dot'));

function nextFeedbackSlide() {
    const firstItem = sliderItems.shift();
    sliderItems.push(firstItem);
    const activeDot = sliderDots.find(dot => dot.classList.contains('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));
    const nextDot = sliderDots.indexOf(activeDot) + 1;

    if (nextDot > sliderDots.length) {
        sliderDots[0].classList.add('active');
    } else {
        sliderDots[nextDot].classList.add('active');
    }
    
    
    renderSlider();
}

function prevFeedbackSlide() {
    const lastItem = sliderItems.pop();
    sliderItems.unshift(lastItem);
    const activeDot = sliderDots.find(dot => dot.classList.contains('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));
    const prevDot = sliderDots.indexOf(activeDot) - 1;

    if (prevDot < 0) {
        sliderDots[sliderDots.length - 1].classList.add('active');
    } else {
        sliderDots[prevDot].classList.add('active');
    }

    renderSlider();
}

function renderSlider() {
    sliderGrid.innerHTML = ''; 
    sliderItems.forEach(function(item) { 
        sliderGrid.appendChild(item);
    });
}

sliderPrevBtn.addEventListener("click", nextFeedbackSlide);
sliderNextBtn.addEventListener("click", prevFeedbackSlide);

// Slider Feedback //



// FAQ Opening answers //

function toggleAnswer(index) {
    const faqAnswers = document.querySelectorAll('.FAQ-answer');
    const faqPicture = document.querySelectorAll('.FAQ-question-button');
    
    faqAnswers.forEach((_, i) => faqAnswers[i].style.display = 'none');
    faqPicture.forEach((_, i) => faqPicture[i].style.transform = 'rotate(0deg)');
    
    faqAnswers[index].style.display = 'block';
    faqPicture[index].style.transform = 'rotate(45deg)';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.FAQ-question').forEach((question, index) => {
        question.addEventListener('click', () => toggleAnswer(index));
    });
});

// FAQ Opening answers //


// Validation //

const form = document.getElementById('form');
const nameInput = document.querySelector('.name');
const phoneInput = document.querySelector('#form-number');
const checkbox = document.querySelector('#form-checkbox');
const submitButton = document.querySelector('.form-button');
const successName = document.getElementById('form-name-success')
const dangerousName = document.getElementById('form-name-dangerous')
const successNumber = document.getElementById('form-name-success')
const dangerousNumber = document.getElementById('form-name-dangerous')

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateName() || !validatePhone() || !validateCheckbox()) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

    form.submit();
});

function validateName() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        nameInput.nextElementSibling.textContent = 'Это поле обязательно';
        nameInput.style.border = '2px solid var(--dangerous)';
        dangerousName.style.display = 'block';
        successName.style.display = 'none';
        isValid = false;
    } else {
        nameInput.nextElementSibling.textContent = '';
        nameInput.style.border = '2px solid var(--green-success)';
        successName.style.display = 'block';
        dangerousName.style.display = 'none';
        isValid = true;
    }

    return isValid;
}

function validatePhone() {
    let isValid = true;

    if (phoneInput.value.trim() === '' || !/^\+?[0-9\s()-]+$/.test(phoneInput.value)) {
        phoneInput.nextElementSibling.textContent = 'Введите корректный номер телефона';
        nameInput.style.border = '2px solid var(--dangerous)';
        dangerousNumber.style.display = 'block';
        successNumber.style.display = 'none';
        isValid = false;
    } else {
        phoneInput.nextElementSibling.textContent = '';
        nameInput.style.border = '2px solid var(--green-success)';
        successNumber.style.display = 'block';
        dangerousNumber.style.display = 'none';
        isValid = true;
    }

    return isValid;
}

function validateCheckbox() {
    let isValid = false;

    if (checkbox.checked) {
        checkbox.classList.remove('error');
        checkbox.nextElementSibling.textContent = '';
        isValid = true;
    } else {
        checkbox.classList.add('error');
        checkbox.nextElementSibling.textContent = 'Это поле обязательно';
    }

    return isValid;
}

nameInput.addEventListener('input', validateName);
phoneInput.addEventListener('input', validatePhone);

function initValidation() {
    nameInput.value === '' ? validateName() : null;
    phoneInput.value === '' ? validatePhone() : null;
    checkbox.checked ? validateCheckbox() : null;
}

// Validation //