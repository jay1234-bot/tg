// Responsive Script for STUDY-WORLD
// This script handles responsive behavior and animations across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    // Add animation delay to nav links
    navLinksItems.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle menu icon
            const spans = mobileMenu.querySelectorAll('span');
            spans[0].classList.toggle('rotate-45');
            spans[1].classList.toggle('opacity-0');
            spans[2].classList.toggle('rotate-neg-45');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && !event.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            if (mobileMenu) {
                const spans = mobileMenu.querySelectorAll('span');
                spans[0].classList.remove('rotate-45');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('rotate-neg-45');
            }
        }
    });

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.page-title, .grid-button, .aarambh-card, .banner-image');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation to grid buttons
    const gridButtons = document.querySelectorAll('.grid-button');
    gridButtons.forEach((button, index) => {
        button.style.setProperty('--item-index', index);
    });

    // Notification popup functionality
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPopup = document.getElementById('notification-popup');
    const notificationClose = document.getElementById('notification-close');
    const notificationBadge = document.querySelector('.notification-badge');
    
    if (notificationBtn && notificationPopup) {
        // Toggle notification popup
        notificationBtn.addEventListener('click', function() {
            notificationPopup.classList.toggle('show');
            
            // Remove notification badge when clicked
            if (notificationBadge) {
                notificationBadge.style.display = 'none';
            }
        });
        
        // Close notification popup
        if (notificationClose) {
            notificationClose.addEventListener('click', function() {
                notificationPopup.classList.remove('show');
            });
        }
        
        // Close popup when clicking outside
        document.addEventListener('click', function(event) {
            if (notificationPopup.classList.contains('show') && 
                !notificationPopup.contains(event.target) && 
                !notificationBtn.contains(event.target)) {
                notificationPopup.classList.remove('show');
            }
        });
    }

    // Make images responsive
    const images = document.querySelectorAll('img:not(.logo img)');
    images.forEach(img => {
        img.classList.add('img-fluid');
    });

    // Tab navigation for subject pages
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabNav = document.querySelector('.tab-nav');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to current button and content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
                
                // Update the swipe indicator
                if (tabNav) {
                    tabNav.setAttribute('data-active', tabId);
                }
            });
        });
        
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchFilters = document.querySelectorAll('.search-filter');
        let currentFilter = 'All';

        function filterCards() {
            const searchTerm = searchInput.value.toLowerCase();
            const activeTabId = document.querySelector('.tab-button.active').getAttribute('data-tab');
            const activeTabContent = document.getElementById(`${activeTabId}-tab`);
            const activeTabButtons = activeTabContent.querySelectorAll('.grid-button');

            activeTabButtons.forEach(button => {
                const title = button.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const subject = button.querySelector('.card-subject')?.textContent.toLowerCase() || '';
                const badge = button.querySelector('.card-badge')?.textContent.toLowerCase() || '';
                let matchesSearch = title.includes(searchTerm) || subject.includes(searchTerm) || badge.includes(searchTerm);
                let matchesFilter = (currentFilter === 'All') || button.classList.contains(currentFilter.toLowerCase());
                if (matchesSearch && matchesFilter) {
                    button.style.display = 'flex';
                } else {
                    button.style.display = 'none';
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterCards);
        }
        if (searchFilters.length > 0) {
            searchFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    searchFilters.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.textContent.trim();
                    filterCards();
                });
            });
        }
        // Clear search and filter when switching tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (searchInput) searchInput.value = '';
                if (searchFilters.length > 0) {
                    searchFilters.forEach(f => f.classList.remove('active'));
                    searchFilters[0].classList.add('active');
                    currentFilter = 'All';
                }
                // Show all buttons when clearing search
                document.querySelectorAll('.grid-button').forEach(btn => {
                    btn.style.display = 'flex';
                });
            });
        });
    }

    // Fix for iOS vh units issue
    function setVhProperty() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    // Set the property on initial load
    setVhProperty();

    // Update the property on resize
    window.addEventListener('resize', setVhProperty);
});
