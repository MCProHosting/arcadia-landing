$(function () {
    var ratio  = 853 / 430,
        $video = $('#video'),
        sizeVideo;

    (sizeVideo = function (screen) {
        var width, height;
        if (screen.height * ratio > screen.width) {
            height = screen.height;
            width  = screen.height * ratio;
        } else {
            height = screen.width / ratio;
            width  = screen.width;
        }

        $video.css({
            width: width,
            height: height,
            top: (screen.height - height) / 2,
            left: (screen.width - width) / 2
        });
    })({
        width: $(window).width(),
        height: $(window).height()
    });

    $(window).on('resize', function () {
        sizeVideo({
            width: $(window).width(),
            height: $(window).height()
        });
    });

    var $countdown = $('.countdown'),
        target = 1418241600000,
        updateCountDown;

    (updateCountDown = function () {
        var delta = target - Date.now(),
            parts = [];

        var multipliers = [
            1000 * 60 * 60 * 24,
            1000 * 60 * 60,
            1000 * 60,
            1000
        ];

        // Days
        while (multipliers.length > 0) {
            var r = ~~(delta / multipliers[0]);
            delta -= r * multipliers.shift();
            parts.push('' + r);
        }

        var out = parts.map(function (p) {
            while (p.length < 2) {
                p = '0' + p;
            }

            return p;
        }).join(':');

        $countdown.html(out);
    })();

    setInterval(updateCountDown, 1000);
});
