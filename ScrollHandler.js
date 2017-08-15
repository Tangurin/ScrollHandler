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
            ScrollHandler.addCallback('onScroll', callback, run)
        },
        onScrollEnd: function(callback, run) {
            ScrollHandler.addCallback('onScrollEnd', callback, run)
        },
        addCallback: function(method, callback, run) {
            var run = run || false;
            if (ScrollHandler.active === false)  {
                console.log('You must initialize ScrollHandler before adding a callback');
            }
            if (typeof callback == 'function') {
                ScrollHandler.callbacks[method].push(callback);
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
        getElement: function() {
            return ScrollHandler.element;
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
