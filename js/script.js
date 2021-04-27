/*------BURGER------*/

let burger = document.querySelector(".burger");
let nav = document.querySelector(".main-nav");

burger.addEventListener("click", function () {
	burger.classList.toggle("active");
	nav.classList.toggle("active");
});

if (window.innerWidth <= 992) {
	document.addEventListener("DOMContentLoaded", function (event) {
		window.onresize = function () {
			location.reload();
		};
	});

	let parent = document.querySelectorAll(".product-item");
	let child = document.querySelectorAll(".add-to-cart-btn");

	for (i = 0; i < parent.length; i++) {
		parent[i].append(child[i]);
	}
}

if (window.innerWidth <= 767) {
	document.querySelector(".main-nav").prepend(document.querySelector(".header-top__content-left"));
	document.querySelector(".main-nav-icons").prepend(document.querySelector(".header-content__enter-buttons"));
	document.querySelector(".header-content__enter-buttons").append(document.querySelector(".tel-icon"));
	document.querySelector(".main-nav").prepend(document.querySelector(".main-nav-icons"));
	document.querySelector(".main-nav").append(document.querySelector(".header-top__content-right"));
}

let phone = document.querySelector(".tel-icon");
let options = document.querySelectorAll(".main-nav .call-back-link");

phone.addEventListener("click", function () {
	for (i = 0; i < options.length; i++) {
		options[i].classList.toggle("active");
	}
});

/*-------SLIDER-------*/

new Swiper(".baner-init", {
	// Arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},
	// Bullets
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	watchOverflow: true,
	// Infinite
	loop: true,
	// Autoplay
	autoplay: {
		delay: 4000,
		disableOnInteraction: false
	},
	// Change speed
	speed: 300,
});

new Swiper(".product-page-slider", {
	pagination: {
		el: ".product-page-slider-pagination",
		clickable: true
	},
	watchOverflow: true,
	loop: true,
	speed: 300,
	// Minislider
	thumbs: {
		swiper: {
			el: ".product-minislider",
			slidesPerView: 10,
			spaceBetween: 10,
		}
	},
});

new Swiper(".product-page-suitable-slider", {
	// Arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	},
	// Bullets
	pagination: {
		el: ".swiper-button-pagination",
		clickable: true
	},
	simulateTouch: false,
	slidesPerView: 1,
	watchOverflow: true,
	// Change speed
	speed: 300,
	breakpoints: {
		320: {
			slidesPerView: 2,
		},
		767: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 4,
		},
	},
});

/*---------popup-product-description-link---*/

const productDescriptionLinks = document.querySelectorAll(".popup-product-description-link");

if (productDescriptionLinks.length > 0) {
	for (i = 0; i < productDescriptionLinks.length; i++) {
		const productDescriptionLink = productDescriptionLinks[i];
		productDescriptionLink.addEventListener('click', function () {
			const currentActive = document.querySelector(".popup-product-description-text.active");
			if (currentActive) {
				currentActive.classList.remove("active");
			}
			const productDescriptionName = productDescriptionLink.getAttribute('href').replace('#', '');
			const currentDescription = document.getElementById(productDescriptionName);
			currentDescription.classList.add("active");

			const currentActiveLink = document.querySelector(".popup-product-description-link.active");
			if (currentActiveLink) {
				currentActiveLink.classList.remove("active");
			}
			productDescriptionLink.classList.add("active");
		});
	}
}

/*---------Disabled subscription button---*/

const subBtn = document.querySelectorAll(".subscription-button");
const subCheck = document.querySelectorAll(".agreement-check");

function isChecked() {
	for (i = 0; i < subBtn.length; i++) {
		if (subCheck[i].checked && subBtn[i].disabled) {
			subBtn[i].toggleAttribute("disabled");
		}
		else if (subCheck[i].checked == false && subBtn[i].disabled == false) {
			subBtn[i].toggleAttribute("disabled");
		}
	}
};

if (subCheck.length > 0) {
	for (let i = 0; i < subCheck.length; i++) {
		const currentCheck = subCheck[i];
		currentCheck.addEventListener("click", isChecked);
	}
}

window.onload = isChecked;

/*--------Main-nav-submenu---------*/

const menuLinks = document.querySelectorAll(".main-nav__list-item");
const submenu = document.querySelector(".main-nav-submenu");

for (i = 0; i < menuLinks.length; i++) {
	const menuLink = menuLinks[i];
	menuLink.onmouseover = function () {
		submenu.classList.add("active");
	};
	menuLink.onmouseout = function () {
		submenu.classList.remove("active");
	};
}

/*-----------Catalog-filters-------*/

const filterLinks = document.querySelectorAll(".catalog-categories-title");

if (filterLinks.length > 0) {
	for (i = 0; i < filterLinks.length; i++) {
		const filterLink = filterLinks[i];
		filterLink.addEventListener('click', function () {
			const activeFilterList = document.querySelector(".catalog-categories-list.active");
			const filterName = filterLink.getAttribute('id').replace('to', '');
			const filterList = document.getElementById(filterName);

			if (activeFilterList && activeFilterList !== filterList) {
				activeFilterList.classList.remove("active");
			}

			filterList.classList.toggle("active");
		});
	}
}

/*-----------Popup-----------------*/

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let i = 0; i < popupLinks.length; i++) {
		const popupLink = popupLinks[i];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
	for (let i = 0; i < popupCloseIcon.length; i++) {
		const el = popupCloseIcon[i];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup-content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

		/*-------SLIDER product-popup-------*/
		new Swiper(".popup-product-slider", {
			pagination: {
				el: ".popup-product-swiper-pagination",
				clickable: true,
			},
			watchOverflow: true,
			loop: true,
			slidesPerView: 1,
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let i = 0; i < lockPadding.lenth; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let i = 0; i < lockPadding.length; i++) {
				const el = lockPadding[i];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})