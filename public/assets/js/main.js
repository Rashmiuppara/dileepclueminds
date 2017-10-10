jQuery(function($) {
    "use strict";
    $('[rel=tooltip]').tooltip();
    $('input, textarea').placeholder();
    $('#mc_mv_EMAIL').attr('placeholder', 'Type your email address');
    if ($('#testimonials').length) {
        $('#testimonials').cycle();
    }
   


    var sectionFunction = function() {

        $('.section-style').each(function() {
            if ($(this).next().hasClass('section-style')) {
                $(this).css('marginBottom', '0px');
            }

            if ($(this).hasClass('transparency_section')) {
                var height = $(this).outerHeight();
                $(this).css({
                    'marginTop': '-' + height + 'px'
                });
            }

            if ($(this).is(':last-child') && $(this).parent().hasClass('composer_content')) {
                $(this).parent().css('padding-bottom', '0px');
            }
            if ($(this).is(':first-child') && $(this).parent().hasClass('composer_content')) {
                var style = $(this).parent().attr('style');
                if (typeof style == "undefined")
                    style = '';
                $(this).parent().attr('style', style + 'padding-top:0px !important;');
            }
        });


        $('.transparency_section').not('.section-style').each(function() {
            var height = $(this).outerHeight();
            $(this).css('margin-top', '-' + height + 'px');
        });

        if ($(window).width() < 767) {
            transparentResp();
            horizontalSections();
        }

    }
    $.fn.swiperInit = function(nr) {
        return this.each(function() {
            var slide = $(this);

            var slidenr = typeof nr !== 'undefined' ? nr : slide.data('nr');

            var mySwiper = $(this).swiper({
                slidesPerView: slidenr,
                mode: 'horizontal',
                onFirstInit: function(swiper) {

                }
            });

        });
    };

    var window_width = $(document).width();
    if (window_width > 767 && window_width < 1100)
        $('.swiper-container').swiperInit(3);
    else if (window_width <= 767)
        $('.swiper-container').swiperInit(1);
    else
        $('.swiper-container').swiperInit();

    var transparentResp = function() {

        $('.transparency_section.section-style').each(function() {
            var currentColor = $(this).css('background-color');
            var lastComma = currentColor.lastIndexOf(',');
            var newColor = "rgb(" + currentColor.slice(5, lastComma) + ")";
            $(this).css('background-color', newColor);

            var $prev = $(this).prev();

            if ($prev.length > 0 && $prev.hasClass('section-style')) {
                var prev_p_t = $prev.css('padding-top');
                var prev_p_b = $prev.css('padding-bottom');

                if (prev_p_t != prev_p_b) {
                    $prev.css({
                        paddingBottom: ''
                    });
                    var style = $prev.attr('style');
                    if (typeof style == "undefined")
                        style = '';
                    $prev.attr('style', style + 'padding-bottom:' + prev_p_t + ' !important;');
                }
                //alert(prev_p_t + ' ' + prev_p_b);

            }

        });
    };

    var horizontalSections = function() {
        $('.first_section_over').each(function() {
            var $parent = $(this).parents('.section-style');
            var first_height = $parent.find('.wpb_column').first().height();
            var second_height = $parent.find('.wpb_column').last().height();

            if (second_height > first_height)
                $parent.find('.wpb_column').first().css('height', second_height + 'px');

            if (second_height < first_height)
                $parent.find('.wpb_column').first().css('height', first_height + 'px');

        });
    };

    $(window).bind('load', function() {
        sectionFunction();
        setTimeout(function() {
            sectionFunction();
        }, 400);
        navigationScript();
        //boxedLayout();
    });


    // initialize Masonry after all images have loaded 
    var $container_blog = $('#blogmasonry .row.filterable');
    $container_blog.imagesLoaded(function() {
        $container_blog.masonry({
            itemSelector: '.grid',
            columnWidth: 0
        });
    });

    // trigger Masonry as a callback



    $("#tweet_footer").each(function() {
        var $self = $(this);
        $self.carouFredSel({
            circular: true,
            infinite: true,
            auto: false,
            scroll: {
                items: 1,
                fx: "fade"
            },
            prev: {
                button: $self.parent().parent().find('.back')
            },

            next: {
                button: $self.parent().parent().find('.next')
            }




        });


    });










    $('.header_1 nav .menu li .sub-menu').each(function() {
        $(this).parent().first().addClass('hasSubMenu');
    });

    $('header#header a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('.sect_' + this.hash.slice(1));
            if (target.length) {
                var scrollto = target.offset().top;
                if ($('.sticky_header').length > 0)
                    scrollto = scrollto - $('.sticky_header').height();
                $('html,body').animate({
                    scrollTop: scrollto
                }, 1000);

                return false;
            }

        }
    });




    var onePageNav = function() {
        $('.section-style').waypoint(function(direction) {
            //var activeSection = $(this).next();
            var activeSection = $(this);
            if (direction === 'down') {
                activeSection = $(this).next();
            }
            //activeSection = $(this);
            var sectionClass = activeSection.attr('class');
            sectionClass = sectionClass.split(" ");
            sectionClass = sectionClass[0];
            sectionClass = sectionClass.split("_");
            sectionClass = sectionClass[1];

            $('header#header #navigation nav ul li').removeClass('current-menu-item');
            $('header#header nav ul li a[href="#' + sectionClass + '"]').parent().addClass('current-menu-item');
        });
    };

    if ($('body').hasClass('one_page'))
        onePageNav();

    var navigationScript = function() {
        $('nav .menu').live('mouseleave', function(event) {


            $(this).find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').css('display', 'none');

            $(this).find('.themeple_custom_menu_mega_menu').css('display', 'none');
        });

        $('nav .menu > li').live('mouseenter', function() {
            $(this).parent().find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').stop(true, true).css('display', 'none');
            $(this).find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').first().stop(true, true).css('display', 'block');

            $(this).parent().find('.themeple_custom_menu_mega_menu').stop(true, true).css('display', 'none');
            $(this).find('.themeple_custom_menu_mega_menu').first().stop(true, true).css('display', 'block');
        });

        $('nav .menu > li ul > li').live('mouseenter', function() {
            $(this).parent().find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').stop(true, true).css('display', 'none');
            $(this).find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').stop(true, true).first().css('display', 'block');

            $(this).parent().find('.themeple_custom_menu_mega_menu').stop(true, true).css('display', 'none');
            $(this).find('.themeple_custom_menu_mega_menu').stop(true, true).first().css('display', 'block');
        });
    };


    var stickyNavTop = $('.top_wrapper').offset().top;

    var stickyNav = function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop && !$('header#header').hasClass('fixed_header')) {
            $('header#header').addClass('fixed_header');
            navigationScript();
        } else if (scrollTop < stickyNavTop) {
            $('header#header').removeClass('fixed_header');
        }
    };

    if ($('.sticky_header').length > 0) {
        $(window).scroll(function() {
            stickyNav();
        });
    }

    $('.googlemap.fullwidth_map').each(function() {
        var $parent = $(this).parents('.row-dynamic-el').first();
        if ($parent.next().hasClass('section-style'))
            $parent.css('margin-bottom', '0px');
    });

    /*	$('.blog-article.grid .media img').first().imagesLoaded(function(){
			var first_height = $('.blog-article.grid .media img').first().height();
			
			$('.blog-article.grid iframe').each(function(){
				$(this).css('height', first_height+'px');
				$(this).parent('.media').css('height', first_height+'px');
			});
		});*/


    $(".section-style.parallax_section .parallax_bg").each(function(i, el) {
        if (i + 1 == $(".section-style.parallax_section .parallax_bg").length)
            $(el).parallax("50%", 0.04);
        else
            $(el).parallax("50%", 0.2);
    });

    $('.row-google-map').each(function() {
        if ($('.fullwidth_map', $(this)).length > 0) {
            var $parent = $(this).parents('.row-dynamic-el').first();
            $parent.css('margin-top', '0px');
        }

    });


    if ($('.header_page.centered').length > 0) {
        var $bread = $('.header_page.centered .breadcrumbss');
        var margin = ($bread.width() / 2) - 5;

        $bread.css('marginLeft', '-' + margin + 'px');
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.dynamic_page_header .btns').each(function() {
        var width = $(this).width();
        $(this).css('width', (width + 10) + 'px');
        $(this).css('float', 'none');
    });


    $('.arrow_down').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $(function() {

        if ($("#float_side").length > 0 && $(".slider_full").length > 0) {
            var $sidebar = $("#float_side"),
                $slider_full = $(".slider_full"),
                $window = $(window),
                offset = $sidebar.offset(),
                topPadding = 15,
                margin = 0

            $window.scroll(function() {



                if ($window.scrollTop() > offset.top && $window.scrollTop() <= $slider_full.height()) {



                    $sidebar.stop().animate({
                        marginTop: $window.scrollTop() - offset.top + topPadding
                    });

                } else {

                    $sidebar.stop().animate({
                        marginTop: 0
                    });

                }
            });
        }

    });

    $(".accordion-group .accordion-toggle").live('click', function() {
        var $self = $(this).parent().parent();
        if ($self.find('.accordion-heading').hasClass('in_head')) {
            $self.parent().find('.accordion-heading').removeClass('in_head');
        } else {
            $self.parent().find('.accordion-heading').removeClass('in_head');
            $self.find('.accordion-heading').addClass('in_head');
        }
    });

    if ($('.recent_sc_portfolio').length) {
        $('.recent_sc_portfolio').imagesLoaded(function() {

            $(this).carouFredSel({

                items: 6,
                responsive: true,
                scroll: {
                    items: 6
                },
                prev: {
                    button: $(this).parent().parent().find('.prev')
                },

                next: {
                    button: $(this).parent().parent().find('.next')
                }


            });

        });
    }

    $('.small_widget a').not('.aaaa a').toggle(function(e) {

        $('.small_widget').removeClass('active');
        e.preventDefault();
        var box = $(this).data('box');
        $('.top_nav_sub').hide();
        $('.top_nav_sub.' + box).fadeIn("400");
        $(this).parent().addClass('active');

    }, function(e) {
        e.preventDefault();
        var box = $(this).data('box');
        $('.small_widget').removeClass('active');
        $('.top_nav_sub').fadeOut('400');
        $('.top_nav_sub.' + box).fadeOut('slow');


    });



    $(document).mouseup(function(e) {
        var container = $(".small_widget");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('.top_nav_sub').fadeOut('400');
        }
    });


    /*$("audio,video").mediaelementplayer();  */
    $(".lightbox-gallery").fancybox();
    $('.show_review_form').fancybox();
    $('.lightbox-media').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            media: {}
        }
    });




    var circleTestimonial = function() {
        $(".carousel_testimonial").each(function() {
            var width = $(this).parents('.wpb_content_element').width();
            $('.circle_testimonial', $(this)).width(width + 'px');
            var $self = $(this);
            $self.imagesLoaded(function() {
                $self.carouFredSel({
                    circular: true,
                    infinite: true,
                    auto: true,

                    scroll: {
                        items: 1,
                        fx: 'fade'
                    }


                });
            });
        });
    };

    circleTestimonial();

    var singleTestimonialInit = function() {
        $(".carousel_single_testimonial").each(function() {
            var width = $(this).parents('.wpb_content_element').width();
            $('.single_testimonial', $(this)).width(width + 'px');

            var $self = $(this);
            $self.imagesLoaded(function() {
                var img_height = $('.single_testimonial .content', $(this)).height();
                $('.single_testimonial .content', $(this)).css('min-height', (img_height - 62) + 'px');
                $self.carouFredSel({
                    circular: true,
                    infinite: true,
                    auto: true,

                    scroll: {
                        items: 1,
                        fx: 'fade'
                    },

                    pagination: $self.parents('.wpb_content_element').find('.pagination'),



                    prev: {

                        button: $self.parents('.wpb_content_element').find('.prev')

                    },

                    next: {

                        button: $self.parents('.wpb_content_element').find('.next')

                    }

                });
            });
        });
    };

    singleTestimonialInit();

    $('#logo a').live('click', function(e) {
        var link = $(this).attr("href");
        document.cookie = 'themeple_skin=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setTimeout(function() {

            window.location.href = link;

        }, 1000);
    });

    $(".menu a").live('click', function(e) {
        var button = $(this);
        document.cookie = 'themeple_skin=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'themeple_header=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        if (typeof $(button).attr('title') != 'undefined' && $(button).attr('title').length > 0) {
            e.preventDefault();
            var title = button.attr('title').split("-");
            var blog = title[0].split("_");
            var third = [0];
            var fourth = [0];
            if (title[1])
                var sidebar = title[1].split("_");
            if (title[2])
                third = title[2].split("_");
            if (title[3])
                fourth = title[3].split("_");
            var sidebar_pos = '';
            var blog_type = '';
            if (blog[0] === 'blog') {
                sidebar_pos = sidebar[1];
                blog_type = blog[1];
                document.cookie = 'themeple_blog=' + blog_type;
                document.cookie = 'themeple_sidebar=' + sidebar_pos;
                setTimeout(function() {
                    window.location.hash = "#wpwrap";
                    window.location.href = $(button).attr("href");

                }, 1000);
            }


            if (blog[0] === 'skin') {

                var skin = title[1];
                document.cookie = 'themeple_skin=' + skin;
                setTimeout(function() {
                    window.location.hash = "#wpwrap";
                    window.location.href = $(button).attr("href");

                }, 1000);
            }


            if (blog[0] === 'header') {

                blog_type = blog[1];
                if (blog_type == 'header_10') {
                    blog_type = 'header_5';
                    $('.top_nav .widget.icl_languages_selector').css({
                        display: 'none'
                    });
                    $('.top_nav #nav_menu-4').css({
                        display: 'block'
                    });
                }
                document.cookie = 'themeple_header=' + blog_type;

                setTimeout(function() {
                    window.location.hash = "#wpwrap";
                    window.location.reload(true);

                }, 1000);
            }

            if (third[0].length > 0) {
                if (third[0] == 'columns' || third[0] == 'authimg') {
                    if (third[0] == 'columns')
                        document.cookie = 'masonry_cols=' + third[1];
                    if (third[0] == 'authimg')
                        document.cookie = 'authimg=' + third[1];
                    setTimeout(function() {

                        window.location.href = $(button).attr("href");

                    }, 1000);
                }
            }


            if (fourth[0].length) {
                if (fourth[0] == 'columns' || fourth[0] == 'authimg') {
                    if (fourth[0] == 'columns')
                        document.cookie = 'masonry_cols=' + fourth[1];
                    if (fourth[0] == 'authimg')
                        document.cookie = 'authimg=' + fourth[1];
                    setTimeout(function() {

                        window.location.href = $(button).attr("href");

                    }, 1000);
                }
            }


            if (title[0] === 'portfolio_single') {



                document.cookie = 'portfolio_single=' + title[1];
                setTimeout(function() {

                    window.location.href = $(button).attr("href");

                }, 1000);


            }
        } else {
            document.cookie = 'themeple_skin=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setTimeout(function() {

                window.location.href = $(button).attr("href");

            }, 1000);

        }
    });

    $(".carousel_blog").each(function() {
        var $self = $(this);


        if ($('li img', $self).size()) {
            $('li img', $self).one("load", function() {
                $self.carouFredSel({

                    circular: true,
                    infinite: true,
                    auto: false,

                    scroll: {

                        items: 1
                    },

                    pagination: $self.parents('.wpb_content_element').find('.pagination')



                }, {
                    debug: true
                });
            }).each(function() {
                if (this.complete) $(this).trigger("load");
            });
        } else {
            $self.carouFredSel({

                circular: true,
                infinite: true,
                auto: false,

                scroll: {

                    items: 1
                },

                pagination: $self.parents('.wpb_content_element').find('.pagination')




            });
        }






    });



    if ($('.clients.clients_caro').length) {
        $('.clients.clients_caro').imagesLoaded(function() {
            var $self = $('.clients.clients_caro');

            $('.clients.clients_caro').carouFredSel({
                items: 6,
                auto: false,
                scroll: {
                    items: 1
                },
                prev: {

                    button: $self.parent('.clients_el').find('.prev')
                },

                next: {

                    button: $self.parent('.clients_el').find('.next')

                }


            });
        });
    }

    function carousel_port_init() {
        $(".carousel.carousel_portfolio").each(function() {
            var $self = $(this);

            $self.imagesLoaded(function() {
                $self.carouFredSel({

                    circular: false,
                    infinite: false,
                    auto: false,

                    scroll: {
                        items: 1
                    },

                    prev: {

                        button: $('.recent_portfolio.pagination').find('.prev')

                    },

                    next: {

                        button: $('.recent_portfolio.pagination').find('.next')

                    }
                });
                var height = $self.height();

                $self.css('height', height + 5 + 'px');
                $self.parent().css('height', height + 5 + 'px');
            });


        });
    }

    carousel_port_init();


    function carousel_news_init() {
        $(".news-carousel").each(function() {
            var $self = $(this);

            $self.imagesLoaded(function() {
                $self.carouFredSel({

                    circular: false,
                    infinite: false,
                    auto: false,
                    width: "auto",


                    scroll: {
                        items: 2,
                        fx: "fade"

                    },

                    items: {

                        height: 330,

                    },

                    prev: {

                        button: $('.recent_news .pagination').find('.prev')

                    },

                    next: {

                        button: $('.recent_news .pagination').find('.next')

                    }
                });



            });


        });
    }

    carousel_news_init();



    function carousel_news_s2_init() {
        $(".news-carousel.style_2").each(function() {
            var $self = $(this);

            $self.imagesLoaded(function() {
                $self.carouFredSel({

                    circular: false,
                    infinite: false,
                    auto: false,
                    width: "auto",


                    scroll: {
                        items: 2,
                        fx: "fade"

                    },

                    items: {

                        height: 370,

                    },

                    prev: {

                        button: $('.recent_news .pagination').find('.prev')

                    },

                    next: {

                        button: $('.recent_news .pagination').find('.next')

                    }
                });



            });


        });
    }

    carousel_news_s2_init();



    if ($('.carousel_shortcode ul').length) {
        $('.carousel_shortcode ul').each(function() {
            var $self = $(this);
            var prev_b = $self.parents('.row-dynamic-el').first().prev().find('.prev');
            if (prev_b.length == 0)
                prev_b = $self.parents('.carousel_shortcode').first().prev().find('.prev');

            var next_b = $self.parents('.row-dynamic-el').first().prev().find('.next');
            if (next_b.length == 0)
                next_b = $self.parents('.carousel_shortcode').first().prev().find('.next');

            $self.imagesLoaded(function() {


                $self.carouFredSel({
                    items: 4,
                    auto: false,
                    scroll: {
                        items: 1
                    },
                    prev: {

                        button: prev_b
                    },

                    next: {

                        button: next_b

                    }


                });
            });

        });
    }



    if ($().mobileMenu) {
        $('#navigation nav').each(function() {
            $(this).mobileMenu();
            $('.select-menu').customSelect();
        });

    }


    $('.flexslider').not('.with_text_thumbnail, .with_thumbnails, .with_thumbnails_carousel, .vertical_slider').each(function() {
        var $s = $(this);
        $s.flexslider({
            slideshowSpeed: 6000,
            animationSpeed: 800,

            controlNav: '',
            pauseOnAction: true,
            pauseOnHover: false,
            start: function(slider) {

                $s.find(" .slides > li .flex-caption").each(function() {
                    var effect_in = $(this).attr("data-effect-in");
                    var effect_out = $(this).attr("data-effect-out");
                    $(this).addClass("animated " + effect_in);


                });

                BackgroundCheck.init({
                    targets: '.header_wrapper',
                    images: '.flexslider img'
                });
            },
            before: function(slider) {
                var current_slide = $s.find(".slides > li").eq(slider.currentSlide);
                $s.find(".slides > li .flex-caption").removeClass('animated');
                $(".flex-caption", current_slide).each(function() {
                    var effect_in = $(this).attr("data-effect-in");
                    var effect_out = $(this).attr("data-effect-out");

                    $(this).removeClass("animated " + effect_in).addClass("animated " + effect_out);
                });
            },
            after: function(slider) {
                var current_slide = $s.find(".slides > li").eq(slider.currentSlide);
                $s.find(".slides > li .flex-caption").removeClass('animated');
                $(".flex-caption", current_slide).each(function() {
                    var effect_in = $(this).attr("data-effect-in");
                    var effect_out = $(this).attr("data-effect-out");

                    $(this).removeClass("animated " + effect_out).addClass("animated " + effect_in);
                });
                BackgroundCheck.refresh();
            }
        });
    });

    $(".flexslider.with_thumbnails").flexslider({

        animation: "slide",
        controlNav: "thumbnails",


    });

    var sliderThumb = function() {

        $('.with_thumbnails_container').each(function() {
            var slider = $(this);
            var slider_content = $('.with_thumbnails', slider);
            var slider_carousel = $('.with_thumbnails_carousel', slider);
            var column_width = slider.width();
            var iNr = Math.floor(column_width / 114);
            var iWidth = (column_width - ((iNr - 1) * 10)) / iNr;
            slider_carousel.flexslider({
                animation: "slide",
                controlNav: "thumbnails",
                directionNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: iWidth,
                itemMargin: 7,
                asNavFor: slider_content,


            });

            slider_content.flexslider({
                animationSpeed: 400,
                animation: "fade",
                pauseOnHover: false,
                controlNav: false,
                sync: slider_carousel,
                start: function(slider) {

                    slider_content.find(" .slides > li .flex-caption").each(function() {
                        var effect_in = $(this).attr("data-effect-in");
                        var effect_out = $(this).attr("data-effect-out");
                        $(this).addClass("animated " + effect_in);


                    });
                },
                before: function(slider) {
                    var current_slide = slider_content.find(".slides > li").eq(slider.currentSlide);
                    slider_content.find(".slides > li .flex-caption").removeClass('animated');
                    $(".flex-caption", current_slide).each(function() {
                        var effect_in = $(this).attr("data-effect-in");
                        var effect_out = $(this).attr("data-effect-out");

                        $(this).removeClass("animated " + effect_in).addClass("animated " + effect_out);
                    });
                },
                after: function(slider) {
                    var current_slide = slider_content.find(".slides > li").eq(slider.currentSlide);
                    slider_content.find(".slides > li .flex-caption").removeClass('animated');
                    $(".flex-caption", current_slide).each(function() {
                        var effect_in = $(this).attr("data-effect-in");
                        var effect_out = $(this).attr("data-effect-out");

                        $(this).removeClass("animated " + effect_out).addClass("animated " + effect_in);
                    });
                }
            });



        });

    };

    sliderThumb();

    $("#attention button.close_button").click(function() {
        $("#attention").height(4);
        $(this).parent().parent().parent().find('.open_button').css('top', 3);
    });
    $("#attention span.open_button").mouseenter(function() {
        $("#attention").height(60);
        $(this).css('top', 59);
    });


    var $container = $('.filterable');

    var portfolioHome = function(nrhome) {

        if ($('.boxed_layout').length > 0)
            window_width = $('.boxed_layout').width();

        var port_size = 100 / nrhome;
        $('.portfolio-item', $home_portfolio).css('width', port_size + '%');
        var width_one = $('.portfolio-item').width();
        $('.items-layout-wide .filterable').width((width_one * nrhome) + 'px');
    };
    var $home_portfolio = $('.home_portfolio');
    if ($('.items-layout-wide').length > 0)
        $home_portfolio = $('.items-layout-wide');
    var nrhome = $home_portfolio.find('section').data('nr');
    if (window_width > 1100)
        portfolioHome(nrhome);
    if (window_width > 981 && window_width <= 1100)
        portfolioHome(3);
    if (window_width > 767 && window_width < 980)
        portfolioHome(2);
    if (window_width < 767)
        portfolioHome(1);


    var portfolioInit = function() {

        if ($('.tpl2 img', $container).size()) {
            $('.tpl2 img', $container).one("load", function() {


                $container.isotope({
                    filter: '*',
                    resizeble: true,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });

            });

            setTimeout(function() {
                $container.isotope({
                    filter: '*',
                    resizeble: true,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
            }, 100);

        }

        $('#filters').on('change', function() {
            // get filter value from option value
            var filterValue = this.value;
            // use filterFn if matches value
            $container.isotope({
                filter: filterValue
            });
        });
    };

    portfolioInit();

    $('.filters_v1 li').each(function() {
        var selector = $(this).find('a').attr('data-filter');

        if ($(selector, $container).length == 0)
            $(this).hide();
    });
    $('.filters_v1 li').click(function() {
        var selector = $(this).find('a').attr('data-filter');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: selector,

            resizeble: true,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });


    portfolioInit();



    /*var blogMasonry = function(){
		var $contaienr = $('#blogmasonry');
		if( $('.media img', $container).size() ) {
			$('.media img', $container).one("load", function(){
				

					$container.isotope({
						filter: '*',
						resizeble: true,
						animationOptions: {
							duration: 750,
							easing: 'linear',
							queue: false
						}
					});
				
			});

			setTimeout(function(){
				$container.isotope({
					filter: '*',
					resizeble: true,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
			}, 100);
	   
		}
	};
	blogMasonry();*/


    /*$('#blogmasonry').isotope({  
		resizeble: true,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}, 
			itemSelector: '.blog-article'
    });*/


    $('nav#faq-filter li a').click(function(e) {
        e.preventDefault();

        var selector = $(this).attr('data-filter');

        $('.faq .accordion-group').fadeOut();
        $('.faq .accordion-group' + selector).fadeIn();

        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent().addClass('active');
    });

    $("#switcher-head .button").toggle(function() {
        $("#style-switcher").animate({
            left: 0
        }, 500);
    }, function() {
        $("#style-switcher").animate({
            left: -263
        }, 500);
    });





    /* Woocommerce */
    if ($('.add_to_cart_button').length > 0) {

        $('body').on('adding_to_cart', function(event, param1, param2) {
            var $thisbutton = param1;
            var $product = $thisbutton.parents('.product').first();
            var $load = $product.find('.loading_ef');
            $load.css('opacity', 1);
            $('body').on('added_to_cart', function(event, param1, param2) {

                $load.css('opacity', 0);
                $('.widget_activation > span').addClass('cart-items-active');
                setTimeout(function() {
                    $load.html('<i class="moon-checkmark"></i>');
                    $load.css('opacity', 1);
                }, 500);
                setTimeout(function() {
                    $load.css('opacity', 1);
                }, 400);
                setTimeout(function() {
                    $load.css('opacity', 0);
                }, 2000);
                $product.addClass('product_added_to_cart');

            });
        });


    }


    /* End Woocommerce */





    $(".page_item_has_children").each(function() {

        $(this).click(function() {


            $(this).find('.children').toggle(400);
            $(this).toggleClass('open-child');

        });

    });

    $('.right_search').click(function(event) {

        $('#navigation, .right_search_container, #logo, .right_search, .border_before, .logo_desc').fadeToggle();
        event.stopPropagation();

    });


    $('html').click(function(e) {
        if ((e.target.id != 's')) {

            $('.right_search_container').fadeOut();
            $('.header_right_widgetized, .moon-search-3, #navigation, #logo, .right_search, .border_before, .logo_desc').fadeIn();
        }
    });



    $('li.current_page_item').parents('.children').css({
        display: 'block'
    });
    $('.current_page_ancestor').addClass('open-child');


    /* Resize */

    $(window).resize(function() {
        window_width = $(window).width();
        portfolioInit();
        singleTestimonialInit();
        circleTestimonial();
        if (window_width > 767) {
            sectionFunction();
        }
        if (window_width > 767 && window_width < 1100)
            $('.swiper-container').swiperInit(3);
        if (window_width <= 767) {
            transparentResp();
            horizontalSections();
            $('.swiper-container').swiperInit(2);
        }

        if (window_width >= 1100) {
            $('.swiper-container').swiperInit();
        }

        var $home_portfolio = $('.home_portfolio');
        if ($('.items-layout-wide').length > 0)
            $home_portfolio = $('.items-layout-wide');
        var nrhome = $home_portfolio.find('section').data('nr');
        if (window_width > 1100)
            portfolioHome(nrhome);
        if (window_width > 981 && window_width <= 1100)
            portfolioHome(3);
        if (window_width > 767 && window_width < 980)
            portfolioHome(2);
        if (window_width < 767)
            portfolioHome(1);





        sliderThumb();
    }).resize();

    /* End Resize */




    /* End For Online */


    $('.mobile_small_menu').click(function() {
        if ($(this).hasClass('open')) {
            $('.menu-small').slideDown(400);
            $('.tparrows').hide();
            if ($('.one_page_header').length == 0)
                $('.top_wrapper').hide();
            $(this).removeClass('open').addClass('close');
        } else if ($(this).hasClass('close')) {
            $('.menu-small').slideUp(400);
            $('.tparrows').show();
            if ($('.one_page_header').length == 0)
                $('.top_wrapper').show();
            $(this).removeClass('close').addClass('open');
        }
    });


});


