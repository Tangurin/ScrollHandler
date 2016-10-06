var ScrollHandler = {
    active: false,
    element: null,
    scrollEvent: null,
    onStopTimer: null,
    options: {},
    initialize: function($element, options) {
        if (ScrollHandler.active == true) {
            return true;
        }
        var options = options || {};
        options = $.extend(ScrollHandler.options,  options);

        ScrollHandler.element = $element;
        ScrollHandler.scrollEvent = ScrollHandler.element.on('scroll', ScrollHandler.onScroll);
        ScrollHandler.active = true;
    },
    onScroll: function() {
        ScrollHandler.element.trigger('ScrollHandler-Scroll')
        //On Scroll Stop
        clearTimeout(ScrollHandler.onStopTimer);
        ScrollHandler.onStopTimer = setTimeout(ScrollHandler.onScrollStop, 500);
    },
    onScrollStop: function() {
        ScrollHandler.element.trigger('scrollHandler-ScrollStop');
    }
};
