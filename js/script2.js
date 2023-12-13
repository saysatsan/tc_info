
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

const buttonUp2 = document.querySelector('.circle_home2');
const header_po = document.querySelector('.header_po');
// з'являння при скролі нижче хедера
window.addEventListener('scroll',() =>{
  if(window.scrollY >= header_po.offsetTop + header_po.offsetHeight){
    buttonUp2.classList.add('button_show');
  } else {
    buttonUp2.classList.remove('button_show');
  }
});
// прокрутка на клік вгору
buttonUp2.addEventListener('click', () => {
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
      scrollMargin =
        cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
      window.scrollTo(0, scrollHeight - scrollMargin);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}
