/*
 Massively by HTML5 UP
 html5up.net | @ajlkn
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */

(function ($) {

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        xxsmall: '(max-width: 360px)'
    });

    /**
     * Applies parallax scrolling to an element's background image.
     * @return {jQuery} jQuery object.
     */
    $.fn._parallax = function (intensity) {

        var $window = $(window),
            $this = $(this);

        if (this.length == 0 || intensity === 0)
            return $this;

        if (this.length > 1) {

            for (var i = 0; i < this.length; i++)
                $(this[i])._parallax(intensity);

            return $this;

        }

        if (!intensity)
            intensity = 0.25;

        $this.each(function () {

            var $t = $(this),
                $bg = $('<div class="bg"></div>').appendTo($t),
                on, off;

            on = function () {

               /* $bg
                    .removeClass('fixed')
                    .css('transform', 'matrix(1,0,0,1,0,0)');

                $window
                    .on('scroll._parallax', function () {

                        var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

                        $bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

                    });*/

            };

            off = function () {

                $bg
                    .addClass('fixed')
                    .css('transform', 'none');

                $window
                    .off('scroll._parallax');

            };

            // Disable parallax on ..
            if (skel.vars.browser == 'ie'		// IE
                || skel.vars.browser == 'edge'		// Edge
                || window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
                || skel.vars.mobile)				// Mobile devices
                off();

            // Enable everywhere else.
            else {

                // skel.on('!large -large', on);
                skel.on('+large', off);

            }

        });

        $window
            .off('load._parallax resize._parallax')
            .on('load._parallax resize._parallax', function () {
                $window.trigger('scroll');
            });

        return $(this);

    };

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $nav = $('#nav'),
            $main = $('#main'),
            $tag = $('.listing-seperator'),
            $banner = $('#banner'),
            $video = $('#banner').find('.video'),
            $navPanelToggle, $navPanel, $navPanelInner;

        // Disable animations/transitions until the page has loaded.
        $window.on('load', function () {
            setTimeout(function () {
                $body.removeClass('is-loading');
            }, 1);
        });

        //获取导航条显示状态
        var navIsShowed = false;
        if (window.innerWidth > 980) {
            navIsShowed = true;
        }
        var navOf = navIsShowed ? $nav.outerHeight() - 1 : 0;

        /*
            page index
        */
        if ($banner.length) {
            //banner显示状态
            if (sessionStorage.getItem('banner-unfirst')) {
                $body.removeClass('hide');
                $banner.remove();
            } else {
                //banner video 资源加载
                var video = $banner.data('src');
                if(!skel.vars.mobile && skel.vars.IEVersion > 9) {
                    $window.on('load', function () {
                        $video.replaceWith($('<video src="' + video + '" autoplay loop muted></video>'));
                    });
                }

                sessionStorage.setItem('banner-unfirst', true);
                var timeId = setInterval(function () {
                    if ($banner.height() <= 3) {
                        $body.removeClass('hide');
                        $banner.remove();
                        clearInterval(timeId);
                    }
                }, 100);
            }
        }

        // index Scrolly.
        $('.scrolly').scrolly({
            speed: 900
        });

        // Intro.
        var $intro = $('#intro');
        if ($intro.length > 0) {

            // Hack: Fix flex min-height on IE.
            if (skel.vars.browser == 'ie') {
                $window.on('resize.ie-intro-fix', function () {

                    var h = $intro.height();

                    if (h > $window.height())
                        $intro.css('height', 'auto');
                    else
                        $intro.css('height', h);

                }).trigger('resize.ie-intro-fix');
            }

            // Hide intro on scroll (> small).
            skel.on('!small -small', function () {

                $main.unscrollex();

                $main.scrollex({
                    mode: 'bottom',
                    top: '25vh',
                    bottom: '-50vh',
                    enter: function () {
                        $intro.addClass('hidden');
                    },
                    leave: function () {
                        $intro.removeClass('hidden');
                    }
                });
            });

            // Hide intro on scroll (<= small).
            skel.on('+small', function () {

                $main.unscrollex();

                $main.scrollex({
                    mode: 'middle',
                    top: '15vh',
                    bottom: '-15vh',
                    enter: function () {
                        $intro.addClass('hidden');
                    },
                    leave: function () {
                        $intro.removeClass('hidden');
                    }
                });

            });

        }

        /*
            page tags
         */
        $tagCloudA = $('#tag_cloud a');
        if ($tagCloudA.length) {
            // Update scrolly links.
            $tagCloudA.scrolly({
                speed: 200,
                offset: navOf
            });

            var $signals = $tag.find('.signal');
            $($tagCloudA).on('click', function() {
                $signals.hide();
                var tagText = this.innerHTML;
                $('#' + tagText).find('.signal').show();
            });

            $goTop = $('.go-top');

            //top scrolly
            $goTop.scrolly({
                speed: 100
            });
        }

        /*
         page post
         */
        $('.go-catalog').scrolly({
            speed: 200,
            offset: navOf
        });
        $('.toc-box a').scrolly({
            speed: 200,
            offset: navOf
        });

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function () {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Background.
        $wrapper._parallax(0.925);

        // Nav Panel.

        // Toggle.
        $navPanelToggle = $(
            '<a href="#navPanel" id="navPanelToggle">Menu</a>'
        )
            .appendTo($wrapper);

        // Change toggle styling once we've scrolled past the header.
        $header.scrollex({
            bottom: '5vh',
            enter: function () {
                $navPanelToggle.removeClass('alt');
            },
            leave: function () {
                $navPanelToggle.addClass('alt');
            }
        });

        // Panel.
        $navPanel = $(
            '<div id="navPanel">' +
            '<nav>' +
            '</nav>' +
            '<a href="#navPanel" class="close"></a>' +
            '</div>'
        )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'right',
                target: $body,
                visibleClass: 'is-navPanel-visible'
            });

        // Get inner.
        $navPanelInner = $navPanel.children('nav');

        // Move nav content on breakpoint change.
        var $navContent = $nav.children();

        skel.on('!medium -medium', function () {

            // NavPanel -> Nav.
            $navContent.appendTo($nav);

            // Flip icon classes.
            $nav.find('.icons, .icon')
                .removeClass('alt');

        });

        skel.on('+medium', function () {

            // Nav -> NavPanel.
            $navContent.appendTo($navPanelInner);

            // Flip icon classes.
            $navPanelInner.find('.icons, .icon')
                .addClass('alt');

        });

        // Hack: Disable transitions on WP.
        if (skel.vars.os == 'wp'
            && skel.vars.osVersion < 10)
            $navPanel
                .css('transition', 'none');


        //导航条在显示的状态下
        if (navIsShowed) {
            //计算距离的初始位置
            var init = $main.offset().top + 50;
            var oldScrollY = init;
            var pre = init;
            //true 下， false 上
            var towards = true;
            var distance = 0;
            $window.on('scroll', function () {
                if ($window.scrollTop() < init) {
                    oldScrollY = pre = init;
                    towards = true;
                    return;
                }
                var newScrollY = $window.scrollTop();
                if (oldScrollY - newScrollY > 0) {
                    if (towards == false) {
                        distance = Math.abs(pre - newScrollY);
                    } else {
                        pre = newScrollY;
                        distance = 0;
                    }
                    towards = false;
                } else if (oldScrollY - newScrollY < 0) {
                    if (towards == true) {
                        distance = Math.abs(pre - newScrollY);
                    } else {
                        pre = newScrollY;
                        distance = 0;
                    }
                    towards = true;
                }
                // console.log(distance, ', pre: ', pre, 'towards: ', towards);
                oldScrollY = newScrollY;
            });


            $window.on('scroll', function () {
                //设置头部导航条的位置
                if (!$nav.hasClass('attach-top') && ($window.scrollTop() >= $main.offset().top - $nav.height())) {
                    $nav.addClass('attach-top');
                } else if ($nav.hasClass('attach-top') && ($window.scrollTop() < $main.offset().top - $nav.height())) {
                    $nav.removeClass('attach-top');
                }

                // 导航条的状态
                if ($window.scrollTop() < init) {
                    $nav.removeClass('hide');
                    return;
                }
                if (towards && distance > 110 && !$nav.hasClass('hide')) {
                    $nav.addClass('hide');
                } else if (!towards && distance > 50 && $nav.hasClass('hide')) {
                    $nav.removeClass('hide');
                }
            });
        }


        //设置小屏幕分页的下拉框点击跳转事件
        $('#select_page').on('change', function () {
            location.assign(this.value);
        });



        //画廊相关
        var $galleryWrapper = $('.gallery-wrapper');
        if ($galleryWrapper.length) {

            //    设置“画廊”
            var $gallery = $('.gallery');
            $gallery.poptrox({
                baseZIndex: 10001,
                useBodyOverflow: false,
                usePopupEasyClose: false,
                overlayColor: '#1f2328',
                overlayOpacity: 0.65,
                usePopupDefaultStyling: false,
                usePopupCaption: false,
                popupLoaderText: '',
                windowMargin: 10,
                usePopupNav: true
            });

            $window.resize(function(){
                /*var wh = $galleryWrapper.width() * (parseInt($galleryWrapper.data('row'))*30 + 1.6)/100;
                $galleryWrapper.css('height', wh);*/
                var h=$gallery.find('a').width() / 5 * 3;
                $gallery.find('a').css('height', h);
            }).trigger('resize');

            // Touch mode.
            skel.on('change', function () {

                if (skel.vars.mobile || skel.breakpoint('small').active)
                    $body.addClass('is-touch');
                else
                    $body.removeClass('is-touch');

            });




            //当鼠标在galler时， 不让BODY滚动
            //计算桌面端的滚动条的宽度
            var $icons = $nav.find('.icons');
            var w = window.innerWidth - document.body.clientWidth;
            var addClass = {
                'margin-right': w,
                'overflow': 'hidden'
            };
            var removeClass = {
                'margin-right': 'auto',
                'overflow': 'auto'
            };

            $galleryWrapper.hover(function () {
                $body.css(addClass);
                if($nav.hasClass('attach-top')){
                    $icons.css({
                        'padding-right': w
                    });
                }
            }, function () {
                $body.css(removeClass);
                if($nav.hasClass('attach-top')) {
                    $icons.css({
                        'padding-right': 0
                    });
                }
            });

            //对移动端修复
            $galleryWrapper.on('touchstart', function () {
                $body.css(addClass);
            });

            $galleryWrapper.on('touchend', function () {
                $body.css(removeClass);
            });

        }

    });

})(jQuery);