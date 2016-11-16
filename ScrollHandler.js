var ScrollHandler = {
    active: false,
    element: null,
    scrollEvent: null,
    onStopTimer: null,
    callbacks: {
        onScroll: [],
        onScrollStop: [],
    },
    initialize: function($element) {
        if (ScrollHandler.active == true) {
            return true;
        }

        ScrollHandler.setElement($element);
        
        ScrollHandler.active = true;
        $(document).trigger('ScrollHandler-Initialized')
    },
    onScroll: function() {
        ScrollHandler.element.trigger('ScrollHandler-Scroll')
        //On Scroll Stop
        clearTimeout(ScrollHandler.onStopTimer);
        ScrollHandler.onStopTimer = setTimeout(ScrollHandler.onScrollStop, 300);

        var callbacks = ScrollHandler.callbacks.onScroll;
        for (var i in callbacks) {
            callbacks[i](ScrollHandler.element);
        }
    },
    onScrollStop: function() {
        ScrollHandler.element.trigger('ScrollHandler-ScrollStop');
        var callbacks = ScrollHandler.callbacks.onScrollStop;
        for (var i in callbacks) {
            callbacks[i](ScrollHandler.element);
        }
    },
    bindScrollEvent: function() {
        ScrollHandler.element.on('scroll', ScrollHandler.onScroll);
    },
    unbindScrollEvent: function() {
        ScrollHandler.element.unbind('scroll');
    },
    setElement: function(element) {
        ScrollHandler.unbindScrollEvent();
        ScrollHandler.element = element;
        ScrollHandler.bindScrollEvent();
    },
    callback: function(callback, type) {
        var type = type || 'onScroll';
        if (typeof callback == 'function' && typeof ScrollHandler.callbacks[type] != 'undefined') {
            ScrollHandler.callbacks[type].push(callback);
        }
    }
};
