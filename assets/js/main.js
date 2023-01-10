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
            axilInit.mobileSearch();
        },

        w: function (e) {
            this._window.on('load', axilInit.l).on('scroll', axilInit.scrl).on('resize', axilInit.res)
        },

        scrl: function () {

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

 function checkEmail() {
    var email = document.getElementById('email').checkValidity();
    if (email) {
        return;
    } else {
        alert("Email must be in format xxx@xxx.xxx or xxx@xxx.xxx.xxx!");
    }
}

function checkEmpty(message,type) {
if ($("#contact-name").val() == "" || $("#email").val() == "" || $("#contact-message").val() == "") {
    errorMessage="Please input all required information";
    alert(errorMessage)
  }
  else {
        var toastPop = function() {
            var toastCode = '<div class="toast ' + type + '">';
                    toastCode += message;
                    toastCode += '</div>';
            
            $( ".toastWrap" ).prepend(toastCode);
            document.querySelector('.toast:not(.show)').style.display = 'block';
        }
        toastPop();
    };
};

function checkComment(message,type) {
    if ($("#guestname").val() == "" || $("#email").val() == "" || $("#guestmessage").val() == "") {
        errorMessage="Please input all required information";
        alert(errorMessage)
      }
      else {
            var toastPop = function() {
                var toastCode = '<div class="toast ' + type + '">';
                        toastCode += message;
                        toastCode += '</div>';
                
                $( ".toastWrap" ).prepend(toastCode);
                document.querySelector('.toast:not(.show)').style.display = 'block';
            }
            toastPop();
        };
    };

