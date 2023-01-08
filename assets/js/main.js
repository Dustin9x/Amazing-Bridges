(function (window, document, $, undefined) {
    'use strict';
    var axilInit = {
        i: function (e) {
            axilInit.s();
            axilInit.methods();
        },

        s: function (e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')
        },
        methods: function (e) {
            axilInit.w();
            axilInit.axilHover();
            axilInit.axilBackToTop();
            axilInit.cursorAnimate();
            axilInit.onhoverAnimated();
            axilInit.contactForm();
            axilInit.mobileSearch();
        },

        w: function (e) {
            this._window.on('load', axilInit.l).on('scroll', axilInit.scrl).on('resize', axilInit.res)
        },

        scrl: function () {

        },

        contactForm: function () {
            $('.axil-contact-form').on('submit', function (e) {
				e.preventDefault();
				var _self = $(this);
				var __selector = _self.closest('input,textarea');
				_self.closest('div').find('input,textarea').removeAttr('style');
				_self.find('.error-msg').remove();
				_self.closest('div').find('button[type="submit"]').attr('disabled', 'disabled');
				var data = $(this).serialize();
				$.ajax({
					url: 'mail.php',
					type: "post",
					dataType: 'json',
					data: data,
					success: function (data) {
						_self.closest('div').find('button[type="submit"]').removeAttr('disabled');
						if (data.code == false) {
							_self.closest('div').find('[name="' + data.field + '"]');
							_self.find('.btn-primary').after('<div class="error-msg"><p>*' + data.err + '</p></div>');
						} else {
							$('.error-msg').hide();
							$('.form-group').removeClass('focused');
							_self.find('.btn-primary').after('<div class="success-msg"><p>' + data.success + '</p></div>');
							_self.closest('div').find('input,textarea').val('');

							setTimeout(function () {
								$('.success-msg').fadeOut('slow');
							}, 5000);
						}
					}
				});
			});
        },

        
        

        onhoverAnimated: function () {
            var cerchio = document.querySelectorAll('.cerchio');
            cerchio.forEach(function (elem) {
                $(document).on('mousemove touch', function (e) {
                    magnetize(elem, e);
                });
            })
            function magnetize(el, e) {
                var mX = e.pageX,
                    mY = e.pageY;
                const item = $(el);

                const customDist = item.data('dist') * 5 || 60;
                const centerX = item.offset().left + (item.width() / 2);
                const centerY = item.offset().top + (item.height() / 2);

                var deltaX = Math.floor((centerX - mX)) * -0.45;
                var deltaY = Math.floor((centerY - mY)) * -0.45;

                var distance = calculateDistance(item, mX, mY);

                if (distance < customDist) {
                    TweenMax.to(item, 0.5, {
                        y: deltaY,
                        x: deltaX,
                        scale: 1.05
                    });
                    item.addClass('magnet');
                } else {
                    TweenMax.to(item, 0.6, {
                        y: 0,
                        x: 0,
                        scale: 1
                    });
                    item.removeClass('magnet');
                }
            }

            function calculateDistance(elem, mouseX, mouseY) {
                return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
            }
            /*- MOUSE STICKY -*/
            function lerp(a, b, n) {
                return (1 - n) * a + n * b
            }
        },

        

        axilHover: function () {
            $('.content-direction-column, .post-listview-visible-color').mouseenter(function () {
                var self = this;
                $(self).removeClass('axil-control');
                setTimeout(function () {
                    $('.content-direction-column.is-active, .post-listview-visible-color .post-list-view.is-active').removeClass('is-active').addClass('axil-control');
                    $(self).removeClass('axil-control').addClass('is-active');
                }, 0);
            });
        },

        megamenuHover: function () {
            $('.vertical-nav-menu li.vertical-nav-item').hover(function () {
                $('.axil-vertical-inner').hide();
                $('.vertical-nav-menu li.vertical-nav-item').removeClass('active');
                $(this).addClass('active');
                var selected_tab = $(this).find('a').attr("href");
                $(selected_tab).stop().fadeIn();
                return false;
            });
        },

        axilBackToTop: function () {
            var btn = $('#backto-top');
            $(window).scroll(function () {
                if ($(window).scrollTop() > 300) {
                    btn.addClass('show');
                } else {
                    btn.removeClass('show');
                }
            });
            btn.on('click', function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, '300');
            });
        },
    }
    axilInit.i();

})(window, document, jQuery);

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    focusOnSelect: true
});

$('a[data-slide]').click(function(e) {
    e.preventDefault();
    var slideno = $(this).data('slidergallery');
    $('.slider-nav').slick('slickGoTo', slideno - 1);
});

function searchMe() {
    window.location.href = '#!category';
};

function mobileSearch() {
    $('.search-button-toggle').toggleClass('open');
    $('.header-search-form').toggleClass('open');
};

function uncheck() {
    $("#hamburger-menu-input").attr("checked", false)
};


function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Email must be filled out");
      return false;
    } else {
        alert('Thank you! You already subscribed to our newsletter!')
    }
  }



