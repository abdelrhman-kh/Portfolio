function toggleMenu() {
    var navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}

$(document).ready(function() {
    // Smooth scroll for navigation links
    $('nav ul li a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });

    // Initialize tooltips
    tippy('[data-tippy-content]');

    // Back to top button functionality
    var backToTopButton = $('#back-to-top');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1) {
            backToTopButton.addClass('show');
        } else {
            backToTopButton.removeClass('show');
        }
    });

    backToTopButton.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, '300');
    });
});
