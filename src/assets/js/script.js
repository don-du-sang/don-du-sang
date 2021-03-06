$(document).ready(function(){
	
	var current_fs, next_fs, previous_fs; //fieldsets
	var opacity;
	
	$(".next").click(function(){
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//Add Class Active
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show();
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now) {
				// for making fielset appear animation
				opacity = 1 - now;
				
				current_fs.css({
					'display': 'none',
					'position': 'relative'
				});
				next_fs.css({'opacity': opacity});
			},
			duration: 600
		});
	});
	
	$(".previous").click(function(){
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//Remove class active
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show();
		
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now) {
				// for making fielset appear animation
				opacity = 1 - now;
				
				current_fs.css({
					'display': 'none',
					'position': 'relative'
				});
				previous_fs.css({'opacity': opacity});
			},
			duration: 600
		});
	});
	
	$('.radio-group .radio').click(function(){
		$(this).parent().find('.radio').removeClass('selected');
		$(this).addClass('selected');
	});
	
	$(".submit").click(function(){
		return false;
	})
	
	/**
		* Easy selector helper function
	*/
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
			} else {
			return document.querySelector(el)
		}
	}
	
	/**
		* Easy event listener function
	*/
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all)
		if (selectEl) {
			if (all) {
				selectEl.forEach(e => e.addEventListener(type, listener))
				} else {
				selectEl.addEventListener(type, listener)
			}
		}
	}
	
	/**
		* Easy on scroll event listener 
	*/
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}
	
	/**
		* Navbar links active state on scroll
	*/
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
		let position = window.scrollY + 200
		navbarlinks.forEach(navbarlink => {
			if (!navbarlink.hash) return
			let section = select(navbarlink.hash)
			if (!section) return
			if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
				navbarlink.classList.add('active')
				} else {
				navbarlink.classList.remove('active')
			}
		})
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)
	
	/**
		* Scrolls to an element with header offset
	*/
	const scrollto = (el) => {
		let header = select('#header')
		let offset = header.offsetHeight
		
		if (!header.classList.contains('header-scrolled')) {
			offset -= 20
		}
		
		let elementPos = select(el).offsetTop
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth'
		})
	}
	
	/**
		* Toggle .header-scrolled class to #header when page is scrolled
	*/
	let selectHeader = select('#header')
	if (selectHeader) {
		const headerScrolled = () => {
			if (window.scrollY > 100 && screen.width > 500) {
				selectHeader.classList.add('header-scrolled')
				} else {
				selectHeader.classList.remove('header-scrolled')
			}
		}
		window.addEventListener('load', headerScrolled)
		onscroll(document, headerScrolled)
	}
	
	/**
		* Back to top button
	*/
	let backtotop = select('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active')
				} else {
				backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
	}
	
	/**
		* Mobile nav top to bottom
	*/
	// let header = select('header');
	// let mediaQuery = window.matchMedia("(max-width: 400px)");
	
	// if(window.innerWidth < 992)
	// {
		// header.classList.remove("fixed-top");
		// header.classList.add("fixed-bottom");
	// }
	// else
	// {
		// header.classList.remove("fixed-bottom");
		// header.classList.add("fixed-top");
	// }
	
	
	/**
		* Mobile nav toggle
	*/
	/*on('click', '.mobile-nav-toggle', function(e) {
		select('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})*/
	
	/**
		* Mobile nav dropdowns activate
	*/
	/*on('click', '.navbar .dropdown > a', function(e) {
		if (select('#navbar').classList.contains('navbar-mobile')) {
			e.preventDefault()
			this.nextElementSibling.classList.toggle('dropdown-active')
		}
	}, true)*/
	
	/**
		* Scroll with ofset on links with a class name .scrollto
	*/
	/*on('click', '.scrollto', function(e) {
		if (select(this.hash)) {
			e.preventDefault()
			
			let navbar = select('#navbar')
			if (navbar.classList.contains('navbar-mobile')) {
				navbar.classList.remove('navbar-mobile')
				let navbarToggle = select('.mobile-nav-toggle')
				navbarToggle.classList.toggle('bi-list')
				navbarToggle.classList.toggle('bi-x')
			}
			scrollto(this.hash)
		}
	}, true)*/
	
	/**
		* Scroll with ofset on page load with hash links in the url
	*/
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash)
			}
		}
	});
	
	/**
		* Porfolio isotope and filter
	*/
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: '.portfolio-item'
			});
			
			let portfolioFilters = select('#portfolio-flters li', true);
			
			on('click', '#portfolio-flters li', function(e) {
				e.preventDefault();
				portfolioFilters.forEach(function(el) {
					el.classList.remove('filter-active');
				});
				this.classList.add('filter-active');
				
				portfolioIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
				portfolioIsotope.on('arrangeComplete', function() {
					AOS.refresh()
				});
			}, true);
		}
		
	});
	
	/**
		* Animation on scroll
	*/
	window.addEventListener('load', () => {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		})
	});
	
});