(function () {
    'use strict';
    /*===========================
    ScrollHandler
    ===========================*/
    var ScrollHandler = {
        active: false,
        element: null,
        onEndWaitTime: 300,
        onEndTimer: null,
        callbacks: {
            onScroll: [],
            onScrollEnd: [],
        },
        initialize: function($element) {
            if (ScrollHandler.active == true) {
                return true;
            }

            ScrollHandler.setElement($element);
            
            ScrollHandler.active = true;
        },
        triggered: function(event) {
            var $this = $(this);
            var callbacks = ScrollHandler.callbacks;

            //onScroll
            for (var i in callbacks.onScroll) {
                callbacks.onScroll[i]($this, event);
            }

            //onScrollEnd
            clearTimeout(ScrollHandler.onEndTimer);
            ScrollHandler.onEndTimer = setTimeout(function() {
                for (var i in callbacks.onScrollEnd) {
                    callbacks.onScrollEnd[i]($this, event);
                }
            }, ScrollHandler.onEndWaitTime);
        },
        onScroll: function(callback, run) {
            var run = run || false;
            if (typeof callback == 'function') {
                ScrollHandler.callbacks.onScroll.push(callback);
                if (run === true) {
                    callback(ScrollHandler.element);
                }
            }
        },
        onScrollEnd: function(callback, run) {
            var run = run || false;
            if (typeof callback == 'function') {
                ScrollHandler.callbacks.onScrollEnd.push(callback);
                if (run === true) {
                    callback(ScrollHandler.element);
                }
            }
        },
        bindScrollEvent: function() {
            ScrollHandler.element.on('scroll', ScrollHandler.triggered);
        },
        unbindScrollEvent: function() {
            ScrollHandler.element.unbind('scroll');
        },
        setElement: function(element) {
            if (ScrollHandler.element != null) {
                ScrollHandler.unbindScrollEvent();
            }
            ScrollHandler.element = element;
            ScrollHandler.bindScrollEvent();
        }
    };
    window.ScrollHandler = ScrollHandler;
})();

/*===========================
ScrollHandler AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.ScrollHandler;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.ScrollHandler;
    });
}
