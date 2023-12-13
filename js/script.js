//////////////////////////
// перевірка поля імені //
//////////////////////////

const nameInput = document.getElementById('nameInput');
const nameError = document.getElementById('nameError');

const input = document.getElementById("phoneInput");
const errorSpan = document.getElementById("phoneError")

function checkNameInput(input,  error) {
  input.required = true;

  const nameValue = input.value.trim();
  const namePattern = /^[А-ЯЁа-яёA-Za-z\s-'’іІєЄЇї]+$/;

  if (nameValue === '') {
    error.textContent = 'Поле ПІБ є обов\'язковим';

    input.style.border = "1px solid red";
    input.style.backgroundColor = "rgba(239, 197, 197, 0.62)";
  } else if (!namePattern.test(nameValue)) {
    error.textContent = 'Введіть дійсне ім\'я кирилицею';

    input.style.border = "1px solid red";
    input.style.backgroundColor = "rgba(239, 197, 197, 0.62)";
  } else {
    error.textContent = '';

    input.style.border = "1px solid green";
    input.style.backgroundColor = "rgba(63, 168, 7, 0.18)";
  }
}

nameInput.addEventListener('keyup', () => checkNameInput(nameInput,  nameError));

/////////////////////////////
// перевірка поля телефону //
/////////////////////////////

function checkPhoneInput(inputphone,  errorSpan) {
  inputphone.required = true;

  if (input.value === '') {
    errorSpan.textContent = "Будь ласка, введіть номер телефону";
    inputphone.style.border = "1px solid red";
    inputphone.style.backgroundColor = "rgba(239, 197, 197, 0.62)"; 
  } else {
    errorSpan.textContent = "";
    inputphone.style.border = "1px solid green";
    inputphone.style.backgroundColor = "rgba(63, 168, 7, 0.18)";
  }
}

input.addEventListener('input', () => checkPhoneInput(input,  errorSpan));

/////////////////////////////////////////////////
// перевірка події клік на на кнопку відправки //
/////////////////////////////////////////////////

document.getElementById('btn_send').addEventListener('click', function() {
  
  checkNameInput(nameInput, nameError); 
  checkPhoneInput(input,  errorSpan); 
  updateDateInputValue();
});

////////////////////////////////////
// обмеження календаря з сьогодні //
////////////////////////////////////

const dateInput = document.getElementById('dateInput');
const errorDate = document.getElementById('dateError');

function updateDateInputValue() {
  const inputValue = dateInput.value;

  // Регулярний вираз для перевірки формату дати (YYYY-MM-DD)
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegex.test(inputValue)) {
    errorDate.textContent = "Неправильний формат дати. Використовуйте YYYY-MM-DD.";
    dateInput.value = '';
    return;
  }

  const [year, month, day] = inputValue.split('-');

  // Перевірка, чи рік є числом і не більше 4 цифр
  if (isNaN(year) || year.length !== 4) {
    errorDate.textContent = "Введено недопустиме значення року.";
    dateInput.value = '';
    return;
  }

  const selectedDate = new Date(year, month - 1, day);

  const today = new Date();

  if (selectedDate < today) {
    errorDate.textContent = "Дата не може бути раніше ніж сьогодні!";
    dateInput.value = '';
  } else {
    errorDate.textContent = '';
  }
}

function setDatePeriod() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  // Встановлюємо максимальний рік як поточний рік + 2
  const maxYear = year + 2;

  const formattedDate = `${year}-${month}-${day}`;
  
  dateInput.setAttribute('min', formattedDate);
  dateInput.setAttribute('max', `${maxYear}-${month}-${day}`);
}

dateInput.addEventListener('bluer', updateDateInputValue);
setDatePeriod();


/////////////////////
// акордеон питань //
/////////////////////

const questions = document.querySelectorAll(".acardion_item");
const answers = document.querySelectorAll(".acardion_p");
const allstr = document.querySelectorAll(".str");

questions.forEach(question => {

    question.addEventListener('click', (e) => {

        const clickedTitle = e.currentTarget.querySelector(".acardion_p");
        let str = e.currentTarget.querySelector(".str");

        if (clickedTitle.classList.contains('open_p')) {
            clickedTitle.classList.remove('open_p');
            str.style.transform = "rotate(0deg)";
        } else {

            answers.forEach(answer => {

              if (answer.classList.contains('open_p')) {

                answer.classList.remove('open_p');
              }
            });

            allstr.forEach(down => {
              down.style.transform = "rotate(0deg)";
            });

            clickedTitle.classList.add('open_p');
            str.style.transform = "rotate(180deg)";
        }
    });
});

/////////////
// СЛАЙДЕР //
/////////////

$('.slider').slick({
    autoplay: true,
    dots: true,
    // initialSlide:1,
    infinity: true,
    autoplaySpeed: 2000,
    centerMode: false,
    arrows: false,
    spid: 3000,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
          { breakpoint: 797,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,                
            }
          }          
    ]
});

////////////////////
// РОБОТА БУРГЕРА //
////////////////////

const checkbox = document.getElementById('checkbox');
const toggle = document.getElementById('toggle');
const burgerMenu = document.querySelector('.burger_menu');
const burgerBars = document.querySelectorAll('.bar');
const banner = document.getElementById('banner');

toggle.addEventListener('click', () => {

  if (checkbox.checked) {

    burgerMenu.classList.toggle('open_menu');
    animateBurgerBars();

  } else {

    burgerMenu.classList.remove('open_menu');
    resetBurgerBars();

  }
});

