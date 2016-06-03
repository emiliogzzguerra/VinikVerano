(function($, window, document, undefined) {
    'use strict';

    // init cubeportfolio
    $('#grid-container').cubeportfolio({
        filters: '#filters-container',
        loadMore: '#loadMore-container',
        loadMoreAction: 'click',
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'slideLeft',
        gapHorizontal: 35,
        gapVertical: 15,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1400,
            cols: 4
        }, {
            width: 1100,
            cols: 4
        }, {
            width: 800,
            cols: 4
        }, {
            width: 500,
            cols: 4
        }, {
            width: 320,
            cols: 2
        }],
        caption: 'zoom',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100,
    });

})(jQuery, window, document);
