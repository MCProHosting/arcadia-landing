$ ->
    ratio  = 852 / 480
    $video = $ '#video'
    sizeVideo = (screen) ->
        screen =
            width: $(window).width()
            height: $(window).height()

        if screen.height * ratio > screen.width
            height = screen.height
            width  = screen.height * ratio
        else
            height = screen.width / ratio
            width  = screen.width

        $video.css
            width: width
            height: height
            top: (screen.height - height) / 2
            left: (screen.width - width) / 2

    $(window).on 'resize', sizeVideo
    sizeVideo()

    $countdown = $ '.countdown'
    target = 1418241600000

    updateCountDown = ->
        delta = target - Date.now()
        parts = []

        # If it's here, refresh!
        if delta < 0
            setTimeout location.reload(), 1000 * 10
            return

        # List of all parts we'll find
        multipliers = {
            days: 1000 * 60 * 60 * 24,
            hours: 1000 * 60 * 60,
            minutes: 1000 * 60,
            seconds: 1000
        }

        for type, multiplier of multipliers
            # Find the type we'll look at
            $type = $ '.' + type, $countdown
            # And get the current time in that element
            $first = $ $type.find('span').get(0)

            # Some quick calculation, based on the multiplier, to determine
            # the number to display.
            r = ~~(delta / multiplier)
            delta -= r * multiplier
            part = '' + Math.max r, 0

            # Left-pad the number with zeroes.
            while part.length < 2
                part = '0' + part

            # If the number is the same as what's already there, do nothing
            if $first.html() is part
                continue

            # Otherwise append our new number and remove the old number
            # after a moment.
            $type.append $('<span />').html part
            $first.addClass('out')
            do ($first) -> setTimeout $first.remove.bind($first), 500


    setInterval updateCountDown, 1000
    updateCountDown()