burgerMenu.addEventListener('click', () =>{
  
  burgerMenu.classList.remove('open_menu');
  resetBurgerBars();
  checkbox.checked = true;
  
});

banner.addEventListener('click', () =>{
  
  burgerMenu.classList.remove('open_menu');
  resetBurgerBars();
  checkbox.checked = true;
  
})

function animateBurgerBars() {
  burgerBars[0].style.bottom = 'calc(50% - 4px / 2)';
  burgerBars[0].style.transform = 'rotate(135deg)';
  burgerBars[0].style.transitionDelay = '0s, calc(0s + 0.35s)';
  
  burgerBars[1].style.opacity = '0';
  burgerBars[1].style.transitionDuration = '0s';
  burgerBars[1].style.transitionDelay = 'calc(0s + 0.35s)';
  
  burgerBars[2].style.top = 'calc(50% - 4px / 2)';
  burgerBars[2].style.transform = 'rotate(225deg)';
  burgerBars[2].style.transitionDelay = '0s, calc(0s + 0.35s)';
}

function resetBurgerBars() {
  burgerBars[0].style.bottom = 'calc(50% + 11px + 4px / 2)';
  burgerBars[0].style.transform = 'none';
  burgerBars[0].style.transitionDelay = 'calc(0s + 0.35s), 0s';
  
  burgerBars[1].style.opacity = '1';
  burgerBars[1].style.transitionDuration = '0.35s';
  burgerBars[1].style.transitionDelay = '0s';
  
  burgerBars[2].style.top = 'calc(50% + 11px + 4px / 2)';
  burgerBars[2].style.transform = 'none';
  burgerBars[2].style.transitionDelay = 'calc(0s + 0.35s), 0s';
}

//////////////////
// КНОПКА ВГОРУ //
/////////////////

const buttonUp = document.querySelector('.circle_home');
const header = document.querySelector('.header');

// з'являння при скролі нижче хедера
window.addEventListener('scroll',() =>{

  if(window.scrollY >= header.offsetTop + header.offsetHeight){

    buttonUp.classList.add('button_show');
    burgerMenu.classList.remove('open_menu');
    checkbox.checked = true;
    
    resetBurgerBars();

  } else {

    buttonUp.classList.remove('button_show');

  }
});

// прокрутка на клік вгору
buttonUp.addEventListener('click', () => {

  scrollToTop();

});

function scrollToTop() {
  const scrollDuration = 300; // Визначаємо тривалість прокрутки
  const scrollHeight = window.scrollY;
  const scrollStep = Math.PI / (scrollDuration / 15);
  const cosParameter = scrollHeight / 2;

  let scrollCount = 0;
  let scrollMargin;

  const scrollInterval = setInterval(() => {

    if (window.scrollY !== 0) {

      scrollCount += 1;
      scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
      window.scrollTo(0, scrollHeight - scrollMargin);

    } else {

      clearInterval(scrollInterval);

    }
  }, 15);
};

////////////////////////////////////////
// функція автозаповнення назви міста //
////////////////////////////////////////

function cityAutocomplete(cityInput, suggestionsList) {
  cityInput.addEventListener("input", function () {
    const searchText = cityInput.value;
    getCitySuggestions(searchText, suggestionsList);
  });

  function getCitySuggestions(searchText, suggestionsList) {
    fetch(`https://secure.geonames.org/searchJSON?name_startsWith=${searchText}&maxRows=7&continentCode=EU&lang=uk&lang=en&isNameRequired=true&username=anastasiia_poliakova`)
      .then(response => response.json())
      .then(data => {
        suggestionsList.innerHTML = "";
        suggestionsList.style.zIndex = "10";
        const uniqueCities = new Set();
        data.geonames.forEach(city => {
          uniqueCities.add(city.name);
        });
        uniqueCities.forEach(cityName => {
          const suggestionItem = document.createElement("li");
          suggestionItem.textContent = cityName;
          suggestionsList.appendChild(suggestionItem);
        });
      });
  }

  suggestionsList.addEventListener("click", function (event) {
    
    if (event.target.tagName === "LI") {
      cityInput.value = event.target.textContent;
      suggestionsList.innerHTML = "";
    }
  });

  window.addEventListener('click',function(event){
     
    if(event !== suggestionsList){
       suggestionsList.innerHTML = "";
    }
  });
}

const cityInputs = document.querySelectorAll(".cityInput");
const suggestionsLists = document.querySelectorAll("#suggestions");

for (let i = 0; i < cityInputs.length; i++) {
  cityAutocomplete(cityInputs[i], suggestionsLists[i]);
}

////////////////////
//відправка форми //
////////////////////

const form = document.getElementById('myForm');
const formBtn = document.querySelector('.btn_send');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  grecaptcha.ready(function() {
    grecaptcha.execute('6LeMfhYpAAAAAMS_WdZuSj3FCPUw-MA6EQmLDoXK', {action: 'submit'}).then(function(token) {
      
      const formData = new FormData(form);
      formData.append('g-recaptcha-response', token);

     sendEmailTelegram(form, formData);
    });

 });
});

async function sendEmailTelegram(form, formData) {

    if (formData){
      const url = 'sendmessage.php';
      const response = await fetch(url, 
        {
          method: "POST",                  
          body: formData
        });
      if (response.ok) {
        alert("Дякуємо за Вашу заявку! Наш менеджер зв'яжеться з вами найближчим часом");
        form.reset();
      } else {
       
        alert("Заявка не відправлена! Спробуйте пізніше або зв'яжіться з нами будь-яким зручним Вам способом!");
      } 
    }
}