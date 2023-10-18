'use strict';

// show modal
const btnOPenModal = document.querySelector('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
btnOPenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

// smooth scrolling
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
console.log(section1);

btnScroll.addEventListener('click', function () {
  const sc1oolds = section1.getBoundingClientRect();
  console.log(sc1oolds);
  //   window.scrollTo({
  //     left: sc1oolds.left + window.pageXOffset,
  //     top: sc1oolds.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });
  // or
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const links = document.querySelectorAll('.nav__link');
// console.log(links);

// links.forEach(function (link) {
//   const id = link.getAttribute('href');
//   console.log(id);
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
// Delegation
const nav = document.querySelector('nav');
nav.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target;
  if (e.target.classList.contains('nav__link')) {
    const id = clicked.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Build a tabbled component
const tabContainer = document.querySelector('.operations__tab-container');
const tabsButton = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabsButton.forEach(e => e.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
const links = document.querySelectorAll('.nav__link');
const logo = document.querySelector('.nav__logo');
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     links.forEach(li => {
//       if (li !== clicked) li.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     links.forEach(li => {
//       if (li !== clicked) li.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

const handelHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    links.forEach(li => {
      if (li !== clicked) li.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handelHover.bind(0.5));
nav.addEventListener('mouseout', handelHover.bind(1));

// sticky Nav ***************
const header = document.querySelector('header');
// document.addEventListener('scroll', function () {
//   const height = header.getBoundingClientRect().height;
//   if (window.scrollY > height) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const stickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const observeHeader = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
observeHeader.observe(header);

const relvalSection = function (entries, observe) {
  const entry = entries[0];
  // console.log(entry);
  // console.log(entry.target);
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target);
};
const observeSection = new IntersectionObserver(relvalSection, {
  root: null,
  threshold: 0.15,
});
const allSection = document.querySelectorAll('.section');
allSection.forEach(sec => {
  sec.classList.add('section--hidden');
  observeSection.observe(sec);
});

const lazy = function (entries, observe) {
  const entry = entries[0];
  console.log(entry);
  console.log(entry.target);
  if (!entry.isIntersecting) return;
  else entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const observeLazyImg = new IntersectionObserver(lazy, {
  root: null,
  threshold: 0.15,
});
const allLazyImgs = document.querySelectorAll('img[data-src]');
allLazyImgs.forEach(img => {
  observeLazyImg.observe(img);
});