var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1100;
    tpopt.startheight = 500;
    tpopt.container = jQuery('#rev_slider_1_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "off";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi1;

tpj(document).ready(function() {

    if (tpj('#rev_slider_1_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_1_1');
    } else {
        revapi1 = tpj('#rev_slider_1_1').show().revolution({
            dottedOverlay: "none",
            delay: 3000,
            startwidth: 1100,
            startheight: 500,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,


            simplifyAll: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 75,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",


            hideTimerBar: "on",
            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/


var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_2_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi2;

tpj(document).ready(function() {

    if (tpj('#rev_slider_2_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_2_1');
    } else {
        revapi2 = tpj('#rev_slider_2_1').show().revolution({
            dottedOverlay: "none",
            delay: 16000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 3,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,

            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],


            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner4",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_6_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi6;

tpj(document).ready(function() {

    if (tpj('#rev_slider_6_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_6_1');
    } else {
        revapi6 = tpj('#rev_slider_6_1').show().revolution({
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "on",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/



var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 500;
    tpopt.container = jQuery('#rev_slider_4_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "off";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi4;

tpj(document).ready(function() {

    if (tpj('#rev_slider_4_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_4_1');
    } else {
        revapi4 = tpj('#rev_slider_4_1').show().revolution({
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 500,
            hideThumbs: 10,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "on",
            hideArrowsOnMobile: "on",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 768,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/


/* LayerSlider settings */
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_1', 'jquery');
    } else {
        lsjQuery("#layerslider_1").layerSlider({
            startInViewport: false,
            pauseOnHover: false,
            forceLoopNum: false,
            autoPlayVideos: false,
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});
/*Layer slider homepage6*/
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_2', 'jquery');
    } else {
        lsjQuery("#layerslider_2").layerSlider({
            responsive: false,
            responsiveUnder: 1280,
            layersContainer: 1280,
            startInViewport: false,
            skin: 'noskin',
            globalBGColor: 'transparent',
            hoverPrevNext: false,
            autoPlayVideos: false,
            yourLogoStyle: 'left: 10px; top: 10px;',
            cbInit: function(element) {},
            cbStart: function(data) {},
            cbStop: function(data) {},
            cbPause: function(data) {},
            cbAnimStart: function(data) {},
            cbAnimStop: function(data) {},
            cbPrev: function(data) {},
            cbNext: function(data) {},
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});


/*Revolutionslider hoempage7*/
var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_7_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi7;

tpj(document).ready(function() {

    if (tpj('#rev_slider_7_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_7_1');
    } else {
        revapi7 = tpj('#rev_slider_7_1').show().revolution({
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "off",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

/*homepage 9*/

var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_9_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi9;

tpj(document).ready(function() {

    if (tpj('#rev_slider_9_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_9_1');
    } else {
        revapi9 = tpj('#rev_slider_9_1').show().revolution({
            dottedOverlay: "none",
            delay: 16000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,

            parallax: "scroll",
            parallaxBgFreeze: "on",
            parallaxLevels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],


            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner4",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

/* homepage 11*/

var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_10_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "off";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi10;

tpj(document).ready(function() {

    if (tpj('#rev_slider_10_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_10_1');
    } else {
        revapi10 = tpj('#rev_slider_10_1').show().revolution({
            dottedOverlay: "none",
            delay: 16000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview3",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,

            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],


            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner4",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

/*homepage 12*/
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_2', 'jquery');
    } else {
        lsjQuery("#layerslider_2").layerSlider({
            responsive: false,
            responsiveUnder: 1280,
            layersContainer: 1280,
            startInViewport: false,
            skin: 'noskin',
            globalBGColor: 'transparent',
            hoverPrevNext: false,
            autoPlayVideos: false,
            yourLogoStyle: 'left: 10px; top: 10px;',
            cbInit: function(element) {},
            cbStart: function(data) {},
            cbStop: function(data) {},
            cbPause: function(data) {},
            cbAnimStart: function(data) {},
            cbAnimStop: function(data) {},
            cbPrev: function(data) {},
            cbNext: function(data) {},
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});

/*homepage14*/
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_1', 'jquery');
    } else {
        lsjQuery("#layerslider_1").layerSlider({
            startInViewport: false,
            pauseOnHover: false,
            forceLoopNum: false,
            autoPlayVideos: false,
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});


     /*******************************************/
                

                var setREVStartSize = function() {
                    var tpopt = new Object();
                        tpopt.startwidth = 1170;
                        tpopt.startheight = 700;
                        tpopt.container = jQuery('#rev_slider_3_1');
                        tpopt.fullScreen = "off";
                        tpopt.forceFullWidth="off";

                    tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
                };

                /* CALL PLACEHOLDER */
                setREVStartSize();


                var tpj=jQuery;
                tpj.noConflict();
                var revapi3;

                tpj(document).ready(function() {

                if(tpj('#rev_slider_3_1').revolution == undefined){
                    revslider_showDoubleJqueryError('#rev_slider_3_1');
                }else{
                   revapi3 = tpj('#rev_slider_3_1').show().revolution(
                    {   
                                                dottedOverlay:"none",
                        delay:9000,
                        startwidth:1170,
                        startheight:700,
                        hideThumbs:200,

                        thumbWidth:100,
                        thumbHeight:50,
                        thumbAmount:4,
                        
                                                
                        simplifyAll:"off",

                        navigationType:"bullet",
                        navigationArrows:"solo",
                        navigationStyle:"round",

                        touchenabled:"on",
                        onHoverStop:"off",
                        nextSlideOnWindowFocus:"off",

                        swipe_threshold: 0.7,
                        swipe_min_touches: 1,
                        drag_block_vertical: false,
                        
                                                
                                                
                        keyboardNavigation:"off",

                        navigationHAlign:"center",
                        navigationVAlign:"bottom",
                        navigationHOffset:0,
                        navigationVOffset:20,

                        soloArrowLeftHalign:"left",
                        soloArrowLeftValign:"center",
                        soloArrowLeftHOffset:20,
                        soloArrowLeftVOffset:0,

                        soloArrowRightHalign:"right",
                        soloArrowRightValign:"center",
                        soloArrowRightHOffset:20,
                        soloArrowRightVOffset:0,

                        shadow:0,
                        fullWidth:"on",
                        fullScreen:"off",

                                                spinner:"spinner0",
                                                
                        stopLoop:"off",
                        stopAfterLoops:-1,
                        stopAtSlide:-1,

                        shuffle:"off",

                        autoHeight:"off",
                        forceFullWidth:"off",
                        
                        
                        
                        hideThumbsOnMobile:"off",
                        hideNavDelayOnMobile:1500,
                        hideBulletsOnMobile:"off",
                        hideArrowsOnMobile:"off",
                        hideThumbsUnderResolution:0,

                                                hideSliderAtLimit:0,
                        hideCaptionAtLimit:0,
                        hideAllCaptionAtLilmit:0,
                        startWithSlide:0                    });



                                    }
                }); /*ready*/

(function($,W,D)
{
    var JQUERY4U = {};
 if ($("form[name='contactForm']").length ) {
    JQUERY4U.UTIL =
    {
        setupFormValidation: function()
        {
            //form validation rules
            $("form[name='contactForm']").validate({
                rules: {
                    themeple_name: "required",
                    themeple_message: "required",
                    themeple_subject: "required",
                    themeple_email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    themeple_name: "Please enter your name",
                    themeple_message: "Please enter your Message",
                    themeple_subject: "Please enter the Subject",
                    
                    email: "Please enter a valid email address"
                },
                submitHandler: function(form) {
                     $.ajax({
                        url: 'contact.php',
                        type: 'POST',
                        dataType: "json",
                        data: $(form).serialize(),
                        success: function(response) {
                            $('#ajaxresponse').html(response['info']);
                        }            
                    });
                }
            });
        }
    }
 
    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });
 }
})(jQuery, window, document);


