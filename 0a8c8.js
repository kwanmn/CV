function ace_detect_device_type() {
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (ace.mobile = !0,
    ace.html.addClass("crt-mobile")) : (ace.mobile = !1,
    ace.html.addClass("crt-desktop"))
}
function ace_append_overlay() {
    ace.body.append(ace.overlay.obj),
    ace.overlay.obj[0].style.opacity = 0,
    window.getComputedStyle(ace.overlay.obj[0]).opacity,
    ace.overlay.obj[0].style.opacity = 1
}
function ace_remove_overlay() {
    ace.overlay.obj[0].style.opacity = 0,
    ace.overlay.obj.remove()
}
function ace_lock_scroll() {
    var e = ace.html.outerWidth()
      , t = ace.body.outerHeight()
      , o = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    ace.html.data("scroll-position", o),
    ace.html.data("previous-overflow", ace.html.css("overflow")),
    ace.html.css("overflow", "hidden"),
    window.scrollTo(o[0], o[1]);
    var r = ace.body.outerWidth() - e
      , i = ace.body.outerHeight() - t;
    ace.body.css({
        "margin-right": r,
        "margin-bottom": i
    }),
    ace.html.addClass("crt-lock-scroll")
}
function ace_unlock_scroll() {
    ace.html.css("overflow", ace.html.data("previous-overflow"));
    var e = ace.html.data("scroll-position");
    window.scrollTo(e[0], e[1]),
    ace.body.css({
        "margin-right": 0,
        "margin-bottom": 0
    }),
    ace.html.removeClass("crt-lock-scroll")
}
function ace_open_sidebar() {
    ace.html.addClass("crt-sidebar-opened"),
    ace_append_overlay(),
    ace_lock_scroll()
}
function ace_close_sidebar() {
    ace.html.removeClass("crt-sidebar-opened"),
    ace_remove_overlay(),
    ace_unlock_scroll()
}
function ace_progress_chart(e, t, o, r) {
    void 0 === t && (t = ""),
    new ProgressBar.Circle(e,{
        color: certy.vars.themeColor,
        strokeWidth: 5,
        trailWidth: 0,
        text: {
            value: t,
            className: "progress-text",
            style: {
                top: "50%",
                left: "50%",
                color: certy.progress.textColor,
                position: "absolute",
                margin: 0,
                padding: 0,
                transform: {
                    prefix: !0,
                    value: "translate(-50%, -50%)"
                }
            },
            autoStyleContainer: !0,
            alignToBottom: !0
        },
        svgStyle: {
            display: "block",
            width: "100%"
        },
        duration: r,
        easing: "easeOut"
    }).animate(o)
}
function ace_progress_line(e, t, o, r) {
    void 0 === t && (t = ""),
    new ProgressBar.Line(e,{
        strokeWidth: 4,
        easing: "easeInOut",
        duration: r,
        color: certy.vars.themeColor,
        trailColor: certy.progress.trailColor,
        trailWidth: 4,
        svgStyle: {
            width: "100%",
            height: "100%"
        },
        text: {
            value: t,
            className: "progress-text",
            style: {
                top: "-25px",
                right: "0",
                color: certy.progress.textColor,
                position: "absolute",
                margin: 0,
                padding: 0,
                transform: {
                    prefix: !0,
                    value: "translate(0, 0)"
                }
            },
            autoStyleContainer: !0
        }
    }).animate(o)
}
function ace_is_elem_in_viewport(e, t) {
    var o = e[0].getBoundingClientRect();
    return o.bottom >= 0 && o.right >= 0 && o.top + t <= (window.innerHeight || document.documentElement.clientHeight) && o.left <= (window.innerWidth || document.documentElement.clientWidth)
}
function ace_is_elems_in_viewport(e, t) {
    for (var o = 0; o < e.length; o++) {
        var r = jQuery(e[o]);
        if (r.hasClass("crt-animate") && ace_is_elem_in_viewport(r, t)) {
            if (r.removeClass("crt-animate").addClass("crt-animated"),
            r.hasClass("progress-chart")) {
                var i = r.find(".progress-bar");
                ace_progress_chart(i[0], i.data("text"), i.data("value"), 1e3)
            }
            if (r.hasClass("progress-line")) {
                var a = r.find(".progress-bar");
                ace_progress_line(a[0], a.data("text"), a.data("value"), 1e3)
            }
        }
    }
}
function ace_appear_elems(e, t) {
    ace_is_elems_in_viewport(e, t),
    jQuery(window).scroll(function() {
        ace_is_elems_in_viewport(e, t)
    }),
    jQuery(window).resize(function() {
        ace_is_elems_in_viewport(e, t)
    })
}
function initialiseGoogleMap(e) {
    var t, o = 44.5403, r = -78.5463, i = jQuery("#map"), a = i.get(0), s = jQuery.parseJSON(e);
    i.data("latitude") && (o = i.data("latitude")),
    i.data("longitude") && (r = i.data("longitude")),
    t = new google.maps.LatLng(o,r);
    var n = {
        zoom: 14,
        center: t,
        scrollwheel: !0,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: s
    };
    i = new google.maps.Map(a,n);
    new google.maps.Marker({
        map: i,
        position: t,
        icon: {
            path: "M125 410 c-56 -72 -111 -176 -120 -224 -7 -36 11 -83 49 -124 76 -85 223 -67 270 31 28 60 29 88 6 150 -19 51 -122 205 -148 221 -6 3 -32 -21 -57 -54z m110 -175 c35 -34 33 -78 -4 -116 -35 -35 -71 -37 -105 -7 -40 35 -43 78 -11 116 34 41 84 44 120 7z",
            fillColor: certy_vars_from_WP.themeColor,
            fillOpacity: 1,
            scale: .1,
            strokeColor: certy_vars_from_WP.themeColor,
            strokeWeight: 1,
            anchor: new google.maps.Point(185,500)
        },
        title: "Hello World!"
    });
    google.maps.event.addDomListener(window, "resize", function() {
        i.setCenter(t)
    })
}
var navStiky = !1;
1 == certy_vars_from_WP.enable_sticky && (navStiky = !0);
var certy = {
    vars: {
        rtl: !1,
        themeColor: certy_vars_from_WP.themeColor,
        screenMd: "992px"
    },
    nav: {
        height: "auto",
        arrow: !1,
        sticky: {
            top: "-1px",
            active: navStiky
        },
        tooltip: {
            active: !0
        }
    },
    sideBox: {
        sticky: {
            top: "20px",
            active: !1
        }
    },
    progress: {
        animation: !0,
        textColor: "inherit",
        trailColor: "rgba(0,0,0,0.07)"
    }
};
!function(e, t, o, r) {
    var i = function(r, i) {
        this.elem = r,
        this.$elem = e(r),
        this.options = i,
        this.metadata = this.$elem.data("plugin-options"),
        this.$win = e(t),
        this.sections = {},
        this.didScroll = !1,
        this.$doc = e(o),
        this.docHeight = this.$doc.height()
    };
    i.prototype = {
        defaults: {
            navItems: "a",
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        },
        init: function() {
            return this.config = e.extend({}, this.defaults, this.options, this.metadata),
            this.$nav = this.$elem.find(this.config.navItems),
            "" !== this.config.filter && (this.$nav = this.$nav.filter(this.config.filter)),
            this.$nav.on("click.onePageNav", e.proxy(this.handleClick, this)),
            this.getPositions(),
            this.bindInterval(),
            this.$win.on("resize.onePageNav", e.proxy(this.getPositions, this)),
            this
        },
        adjustNav: function(e, t) {
            e.$elem.find("." + e.config.currentClass).removeClass(e.config.currentClass),
            t.addClass(e.config.currentClass)
        },
        bindInterval: function() {
            var e, t = this;
            t.$win.on("scroll.onePageNav", function() {
                t.didScroll = !0
            }),
            t.t = setInterval(function() {
                e = t.$doc.height(),
                t.didScroll && (t.didScroll = !1,
                t.scrollChange()),
                e !== t.docHeight && (t.docHeight = e,
                t.getPositions())
            }, 250)
        },
        getHash: function(e) {
            return e.attr("href").split("#")[1]
        },
        getPositions: function() {
            var t, o, r, i = this;
            i.$nav.each(function() {
                t = i.getHash(e(this)),
                r = e("#" + t),
                r.length && (o = r.offset().top,
                i.sections[t] = Math.round(o))
            })
        },
        getSection: function(e) {
            var t = null
              , o = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var r in this.sections)
                this.sections[r] - o < e && (t = r);
            return t
        },
        handleClick: function(o) {
            var r = this
              , i = e(o.currentTarget)
              , a = i.parent()
              , s = "#" + r.getHash(i);
            a.hasClass(r.config.currentClass) || (r.config.begin && r.config.begin(),
            r.adjustNav(r, a),
            r.unbindInterval(),
            r.scrollTo(s, function() {
                r.config.changeHash && (history.pushState ? history.pushState(null, null, s) : t.location.hash = s),
                r.bindInterval(),
                r.config.end && r.config.end()
            })),
            o.preventDefault()
        },
        scrollChange: function() {
            var e, t = this.$win.scrollTop(), o = this.getSection(t);
            null !== o && (e = this.$elem.find('a[href$="#' + o + '"]').parent(),
            e.hasClass(this.config.currentClass) || (this.adjustNav(this, e),
            this.config.scrollChange && this.config.scrollChange(e)))
        },
        scrollTo: function(t, o) {
            var r = e(t).offset().top;
            e(t).closest(".crt-paper-layers").hasClass("crt-animate") ? r -= 145 : r -= 45,
            e("html, body").animate({
                scrollTop: r
            }, this.config.scrollSpeed, this.config.easing, o)
        },
        unbindInterval: function() {
            clearInterval(this.t),
            this.$win.unbind("scroll.onePageNav")
        }
    },
    i.defaults = i.prototype.defaults,
    e.fn.onePageNav = function(e) {
        return this.each(function() {
            new i(this,e).init()
        })
    }
}(jQuery, window, document),
certy.initGlobalVars = function() {
    this.vars.html = jQuery("html"),
    this.vars.body = jQuery("body"),
    this.vars.footer = jQuery("#crtFooter"),
    this.vars.windowW = jQuery(window).width(),
    this.vars.windowH = jQuery(window).height(),
    this.vars.windowScrollTop = jQuery(window).scrollTop(),
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (this.vars.mobile = !0,
    this.vars.html.addClass("mobile")) : (this.vars.mobile = !1,
    this.vars.html.addClass("desktop"))
}
,
certy.lockScroll = function() {
    var e = certy.vars.html.outerWidth()
      , t = certy.vars.body.outerHeight()
      , o = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
    certy.vars.html.data("scroll-position", o),
    certy.vars.html.data("previous-overflow", certy.vars.html.css("overflow")),
    certy.vars.html.css("overflow", "hidden"),
    window.scrollTo(o[0], o[1]);
    var r = certy.vars.body.outerWidth() - e
      , i = certy.vars.body.outerHeight() - t;
    certy.vars.body.css({
        "margin-right": r,
        "margin-bottom": i
    }),
    certy.vars.html.addClass("lock-scroll")
}
,
certy.unlockScroll = function() {
    certy.vars.html.css("overflow", certy.vars.html.data("previous-overflow"));
    var e = certy.vars.html.data("scroll-position");
    window.scrollTo(e[0], e[1]),
    certy.vars.body.css({
        "margin-right": 0,
        "margin-bottom": 0
    }),
    certy.vars.html.removeClass("lock-scroll")
}
,
certy.nav.initScroll = function(e) {
    e.height(e.height()).animate({
        height: certy.nav.height
    }, 700, function() {
        e.mCustomScrollbar({
            axis: "y",
            scrollbarPosition: "outside"
        })
    }),
    certy.nav.arrow && (jQuery("#crtNavTools").removeClass("hidden"),
    jQuery("#crtNavArrow").on("click", function() {
        e.mCustomScrollbar("scrollTo", "-=" + certy.nav.height)
    }))
}
,
certy.nav.exists = !1,
certy.nav.makeSticky = function() {
    this.sticky.active && !certy.vars.mobile && Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && (this.exists ? certy.vars.windowScrollTop > this.wrap.offset().top ? this.el.css({
        top: this.sticky.top,
        left: this.wrap.offset().left,
        width: this.wrap.width(),
        bottom: "auto",
        position: "fixed"
    }) : this.el.css({
        top: "0",
        left: "auto",
        width: "auto",
        bottom: "auto",
        position: "relative"
    }) : (this.el = jQuery("#crtNavInner"),
    this.wrap = jQuery("#crtNavWrap"),
    this.el.length > 0 && this.wrap.length > 0 && (this.exists = !0)))
}
,
certy.nav.tooltip.el = "",
certy.nav.tooltip.timer = 0,
certy.nav.tooltip.show = function(e) {
    certy.nav.tooltip.timer = setTimeout(function() {
        certy.nav.tooltip.el = jQuery('<div class="crt-tooltip"></div>');
        var t = e.offset().top
          , o = e.offset().left
          , r = o + e.outerWidth();
        e.outerWidth();
        certy.vars.body.append(certy.nav.tooltip.el),
        certy.nav.tooltip.el.text(e.data("tooltip")),
        r + certy.nav.tooltip.el.outerWidth() < certy.vars.windowW ? certy.nav.tooltip.el.addClass("arrow-left").css({
            left: r + "px",
            top: t + 4 + "px"
        }) : certy.nav.tooltip.el.addClass("arrow-right text-right").css({
            left: o - certy.nav.tooltip.el.outerWidth() - 10 + "px",
            top: t + 4 + "px"
        }),
        certy.nav.tooltip.el.fadeIn(150)
    }, 150)
}
,
certy.nav.tooltip.hide = function() {
    clearTimeout(certy.nav.tooltip.timer),
    certy.nav.tooltip.el.length > 0 && certy.nav.tooltip.el.fadeOut(150, function() {
        certy.nav.tooltip.el.remove()
    })
}
,
certy.sideBox.exists = !1,
certy.sideBox.makeSticky = function() {
    this.sticky.active && !certy.vars.mobile && Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && (this.exists ? certy.vars.windowScrollTop > this.wrap.offset().top ? this.el.css({
        top: this.sticky.top,
        left: this.wrap.offset().left,
        width: this.wrap.width(),
        bottom: "auto",
        position: "fixed"
    }) : this.el.css({
        top: "0",
        left: "auto",
        width: "auto",
        bottom: "auto",
        position: "relative"
    }) : (this.el = jQuery("#crtSideBox"),
    this.wrap = jQuery("#crtSideBoxWrap"),
    this.el.length > 0 && this.wrap.length > 0 && (this.exists = !0)))
}
,
certy.slider = function(e) {
    for (var t = 0; t < e.length; t++)
        "none" != jQuery(e[t]).data("init") && jQuery(e[t]).slick()
}
,
certy.carousel = function(e) {
    for (var t = 0; t < e.length; t++)
        "none" !== jQuery(e[t]).data("init") && jQuery(e[t]).slick({
            dots: !0
        })
}
,
certy.portfolio = {
    popupSlider: "",
    popupCarousel: "",
    currentEmbed: !1,
    currentEmbedType: !1,
    initGrid: function(e) {
        var t = e.isotope({
            isOriginLeft: !certy.vars.rtl,
            itemSelector: ".pf-grid-item",
            percentPosition: !0,
            masonry: {
                columnWidth: ".pf-grid-sizer"
            }
        });
        t.imagesLoaded().progress(function() {
            t.isotope("layout")
        });
        var o = e.closest(".pf-wrap").find(".pf-filter");
        if (o.length > 0) {
            var r = o.find("button");
            jQuery(".pf-filter button:first-child").addClass("active"),
            r.on("click", function() {
                r.removeClass("active"),
                jQuery(this).addClass("active");
                var e = jQuery(this).attr("data-filter");
                t.isotope({
                    filter: e
                })
            })
        }
    },
    openPopup: function(e) {
        certy.vars.html.addClass("crt-pf-popup-opened"),
        this.popup_wrapper = jQuery('<div id="pf-popup-wrap"><button id="pf-popup-close"><i class="crt-icon crt-icon-close"></i></button><div class="pf-popup-inner"><div class="pf-popup-middle"><div class="pf-popup-container"><button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button><div id="pf-popup-content" class="pf-popup-content"></div></div></div></div></div>'),
        certy.vars.body.append(this.popup_wrapper),
        this.popup_content = jQuery("#pf-popup-content"),
        this.popup_content.append(e.clone()),
        this.popupSlider = jQuery("#pf-popup-content .pf-popup-media"),
        this.popupSlider.on("init", function(e, t) {
            certy.portfolio.loadEmbed(0),
            jQuery(window).trigger("resize")
        }),
        this.popupSlider.on("beforeChange", function(e, t, o, r) {
            if (certy.portfolio.currentEmbed && certy.portfolio.currentEmbedType)
                switch (certy.portfolio.currentEmbedType) {
                case "iframe":
                    var i = certy.portfolio.currentEmbed.find("iframe");
                    i.attr("src", i.attr("src"));
                    break;
                case "video":
                    certy.portfolio.currentEmbed.find("video")[0].pause()
                }
            certy.portfolio.loadEmbed(r)
        }),
        this.popupSlider.slick({
            speed: 500,
            dots: !1,
            arrow: !0,
            infinite: !1,
            slidesToShow: 1,
            adaptiveHeight: !0
        }),
        this.popupCarousel = jQuery("#pf-popup-content .pf-rel-carousel"),
        this.popupCarousel.slick({
            dots: !1,
            infinite: !0,
            slidesToShow: 3,
            slidesToScroll: 3,
            lazyLoad: "ondemand"
        }),
        this.popup_wrapper.addClass("pf-opened"),
        certy.lockScroll()
    },
    closePopup: function(e) {
        certy.vars.html.removeClass("cr-portfolio-opened"),
        this.popup_wrapper.removeClass("pf-opened"),
        setTimeout(function() {
            certy.portfolio.popup_wrapper.remove(),
            certy.unlockScroll()
        }, 500)
    },
    loadEmbed: function(e) {
        var t = jQuery('#pf-popup-content .pf-popup-slide[data-slick-index="' + e + '"]').find(".pf-popup-embed")
          , o = jQuery.trim(t.data("type"))
          , r = jQuery.trim(t.data("url"));
        if (certy.portfolio.currentEmbed = t,
        certy.portfolio.currentEmbedType = o,
        !t.hasClass("pf-embed-loaded") && void 0 !== o && !1 !== o && "" !== o && void 0 !== r && !1 !== r && "" !== r) {
            var i = jQuery.trim(t.data("width"))
              , a = jQuery.trim(t.data("height"));
            switch (void 0 !== i && !1 !== i && "" !== i && void 0 !== a && !1 !== a && "" !== a && t.css({
                "padding-top": a / i * 100 + "%"
            }),
            o) {
            case "image":
                t.addClass("pf-embed-image");
                var s = jQuery("<img/>", {
                    src: r,
                    style: "display:none"
                }).load(function() {
                    jQuery(this).fadeIn(500),
                    t.addClass("pf-embed-loaded")
                }).error(function() {
                    t.addClass("pf-embed-error")
                });
                t.empty().append(s);
                break;
            case "iframe":
                t.addClass("pf-embed-iframe");
                var n = jQuery("<iframe/>", {
                    src: r,
                    style: "display:none",
                    allowfullscreen: ""
                }).load(function() {
                    jQuery(this).fadeIn(500),
                    t.addClass("pf-embed-loaded")
                }).error(function() {
                    t.addClass("pf-embed-error")
                });
                t.empty().append(n);
                break;
            case "video":
                t.addClass("pf-embed-video");
                var c = this.parseOptions(r)
                  , l = "<video ";
                c.poster && (l += 'poster="' + c.poster + '" '),
                l += 'controls="controls" preload="yes">',
                c.mp4 && (l += '<source type="video/mp4" src="' + c.mp4 + '"/>'),
                c.webm && (l += '<source type="video/webm" src="' + c.webm + '"/>'),
                c.ogv && (l += '<source type="video/ogg" src="' + c.ogv + '"/>'),
                l += "Your browser does not support the video tag.</video>",
                t.empty().append(jQuery(l))
            }
        }
    },
    parseOptions: function(e) {
        var t, o, r, i, a, s, n, c = {};
        for (a = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","),
        n = 0,
        s = a.length; n < s && (o = a[n],
        -1 === o.search(/^(http|https|ftp):\/\//) && -1 !== o.search(":")); n++)
            t = o.indexOf(":"),
            r = o.substring(0, t),
            i = o.substring(t + 1),
            i || (i = void 0),
            "string" == typeof i && (i = "true" === i || "false" !== i && i),
            "string" == typeof i && (i = isNaN(i) ? i : +i),
            c[r] = i;
        return null == r && null == i ? e : c
    }
},
function(e) {
    "use strict";
    e(function() {
        certy.initGlobalVars(),
        certy.vars.body.hasClass("crt-nav-on") && (Modernizr.mq("(min-width: " + certy.vars.screenMd + ")") && "auto" !== certy.nav.height && certy.nav.initScroll(e("#crtNavScroll")),
        certy.nav.makeSticky(),
        certy.nav.tooltip.active && e("#crtNav a").hover(function() {
            certy.nav.tooltip.show(e(this))
        }, function() {
            certy.nav.tooltip.hide()
        }),
        e("#crtNav").onePageNav({
            changeHash: !0,
            scrollThreshold: .5,
            filter: ":not(.external)"
        })),
        certy.sideBox.makeSticky();
        var t = e(".pf-grid");
        if (t.length > 0) {
            for (var o = 0; o < t.length; o++)
                certy.portfolio.initGrid(e(t[o]));
            e(document).on("click", ".pf-project", function() {
                var link = e(this).data('href');
                window.open(link);
            }),
            e(document).on("click", ".pf-rel-href", function() {
                var t = e(this).attr("href");
                if (-1 != t.indexOf("#"))
                    return certy.portfolio.closePopup(),
                    setTimeout(function() {
                        certy.portfolio.openPopup(e(t))
                    }, 500),
                    !1
            }),
            e(document).on("click", "#pf-popup-close", function() {
                certy.portfolio.closePopup()
            }),
            e(document).on("touchstart click", ".crt-pf-popup-opened #pf-popup-wrap", function(t) {
                var o = e("#pf-popup-content");
                o.is(t.target) || 0 !== o.has(t.target).length || certy.portfolio.closePopup()
            })
        }
        certy.slider(e(".cr-slider")),
        certy.carousel(e(".cr-carousel"));
        var r = e("#crtBtnUp");
        r.length > 0 && (e(window).scrollTop() > 100 ? r.show(0) : r.hide(0),
        e(window).scroll(function() {
            e(this).scrollTop() > 100 ? r.show(0) : r.hide(0)
        }),
        r.on("click", function() {
            return e("html, body").animate({
                scrollTop: 0
            }, 800),
            !1
        }))
    }),
    e(window).on("resize", function() {
        certy.vars.windowW = e(window).width(),
        certy.vars.windowH = e(window).height(),
        certy.vars.windowScrollTop = e(window).scrollTop(),
        certy.nav.makeSticky(),
        certy.sideBox.makeSticky()
    }),
    e(window).on("scroll", function() {
        certy.vars.windowScrollTop = e(window).scrollTop(),
        certy.nav.makeSticky(),
        certy.sideBox.makeSticky(),
        certy.nav.tooltip.el.length > 0 && certy.nav.tooltip.el.remove()
    }),
    e(window).on("load", function() {})
}(jQuery);
var ace = {
    html: "",
    body: "",
    mobile: "",
    sidebar: {
        obj: "",
        btn: ""
    },
    nav: {
        obj: "",
        tooltip: jQuery('<div class="crt-tooltip"></div>')
    },
    overlay: {
        obj: jQuery('<div id="crtOverlay"></div>')
    },
    progress: {
        lines: "",
        charts: "",
        bullets: ""
    }
};
!function(e) {
    "use strict";
    e(function() {
        if (ace.html = e("html"),
        ace.body = e("body"),
        ace_detect_device_type(),
        e("#crtMainNavSm .menu-item-has-children > a").on("click touchstart", function() {
            return !!e(this).hasClass("hover") || (e(this).addClass("hover"),
            e(this).next().slideDown(500),
            !1)
        }),
        ace.sidebar.obj = e("#crtSidebar"),
        ace.sidebar.btn = e("#crtSidebarBtn"),
        ace.sidebar.btn.on("touchstart click", function() {
            ace_open_sidebar()
        }),
        e(document).on("touchstart click", ".crt-sidebar-opened #crtOverlay", function(e) {
            var t = ace.sidebar.obj;
            t.is(e.target) || 0 !== t.has(e.target).length || ace_close_sidebar()
        }),
        e("#crtSidebarClose").on("click", function() {
            ace_close_sidebar()
        }),
        e("#crtSidebarInner").mCustomScrollbar({
            axis: "y",
            theme: "minimal-dark",
            autoHideScrollbar: !0,
            scrollButtons: {
                enable: !0
            }
        }),
        !certy.progress.animation || ace.mobile) {
            ace.progress.charts = e(".progress-chart .progress-bar");
            for (var t = 0; t < ace.progress.charts.length; t++) {
                var o = e(ace.progress.charts[t]);
                ace_progress_chart(o[0], o.data("text"), o.data("value"), 1)
            }
            ace.progress.lines = e(".progress-line .progress-bar");
            for (var t = 0; t < ace.progress.lines.length; t++) {
                var r = e(ace.progress.lines[t]);
                ace_progress_line(r[0], r.data("text"), r.data("value"), 1)
            }
        }
        certy.progress.animation && !ace.mobile && ace_appear_elems(e(".crt-animate"), 0),
        e("pre").each(function(e, t) {
            hljs.highlightBlock(t)
        }),
        e(".alert .close").on("click", function() {
            var t = e(this).parent();
            t.fadeOut(500, function() {
                t.remove()
            })
        }),
        e(".slider").slick({
            dots: !0
        }),
        e("#map").length > 0 && initialiseGoogleMap(certy_vars_from_WP.mapStyles);
        var i = e(".tabs-menu>li.active");
        if (i.length > 0)
            for (var t = 0; t < i.length; t++) {
                var a = e(i[t]).children().attr("href");
                e(a).addClass("active").show()
            }
        e(".tabs-menu a").on("click", function(t) {
            var o = e(this)
              , r = o.attr("href")
              , i = o.closest(".tabs")
              , a = i.find(".tab-content");
            o.parent().addClass("active"),
            o.parent().siblings().removeClass("active"),
            a.not(r).removeClass("active").hide(),
            e(r).addClass("active").fadeIn(500),
            t.preventDefault()
        });
        var s = e(".togglebox>li.active");
        s.length > 0 && s.find(".togglebox-content").show(),
        e(".togglebox-header").on("click", function() {
            var t = e(this);
            t.next(".togglebox-content").slideToggle(300),
            t.parent().toggleClass("active")
        });
        var n = e(".accordion>li.active");
        n.length > 0 && n.find(".accordion-content").show(),
        e(".accordion-header").on("click", function() {
            var t = e(this)
              , o = t.parent()
              , r = t.next()
              , i = t.closest(".accordion").find(".accordion-content");
            o.hasClass("active") ? (o.removeClass("active"),
            r.slideUp()) : (o.siblings().removeClass("active"),
            o.addClass("active"),
            i.slideUp(300),
            r.slideDown(300))
        }),
        e(".comment-replys-link").on("click", function() {
            return e(this).closest(".comment").toggleClass("show-replies"),
            !1
        });
        var c = {};
        c.wrapper = null,
        c.content = null,
        c.slider = null,
        c.open = function(t) {
            this.wrapper = e('<div id="pf-popup-wrap" class="pf-popup-wrap"><div class="pf-popup-inner"><div class="pf-popup-middle"><div class="pf-popup-container"><button id="pf-popup-close"><i class="rsicon rsicon-close"></i></button><div id="pf-popup-content" class="pf-popup-content"></div></div></div></div>'),
            ace.body.append(this.wrapper),
            this.content = e("#pf-popup-content"),
            this.content.append(t.clone()),
            c.wrapper.addClass("opened"),
            ace_lock_scroll()
        }
        ,
        c.close = function() {
            this.wrapper.removeClass("opened"),
            setTimeout(function() {
                c.wrapper.remove(),
                ace_unlock_scroll()
            }, 500)
        }
        ,
        e(document).on("click", ".pf-btn-view", function() {
            var t = e(this).attr("href");
            return c.open(e(t)),
            ace.html.addClass("crt-portfolio-opened"),
            !1
        }),
        e(document).on("touchstart click", ".crt-portfolio-opened #pf-popup-wrap", function(t) {
            var o = e("#pf-popup-content");
            o.is(t.target) || 0 !== o.has(t.target).length || (c.close(),
            ace.html.removeClass("crt-portfolio-opened"))
        }),
        e(".toggle-link").on("click", function() {
            var t = e(this).attr("href");
            return e(this).hasClass("opened") ? (e(t).slideUp(500),
            e(this).removeClass("opened")) : (e(t).slideDown(500),
            e(this).addClass("opened")),
            !1
        }),
        e(".share-btn").on("mouseenter", function() {
            e(this).parent().addClass("hovered")
        }),
        e(".share-box").on("mouseleave", function() {
            var t = e(this);
            t.hasClass("hovered") && (t.addClass("closing"),
            setTimeout(function() {
                t.removeClass("hovered"),
                t.removeClass("closing")
            }, 300))
        })
    })
}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9mdW5jdGlvbnMuanMiLCJvcHRpb25zLmpzIiwib25lLXBhZ2UtbmF2LmpzIiwiX25hdi5qcyIsIl9zaWRlLWJveC5qcyIsIl9zbGlkZXIuanMiLCJfcG9ydGZvbGlvLmpzIiwibWFpbi5qcyIsInRoZW1lLmpzIl0sIm5hbWVzIjpbImFjZV9kZXRlY3RfZGV2aWNlX3R5cGUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiYWNlIiwibW9iaWxlIiwiaHRtbCIsImFkZENsYXNzIiwiYWNlX2FwcGVuZF9vdmVybGF5IiwiYm9keSIsImFwcGVuZCIsIm92ZXJsYXkiLCJvYmoiLCJzdHlsZSIsIm9wYWNpdHkiLCJ3aW5kb3ciLCJnZXRDb21wdXRlZFN0eWxlIiwiYWNlX3JlbW92ZV9vdmVybGF5IiwicmVtb3ZlIiwiYWNlX2xvY2tfc2Nyb2xsIiwiaW5pdFdpZHRoIiwib3V0ZXJXaWR0aCIsImluaXRIZWlnaHQiLCJvdXRlckhlaWdodCIsInNjcm9sbFBvc2l0aW9uIiwic2VsZiIsInBhZ2VYT2Zmc2V0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzY3JvbGxMZWZ0IiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUb3AiLCJkYXRhIiwiY3NzIiwic2Nyb2xsVG8iLCJtYXJnaW5SIiwibWFyZ2luQiIsIm1hcmdpbi1yaWdodCIsIm1hcmdpbi1ib3R0b20iLCJhY2VfdW5sb2NrX3Njcm9sbCIsInJlbW92ZUNsYXNzIiwiYWNlX29wZW5fc2lkZWJhciIsImFjZV9jbG9zZV9zaWRlYmFyIiwiYWNlX3Byb2dyZXNzX2NoYXJ0IiwiZWxlbWVudCIsInRleHQiLCJ2YWx1ZSIsImR1cmF0aW9uIiwiUHJvZ3Jlc3NCYXIiLCJDaXJjbGUiLCJjb2xvciIsImNlcnR5IiwidmFycyIsInRoZW1lQ29sb3IiLCJzdHJva2VXaWR0aCIsInRyYWlsV2lkdGgiLCJjbGFzc05hbWUiLCJ0b3AiLCJsZWZ0IiwicHJvZ3Jlc3MiLCJ0ZXh0Q29sb3IiLCJwb3NpdGlvbiIsIm1hcmdpbiIsInBhZGRpbmciLCJ0cmFuc2Zvcm0iLCJwcmVmaXgiLCJhdXRvU3R5bGVDb250YWluZXIiLCJhbGlnblRvQm90dG9tIiwic3ZnU3R5bGUiLCJkaXNwbGF5Iiwid2lkdGgiLCJlYXNpbmciLCJhbmltYXRlIiwiYWNlX3Byb2dyZXNzX2xpbmUiLCJMaW5lIiwidHJhaWxDb2xvciIsImhlaWdodCIsInJpZ2h0IiwiYWNlX2lzX2VsZW1faW5fdmlld3BvcnQiLCJlbCIsInZwYXJ0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsImlubmVySGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiaW5uZXJXaWR0aCIsImNsaWVudFdpZHRoIiwiYWNlX2lzX2VsZW1zX2luX3ZpZXdwb3J0IiwiZWxlbXMiLCJpIiwibGVuZ3RoIiwiaXRlbSIsImpRdWVyeSIsImhhc0NsYXNzIiwiY2hhcnQiLCJmaW5kIiwibGluZSIsImFjZV9hcHBlYXJfZWxlbXMiLCJzY3JvbGwiLCJyZXNpemUiLCJpbml0aWFsaXNlR29vZ2xlTWFwIiwibWFwU3R5bGVzIiwibGF0bG5nIiwibGF0IiwibG5nIiwibWFwIiwibWFwQ2FudmFzIiwiZ2V0IiwibWFwX3N0eWxlcyIsInBhcnNlSlNPTiIsImdvb2dsZSIsIm1hcHMiLCJMYXRMbmciLCJtYXBPcHRpb25zIiwiem9vbSIsImNlbnRlciIsInNjcm9sbHdoZWVsIiwibWFwVHlwZUlkIiwiTWFwVHlwZUlkIiwiUk9BRE1BUCIsInN0eWxlcyIsIk1hcCIsIk1hcmtlciIsImljb24iLCJwYXRoIiwiZmlsbENvbG9yIiwiY2VydHlfdmFyc19mcm9tX1dQIiwiZmlsbE9wYWNpdHkiLCJzY2FsZSIsInN0cm9rZUNvbG9yIiwic3Ryb2tlV2VpZ2h0IiwiYW5jaG9yIiwiUG9pbnQiLCJ0aXRsZSIsImV2ZW50IiwiYWRkRG9tTGlzdGVuZXIiLCJzZXRDZW50ZXIiLCJuYXZTdGlreSIsImVuYWJsZV9zdGlja3kiLCJydGwiLCJzY3JlZW5NZCIsIm5hdiIsImFycm93Iiwic3RpY2t5IiwiYWN0aXZlIiwidG9vbHRpcCIsInNpZGVCb3giLCJhbmltYXRpb24iLCIkIiwidW5kZWZpbmVkIiwiT25lUGFnZU5hdiIsImVsZW0iLCJvcHRpb25zIiwidGhpcyIsIiRlbGVtIiwibWV0YWRhdGEiLCIkd2luIiwic2VjdGlvbnMiLCJkaWRTY3JvbGwiLCIkZG9jIiwiZG9jSGVpZ2h0IiwicHJvdG90eXBlIiwiZGVmYXVsdHMiLCJuYXZJdGVtcyIsImN1cnJlbnRDbGFzcyIsImNoYW5nZUhhc2giLCJmaWx0ZXIiLCJzY3JvbGxTcGVlZCIsInNjcm9sbFRocmVzaG9sZCIsImJlZ2luIiwiZW5kIiwic2Nyb2xsQ2hhbmdlIiwiaW5pdCIsImNvbmZpZyIsImV4dGVuZCIsIiRuYXYiLCJvbiIsInByb3h5IiwiaGFuZGxlQ2xpY2siLCJnZXRQb3NpdGlvbnMiLCJiaW5kSW50ZXJ2YWwiLCJhZGp1c3ROYXYiLCIkcGFyZW50IiwidCIsInNldEludGVydmFsIiwiZ2V0SGFzaCIsIiRsaW5rIiwiYXR0ciIsInNwbGl0IiwibGlua0hyZWYiLCJ0b3BQb3MiLCIkdGFyZ2V0IiwiZWFjaCIsIm9mZnNldCIsIk1hdGgiLCJyb3VuZCIsImdldFNlY3Rpb24iLCJ3aW5kb3dQb3MiLCJyZXR1cm5WYWx1ZSIsIndpbmRvd0hlaWdodCIsInNlY3Rpb24iLCJlIiwiY3VycmVudFRhcmdldCIsInBhcmVudCIsIm5ld0xvYyIsInVuYmluZEludGVydmFsIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImxvY2F0aW9uIiwiaGFzaCIsInByZXZlbnREZWZhdWx0Iiwid2luZG93VG9wIiwidGFyZ2V0IiwiY2FsbGJhY2siLCJjbG9zZXN0IiwiY2xlYXJJbnRlcnZhbCIsInVuYmluZCIsImZuIiwib25lUGFnZU5hdiIsImluaXRHbG9iYWxWYXJzIiwiZm9vdGVyIiwid2luZG93VyIsIndpbmRvd0giLCJ3aW5kb3dTY3JvbGxUb3AiLCJsb2NrU2Nyb2xsIiwidW5sb2NrU2Nyb2xsIiwiaW5pdFNjcm9sbCIsIm1DdXN0b21TY3JvbGxiYXIiLCJheGlzIiwic2Nyb2xsYmFyUG9zaXRpb24iLCJleGlzdHMiLCJtYWtlU3RpY2t5IiwiTW9kZXJuaXpyIiwibXEiLCJ3cmFwIiwidGltZXIiLCJzaG93IiwiY3VycmVudCIsInNldFRpbWVvdXQiLCJmYWRlSW4iLCJoaWRlIiwiY2xlYXJUaW1lb3V0IiwiZmFkZU91dCIsInNsaWRlciIsInNsaWNrIiwiY2Fyb3VzZWwiLCJkb3RzIiwicG9ydGZvbGlvIiwicG9wdXBTbGlkZXIiLCJwb3B1cENhcm91c2VsIiwiY3VycmVudEVtYmVkIiwiY3VycmVudEVtYmVkVHlwZSIsImluaXRHcmlkIiwiZ3JpZCIsImlzb3RvcGUiLCJpc09yaWdpbkxlZnQiLCJpdGVtU2VsZWN0b3IiLCJwZXJjZW50UG9zaXRpb24iLCJtYXNvbnJ5IiwiY29sdW1uV2lkdGgiLCJpbWFnZXNMb2FkZWQiLCJmaWx0ZXJfYnRuIiwiZmlsdGVyVmFsdWUiLCJvcGVuUG9wdXAiLCJwb3B1cF93cmFwcGVyIiwicG9wdXBfY29udGVudCIsImNsb25lIiwibG9hZEVtYmVkIiwidHJpZ2dlciIsImN1cnJlbnRTbGlkZSIsIm5leHRTbGlkZSIsImlmcmFtZSIsInBhdXNlIiwic3BlZWQiLCJpbmZpbml0ZSIsInNsaWRlc1RvU2hvdyIsImFkYXB0aXZlSGVpZ2h0Iiwic2xpZGVzVG9TY3JvbGwiLCJsYXp5TG9hZCIsImNsb3NlUG9wdXAiLCJzbGlkZUluZGV4IiwidHJpbSIsImN1cmVudEVtYmVkVXJsIiwiZW1iZWRXIiwiZW1iZWRIIiwicGFkZGluZy10b3AiLCJpbWciLCJzcmMiLCJsb2FkIiwiZXJyb3IiLCJlbXB0eSIsImFsbG93ZnVsbHNjcmVlbiIsInZpZGVvT3B0aW9ucyIsInBhcnNlT3B0aW9ucyIsInZpZGVvIiwicG9zdGVyIiwibXA0Iiwid2VibSIsIm9ndiIsInN0ciIsImRlbGltaXRlckluZGV4Iiwib3B0aW9uIiwicHJvcCIsInZhbCIsImFyciIsImxlbiIsInJlcGxhY2UiLCJzZWFyY2giLCJpbmRleE9mIiwic3Vic3RyaW5nIiwiaXNOYU4iLCJob3ZlciIsInBmX2dyaWQiLCJpZCIsImhyZWYiLCJjb250YWluZXIiLCJpcyIsImhhcyIsIiRidG5TY3JvbGxUb3AiLCJzaWRlYmFyIiwiYnRuIiwibGluZXMiLCJjaGFydHMiLCJidWxsZXRzIiwibmV4dCIsInNsaWRlRG93biIsInRoZW1lIiwiYXV0b0hpZGVTY3JvbGxiYXIiLCJzY3JvbGxCdXR0b25zIiwiZW5hYmxlIiwiYmxvY2siLCJobGpzIiwiaGlnaGxpZ2h0QmxvY2siLCJhbGVydCIsInRhYkFjdGl2ZSIsInRhYl9pZCIsImNoaWxkcmVuIiwidGFiIiwidGFiX3dyYXAiLCJ0YWJfY29udGVudCIsInNpYmxpbmdzIiwibm90IiwidG9nZ2xlYm94QWN0aXZlIiwidG9nZ2xlX2hlYWQiLCJzbGlkZVRvZ2dsZSIsInRvZ2dsZUNsYXNzIiwiYWNjb3JkZW9uQWN0aXZlIiwiYWNjX2hlYWQiLCJhY2Nfc2VjdGlvbiIsImFjY19jb250ZW50IiwiYWNjX2FsbF9jb250ZW50cyIsInNsaWRlVXAiLCJwZl9wb3B1cCIsIndyYXBwZXIiLCJjb250ZW50Iiwib3BlbiIsImNsb3NlIiwic2hhcmVfYm94Il0sIm1hcHBpbmdzIjoiQUFrRUEsUUFBQUEsMEJBQ0EsaUVBQUFDLEtBQUFDLFVBQUFDLFlBQ0FDLElBQUFDLFFBQUEsRUFDQUQsSUFBQUUsS0FBQUMsU0FBQSxnQkFFQUgsSUFBQUMsUUFBQSxFQUNBRCxJQUFBRSxLQUFBQyxTQUFBLGdCQUtBLFFBQUFDLHNCQUNBSixJQUFBSyxLQUFBQyxPQUFBTixJQUFBTyxRQUFBQyxLQUdBUixJQUFBTyxRQUFBQyxJQUFBLEdBQUFDLE1BQUFDLFFBQUEsRUFHQUMsT0FBQUMsaUJBQUFaLElBQUFPLFFBQUFDLElBQUEsSUFBQUUsUUFHQVYsSUFBQU8sUUFBQUMsSUFBQSxHQUFBQyxNQUFBQyxRQUFBLEVBR0EsUUFBQUcsc0JBRUFiLElBQUFPLFFBQUFDLElBQUEsR0FBQUMsTUFBQUMsUUFBQSxFQUdBVixJQUFBTyxRQUFBQyxJ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QUFLLEtBRUE0TSxHQUFBeFEsU0FBQSxhQUNBd1EsRUFBQS9WLFNBQUEsV0FDQXdPLFdBQUEsV0FDQXVILEVBQUE5VCxZQUFBLFdBQ0E4VCxFQUFBOVQsWUFBQSxZQUNBLFdBS0FxRCIsImZpbGUiOiJ0aGVtZS5taW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENlcnR5IEZ1bmN0aW9uc1xuICovXG5cbi8qIEluaXQgR2xvYmFsIFZhcmlhYmxlcyAqL1xuY2VydHkuaW5pdEdsb2JhbFZhcnMgPSBmdW5jdGlvbigpe1xuICAgIC8vIGdldCBkb2N1bWVudCA8aHRtbD5cbiAgICB0aGlzLnZhcnMuaHRtbCA9IGpRdWVyeSgnaHRtbCcpO1xuXG4gICAgLy8gZ2V0IGRvY3VtZW50IDxib2R5PlxuICAgIHRoaXMudmFycy5ib2R5ID0galF1ZXJ5KCdib2R5Jyk7XG5cbiAgICAvLyBnZXQgZG9jdW1lbnQgI2Zvb3RlclxuICAgIHRoaXMudmFycy5mb290ZXIgPSBqUXVlcnkoJyNjcnRGb290ZXInKTtcblxuICAgIC8vIGdldCB3aW5kb3cgV2lkdGhcbiAgICB0aGlzLnZhcnMud2luZG93VyA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCk7XG5cbiAgICAvLyBnZXQgd2luZG93IGhlaWdodFxuICAgIHRoaXMudmFycy53aW5kb3dIID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCk7XG5cbiAgICAvLyBnZXQgd2luZG93IHNjcm9sbCB0b3BcbiAgICB0aGlzLnZhcnMud2luZG93U2Nyb2xsVG9wID0galF1ZXJ5KHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvLyBkZXRlY3QgZGV2aWNlIHR5cGVcbiAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIHRoaXMudmFycy5tb2JpbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhcnMuaHRtbC5hZGRDbGFzcygnbW9iaWxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YXJzLm1vYmlsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZhcnMuaHRtbC5hZGRDbGFzcygnZGVza3RvcCcpO1xuICAgIH1cbn07XG5cbi8qIExvY2sgV2luZG93IFNjcm9sbCAqL1xuY2VydHkubG9ja1Njcm9sbCA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGluaXRXaWR0aCA9IGNlcnR5LnZhcnMuaHRtbC5vdXRlcldpZHRoKCk7XG4gICAgdmFyIGluaXRIZWlnaHQgPSBjZXJ0eS52YXJzLmJvZHkub3V0ZXJIZWlnaHQoKTtcblxuICAgIHZhciBzY3JvbGxQb3NpdGlvbiA9IFtcbiAgICAgICAgc2VsZi5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQsXG4gICAgICAgIHNlbGYucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICAgIF07XG5cbiAgICBjZXJ0eS52YXJzLmh0bWwuZGF0YSgnc2Nyb2xsLXBvc2l0aW9uJywgc2Nyb2xsUG9zaXRpb24pO1xuICAgIGNlcnR5LnZhcnMuaHRtbC5kYXRhKCdwcmV2aW91cy1vdmVyZmxvdycsIGNlcnR5LnZhcnMuaHRtbC5jc3MoJ292ZXJmbG93JykpO1xuICAgIGNlcnR5LnZhcnMuaHRtbC5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxQb3NpdGlvblswXSwgc2Nyb2xsUG9zaXRpb25bMV0pO1xuXG4gICAgdmFyIG1hcmdpblIgPSBjZXJ0eS52YXJzLmJvZHkub3V0ZXJXaWR0aCgpIC0gaW5pdFdpZHRoO1xuICAgIHZhciBtYXJnaW5CID0gY2VydHkudmFycy5ib2R5Lm91dGVySGVpZ2h0KCkgLSBpbml0SGVpZ2h0O1xuICAgIGNlcnR5LnZhcnMuYm9keS5jc3MoeydtYXJnaW4tcmlnaHQnOiBtYXJnaW5SLCAnbWFyZ2luLWJvdHRvbSc6IG1hcmdpbkJ9KTtcbiAgICBjZXJ0eS52YXJzLmh0bWwuYWRkQ2xhc3MoJ2xvY2stc2Nyb2xsJyk7XG59O1xuXG4vKiBVbmxvY2sgV2luZG93IFNjcm9sbCAqL1xuY2VydHkudW5sb2NrU2Nyb2xsID0gZnVuY3Rpb24oKXtcbiAgICBjZXJ0eS52YXJzLmh0bWwuY3NzKCdvdmVyZmxvdycsIGNlcnR5LnZhcnMuaHRtbC5kYXRhKCdwcmV2aW91cy1vdmVyZmxvdycpKTtcbiAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSBjZXJ0eS52YXJzLmh0bWwuZGF0YSgnc2Nyb2xsLXBvc2l0aW9uJyk7XG4gICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbFBvc2l0aW9uWzBdLCBzY3JvbGxQb3NpdGlvblsxXSk7XG5cbiAgICBjZXJ0eS52YXJzLmJvZHkuY3NzKHsnbWFyZ2luLXJpZ2h0JzogMCwgJ21hcmdpbi1ib3R0b20nOiAwfSk7XG4gICAgY2VydHkudmFycy5odG1sLnJlbW92ZUNsYXNzKCdsb2NrLXNjcm9sbCcpO1xufTtcblxuLyogRGV0ZWN0IERldmljZSBUeXBlICovXG5mdW5jdGlvbiBhY2VfZGV0ZWN0X2RldmljZV90eXBlKCkge1xuICAgIGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgYWNlLm1vYmlsZSA9IHRydWU7XG4gICAgICAgIGFjZS5odG1sLmFkZENsYXNzKCdjcnQtbW9iaWxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWNlLm1vYmlsZSA9IGZhbHNlO1xuICAgICAgICBhY2UuaHRtbC5hZGRDbGFzcygnY3J0LWRlc2t0b3AnKTtcbiAgICB9XG59XG5cbi8qIENlcnR5IE92ZXJsYXkgKi9cbmZ1bmN0aW9uIGFjZV9hcHBlbmRfb3ZlcmxheSgpIHtcbiAgICBhY2UuYm9keS5hcHBlbmQoYWNlLm92ZXJsYXkub2JqKTtcblxuICAgIC8vIE1ha2UgdGhlIGVsZW1lbnQgZnVsbHkgdHJhbnNwYXJlbnRcbiAgICBhY2Uub3ZlcmxheS5vYmpbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIGluaXRpYWwgc3RhdGUgaXMgYXBwbGllZFxuICAgIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFjZS5vdmVybGF5Lm9ialswXSkub3BhY2l0eTtcblxuICAgIC8vIEZhZGUgaXQgaW5cbiAgICBhY2Uub3ZlcmxheS5vYmpbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG59XG5cbmZ1bmN0aW9uIGFjZV9yZW1vdmVfb3ZlcmxheSgpIHtcbiAgICAvLyBGYWRlIGl0IG91dFxuICAgIGFjZS5vdmVybGF5Lm9ialswXS5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgIC8vIFJlbW92ZSBvdmVybGF5XG4gICAgYWNlLm92ZXJsYXkub2JqLnJlbW92ZSgpO1xufVxuXG4vKiBDZXJ0eSBMb2NrIFNjcm9sbCAqL1xuZnVuY3Rpb24gYWNlX2xvY2tfc2Nyb2xsKCkge1xuICAgIHZhciBpbml0V2lkdGggPSBhY2UuaHRtbC5vdXRlcldpZHRoKCk7XG4gICAgdmFyIGluaXRIZWlnaHQgPSBhY2UuYm9keS5vdXRlckhlaWdodCgpO1xuXG4gICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gW1xuICAgICAgICBzZWxmLnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCxcbiAgICAgICAgc2VsZi5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gICAgXTtcblxuICAgIGFjZS5odG1sLmRhdGEoJ3Njcm9sbC1wb3NpdGlvbicsIHNjcm9sbFBvc2l0aW9uKTtcbiAgICBhY2UuaHRtbC5kYXRhKCdwcmV2aW91cy1vdmVyZmxvdycsIGFjZS5odG1sLmNzcygnb3ZlcmZsb3cnKSk7XG4gICAgYWNlLmh0bWwuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oc2Nyb2xsUG9zaXRpb25bMF0sIHNjcm9sbFBvc2l0aW9uWzFdKTtcblxuICAgIHZhciBtYXJnaW5SID0gYWNlLmJvZHkub3V0ZXJXaWR0aCgpIC0gaW5pdFdpZHRoO1xuICAgIHZhciBtYXJnaW5CID0gYWNlLmJvZHkub3V0ZXJIZWlnaHQoKSAtIGluaXRIZWlnaHQ7XG4gICAgYWNlLmJvZHkuY3NzKHsnbWFyZ2luLXJpZ2h0JzogbWFyZ2luUiwgJ21hcmdpbi1ib3R0b20nOiBtYXJnaW5CfSk7XG4gICAgYWNlLmh0bWwuYWRkQ2xhc3MoJ2NydC1sb2NrLXNjcm9sbCcpO1xufVxuXG4vKiBDZXJ0eSBVbmxvY2sgU2Nyb2xsICovXG5mdW5jdGlvbiBhY2VfdW5sb2NrX3Njcm9sbCgpIHtcbiAgICBhY2UuaHRtbC5jc3MoJ292ZXJmbG93JywgYWNlLmh0bWwuZGF0YSgncHJldmlvdXMtb3ZlcmZsb3cnKSk7XG4gICAgdmFyIHNjcm9sbFBvc2l0aW9uID0gYWNlLmh0bWwuZGF0YSgnc2Nyb2xsLXBvc2l0aW9uJyk7XG4gICAgd2luZG93LnNjcm9sbFRvKHNjcm9sbFBvc2l0aW9uWzBdLCBzY3JvbGxQb3NpdGlvblsxXSk7XG5cbiAgICBhY2UuYm9keS5jc3MoeydtYXJnaW4tcmlnaHQnOiAwLCAnbWFyZ2luLWJvdHRvbSc6IDB9KTtcbiAgICBhY2UuaHRtbC5yZW1vdmVDbGFzcygnY3J0LWxvY2stc2Nyb2xsJyk7XG59XG5cbi8qIENlcnR5IENsb3NlIFNpZGViYXIgKi9cbmZ1bmN0aW9uIGFjZV9vcGVuX3NpZGViYXIoKSB7XG4gICAgYWNlLmh0bWwuYWRkQ2xhc3MoJ2NydC1zaWRlYmFyLW9wZW5lZCcpO1xuICAgIGFjZV9hcHBlbmRfb3ZlcmxheSgpO1xuICAgIGFjZV9sb2NrX3Njcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBhY2VfY2xvc2Vfc2lkZWJhcigpIHtcbiAgICBhY2UuaHRtbC5yZW1vdmVDbGFzcygnY3J0LXNpZGViYXItb3BlbmVkJyk7XG4gICAgYWNlX3JlbW92ZV9vdmVybGF5KCk7XG4gICAgYWNlX3VubG9ja19zY3JvbGwoKTtcbn1cblxuLyogQ2VydHkgUHJvZ3Jlc3MgQ2lyY2xlICovXG5mdW5jdGlvbiBhY2VfcHJvZ3Jlc3NfY2hhcnQoZWxlbWVudCwgdGV4dCwgdmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgLy8gV2UgaGF2ZSB1bmRlZmluZWQgdGV4dCB3aGVuIHVzZXIgZGlkbnRuIGZpbGwgdGV4dCBmaWVsZCBmcm9tIGFkbWluXG4gICAgaWYgKHR5cGVvZiB0ZXh0ID09PSBcInVuZGVmaW5lZFwiKSB7IHRleHQgPSBcIlwiOyB9XG5cbiAgICB2YXIgY2lyY2xlID0gbmV3IFByb2dyZXNzQmFyLkNpcmNsZShlbGVtZW50LCB7XG4gICAgICAgIGNvbG9yOiBjZXJ0eS52YXJzLnRoZW1lQ29sb3IsXG4gICAgICAgIHN0cm9rZVdpZHRoOiA1LFxuICAgICAgICB0cmFpbFdpZHRoOiAwLFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Byb2dyZXNzLXRleHQnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjZXJ0eS5wcm9ncmVzcy50ZXh0Q29sb3IsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9TdHlsZUNvbnRhaW5lcjogdHJ1ZSxcbiAgICAgICAgICAgIGFsaWduVG9Cb3R0b206IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgc3ZnU3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nOiAnZWFzZU91dCdcbiAgICB9KTtcblxuICAgIGNpcmNsZS5hbmltYXRlKHZhbHVlKTsgLy8gTnVtYmVyIGZyb20gMC4wIHRvIDEuMFxufVxuXG4vKiBDZXJ0eSBQcm9ncmVzcyBMaW5lICovXG5mdW5jdGlvbiBhY2VfcHJvZ3Jlc3NfbGluZShlbGVtZW50LCB0ZXh0LCB2YWx1ZSwgZHVyYXRpb24pIHtcbiAgICAvLyBXZSBoYXZlIHVuZGVmaW5lZCB0ZXh0IHdoZW4gdXNlciBkaWRudG4gZmlsbCB0ZXh0IGZpZWxkIGZyb20gYWRtaW5cbiAgICBpZiAodHlwZW9mIHRleHQgPT09IFwidW5kZWZpbmVkXCIpIHsgdGV4dCA9IFwiXCI7IH1cbiAgICBcbiAgICB2YXIgbGluZSA9IG5ldyBQcm9ncmVzc0Jhci5MaW5lKGVsZW1lbnQsIHtcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDQsXG4gICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dCcsXG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgY29sb3I6IGNlcnR5LnZhcnMudGhlbWVDb2xvcixcbiAgICAgICAgdHJhaWxDb2xvcjogY2VydHkucHJvZ3Jlc3MudHJhaWxDb2xvcixcbiAgICAgICAgdHJhaWxXaWR0aDogNCxcbiAgICAgICAgc3ZnU3R5bGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3Byb2dyZXNzLXRleHQnLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICctMjVweCcsXG4gICAgICAgICAgICAgICAgcmlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2VydHkucHJvZ3Jlc3MudGV4dENvbG9yLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybToge1xuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAndHJhbnNsYXRlKDAsIDApJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdXRvU3R5bGVDb250YWluZXI6IHRydWVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGluZS5hbmltYXRlKHZhbHVlKTsgIC8vIE51bWJlciBmcm9tIDAuMCB0byAxLjBcbn1cblxuLyogQ2VydHkgRWxlbWVudCBJbiBWaWV3cG9ydCAqL1xuZnVuY3Rpb24gYWNlX2lzX2VsZW1faW5fdmlld3BvcnQoZWwsIHZwYXJ0KSB7XG4gICAgdmFyIHJlY3QgPSBlbFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHJldHVybiAoXG4gICAgcmVjdC5ib3R0b20gPj0gMCAmJlxuICAgIHJlY3QucmlnaHQgPj0gMCAmJlxuICAgIHJlY3QudG9wICsgdnBhcnQgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAmJlxuICAgIHJlY3QubGVmdCA8PSAod2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGFjZV9pc19lbGVtc19pbl92aWV3cG9ydChlbGVtcywgdnBhcnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0galF1ZXJ5KGVsZW1zW2ldKTtcblxuICAgICAgICBpZiAoaXRlbS5oYXNDbGFzcygnY3J0LWFuaW1hdGUnKSAmJiBhY2VfaXNfZWxlbV9pbl92aWV3cG9ydChpdGVtLCB2cGFydCkpIHtcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQ2xhc3MoJ2NydC1hbmltYXRlJykuYWRkQ2xhc3MoJ2NydC1hbmltYXRlZCcpO1xuXG4gICAgICAgICAgICAvLyBBbmltYXRlIENpcmNsZSBDaGFydFxuICAgICAgICAgICAgaWYoaXRlbS5oYXNDbGFzcygncHJvZ3Jlc3MtY2hhcnQnKSl7XG4gICAgICAgICAgICAgICAgdmFyIGNoYXJ0ID0gaXRlbS5maW5kKCcucHJvZ3Jlc3MtYmFyJyk7XG4gICAgICAgICAgICAgICAgYWNlX3Byb2dyZXNzX2NoYXJ0KGNoYXJ0WzBdLCBjaGFydC5kYXRhKCd0ZXh0JyksIGNoYXJ0LmRhdGEoJ3ZhbHVlJyksIDEwMDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBbmltYXRlIExpbmUgQ2hhcnRcbiAgICAgICAgICAgIGlmKGl0ZW0uaGFzQ2xhc3MoJ3Byb2dyZXNzLWxpbmUnKSl7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBpdGVtLmZpbmQoJy5wcm9ncmVzcy1iYXInKTtcbiAgICAgICAgICAgICAgICBhY2VfcHJvZ3Jlc3NfbGluZShsaW5lWzBdLCBsaW5lLmRhdGEoJ3RleHQnKSwgbGluZS5kYXRhKCd2YWx1ZScpLCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWNlX2FwcGVhcl9lbGVtcyhlbGVtcywgdnBhcnQpIHtcbiAgICBhY2VfaXNfZWxlbXNfaW5fdmlld3BvcnQoZWxlbXMsIHZwYXJ0KTtcblxuICAgIGpRdWVyeSh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFjZV9pc19lbGVtc19pbl92aWV3cG9ydChlbGVtcywgdnBhcnQpO1xuICAgIH0pO1xuXG4gICAgalF1ZXJ5KHdpbmRvdykucmVzaXplKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWNlX2lzX2VsZW1zX2luX3ZpZXdwb3J0KGVsZW1zLCB2cGFydCk7XG4gICAgfSk7XG59XG5cbi8qIENlcnR5IEdvb2dsZSBNYXAgKi9cbmZ1bmN0aW9uIGluaXRpYWxpc2VHb29nbGVNYXAobWFwU3R5bGVzKSB7XG4gICAgdmFyIGxhdGxuZztcbiAgICB2YXIgbGF0ID0gNDQuNTQwMztcbiAgICB2YXIgbG5nID0gLTc4LjU0NjM7XG4gICAgdmFyIG1hcCA9IGpRdWVyeSgnI21hcCcpO1xuICAgIHZhciBtYXBDYW52YXMgPSBtYXAuZ2V0KDApO1xuICAgIHZhciBtYXBfc3R5bGVzID0galF1ZXJ5LnBhcnNlSlNPTihtYXBTdHlsZXMpO1xuXG4gICAgaWYgKG1hcC5kYXRhKFwibGF0aXR1ZGVcIikpIGxhdCA9IG1hcC5kYXRhKFwibGF0aXR1ZGVcIik7XG4gICAgaWYgKG1hcC5kYXRhKFwibG9uZ2l0dWRlXCIpKSBsbmcgPSBtYXAuZGF0YShcImxvbmdpdHVkZVwiKTtcblxuICAgIGxhdGxuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuXG4gICAgLy8gTWFwIE9wdGlvbnNcbiAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgem9vbTogMTQsXG4gICAgICAgIGNlbnRlcjogbGF0bG5nLFxuICAgICAgICBzY3JvbGx3aGVlbDogdHJ1ZSxcbiAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgICAgc3R5bGVzOiBtYXBfc3R5bGVzXG4gICAgfTtcblxuICAgIC8vIENyZWF0ZSB0aGUgTWFwXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBDYW52YXMsIG1hcE9wdGlvbnMpO1xuXG4gICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgcG9zaXRpb246IGxhdGxuZyxcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgcGF0aDogJ00xMjUgNDEwIGMtNTYgLTcyIC0xMTEgLTE3NiAtMTIwIC0yMjQgLTcgLTM2IDExIC04MyA0OSAtMTI0IDc2IC04NSAyMjMgLTY3IDI3MCAzMSAyOCA2MCAyOSA4OCA2IDE1MCAtMTkgNTEgLTEyMiAyMDUgLTE0OCAyMjEgLTYgMyAtMzIgLTIxIC01NyAtNTR6IG0xMTAgLTE3NSBjMzUgLTM0IDMzIC03OCAtNCAtMTE2IC0zNSAtMzUgLTcxIC0zNyAtMTA1IC03IC00MCAzNSAtNDMgNzggLTExIDExNiAzNCA0MSA4NCA0NCAxMjAgN3onLFxuICAgICAgICAgICAgZmlsbENvbG9yOiBjZXJ0eV92YXJzX2Zyb21fV1AudGhlbWVDb2xvcixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgICAgICAgICAgc2NhbGU6IDAuMSxcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBjZXJ0eV92YXJzX2Zyb21fV1AudGhlbWVDb2xvcixcbiAgICAgICAgICAgIHN0cm9rZVdlaWdodDogMSxcbiAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDE4NSwgNTAwKVxuICAgICAgICB9LFxuICAgICAgICB0aXRsZTogJ0hlbGxvIFdvcmxkISdcbiAgICB9KTtcblxuICAgIC8qdmFyIG1hcmtlciA9IG5ldyBNYXJrZXIoe1xuICAgICBtYXA6IG1hcCxcbiAgICAgcG9zaXRpb246IGxhdGxuZyxcbiAgICAgaWNvbjoge1xuICAgICBwYXRoOiBTUVVBUkVfUElOLFxuICAgICBmaWxsQ29sb3I6ICcnLFxuICAgICBmaWxsT3BhY2l0eTogMCxcbiAgICAgc3Ryb2tlQ29sb3I6ICcnLFxuICAgICBzdHJva2VXZWlnaHQ6IDBcbiAgICAgfSxcbiAgICAgbWFwX2ljb25fbGFiZWw6ICc8c3BhbiBjbGFzcz1cIm1hcC1pY29uIG1hcC1pY29uLXBvc3RhbC1jb2RlXCI+PC9zcGFuPidcbiAgICAgfSk7Ki9cblxuICAgIC8vIEtlZXAgTWFya2VyIGluIENlbnRlclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWFwLnNldENlbnRlcihsYXRsbmcpO1xuICAgIH0pO1xufSIsIi8qKlxuICogQ2VydHkgT3B0aW9uc1xuICovXG5cbnZhciBuYXZTdGlreSA9IGZhbHNlO1xuaWYoY2VydHlfdmFyc19mcm9tX1dQLmVuYWJsZV9zdGlja3kgPT0gMSkgeyBuYXZTdGlreSA9IHRydWU7IH1cblxuXG52YXIgY2VydHkgPSB7XG4gICAgdmFyczoge1xuICAgICAgICAvLyBTZXQgdGhlbWUgcnRsIG1vZGVcbiAgICAgICAgcnRsOiBmYWxzZSxcblxuICAgICAgICAvLyBTZXQgdGhlbWUgcHJpbWFyeSBjb2xvclxuICAgICAgICB0aGVtZUNvbG9yOiBjZXJ0eV92YXJzX2Zyb21fV1AudGhlbWVDb2xvcixcblxuICAgICAgICAvLyBTZXQgbWlkZGxlIHNjcmVlbiBzaXplLCBtdXN0IGhhdmUgdGhlIHNhbWUgdmFsdWUgYXMgaW4gdGhlIF92YXJpYWJsZXMuc2Nzc1xuICAgICAgICBzY3JlZW5NZDogJzk5MnB4J1xuICAgIH0sXG5cbiAgICBuYXY6IHtcbiAgICAgICAgaGVpZ2h0OiAnYXV0bycsIC8vIHVzZSAnYXV0bycgb3Igc29tZSBmaXhlZCB2YWx1ZSwgZm9yIGV4YW1wbGUgNDgwcHhcbiAgICAgICAgYXJyb3c6IGZhbHNlLCAvLyBhY3RpdmF0ZSBhcnJvdyB0byBzY3JvbGwgZG93biBtZW51IGl0ZW1zLFxuICAgICAgICBzdGlja3k6IHtcbiAgICAgICAgICAgIHRvcDogXCItMXB4XCIsIC8vIHN0aWNreSBwb3NpdGlvbiBmcm9tIHRvcFxuICAgICAgICAgICAgYWN0aXZlOiBuYXZTdGlreSAvLyBhY3RpdmF0ZSBzdGlja3kgcHJvcGVydHkgb24gd2luZG93IHNjcm9sbFxuICAgICAgICB9LFxuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaWRlQm94OiB7XG4gICAgICAgIHN0aWNreToge1xuICAgICAgICAgICAgdG9wOiBcIjIwcHhcIiwgLy8gc3RpY2t5IHBvc2l0aW9uIGZyb20gdG9wXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlIC8vIGFjdGl2YXRlIHN0aWNreSBwcm9wZXJ0eSBvbiB3aW5kb3cgc2Nyb2xsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHJvZ3Jlc3M6IHtcbiAgICAgICAgYW5pbWF0aW9uOiB0cnVlLCAvLyBhbmltYXRlIG9uIHdpbmRvdyBzY3JvbGxcbiAgICAgICAgdGV4dENvbG9yOiAnaW5oZXJpdCcsIC8vIHNldCB0ZXh0IGNvbG9yXG4gICAgICAgIHRyYWlsQ29sb3I6ICdyZ2JhKDAsMCwwLDAuMDcpJyAvLyBzZXQgdHJhaWwgY29sb3JcbiAgICB9XG59OyIsIi8qXG4gKiBqUXVlcnkgT25lIFBhZ2UgTmF2IFBsdWdpblxuICogaHR0cDovL2dpdGh1Yi5jb20vZGF2aXN0MTEvalF1ZXJ5LU9uZS1QYWdlLU5hdlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMCBUcmV2b3IgRGF2aXMgKGh0dHA6Ly90cmV2b3JkYXZpcy5uZXQpXG4gKiBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCBsaWNlbnNlcy5cbiAqIFVzZXMgdGhlIHNhbWUgbGljZW5zZSBhcyBqUXVlcnksIHNlZTpcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBAdmVyc2lvbiAzLjAuMFxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKiAkKCcjbmF2Jykub25lUGFnZU5hdih7XG4gKiAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQnLFxuICogICBjaGFuZ2VIYXNoOiBmYWxzZSxcbiAqICAgc2Nyb2xsU3BlZWQ6IDc1MFxuICogfSk7XG4gKi9cblxuOyhmdW5jdGlvbigkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpe1xuXG4gICAgLy8gb3VyIHBsdWdpbiBjb25zdHJ1Y3RvclxuICAgIHZhciBPbmVQYWdlTmF2ID0gZnVuY3Rpb24oZWxlbSwgb3B0aW9ucyl7XG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgICAgIHRoaXMuJGVsZW0gPSAkKGVsZW0pO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLm1ldGFkYXRhID0gdGhpcy4kZWxlbS5kYXRhKCdwbHVnaW4tb3B0aW9ucycpO1xuICAgICAgICB0aGlzLiR3aW4gPSAkKHdpbmRvdyk7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMgPSB7fTtcbiAgICAgICAgdGhpcy5kaWRTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kZG9jID0gJChkb2N1bWVudCk7XG4gICAgICAgIHRoaXMuZG9jSGVpZ2h0ID0gdGhpcy4kZG9jLmhlaWdodCgpO1xuICAgIH07XG5cbiAgICAvLyB0aGUgcGx1Z2luIHByb3RvdHlwZVxuICAgIE9uZVBhZ2VOYXYucHJvdG90eXBlID0ge1xuICAgICAgICBkZWZhdWx0czoge1xuICAgICAgICAgICAgbmF2SXRlbXM6ICdhJyxcbiAgICAgICAgICAgIGN1cnJlbnRDbGFzczogJ2N1cnJlbnQnLFxuICAgICAgICAgICAgY2hhbmdlSGFzaDogZmFsc2UsXG4gICAgICAgICAgICBlYXNpbmc6ICdzd2luZycsXG4gICAgICAgICAgICBmaWx0ZXI6ICcnLFxuICAgICAgICAgICAgc2Nyb2xsU3BlZWQ6IDc1MCxcbiAgICAgICAgICAgIHNjcm9sbFRocmVzaG9sZDogMC41LFxuICAgICAgICAgICAgYmVnaW46IGZhbHNlLFxuICAgICAgICAgICAgZW5kOiBmYWxzZSxcbiAgICAgICAgICAgIHNjcm9sbENoYW5nZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIEludHJvZHVjZSBkZWZhdWx0cyB0aGF0IGNhbiBiZSBleHRlbmRlZCBlaXRoZXJcbiAgICAgICAgICAgIC8vIGdsb2JhbGx5IG9yIHVzaW5nIGFuIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0cywgdGhpcy5vcHRpb25zLCB0aGlzLm1ldGFkYXRhKTtcblxuICAgICAgICAgICAgdGhpcy4kbmF2ID0gdGhpcy4kZWxlbS5maW5kKHRoaXMuY29uZmlnLm5hdkl0ZW1zKTtcblxuICAgICAgICAgICAgLy9GaWx0ZXIgYW55IGxpbmtzIG91dCBvZiB0aGUgbmF2XG4gICAgICAgICAgICBpZih0aGlzLmNvbmZpZy5maWx0ZXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmF2ID0gdGhpcy4kbmF2LmZpbHRlcih0aGlzLmNvbmZpZy5maWx0ZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0hhbmRsZSBjbGlja3Mgb24gdGhlIG5hdlxuICAgICAgICAgICAgdGhpcy4kbmF2Lm9uKCdjbGljay5vbmVQYWdlTmF2JywgJC5wcm94eSh0aGlzLmhhbmRsZUNsaWNrLCB0aGlzKSk7XG5cbiAgICAgICAgICAgIC8vR2V0IHRoZSBzZWN0aW9uIHBvc2l0aW9uc1xuICAgICAgICAgICAgdGhpcy5nZXRQb3NpdGlvbnMoKTtcblxuICAgICAgICAgICAgLy9IYW5kbGUgc2Nyb2xsIGNoYW5nZXNcbiAgICAgICAgICAgIHRoaXMuYmluZEludGVydmFsKCk7XG5cbiAgICAgICAgICAgIC8vVXBkYXRlIHRoZSBwb3NpdGlvbnMgb24gcmVzaXplIHRvb1xuICAgICAgICAgICAgdGhpcy4kd2luLm9uKCdyZXNpemUub25lUGFnZU5hdicsICQucHJveHkodGhpcy5nZXRQb3NpdGlvbnMsIHRoaXMpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRqdXN0TmF2OiBmdW5jdGlvbihzZWxmLCAkcGFyZW50KSB7XG4gICAgICAgICAgICBzZWxmLiRlbGVtLmZpbmQoJy4nICsgc2VsZi5jb25maWcuY3VycmVudENsYXNzKS5yZW1vdmVDbGFzcyhzZWxmLmNvbmZpZy5jdXJyZW50Q2xhc3MpO1xuICAgICAgICAgICAgJHBhcmVudC5hZGRDbGFzcyhzZWxmLmNvbmZpZy5jdXJyZW50Q2xhc3MpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJpbmRJbnRlcnZhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZG9jSGVpZ2h0O1xuXG4gICAgICAgICAgICBzZWxmLiR3aW4ub24oJ3Njcm9sbC5vbmVQYWdlTmF2JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaWRTY3JvbGwgPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNlbGYudCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvY0hlaWdodCA9IHNlbGYuJGRvYy5oZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIC8vSWYgaXQgd2FzIHNjcm9sbGVkXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5kaWRTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaWRTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zY3JvbGxDaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL0lmIHRoZSBkb2N1bWVudCBoZWlnaHQgY2hhbmdlc1xuICAgICAgICAgICAgICAgIGlmKGRvY0hlaWdodCAhPT0gc2VsZi5kb2NIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kb2NIZWlnaHQgPSBkb2NIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0UG9zaXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjUwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRIYXNoOiBmdW5jdGlvbigkbGluaykge1xuICAgICAgICAgICAgcmV0dXJuICRsaW5rLmF0dHIoJ2hyZWYnKS5zcGxpdCgnIycpWzFdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFBvc2l0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbGlua0hyZWY7XG4gICAgICAgICAgICB2YXIgdG9wUG9zO1xuICAgICAgICAgICAgdmFyICR0YXJnZXQ7XG5cbiAgICAgICAgICAgIHNlbGYuJG5hdi5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGxpbmtIcmVmID0gc2VsZi5nZXRIYXNoKCQodGhpcykpO1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkKCcjJyArIGxpbmtIcmVmKTtcblxuICAgICAgICAgICAgICAgIGlmKCR0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvcFBvcyA9ICR0YXJnZXQub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlY3Rpb25zW2xpbmtIcmVmXSA9IE1hdGgucm91bmQodG9wUG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRTZWN0aW9uOiBmdW5jdGlvbih3aW5kb3dQb3MpIHtcbiAgICAgICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gTWF0aC5yb3VuZCh0aGlzLiR3aW4uaGVpZ2h0KCkgKiB0aGlzLmNvbmZpZy5zY3JvbGxUaHJlc2hvbGQpO1xuXG4gICAgICAgICAgICBmb3IodmFyIHNlY3Rpb24gaW4gdGhpcy5zZWN0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKCh0aGlzLnNlY3Rpb25zW3NlY3Rpb25dIC0gd2luZG93SGVpZ2h0KSA8IHdpbmRvd1Bvcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHNlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciAkbGluayA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIHZhciAkcGFyZW50ID0gJGxpbmsucGFyZW50KCk7XG4gICAgICAgICAgICB2YXIgbmV3TG9jID0gJyMnICsgc2VsZi5nZXRIYXNoKCRsaW5rKTtcblxuICAgICAgICAgICAgaWYoISRwYXJlbnQuaGFzQ2xhc3Moc2VsZi5jb25maWcuY3VycmVudENsYXNzKSkge1xuICAgICAgICAgICAgICAgIC8vU3RhcnQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBpZihzZWxmLmNvbmZpZy5iZWdpbikge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5iZWdpbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vQ2hhbmdlIHRoZSBoaWdobGlnaHRlZCBuYXYgaXRlbVxuICAgICAgICAgICAgICAgIHNlbGYuYWRqdXN0TmF2KHNlbGYsICRwYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy9SZW1vdmluZyB0aGUgYXV0by1hZGp1c3Qgb24gc2Nyb2xsXG4gICAgICAgICAgICAgICAgc2VsZi51bmJpbmRJbnRlcnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgLy9TY3JvbGwgdG8gdGhlIGNvcnJlY3QgcG9zaXRpb25cbiAgICAgICAgICAgICAgICBzZWxmLnNjcm9sbFRvKG5ld0xvYywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vRG8gd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhhc2g/XG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuY29uZmlnLmNoYW5nZUhhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhpc3RvcnkucHVzaFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgbmV3TG9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gbmV3TG9jO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy9BZGQgdGhlIGF1dG8tYWRqdXN0IG9uIHNjcm9sbCBiYWNrIGluXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYmluZEludGVydmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9FbmQgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5jb25maWcuZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2Nyb2xsQ2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB3aW5kb3dUb3AgPSB0aGlzLiR3aW4uc2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmdldFNlY3Rpb24od2luZG93VG9wKTtcbiAgICAgICAgICAgIHZhciAkcGFyZW50O1xuXG4gICAgICAgICAgICAvL0lmIHRoZSBwb3NpdGlvbiBpcyBzZXRcbiAgICAgICAgICAgIGlmKHBvc2l0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJHBhcmVudCA9IHRoaXMuJGVsZW0uZmluZCgnYVtocmVmJD1cIiMnICsgcG9zaXRpb24gKyAnXCJdJykucGFyZW50KCk7XG5cbiAgICAgICAgICAgICAgICAvL0lmIGl0J3Mgbm90IGFscmVhZHkgdGhlIGN1cnJlbnQgc2VjdGlvblxuICAgICAgICAgICAgICAgIGlmKCEkcGFyZW50Lmhhc0NsYXNzKHRoaXMuY29uZmlnLmN1cnJlbnRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIGhpZ2hsaWdodGVkIG5hdiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0TmF2KHRoaXMsICRwYXJlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlcmUgaXMgYSBzY3JvbGxDaGFuZ2UgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jb25maWcuc2Nyb2xsQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zY3JvbGxDaGFuZ2UoJHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2Nyb2xsVG86IGZ1bmN0aW9uKHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICBpZiggJCh0YXJnZXQpLmNsb3Nlc3QoJy5jcnQtcGFwZXItbGF5ZXJzJykuaGFzQ2xhc3MoJ2NydC1hbmltYXRlJykgKXtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXQgLSAxNDU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldCAtIDQ1O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTY3JvbGwgdG8gb2Zmc2V0XG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBvZmZzZXRcbiAgICAgICAgICAgIH0sIHRoaXMuY29uZmlnLnNjcm9sbFNwZWVkLCB0aGlzLmNvbmZpZy5lYXNpbmcsIGNhbGxiYWNrKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bmJpbmRJbnRlcnZhbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudCk7XG4gICAgICAgICAgICB0aGlzLiR3aW4udW5iaW5kKCdzY3JvbGwub25lUGFnZU5hdicpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIE9uZVBhZ2VOYXYuZGVmYXVsdHMgPSBPbmVQYWdlTmF2LnByb3RvdHlwZS5kZWZhdWx0cztcblxuICAgICQuZm4ub25lUGFnZU5hdiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5ldyBPbmVQYWdlTmF2KHRoaXMsIG9wdGlvbnMpLmluaXQoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93ICwgZG9jdW1lbnQgKTsiLCIvKipcbiAqIENlcnR5IE5hdmlnYXRpb25cbiAqL1xuXG4vLyBOYXZpZ2F0aW9uIFdpdGggU2Nyb2xsIGFuZCBBcnJvd1xuY2VydHkubmF2LmluaXRTY3JvbGwgPSBmdW5jdGlvbiggZWwgKXtcbiAgICAvLyBTZXQgTmF2IEhlaWdodFxuICAgIC8vIGNlcnR5Lm5hdi5zY3JvbGwgPSBlbDtcblxuICAgIGVsLmhlaWdodChlbC5oZWlnaHQoKSkuYW5pbWF0ZSh7aGVpZ2h0OiBjZXJ0eS5uYXYuaGVpZ2h0fSwgNzAwLCBmdW5jdGlvbigpe1xuXG4gICAgICAgIC8vIE1vdXNlIFNjcm9sbFxuICAgICAgICBlbC5tQ3VzdG9tU2Nyb2xsYmFyKHtcbiAgICAgICAgICAgIGF4aXM6IFwieVwiLFxuICAgICAgICAgICAgc2Nyb2xsYmFyUG9zaXRpb246IFwib3V0c2lkZVwiXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gQXJyb3cgU2Nyb2xsXG4gICAgaWYgKGNlcnR5Lm5hdi5hcnJvdyl7XG4gICAgICAgIGpRdWVyeShcIiNjcnROYXZUb29sc1wiKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cbiAgICAgICAgalF1ZXJ5KFwiI2NydE5hdkFycm93XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWwubUN1c3RvbVNjcm9sbGJhcignc2Nyb2xsVG8nLCAnLT0nK2NlcnR5Lm5hdi5oZWlnaHQpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG4vLyBTdGlja3kgTmF2aWdhdGlvblxuY2VydHkubmF2LmV4aXN0cyA9IGZhbHNlO1xuY2VydHkubmF2Lm1ha2VTdGlja3kgPSBmdW5jdGlvbigpe1xuXG4gICAgLy8gY2hlY2sgc3RpY2t5IG9wdGlvbiwgZGV2aWNlIHR5cGUgYW5kIHNjcmVlbiBzaXplXG4gICAgaWYgKCB0aGlzLnN0aWNreS5hY3RpdmUgJiYgIWNlcnR5LnZhcnMubW9iaWxlICYmIE1vZGVybml6ci5tcSgnKG1pbi13aWR0aDogJyArIGNlcnR5LnZhcnMuc2NyZWVuTWQgKyAnKScpICkge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIG5hdiBub2RlcyBleGlzdHNcbiAgICAgICAgaWYgKCB0aGlzLmV4aXN0cyApe1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3aW5kb3cgc2Nyb2xsIHBhc3MgZWxlbWVudFxuICAgICAgICAgICAgaWYgKCBjZXJ0eS52YXJzLndpbmRvd1Njcm9sbFRvcCA+IHRoaXMud3JhcC5vZmZzZXQoKS50b3AgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAndG9wJzogdGhpcy5zdGlja3kudG9wLFxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IHRoaXMud3JhcC5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiB0aGlzLndyYXAud2lkdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgJ2JvdHRvbSc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdib3R0b20nOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdyZWxhdGl2ZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwgPSBqUXVlcnkoJyNjcnROYXZJbm5lcicpO1xuICAgICAgICAgICAgdGhpcy53cmFwID0galF1ZXJ5KCcjY3J0TmF2V3JhcCcpO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZWwubGVuZ3RoID4gMCAmJiB0aGlzLndyYXAubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vLyBOYXZpZ2F0aW9uIFRvb2x0aXBzXG5jZXJ0eS5uYXYudG9vbHRpcC5lbCA9ICcnO1xuY2VydHkubmF2LnRvb2x0aXAudGltZXIgPSAwO1xuXG5jZXJ0eS5uYXYudG9vbHRpcC5zaG93ID0gZnVuY3Rpb24oY3VycmVudCl7XG4gICAgY2VydHkubmF2LnRvb2x0aXAudGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBjZXJ0eS5uYXYudG9vbHRpcC5lbCA9IGpRdWVyeSgnPGRpdiBjbGFzcz1cImNydC10b29sdGlwXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgLy8gSW5pdCB2YXJzXG4gICAgICAgIHZhciB0b3AgPSBjdXJyZW50Lm9mZnNldCgpLnRvcDtcbiAgICAgICAgdmFyIGxlZnQgPSBjdXJyZW50Lm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIHZhciByaWdodCA9IGxlZnQgKyBjdXJyZW50Lm91dGVyV2lkdGgoKTtcbiAgICAgICAgdmFyIHdpZHRoID0gY3VycmVudC5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciBoZWlnaHQgPSA0O1xuXG4gICAgICAgIC8vIEFwcGVuZCB0b29sdGlwXG4gICAgICAgIGNlcnR5LnZhcnMuYm9keS5hcHBlbmQoIGNlcnR5Lm5hdi50b29sdGlwLmVsICk7XG5cbiAgICAgICAgLy8gU2V0IHRvb2x0aXAgdGV4dFxuICAgICAgICBjZXJ0eS5uYXYudG9vbHRpcC5lbC50ZXh0KCBjdXJyZW50LmRhdGEoJ3Rvb2x0aXAnKSApO1xuXG4gICAgICAgIC8vIFBvc2l0aW9uaW5nIHRvb2x0aXBcbiAgICAgICAgaWYgKHJpZ2h0ICsgY2VydHkubmF2LnRvb2x0aXAuZWwub3V0ZXJXaWR0aCgpIDwgY2VydHkudmFycy53aW5kb3dXKSB7XG4gICAgICAgICAgICBjZXJ0eS5uYXYudG9vbHRpcC5lbC5hZGRDbGFzcygnYXJyb3ctbGVmdCcpLmNzcyh7XCJsZWZ0XCI6IHJpZ2h0ICsgXCJweFwiLCBcInRvcFwiOiAodG9wICsgaGVpZ2h0KSArIFwicHhcIn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwuYWRkQ2xhc3MoJ2Fycm93LXJpZ2h0IHRleHQtcmlnaHQnKS5jc3Moe1xuICAgICAgICAgICAgICAgIFwibGVmdFwiOiAobGVmdCAtIGNlcnR5Lm5hdi50b29sdGlwLmVsLm91dGVyV2lkdGgoKSAtIDEwKSArIFwicHhcIixcbiAgICAgICAgICAgICAgICBcInRvcFwiOiAodG9wICsgaGVpZ2h0KSArIFwicHhcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTaG93IFRvb2x0aXBcbiAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwuZmFkZUluKDE1MCk7XG5cbiAgICB9LCAxNTApO1xufTtcblxuY2VydHkubmF2LnRvb2x0aXAuaGlkZSA9IGZ1bmN0aW9uKCl7XG4gICAgY2xlYXJUaW1lb3V0KGNlcnR5Lm5hdi50b29sdGlwLnRpbWVyKTtcbiAgICBpZiAoY2VydHkubmF2LnRvb2x0aXAuZWwubGVuZ3RoID4gMCkge1xuICAgICAgICBjZXJ0eS5uYXYudG9vbHRpcC5lbC5mYWRlT3V0KDE1MCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuZWwucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07IiwiLyoqXG4gKiBDZXJ0eSBTaWRlIEJveFxuICovXG5jZXJ0eS5zaWRlQm94LmV4aXN0cyA9IGZhbHNlO1xuY2VydHkuc2lkZUJveC5tYWtlU3RpY2t5ID0gZnVuY3Rpb24oKXtcblxuICAgIC8vIGNoZWNrIHN0aWNreSBvcHRpb24sIGRldmljZSB0eXBlIGFuZCBzY3JlZW4gc2l6ZVxuICAgIGlmICggdGhpcy5zdGlja3kuYWN0aXZlICYmICFjZXJ0eS52YXJzLm1vYmlsZSAmJiBNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6ICcgKyBjZXJ0eS52YXJzLnNjcmVlbk1kICsgJyknKSApIHtcblxuICAgICAgICAvLyBjaGVjayBpZiBuYXYgbm9kZXMgZXhpc3RzXG4gICAgICAgIGlmICggdGhpcy5leGlzdHMgKXtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2luZG93IHNjcm9sbCBwYXNzIGVsZW1lbnRcbiAgICAgICAgICAgIGlmICggY2VydHkudmFycy53aW5kb3dTY3JvbGxUb3AgPiB0aGlzLndyYXAub2Zmc2V0KCkudG9wICkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IHRoaXMuc3RpY2t5LnRvcCxcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiB0aGlzLndyYXAub2Zmc2V0KCkubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogdGhpcy53cmFwLndpZHRoKCksXG4gICAgICAgICAgICAgICAgICAgICdib3R0b20nOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdmaXhlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAndG9wJzogJzAnLFxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAnYm90dG9tJzogJ2F1dG8nLFxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsID0galF1ZXJ5KCcjY3J0U2lkZUJveCcpO1xuICAgICAgICAgICAgdGhpcy53cmFwID0galF1ZXJ5KCcjY3J0U2lkZUJveFdyYXAnKTtcblxuICAgICAgICAgICAgaWYgKCB0aGlzLmVsLmxlbmd0aCA+IDAgJiYgdGhpcy53cmFwLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTsiLCIvKipcbiAqIENlcnR5IFNsaWRlclxuICovXG5cbi8vIFNsaWRlclxuY2VydHkuc2xpZGVyID0gZnVuY3Rpb24oc2xpZGVyKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgaWYoIGpRdWVyeShzbGlkZXJbaV0pLmRhdGEoXCJpbml0XCIpICE9IFwibm9uZVwiICl7XG4gICAgICAgICAgIGpRdWVyeShzbGlkZXJbaV0pLnNsaWNrKCk7XG4gICAgICAgfVxuICAgIH1cbn07XG5cbi8vIENhcm91c2VsXG5jZXJ0eS5jYXJvdXNlbCA9IGZ1bmN0aW9uKGNhcm91c2VsKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcm91c2VsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKCBqUXVlcnkoY2Fyb3VzZWxbaV0pLmRhdGEoXCJpbml0XCIpICE9PSBcIm5vbmVcIiApe1xuICAgICAgICAgICAgalF1ZXJ5KGNhcm91c2VsW2ldKS5zbGljayh7XG4gICAgICAgICAgICAgICAgXCJkb3RzXCIgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiIsIi8qKlxuICogQ2VydHkgUG9ydGZvbGlvXG4gKi9cblxuY2VydHkucG9ydGZvbGlvID0ge1xuICAgIHBvcHVwU2xpZGVyOiAnJyxcbiAgICBwb3B1cENhcm91c2VsOiAnJyxcbiAgICBjdXJyZW50RW1iZWQ6IGZhbHNlLFxuICAgIGN1cnJlbnRFbWJlZFR5cGU6IGZhbHNlLFxuXG4gICAgaW5pdEdyaWQ6IGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgLy8gaXNvdG9wZSBpbml0aWFsaXphdGlvblxuICAgICAgICB2YXIgZ3JpZCA9IGVsLmlzb3RvcGUoe1xuICAgICAgICAgICAgaXNPcmlnaW5MZWZ0OiAhY2VydHkudmFycy5ydGwsXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGYtZ3JpZC1pdGVtJyxcbiAgICAgICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogJy5wZi1ncmlkLXNpemVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBsYXlvdXQgaXNvdG9wZSBhZnRlciBlYWNoIGltYWdlIGxvYWRzXG4gICAgICAgIGdyaWQuaW1hZ2VzTG9hZGVkKCkucHJvZ3Jlc3MoIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZ3JpZC5pc290b3BlKCdsYXlvdXQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaXNvdG9wZSBmaWx0ZXJcbiAgICAgICAgdmFyIGZpbHRlciA9IGVsLmNsb3Nlc3QoJy5wZi13cmFwJykuZmluZCgnLnBmLWZpbHRlcicpO1xuICAgICAgICBpZiAoZmlsdGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJfYnRuID0gZmlsdGVyLmZpbmQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgdmFyIGZpbHRlcl9idG5fZmlyc3QgPSBqUXVlcnkoJy5wZi1maWx0ZXIgYnV0dG9uOmZpcnN0LWNoaWxkJyk7XG5cbiAgICAgICAgICAgIGZpbHRlcl9idG5fZmlyc3QuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICBmaWx0ZXJfYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJfYnRuLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2RhdGEtZmlsdGVyJyk7XG4gICAgICAgICAgICAgICAgZ3JpZC5pc290b3BlKHsgZmlsdGVyOiBmaWx0ZXJWYWx1ZSB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9wZW5Qb3B1cDogZnVuY3Rpb24oZWwpe1xuICAgICAgICAvLyBhZGQgb3BlbmVkIGNsYXNzIG9uIGh0bWxcbiAgICAgICAgY2VydHkudmFycy5odG1sLmFkZENsYXNzKCdjcnQtcGYtcG9wdXAtb3BlbmVkJyk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHBvcnRmb2xpbyBwb3B1cFxuICAgICAgICB0aGlzLnBvcHVwX3dyYXBwZXIgPSBqUXVlcnkoJzxkaXYgaWQ9XCJwZi1wb3B1cC13cmFwXCI+Jytcblx0XHRcdCc8YnV0dG9uIGlkPVwicGYtcG9wdXAtY2xvc2VcIj48aSBjbGFzcz1cImNydC1pY29uIGNydC1pY29uLWNsb3NlXCI+PC9pPjwvYnV0dG9uPicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInBmLXBvcHVwLWlubmVyXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGYtcG9wdXAtbWlkZGxlXCI+JytcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicGYtcG9wdXAtY29udGFpbmVyXCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIGlkPVwicGYtcG9wdXAtY2xvc2VcIj48aSBjbGFzcz1cInJzaWNvbiByc2ljb24tY2xvc2VcIj48L2k+PC9idXR0b24+JytcbiAgICAgICAgICAgICc8ZGl2IGlkPVwicGYtcG9wdXAtY29udGVudFwiIGNsYXNzPVwicGYtcG9wdXAtY29udGVudFwiPjwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+JytcbiAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPC9kaXY+Jyk7XG5cbiAgICAgICAgY2VydHkudmFycy5ib2R5LmFwcGVuZCggdGhpcy5wb3B1cF93cmFwcGVyICk7XG5cbiAgICAgICAgLy8gYWRkIHBvcnRmb2xpbyBwb3B1cCBjb250ZW50XG4gICAgICAgIHRoaXMucG9wdXBfY29udGVudCA9IGpRdWVyeSgnI3BmLXBvcHVwLWNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5wb3B1cF9jb250ZW50LmFwcGVuZCggZWwuY2xvbmUoKSApO1xuXG4gICAgICAgIC8vIHBvcHVwIHNsaWRlclxuICAgICAgICB0aGlzLnBvcHVwU2xpZGVyID0galF1ZXJ5KCcjcGYtcG9wdXAtY29udGVudCAucGYtcG9wdXAtbWVkaWEnKTtcblxuICAgICAgICAvLyBwb3B1cCBzbGlkZXI6IG9uIGluaXRcbiAgICAgICAgdGhpcy5wb3B1cFNsaWRlci5vbignaW5pdCcsIGZ1bmN0aW9uKGV2ZW50LCBzbGljaykge1xuICAgICAgICAgICAgY2VydHkucG9ydGZvbGlvLmxvYWRFbWJlZCgwKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBQb3J0Zm9saW8gUG9wdXAgVmlzaWJsZVxuICAgICAgICAgICAgalF1ZXJ5KHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHBvcHVwIHNsaWRlcjogYmVmb3JlIGNoYW5nZVxuICAgICAgICB0aGlzLnBvcHVwU2xpZGVyLm9uKCdiZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSkge1xuXG4gICAgICAgICAgICAvLyBTdG9wIGN1cnJlbnQgc2xpZGUgaWZyYW1lL3ZpZGVvIHBsYXlcbiAgICAgICAgICAgIGlmKCBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkICYmIGNlcnR5LnBvcnRmb2xpby5jdXJyZW50RW1iZWRUeXBlICl7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZyYW1lXCI6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZnJhbWUgPSBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkLmZpbmQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lLmF0dHIoJ3NyYycsIGlmcmFtZS5hdHRyKCdzcmMnKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvID0gY2VydHkucG9ydGZvbGlvLmN1cnJlbnRFbWJlZC5maW5kKCd2aWRlbycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9bMF0ucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb2FkIG5leHQgc2xpZGUgZW1iZWRcbiAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5sb2FkRW1iZWQobmV4dFNsaWRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcG9wdXAgc2xpZGVyOiBpbml0aWFsaXplXG4gICAgICAgIHRoaXMucG9wdXBTbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgYXJyb3c6IHRydWUsXG4gICAgICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBwb3B1cCBjYXJvdXNlbFxuICAgICAgICB0aGlzLnBvcHVwQ2Fyb3VzZWwgPSBqUXVlcnkoJyNwZi1wb3B1cC1jb250ZW50IC5wZi1yZWwtY2Fyb3VzZWwnKTtcblxuICAgICAgICAvLyBwb3B1cCBjYXJvdXNlbDogaW5pdGlhbGl6ZVxuICAgICAgICB0aGlzLnBvcHVwQ2Fyb3VzZWwuc2xpY2soe1xuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gbWFrZSBwb3J0Zm9saW8gcG9wdXAgdmlzaWJsZVxuICAgICAgICB0aGlzLnBvcHVwX3dyYXBwZXIuYWRkQ2xhc3MoJ3BmLW9wZW5lZCcpO1xuXG4gICAgICAgIC8vIGxvY2sgd2luZG93IHNjcm9sbFxuICAgICAgICBjZXJ0eS5sb2NrU2Nyb2xsKCk7XG4gICAgfSxcblxuICAgIGNsb3NlUG9wdXA6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIC8vIHJlbW92ZSBvcGVuZWQgY2xhc3MgZnJvbSBodG1sXG4gICAgICAgIGNlcnR5LnZhcnMuaHRtbC5yZW1vdmVDbGFzcygnY3ItcG9ydGZvbGlvLW9wZW5lZCcpO1xuXG4gICAgICAgIC8vIG1ha2UgcG9ydGZvbGlvIHBvcHVwIGludmlzaWJsZVxuICAgICAgICB0aGlzLnBvcHVwX3dyYXBwZXIucmVtb3ZlQ2xhc3MoJ3BmLW9wZW5lZCcpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5wb3B1cF93cmFwcGVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgY2VydHkudW5sb2NrU2Nyb2xsKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfSxcblxuICAgIGxvYWRFbWJlZDogZnVuY3Rpb24gKHNsaWRlSW5kZXgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRFbWJlZCA9IGpRdWVyeSgnI3BmLXBvcHVwLWNvbnRlbnQgLnBmLXBvcHVwLXNsaWRlW2RhdGEtc2xpY2staW5kZXg9XCInICsgc2xpZGVJbmRleCArICdcIl0nKS5maW5kKCcucGYtcG9wdXAtZW1iZWQnKTtcbiAgICAgICAgdmFyIGN1cnJlbnRFbWJlZFR5cGUgPSBqUXVlcnkudHJpbShjdXJyZW50RW1iZWQuZGF0YSgndHlwZScpKTtcbiAgICAgICAgdmFyIGN1cmVudEVtYmVkVXJsID0galF1ZXJ5LnRyaW0oY3VycmVudEVtYmVkLmRhdGEoJ3VybCcpKTtcblxuICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkID0gY3VycmVudEVtYmVkO1xuICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uY3VycmVudEVtYmVkVHlwZSA9IGN1cnJlbnRFbWJlZFR5cGU7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgJ2N1cnJlbnRFbWJlZCcgc3RpbGwgbm90IGxvYWRlZCB0aGVuIGRvIGFjdGlvbnNcbiAgICAgICAgaWYgKCFjdXJyZW50RW1iZWQuaGFzQ2xhc3MoJ3BmLWVtYmVkLWxvYWRlZCcpKSB7XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmICdjdXJyZW50RW1iZWQnIHVybCBhbmQgdHlwZSBhcmUgcHJvdmlkZWRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY3VycmVudEVtYmVkVHlwZSAhPT0gdHlwZW9mIHVuZGVmaW5lZCAmJiBjdXJyZW50RW1iZWRUeXBlICE9PSBmYWxzZSAmJiBjdXJyZW50RW1iZWRUeXBlICE9PSBcIlwiICYmIHR5cGVvZiBjdXJlbnRFbWJlZFVybCAhPT0gdHlwZW9mIHVuZGVmaW5lZCAmJiBjdXJlbnRFbWJlZFVybCAhPT0gZmFsc2UgJiYgY3VyZW50RW1iZWRVcmwgIT09IFwiXCIpIHtcblxuICAgICAgICAgICAgICAgIC8vIFNldCBlbWJlZCBkaW1lbnNpb25zIGlmIHByb3ZpZGVkXG4gICAgICAgICAgICAgICAgdmFyIGVtYmVkVyA9IGpRdWVyeS50cmltKGN1cnJlbnRFbWJlZC5kYXRhKCd3aWR0aCcpKTtcbiAgICAgICAgICAgICAgICB2YXIgZW1iZWRIID0galF1ZXJ5LnRyaW0oY3VycmVudEVtYmVkLmRhdGEoJ2hlaWdodCcpKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVtYmVkVyAhPT0gdHlwZW9mIHVuZGVmaW5lZCAmJiBlbWJlZFcgIT09IGZhbHNlICYmIGVtYmVkVyAhPT0gXCJcIiAmJiB0eXBlb2YgZW1iZWRIICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmIGVtYmVkSCAhPT0gZmFsc2UgJiYgZW1iZWRIICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5jc3MoeydwYWRkaW5nLXRvcCc6IChlbWJlZEgvZW1iZWRXKjEwMCkrJyUnfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gTG9hZCBhcHByb3ByaWF0ZSBlbWJlZFxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudEVtYmVkVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaW1hZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBlbWJlZCB0eXBlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW1iZWQuYWRkQ2xhc3MoJ3BmLWVtYmVkLWltYWdlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBlbWJlZFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZyA9IGpRdWVyeSgnPGltZy8+Jyx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBjdXJlbnRFbWJlZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmxvYWQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuZmFkZUluKDUwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmFkZENsYXNzKCdwZi1lbWJlZC1sb2FkZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmVycm9yKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmFkZENsYXNzKCdwZi1lbWJlZC1lcnJvcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5lbXB0eSgpLmFwcGVuZChpbWcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZyYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZW1iZWQgdHlwZSBjbGFzc1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmFkZENsYXNzKCdwZi1lbWJlZC1pZnJhbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIEVtYmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWZyYW1lID0galF1ZXJ5KCc8aWZyYW1lLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBjdXJlbnRFbWJlZFVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2Rpc3BsYXk6bm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkubG9hZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW1iZWQuYWRkQ2xhc3MoJ3BmLWVtYmVkLWxvYWRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZXJyb3IoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50RW1iZWQuYWRkQ2xhc3MoJ3BmLWVtYmVkLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEVtYmVkLmVtcHR5KCkuYXBwZW5kKGlmcmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2aWRlb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGVtYmVkIHR5cGUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5hZGRDbGFzcygncGYtZW1iZWQtdmlkZW8nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIEVtYmVkXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlkZW9PcHRpb25zID0gdGhpcy5wYXJzZU9wdGlvbnMoY3VyZW50RW1iZWRVcmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZGVvID0gJzx2aWRlbyAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9PcHRpb25zLnBvc3RlcikgdmlkZW8gKz0gJ3Bvc3Rlcj1cIicrdmlkZW9PcHRpb25zLnBvc3RlcisnXCIgJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvICs9ICdjb250cm9scz1cImNvbnRyb2xzXCIgcHJlbG9hZD1cInllc1wiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2aWRlb09wdGlvbnMubXA0KSB2aWRlbyArPSAnPHNvdXJjZSB0eXBlPVwidmlkZW8vbXA0XCIgc3JjPVwiJyt2aWRlb09wdGlvbnMubXA0KydcIi8+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZpZGVvT3B0aW9ucy53ZWJtKSB2aWRlbyArPSAnPHNvdXJjZSB0eXBlPVwidmlkZW8vd2VibVwiIHNyYz1cIicrdmlkZW9PcHRpb25zLndlYm0rJ1wiLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmlkZW9PcHRpb25zLm9ndikgdmlkZW8gKz0gJzxzb3VyY2UgdHlwZT1cInZpZGVvL29nZ1wiIHNyYz1cIicrdmlkZW9PcHRpb25zLm9ndisnXCIvPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbyArPSAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy48L3ZpZGVvPic7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbWJlZC5lbXB0eSgpLmFwcGVuZCggalF1ZXJ5KHZpZGVvKSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcGFyc2VPcHRpb25zOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgdmFyIGRlbGltaXRlckluZGV4O1xuICAgICAgICB2YXIgb3B0aW9uO1xuICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgdmFyIGFycjtcbiAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHNwYWNlcyBhcm91bmQgZGVsaW1pdGVycyBhbmQgc3BsaXRcbiAgICAgICAgYXJyID0gc3RyLnJlcGxhY2UoL1xccyo6XFxzKi9nLCAnOicpLnJlcGxhY2UoL1xccyosXFxzKi9nLCAnLCcpLnNwbGl0KCcsJyk7XG5cbiAgICAgICAgLy8gUGFyc2UgYSBzdHJpbmdcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBvcHRpb24gPSBhcnJbaV07XG5cbiAgICAgICAgICAgIC8vIElnbm9yZSB1cmxzIGFuZCBhIHN0cmluZyB3aXRob3V0IGNvbG9uIGRlbGltaXRlcnNcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VhcmNoKC9eKGh0dHB8aHR0cHN8ZnRwKTpcXC9cXC8vKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VhcmNoKCc6JykgPT09IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsaW1pdGVySW5kZXggPSBvcHRpb24uaW5kZXhPZignOicpO1xuICAgICAgICAgICAgcHJvcCA9IG9wdGlvbi5zdWJzdHJpbmcoMCwgZGVsaW1pdGVySW5kZXgpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9uLnN1YnN0cmluZyhkZWxpbWl0ZXJJbmRleCArIDEpO1xuXG4gICAgICAgICAgICAvLyBJZiB2YWwgaXMgYW4gZW1wdHkgc3RyaW5nLCBtYWtlIGl0IHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgaWYgaXQgaXMgbGlrZSBhIGJvb2xlYW5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbCA9PT0gJ3RydWUnIHx8ICh2YWwgPT09ICdmYWxzZScgPyBmYWxzZSA6IHZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdmFsdWUgaWYgaXQgaXMgbGlrZSBhIG51bWJlclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gIWlzTmFOKHZhbCkgPyArdmFsIDogdmFsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYmpbcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBub3RoaW5nIGlzIHBhcnNlZFxuICAgICAgICBpZiAocHJvcCA9PSBudWxsICYmIHZhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG59O1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKGZ1bmN0aW9uICgpIHsgLy8gc3RhcnQ6IGRvY3VtZW50IHJlYWR5XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBTZXQgR2xvYmFsIFZhcnNcbiAgICAgICAgICovXG4gICAgICAgIGNlcnR5LmluaXRHbG9iYWxWYXJzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICBOYXZpZ2F0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoY2VydHkudmFycy5ib2R5Lmhhc0NsYXNzKCdjcnQtbmF2LW9uJykpIHsgLy8gQ2hlY2sgSWYgTmF2IEV4aXN0c1xuICAgICAgICAgICAgLy8gU2Nyb2xsZWQgTmF2aWdhdGlvbiAoIGxhcmdlIHNjcmVlbnMgKVxuICAgICAgICAgICAgaWYgKCBNb2Rlcm5penIubXEoJyhtaW4td2lkdGg6ICcrY2VydHkudmFycy5zY3JlZW5NZCsnKScpICYmIGNlcnR5Lm5hdi5oZWlnaHQgIT09ICdhdXRvJyApIHtcbiAgICAgICAgICAgICAgICBjZXJ0eS5uYXYuaW5pdFNjcm9sbCggJCgnI2NydE5hdlNjcm9sbCcpICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0aWNreSBOYXZpZ2F0aW9uXG4gICAgICAgICAgICBjZXJ0eS5uYXYubWFrZVN0aWNreSgpO1xuXG4gICAgICAgICAgICAvLyBOYXZpZ2F0aW9uIFRvb2x0aXBzXG4gICAgICAgICAgICBpZihjZXJ0eS5uYXYudG9vbHRpcC5hY3RpdmUpe1xuICAgICAgICAgICAgICAgICQoJyNjcnROYXYgYScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VydHkubmF2LnRvb2x0aXAuc2hvdyggJCh0aGlzKSApO1xuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjZXJ0eS5uYXYudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBbmNob3IgTmF2aWdhdGlvblxuICAgICAgICAgICAgJCgnI2NydE5hdicpLm9uZVBhZ2VOYXYoe1xuICAgICAgICAgICAgICAgIGNoYW5nZUhhc2g6IHRydWUsXG4gICAgICAgICAgICAgICAgc2Nyb2xsVGhyZXNob2xkOiAwLjUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiAnOm5vdCguZXh0ZXJuYWwpJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogIEZpeGVkIFNpZGUgQm94XG4gICAgICAgICAqL1xuICAgICAgICBjZXJ0eS5zaWRlQm94Lm1ha2VTdGlja3koKTtcblxuICAgICAgICAvKiogUG9ydGZvbGlvICovXG4gICAgICAgIHZhciBwZl9ncmlkID0gJCgnLnBmLWdyaWQnKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBncmlkIGV4aXN0cyB0aGFuIGRvIGFjdGlvblxuICAgICAgICBpZiAocGZfZ3JpZC5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGluaXQgcG9ydGZvbGlvIGdyaWRcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGZfZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5pbml0R3JpZCggJChwZl9ncmlkW2ldKSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvcGVuIHBvcnRmb2xpbyBwb3B1cFxuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5wZi1wcm9qZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgICAgICAgICBjZXJ0eS5wb3J0Zm9saW8ub3BlblBvcHVwKCAkKGlkKSApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucGYtcmVsLWhyZWYnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgY29udGFpbiBhbmNob3IsIG9wZW4gcHJvamVjdCBwb3B1cFxuICAgICAgICAgICAgICAgIGlmKCBocmVmLmluZGV4T2YoXCIjXCIpICE9IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBhbHJlYWR5IG9wZW5lZCBwb3B1cFxuICAgICAgICAgICAgICAgICAgICBjZXJ0eS5wb3J0Zm9saW8uY2xvc2VQb3B1cCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW4gbmV3IG9uZSBhZnRlciB0aW1lb3V0XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5vcGVuUG9wdXAoICQoaHJlZikgKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cdFx0XHRcblx0XHRcdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjcGYtcG9wdXAtY2xvc2UnLCBmdW5jdGlvbigpIHtcdFx0XHRcdFxuICAgICAgICAgICAgICAgIGNlcnR5LnBvcnRmb2xpby5jbG9zZVBvcHVwKCk7XG5cdFx0XHR9KTtcblxuICAgICAgICAgICAgLy8gY2xvc2UgcG9ydGZvbGlvIHBvcHVwXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbigndG91Y2hzdGFydCBjbGljaycsICcuY3J0LXBmLXBvcHVwLW9wZW5lZCAjcGYtcG9wdXAtd3JhcCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJyNwZi1wb3B1cC1jb250ZW50Jyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyLi4uIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIGlmICghY29udGFpbmVyLmlzKGUudGFyZ2V0KSAmJiBjb250YWluZXIuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2VydHkucG9ydGZvbGlvLmNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKiBDb21wb25lbnRzICovXG4gICAgICAgIC8vIGluaXQgc2xpZGVyc1xuICAgICAgICBjZXJ0eS5zbGlkZXIoICQoXCIuY3Itc2xpZGVyXCIpICk7XG5cbiAgICAgICAgLy8gaW5pdCBjYXJvdXNlbFxuICAgICAgICBjZXJ0eS5jYXJvdXNlbCggJChcIi5jci1jYXJvdXNlbFwiKSApO1xuXHRcdFxuXHRcdC8qKiBXaW5kb3cgU2Nyb2xsIFRvcCBCdXR0b24gKi9cbiAgICAgICAgdmFyICRidG5TY3JvbGxUb3AgPSAkKCcjY3J0QnRuVXAnKTtcblx0XHRcblx0XHRpZigkYnRuU2Nyb2xsVG9wLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAkYnRuU2Nyb2xsVG9wLnNob3coMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRidG5TY3JvbGxUb3AuaGlkZSgwKTtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0JCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID4gMTAwKSB7XG5cdFx0XHRcdFx0JGJ0blNjcm9sbFRvcC5zaG93KDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRidG5TY3JvbGxUb3AuaGlkZSgwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCRidG5TY3JvbGxUb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgODAwKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fVxuICAgIH0pOyAvLyBlbmQ6IGRvY3VtZW50IHJlYWR5XG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7IC8vIHN0YXJ0OiB3aW5kb3cgcmVzaXplXG5cbiAgICAgICAgLy8gUmUgSW5pdCBWYXJzXG4gICAgICAgIGNlcnR5LnZhcnMud2luZG93VyA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICBjZXJ0eS52YXJzLndpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICAgIGNlcnR5LnZhcnMud2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIC8vIFN0aWNreSBOYXZpZ2F0aW9uXG4gICAgICAgIGNlcnR5Lm5hdi5tYWtlU3RpY2t5KCk7XG5cbiAgICAgICAgLy8gU3RpY2t5IFNpZGUgQm94XG4gICAgICAgIGNlcnR5LnNpZGVCb3gubWFrZVN0aWNreSgpO1xuXG4gICAgfSk7IC8vIGVuZDogd2luZG93IHJlc2l6ZVxuXG5cblxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkgeyAvLyBzdGFydDogd2luZG93IHNjcm9sbFxuXG4gICAgICAgIC8vIFJlIEluaXQgVmFyc1xuICAgICAgICBjZXJ0eS52YXJzLndpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgICAgICAvLyBTdGlja3kgTmF2aWdhdGlvblxuICAgICAgICBjZXJ0eS5uYXYubWFrZVN0aWNreSgpO1xuXG4gICAgICAgIC8vIFN0aWNreSBTaWRlIEJveFxuICAgICAgICBjZXJ0eS5zaWRlQm94Lm1ha2VTdGlja3koKTtcblxuICAgICAgICAvLyBSZW1vdmUgVG9vbHRpcFxuICAgICAgICBpZihjZXJ0eS5uYXYudG9vbHRpcC5lbC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGNlcnR5Lm5hdi50b29sdGlwLmVsLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICB9KTsgLy8gZW5kOiB3aW5kb3cgc2Nyb2xsXG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkgeyAvLyBzdGFydDogd2luZG93IGxvYWRcblxuICAgIH0pOyAvLyBlbmQ6IHdpbmRvdyBsb2FkXG5cbn0pKGpRdWVyeSk7IiwiLy8gVGhlbWUgVmFyaWFibGVzXG52YXIgYWNlID0ge1xuICAgIGh0bWw6ICcnLFxuICAgIGJvZHk6ICcnLFxuICAgIG1vYmlsZTogJycsXG5cbiAgICBzaWRlYmFyOiB7XG4gICAgICAgIG9iajogJycsXG4gICAgICAgIGJ0bjogJydcbiAgICB9LFxuXG4gICAgbmF2OiB7XG4gICAgICAgIG9iajogJycsXG4gICAgICAgIHRvb2x0aXA6IGpRdWVyeSgnPGRpdiBjbGFzcz1cImNydC10b29sdGlwXCI+PC9kaXY+JylcbiAgICB9LFxuXG4gICAgb3ZlcmxheToge1xuICAgICAgICBvYmo6IGpRdWVyeSgnPGRpdiBpZD1cImNydE92ZXJsYXlcIj48L2Rpdj4nKVxuICAgIH0sXG5cbiAgICBwcm9ncmVzczoge1xuICAgICAgICBsaW5lczogJycsXG4gICAgICAgIGNoYXJ0czogJycsXG4gICAgICAgIGJ1bGxldHM6ICcnXG4gICAgfVxufTtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cdFxuXHQkKGZ1bmN0aW9uICgpIHsgLy8gc3RhcnQ6IGRvY3VtZW50IHJlYWR5XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBJbml0IE1haW4gVmFyc1xuXHRcdCAqL1xuXHRcdGFjZS5odG1sID0gJCgnaHRtbCcpO1xuXHRcdGFjZS5ib2R5ID0gJCgnYm9keScpO1xuXG5cdFx0LyoqXG5cdFx0ICogQ2VydHkgRGV0ZWN0IERldmljZSBUeXBlXG5cdFx0ICovXG5cdFx0YWNlX2RldGVjdF9kZXZpY2VfdHlwZSgpO1xuXG5cdFx0LyoqXG5cdFx0ICogQ2VydHkgTW9iaWxlIE5hdmlnYXRpb25cblx0XHQgKi9cblx0XHQkKCcjY3J0TWFpbk5hdlNtIC5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYScpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKXtcblx0XHRcdGlmKCAkKHRoaXMpLmhhc0NsYXNzKCdob3ZlcicpICl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcblx0XHRcdFx0JCh0aGlzKS5uZXh0KCkuc2xpZGVEb3duKDUwMCk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIENlcnR5IFNpZGViYXJcblx0XHQgKi9cblx0XHRhY2Uuc2lkZWJhci5vYmogPSAkKCcjY3J0U2lkZWJhcicpO1xuXHRcdGFjZS5zaWRlYmFyLmJ0biA9ICQoJyNjcnRTaWRlYmFyQnRuJyk7XG5cblx0XHQvLyBPcGVuIFNpZGViYXJcblx0XHRhY2Uuc2lkZWJhci5idG4ub24oJ3RvdWNoc3RhcnQgY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRhY2Vfb3Blbl9zaWRlYmFyKCk7XG5cdFx0fSk7XG5cblx0XHQvLyBDbG9zZSBTaWRlYmFyIFRocm91Z2ggT3ZlcmxheVxuXHRcdCQoZG9jdW1lbnQpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgJy5jcnQtc2lkZWJhci1vcGVuZWQgI2NydE92ZXJsYXknLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIGNvbnRhaW5lciA9IGFjZS5zaWRlYmFyLm9iajtcblx0XHRcdC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIuLi4gbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG5cdFx0XHRpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdGFjZV9jbG9zZV9zaWRlYmFyKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBDbG9zZSBTaWRlYmFyIFVzaW5nIEJ1dHRvblxuXHRcdCQoJyNjcnRTaWRlYmFyQ2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRhY2VfY2xvc2Vfc2lkZWJhcigpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gU2lkZWJhciBDdXN0b20gU2Nyb2xsXG5cdFx0JChcIiNjcnRTaWRlYmFySW5uZXJcIikubUN1c3RvbVNjcm9sbGJhcih7XG5cdFx0XHRheGlzOiBcInlcIixcblx0XHRcdHRoZW1lOiBcIm1pbmltYWwtZGFya1wiLFxuXHRcdFx0YXV0b0hpZGVTY3JvbGxiYXI6IHRydWUsXG5cdFx0XHRzY3JvbGxCdXR0b25zOiB7IGVuYWJsZTogdHJ1ZSB9XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBDaXJjbGUgJiBMaW5lIENoYXJ0c1xuXHRcdCAqL1xuXHRcdGlmKCFjZXJ0eS5wcm9ncmVzcy5hbmltYXRpb24gfHwgYWNlLm1vYmlsZSkge1xuXHRcdFx0Ly8gQ2lyY2xlIENoYXJ0XG5cdFx0XHRhY2UucHJvZ3Jlc3MuY2hhcnRzID0gJCgnLnByb2dyZXNzLWNoYXJ0IC5wcm9ncmVzcy1iYXInKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWNlLnByb2dyZXNzLmNoYXJ0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgY2hhcnQgPSAkKGFjZS5wcm9ncmVzcy5jaGFydHNbaV0pO1xuXG5cdFx0XHRcdGFjZV9wcm9ncmVzc19jaGFydChjaGFydFswXSwgY2hhcnQuZGF0YSgndGV4dCcpLCBjaGFydC5kYXRhKCd2YWx1ZScpLCAxKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTGluZSBDaGFydFxuXHRcdFx0YWNlLnByb2dyZXNzLmxpbmVzID0gJCgnLnByb2dyZXNzLWxpbmUgLnByb2dyZXNzLWJhcicpO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhY2UucHJvZ3Jlc3MubGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGxpbmUgPSAkKGFjZS5wcm9ncmVzcy5saW5lc1tpXSk7XG5cblx0XHRcdFx0YWNlX3Byb2dyZXNzX2xpbmUobGluZVswXSwgbGluZS5kYXRhKCd0ZXh0JyksIGxpbmUuZGF0YSgndmFsdWUnKSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ2VydHkgQW5pbWF0ZSBFbGVtZW50c1xuXHRcdCAqL1xuXHRcdGlmKGNlcnR5LnByb2dyZXNzLmFuaW1hdGlvbiAmJiAhYWNlLm1vYmlsZSkge1xuXHRcdFx0YWNlX2FwcGVhcl9lbGVtcygkKCcuY3J0LWFuaW1hdGUnKSwgMCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogQ29kZSBIaWdobGlnaHRcblx0XHQgKi9cblx0XHQkKCdwcmUnKS5lYWNoKGZ1bmN0aW9uIChpLCBibG9jaykge1xuXHRcdFx0aGxqcy5oaWdobGlnaHRCbG9jayhibG9jayk7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBBbGVydHNcblx0XHQgKi9cblx0XHQkKCcuYWxlcnQgLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGFsZXJ0ID0gJCh0aGlzKS5wYXJlbnQoKTtcblxuXHRcdFx0YWxlcnQuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0YWxlcnQucmVtb3ZlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIENlcnR5IFNsaWRlclxuXHRcdCAqL1xuXHRcdCQoJy5zbGlkZXInKS5zbGljayh7XG5cdFx0XHRkb3RzOiB0cnVlXG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBDZXJ0eSBHb29nbGUgTWFwIEluaXRpYWxpc2F0aW9uXG5cdFx0ICovXG5cdFx0aWYgKCQoJyNtYXAnKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRpbml0aWFsaXNlR29vZ2xlTWFwKCBjZXJ0eV92YXJzX2Zyb21fV1AubWFwU3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogIFRhYnNcblx0XHQgKi9cblx0XHR2YXIgdGFiQWN0aXZlID0gJCgnLnRhYnMtbWVudT5saS5hY3RpdmUnKTtcblx0XHRpZiggdGFiQWN0aXZlLmxlbmd0aCA+IDAgKXtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGFiQWN0aXZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciB0YWJfaWQgPSAkKHRhYkFjdGl2ZVtpXSkuY2hpbGRyZW4oKS5hdHRyKCdocmVmJyk7XG5cblx0XHRcdFx0JCh0YWJfaWQpLmFkZENsYXNzKCdhY3RpdmUnKS5zaG93KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0JCgnLnRhYnMtbWVudSBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cdFx0XHR2YXIgdGFiID0gJCh0aGlzKTtcblx0XHRcdHZhciB0YWJfaWQgPSB0YWIuYXR0cignaHJlZicpO1xuXHRcdFx0dmFyIHRhYl93cmFwID0gdGFiLmNsb3Nlc3QoJy50YWJzJyk7XG5cdFx0XHR2YXIgdGFiX2NvbnRlbnQgPSB0YWJfd3JhcC5maW5kKCcudGFiLWNvbnRlbnQnKTtcblxuXHRcdFx0dGFiLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0dGFiLnBhcmVudCgpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0dGFiX2NvbnRlbnQubm90KHRhYl9pZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmhpZGUoKTtcblx0XHRcdCQodGFiX2lkKS5hZGRDbGFzcygnYWN0aXZlJykuZmFkZUluKDUwMCk7XG5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIFRvZ2dsZUJveFxuXHRcdCAqL1xuXHRcdHZhciB0b2dnbGVib3hBY3RpdmUgPSAkKCcudG9nZ2xlYm94PmxpLmFjdGl2ZScpO1xuXHRcdGlmKCB0b2dnbGVib3hBY3RpdmUubGVuZ3RoID4gMCApe1xuXHRcdFx0dG9nZ2xlYm94QWN0aXZlLmZpbmQoJy50b2dnbGVib3gtY29udGVudCcpLnNob3coKTtcblx0XHR9XG5cblx0XHQkKCcudG9nZ2xlYm94LWhlYWRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgdG9nZ2xlX2hlYWQgPSAkKHRoaXMpO1xuXG5cdFx0XHR0b2dnbGVfaGVhZC5uZXh0KCcudG9nZ2xlYm94LWNvbnRlbnQnKS5zbGlkZVRvZ2dsZSgzMDApO1xuXHRcdFx0dG9nZ2xlX2hlYWQucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdH0pO1xuXG5cblx0XHQvKipcblx0XHQgKiBBY2NvcmRlb25cblx0XHQgKi9cblx0XHR2YXIgYWNjb3JkZW9uQWN0aXZlID0gJCgnLmFjY29yZGlvbj5saS5hY3RpdmUnKTtcblx0XHRpZiggYWNjb3JkZW9uQWN0aXZlLmxlbmd0aCA+IDAgKXtcblx0XHRcdGFjY29yZGVvbkFjdGl2ZS5maW5kKCcuYWNjb3JkaW9uLWNvbnRlbnQnKS5zaG93KCk7XG5cdFx0fVxuXG5cdFx0JCgnLmFjY29yZGlvbi1oZWFkZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGFjY19oZWFkID0gJCh0aGlzKTtcblx0XHRcdHZhciBhY2Nfc2VjdGlvbiA9IGFjY19oZWFkLnBhcmVudCgpO1xuXHRcdFx0dmFyIGFjY19jb250ZW50ID0gYWNjX2hlYWQubmV4dCgpO1xuXHRcdFx0dmFyIGFjY19hbGxfY29udGVudHMgPSBhY2NfaGVhZC5jbG9zZXN0KCcuYWNjb3JkaW9uJykuZmluZCgnLmFjY29yZGlvbi1jb250ZW50Jyk7XG5cblx0XHRcdGlmKGFjY19zZWN0aW9uLmhhc0NsYXNzKCdhY3RpdmUnKSl7XG5cdFx0XHRcdGFjY19zZWN0aW9uLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0YWNjX2NvbnRlbnQuc2xpZGVVcCgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGFjY19zZWN0aW9uLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHRhY2Nfc2VjdGlvbi5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdFx0XHRcdGFjY19hbGxfY29udGVudHMuc2xpZGVVcCgzMDApO1xuXHRcdFx0XHRhY2NfY29udGVudC5zbGlkZURvd24oMzAwKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIENvbW1lbnRzIE9wZW4vQ2xvc2Vcblx0XHQgKi9cblx0XHQkKCcuY29tbWVudC1yZXBseXMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLmNsb3Nlc3QoJy5jb21tZW50JykudG9nZ2xlQ2xhc3MoJ3Nob3ctcmVwbGllcycpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cblx0XHQvKipcblx0XHQgKiBQb3J0Zm9saW8gUG9wdXBcblx0XHQgKi9cblx0XHR2YXIgcGZfcG9wdXAgPSB7fTtcblx0XHRwZl9wb3B1cC53cmFwcGVyID0gbnVsbDtcblx0XHRwZl9wb3B1cC5jb250ZW50ID0gbnVsbDtcblx0XHRwZl9wb3B1cC5zbGlkZXIgPSBudWxsO1xuXG5cdFx0cGZfcG9wdXAub3BlbiA9IGZ1bmN0aW9uICggZWwgKXtcblx0XHRcdC8vIEFwcGVuZCBQb3J0Zm9saW8gUG9wdXBcblx0XHRcdHRoaXMud3JhcHBlciA9ICQoJzxkaXYgaWQ9XCJwZi1wb3B1cC13cmFwXCIgY2xhc3M9XCJwZi1wb3B1cC13cmFwXCI+Jytcblx0XHRcdCc8ZGl2IGNsYXNzPVwicGYtcG9wdXAtaW5uZXJcIj4nK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJwZi1wb3B1cC1taWRkbGVcIj4nK1xuXHRcdFx0JzxkaXYgY2xhc3M9XCJwZi1wb3B1cC1jb250YWluZXJcIj4nK1xuXHRcdFx0JzxidXR0b24gaWQ9XCJwZi1wb3B1cC1jbG9zZVwiPjxpIGNsYXNzPVwicnNpY29uIHJzaWNvbi1jbG9zZVwiPjwvaT48L2J1dHRvbj4nK1xuXHRcdFx0JzxkaXYgaWQ9XCJwZi1wb3B1cC1jb250ZW50XCIgY2xhc3M9XCJwZi1wb3B1cC1jb250ZW50XCI+PC9kaXY+Jytcblx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0JzwvZGl2PicrXG5cdFx0XHQnPC9kaXY+Jyk7XG5cblx0XHRcdGFjZS5ib2R5LmFwcGVuZCh0aGlzLndyYXBwZXIpO1xuXG5cdFx0XHQvLyBBZGQgUG9ydGZvbGlvIFBvcHVwIEl0ZW1zXG5cdFx0XHR0aGlzLmNvbnRlbnQgPSAkKCcjcGYtcG9wdXAtY29udGVudCcpO1xuXHRcdFx0dGhpcy5jb250ZW50LmFwcGVuZCggZWwuY2xvbmUoKSApO1xuXG5cdFx0XHQvLyBNYWtlIFBvcnRmb2xpbyBQb3B1cCBWaXNpYmxlXG5cdFx0XHRwZl9wb3B1cC53cmFwcGVyLmFkZENsYXNzKCdvcGVuZWQnKTtcblx0XHRcdGFjZV9sb2NrX3Njcm9sbCgpO1xuXHRcdH07XG5cblx0XHRwZl9wb3B1cC5jbG9zZSA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aGlzLndyYXBwZXIucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHRwZl9wb3B1cC53cmFwcGVyLnJlbW92ZSgpO1xuXHRcdFx0XHRhY2VfdW5sb2NrX3Njcm9sbCgpO1xuXHRcdFx0fSwgNTAwKTtcblx0XHR9O1xuXG5cdFx0Ly8gT3BlbiBQb3J0Zm9saW8gUG9wdXBcblx0XHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnBmLWJ0bi12aWV3JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcblx0XHRcdHBmX3BvcHVwLm9wZW4oICQoaWQpICk7XG5cblx0XHRcdGFjZS5odG1sLmFkZENsYXNzKCdjcnQtcG9ydGZvbGlvLW9wZW5lZCcpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cblx0XHQvLyBDbG9zZSBQb3J0Zm9saW8gUG9wdXBcblx0XHQkKGRvY3VtZW50KS5vbigndG91Y2hzdGFydCBjbGljaycsICcuY3J0LXBvcnRmb2xpby1vcGVuZWQgI3BmLXBvcHVwLXdyYXAnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0dmFyIGNvbnRhaW5lciA9ICQoJyNwZi1wb3B1cC1jb250ZW50Jyk7XG5cblx0XHRcdC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIuLi4gbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXG5cdFx0XHRpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdHBmX3BvcHVwLmNsb3NlKCk7XG5cdFx0XHRcdGFjZS5odG1sLnJlbW92ZUNsYXNzKCdjcnQtcG9ydGZvbGlvLW9wZW5lZCcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICogU2hvdyBDb2RlIDxwcmU+XG5cdFx0ICovXG5cdFx0JCgnLnRvZ2dsZS1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpZCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuXG5cdFx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKCdvcGVuZWQnKSl7XG5cdFx0XHRcdCQoaWQpLnNsaWRlVXAoNTAwKTtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQkKGlkKS5zbGlkZURvd24oNTAwKTtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcygnb3BlbmVkJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblxuXHRcdC8qKlxuXHRcdCAqIFNoYXJlIEJ1dHRvblxuXHRcdCAqL1xuXHRcdCQoJy5zaGFyZS1idG4nKS5vbiggXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uKCl7XG5cdFx0XHQkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdob3ZlcmVkJyk7XG5cdFx0fSk7XG5cblx0XHQkKCcuc2hhcmUtYm94Jykub24oIFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIHNoYXJlX2JveCA9ICQodGhpcyk7XG5cblx0XHRcdGlmKHNoYXJlX2JveC5oYXNDbGFzcygnaG92ZXJlZCcpKXtcblx0XHRcdFx0c2hhcmVfYm94LmFkZENsYXNzKCdjbG9zaW5nJyk7XG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2hhcmVfYm94LnJlbW92ZUNsYXNzKCdob3ZlcmVkJyk7XG5cdFx0XHRcdFx0c2hhcmVfYm94LnJlbW92ZUNsYXNzKCdjbG9zaW5nJyk7XG5cdFx0XHRcdH0sMzAwKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KTsgLy8gZW5kOiBkb2N1bWVudCByZWFkeVxufSkoalF1ZXJ5KTsiXX0=

;!function(a, b) {
    "use strict";
    function c() {
        if (!e) {
            e = !0;
            var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"), h = !!navigator.userAgent.match(/Trident.*rv:11\./), i = b.querySelectorAll("iframe.wp-embedded-content");
            for (c = 0; c < i.length; c++) {
                if (d = i[c],
                !d.getAttribute("data-secret"))
                    f = Math.random().toString(36).substr(2, 10),
                    d.src += "#?secret=" + f,
                    d.setAttribute("data-secret", f);
                if (g || h)
                    a = d.cloneNode(!0),
                    a.removeAttribute("security"),
                    d.parentNode.replaceChild(a, d)
            }
        }
    }
    var d = !1
      , e = !1;
    if (b.querySelector)
        if (a.addEventListener)
            d = !0;
    if (a.wp = a.wp || {},
    !a.wp.receiveEmbedMessage)
        if (a.wp.receiveEmbedMessage = function(c) {
            var d = c.data;
            if (d.secret || d.message || d.value)
                if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                    var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'), k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                    for (e = 0; e < k.length; e++)
                        k[e].style.display = "none";
                    for (e = 0; e < j.length; e++)
                        if (f = j[e],
                        c.source === f.contentWindow) {
                            if (f.removeAttribute("style"),
                            "height" === d.message) {
                                if (g = parseInt(d.value, 10),
                                g > 1e3)
                                    g = 1e3;
                                else if (~~g < 200)
                                    g = 200;
                                f.height = g
                            }
                            if ("link" === d.message)
                                if (h = b.createElement("a"),
                                i = b.createElement("a"),
                                h.href = f.getAttribute("src"),
                                i.href = d.value,
                                i.host === h.host)
                                    if (b.activeElement === f)
                                        a.top.location.href = d.value
                        } else
                            ;
                }
        }
        ,
        d)
            a.addEventListener("message", a.wp.receiveEmbedMessage, !1),
            b.addEventListener("DOMContentLoaded", c, !1),
            a.addEventListener("load", c, !1)
}(window, document);
;(function($) {
    var $wdg_window_width = 0
      , $wdg_window_height = 0
      , $wdg_window_scroll_top = 0
      , $wdg_wrapped = false;
    $wdg_ismobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        $wdg_ismobile = true;
    $(function() {
        $wdg_window_width = $(window).width();
        $wdg_window_height = $(window).height();
        $wdg_window_scroll_top = $(window).scrollTop();
        set_sticky_widget()
    });
    $(window).scroll(function() {
        $wdg_window_width = $(window).width();
        $wdg_window_height = $(window).height();
        $wdg_window_scroll_top = $(window).scrollTop();
        set_sticky_widget()
    });
    $(window).resize(function() {
        $wdg_window_width = $(window).width();
        $wdg_window_height = $(window).height();
        $wdg_window_scroll_top = $(window).scrollTop();
        set_sticky_widget()
    })
    function set_sticky_widget() {
        var wdg_start = $('#wdg-sticky-start')
          , wdg_end = $('#wdg-sticky-end');
        if (!$wdg_wrapped) {
            $("#wdg-sticky-start ~ *").wrapAll("<div id='sticky-widget-wrapper'></div>").wrapAll("<div id='sticky-widget-inner'></div>");
            $wdg_wrapped = true
        }
        ;var wdg_wrap = $('#sticky-widget-wrapper')
          , wdg_inner = $('#sticky-widget-inner')
          , wdg_offset_top = wdg_wrap.offset().top;
        if (!$wdg_ismobile)
            if ($wdg_window_scroll_top > wdg_offset_top && $wdg_window_width > 992) {
                wdg_inner.addClass('wdg-sticky').css({
                    top: '10px',
                    bottom: 'auto',
                    position: 'fixed',
                    left: wdg_wrap.offset().left,
                    width: wdg_wrap.width()
                });
                if (!($('#crtFooter').offset().top > $wdg_window_scroll_top + wdg_inner.outerHeight()))
                    wdg_inner.css({
                        top: 'auto',
                        bottom: $('#crtFooter').height() + 'px'
                    })
            } else
                wdg_inner.removeClass('wdg-sticky').css({
                    top: 'auto',
                    left: 'auto',
                    width: 'auto',
                    position: 'static'
                })
    }
}(jQuery))
