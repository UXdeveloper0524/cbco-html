(function ($) {
    "use strict";

    /*---------- On Load ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();

        if (typeof WOW !== "undefined") {
            new WOW().init();
        }
    });

    $(window).on("resize", function () {
        if ($(".slick-slider").length) {
            $(".slick-slider").slick("refresh");
        }
    });

    /*---------- Preloader ----------*/
    if ($(".preloader").length) {
        $(".preloaderCls").on("click", function (e) {
            e.preventDefault();
            $(".preloader").hide();
        });
    }

    /*---------- One Page Navigation ----------*/
    function onePageNav(element) {
        $(element)
            .find("a")
            .on("click", function (e) {
                const target = $($(this).attr("href"));

                if (target.length) {
                    e.preventDefault();

                    $("html, body").animate(
                        {
                            scrollTop: target.offset().top - 10,
                        },
                        500
                    );
                }
            });
    }

    onePageNav(".onepage-nav");

    /*---------- Mobile Menu ----------*/
    $.fn.mobilemenu = function (options) {
        const opt = $.extend(
            {
                menuToggleBtn: ".menu-toggle",
                bodyToggleClass: "body-visible",
                subMenuClass: "submenu-class",
                subMenuParent: "submenu-item-has-children",
                subMenuParentToggle: "active-class",
                meanExpandClass: "mean-expand-class",
                appendElement:
                    '<span class="mean-expand-class"></span>',
                subMenuToggleClass: "menu-open",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            const menu = $(this);

            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                $("." + opt.subMenuClass).each(function () {
                    $(this)
                        .removeClass(opt.subMenuToggleClass)
                        .hide()
                        .parent()
                        .removeClass(opt.subMenuParentToggle);
                });
            }

            menu.find("li").each(function () {
                const submenu = $(this).find("ul");

                submenu
                    .addClass(opt.subMenuClass)
                    .hide()
                    .parent()
                    .addClass(opt.subMenuParent);

                submenu.prev("a").append(opt.appendElement);
            });

            function toggleDropDown(el) {
                const submenu = $(el).next("ul");

                if (submenu.length) {
                    $(el)
                        .parent()
                        .toggleClass(opt.subMenuParentToggle);

                    submenu
                        .slideToggle(opt.toggleSpeed)
                        .toggleClass(opt.subMenuToggleClass);
                }
            }

            menu.on(
                "click",
                "." + opt.meanExpandClass,
                function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                }
            );

            $(opt.menuToggleBtn).on("click", function () {
                menuToggle();
            });

            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };

    $(".mobile-menu-wrapper").mobilemenu();

    /*---------- Sticky Header ----------*/
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 500) {
            $(".sticky-wrapper").addClass("sticky");
        } else {
            $(".sticky-wrapper").removeClass("sticky");
        }
    });

    /*---------- Scroll To Top ----------*/
    if ($(".scroll-top").length) {
        const scrollTopbtn = document.querySelector(".scroll-top");
        const progressPath = document.querySelector(
            ".scroll-top path"
        );

        if (progressPath) {
            const pathLength = progressPath.getTotalLength();

            progressPath.style.strokeDasharray =
                pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;

            const updateProgress = () => {
                const scroll = $(window).scrollTop();
                const height =
                    $(document).height() - $(window).height();

                progressPath.style.strokeDashoffset =
                    pathLength -
                    (scroll * pathLength) / height;
            };

            updateProgress();
            $(window).on("scroll", updateProgress);
        }

        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 50) {
                $(scrollTopbtn).addClass("show");
            } else {
                $(scrollTopbtn).removeClass("show");
            }
        });

        $(scrollTopbtn).on("click", function (e) {
            e.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                500
            );
        });
    }

    /*---------- Global Carousel ----------*/
    $(".global-carousel").each(function () {
        const carousel = $(this);

        function d(name) {
            return carousel.data(name);
        }

        carousel.slick({
            dots: d("dots") || false,
            arrows: d("arrows") || false,
            infinite: d("infinite") !== false,
            autoplay: d("autoplay") !== false,
            speed: d("speed") || 1000,
            slidesToShow: d("slide-show") || 1,
            autoplaySpeed: d("autoplay-speed") || 5000,

            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow:
                            d("lg-slide-show") || 1,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow:
                            d("md-slide-show") || 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow:
                            d("sm-slide-show") || 1,
                    },
                },
            ],
        });
    });

    /*---------- Mission / Vision Filter ----------*/
    $(".filter-active-cat1").imagesLoaded(function () {
        const $grid = $(".filter-active-cat1").isotope({
            itemSelector: ".filter-item",
            filter: ".cat1",
            masonry: {
                columnWidth: 1,
            },
        });

        $(".filter-menu-active").on(
            "click",
            "button",
            function (e) {
                e.preventDefault();

                const filterValue =
                    $(this).attr("data-filter");

                $grid.isotope({
                    filter: filterValue,
                });

                $(this)
                    .addClass("active")
                    .siblings()
                    .removeClass("active");
            }
        );
    });

    /*---------- Shape Mockup ----------*/
    $(".shape-mockup").each(function () {
        $(this)
            .css({
                top: $(this).data("top"),
                right: $(this).data("right"),
                bottom: $(this).data("bottom"),
                left: $(this).data("left"),
            })
            .parent()
            .addClass("shape-mockup-wrap");
    });

    /*---------- Background Images ----------*/
    $("[data-bg-src]").each(function () {
        const src = $(this).attr("data-bg-src");

        $(this)
            .css("background-image", `url(${src})`)
            .addClass("background-image")
            .removeAttr("data-bg-src");
    });

    /*---------- Mask Images ----------*/
    $("[data-mask-src]").each(function () {
        const mask = $(this).attr("data-mask-src");

        $(this)
            .css({
                "mask-image": `url(${mask})`,
                "-webkit-mask-image": `url(${mask})`,
            })
            .addClass("bg-mask")
            .removeAttr("data-mask-src");
    });
})(jQuery);