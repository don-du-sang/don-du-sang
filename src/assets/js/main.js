/**
	* Template Name: Rapid - v4.0.1
	* Template URL: https://bootstrapmade.com/rapid-multipurpose-bootstrap-business-template/
	* Author: BootstrapMade.com
	* License: https://bootstrapmade.com/license/
*/
(function() {
	"use strict";
	
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
			if (window.scrollY > 100) {
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
		* Mobile nav toggle
	*/
	on('click', '.mobile-nav-toggle', function(e) {
		select('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})
	
	/**
		* Mobile nav dropdowns activate
	*/
	on('click', '.navbar .dropdown > a', function(e) {
		if (select('#navbar').classList.contains('navbar-mobile')) {
			e.preventDefault()
			this.nextElementSibling.classList.toggle('dropdown-active')
		}
	}, true)
	
	/**
		* Scrool with ofset on links with a class name .scrollto
	*/
	on('click', '.scrollto', function(e) {
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
	}, true)
	
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
	
})()

// Globals
var prefixes         = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var $container       = $('.container');
var $timeline        = $('.timeline');
var $timelineItem    = $('.timeline-item');
var $timelineContent = $('.timeline-content');
var $dropDown        = $('.dropdown');
var $hasHovered      = true;
var hideOnExit       = false;

// mouseenter event handler
$timelineItem.on('mouseenter', function(e) {
	
	var isSelected = $(this).hasClass('selected');
	
	if ( isSelected === false ) {
		
		var leftPos = $(this).position().left,
		left    = leftPos - 88,
		$that   = $(this);
		
		$timelineItem.removeClass('selected');
		$(this).addClass('selected');
		
		if ( $hasHovered === false ) {
			// Show Bounce
			
			// Set Flag
			$hasHovered = true;
			
			// Show DD Bounce
			showBounce(left);
			
			// Show DD content Bounce
			showContentBounce($that);
			
			} else {
			// Follow
			
			// Change pos of DD to follow
			dropDownFollow(left);
			
			// Hide previous dd content
			$timelineContent.removeClass('animated fadeIn bounceIn');
			
			// Show hovered dd content
			$that.find($timelineContent).addClass('animated fadeIn');
		}
	}
	
});

// mouseleave event handler
$timeline.on('mouseleave', function(e) {
	
	if (hideOnExit) {
		
		//   Set Flag
		$hasHovered = false;
		
		// Hide DD
		hideDropDown();
		
		// Hide DD content
		$timelineContent.removeClass('animated fadeIn');
		
	}
	
});

// Animation end event listener
$dropDown.on(prefixes, function(e) {
	
	if ( e.originalEvent.animationName === 'fadeOut' ) {
		$dropDown.removeAttr('style');
	}
	
});

// Private functions that do showing/hiding/animating
function showContentBounce(that) {
	$hasBounced = true;
	that.find('.timeline-content').addClass('animated bounceIn');
}

function showBounce(pos) {
	$dropDown.css('left', pos + 'px').removeClass('fadeOut').addClass('animated bounceIn');
}

function dropDownFollow(pos) {
	$dropDown.css('left', pos + 'px');
}

function hideDropDown() {
	$timelineItem.removeClass('selected');
	$dropDown.removeClass('bounceIn').addClass('fadeOut');
}