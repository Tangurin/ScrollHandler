var ScrollHandler = {
    element: null,
    scrollEvent: null,
    onStopTimer: null,
    options: {},
    initialize: function($element, options) {
        var options = options || {};
        options = $.extend(ScrollHandler.options,  options);

        ScrollHandler.element = $element;
        ScrollHandler.scrollEvent = ScrollHandler.element.on('scroll', ScrollHandler.onScroll);
    },
    onScroll: function() {
        ScrollHandler.element.trigger('onScroll');
        //On Scroll Stop
        clearTimeout(ScrollHandler.onStopTimer);
        ScrollHandler.onStopTimer = setTimeout(ScrollHandler.onScrollStop, 500);
    },
    onScrollStop: function() {
        ScrollHandler.element.trigger('scrollStop');
    }
};
