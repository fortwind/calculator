$.fancyConfirm = function (opts) {
    opts = $.extend(true, {
        message: '',
        okButton: 'OK',
        callback: $.noop
    }, opts || {});

    $.fancybox.open({
        type: 'html',
        src:
            '<div class="fc-content">' +
            '<p>' + opts.message + '</p>' +
            '<p class="tright">' +
            '<button data-value="1" data-fancybox-close class="btn">' + opts.okButton + '</button>' +
            '</p>' +
            '</div>',
        opts: {
            animationDuration: 350,
            animationEffect: 'material',
            modal: true,
            baseTpl:
                '<div class="fancybox-container fc-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-inner">' +
                '<div class="fancybox-stage"></div>' +
                '</div>' +
                '</div>'
        }
    });
}

window.alert = function (msg) {
    $.fancyConfirm({ message: msg });
};
