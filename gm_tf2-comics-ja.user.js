// ==UserScript==
// @name          tf2 comics ja
// @namespace     https://github.com/withgod/gm_tf2-comics-ja
// @description   tf2 comics translation to japanese
// @author        withgod
// @version       1.0
// @include       http://www.teamfortress.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function translate() {
    var imgSrc;
    //srcChange event hack http://stackoverflow.com/questions/4561845/firing-event-on-dom-attribute-change
    setInterval(function () {
        var newImgSrc = $("img.cvImg").attr("src");
        if (newImgSrc !== imgSrc) {
            imgSrc = newImgSrc;
            $("img.cvImg").trigger("srcChange");
        }
    }, 10);


    function zeros(val) {
        var str = String(val)
        while (str.length < 3) str = '0' + str;
        return str;
    }

    var overlay_base = 'https://raw.github.com/withgod/gm_tf2-comics-ja/master/images';
    var overlay_path = '';
    var overlays = [];

    switch (location.pathname) {
        case '/bloodbrothers/':
            overlay_path = '/bb';
            overlays = [];
            for (var i = 2; i < 43; i++) {
                overlays.push(i);
            }
            var overlay = $('<img id="gm_overlay" style="height: 100%; width: 100%; position: absolute; top: 0; z-index: 100;" />');
            var target = $('img.cvImg');
            target.before(overlay);

            overlay.click(function() {
                target.trigger('click');
            });
            target.on('srcChange', function() {
                $('#gm_overlay').removeAttr('src');
                var id = 1;
                if (location.hash != '') {
                    id = parseInt(location.hash.replace('#', '').split('=')[1]);
                }
                var overlay = $('#gm_cv' + id);
                if (id > 0 && id < 43) {
                    $('#gm_overlay').attr('src', overlay.attr('src'));
                }
            });
        break;
        case '/fateworsethanchess/':
            console.log('fateworsethanchess');
        break;
        default:
            break;
    }

    var loader = $('<div id="gm_append" style="display: none"/>');
    $.each(overlays, function(index, ov) {
        var obj = $('<img />');
        obj.attr('id', 'gm_cv' + ov);
        obj.attr('src', overlay_base + overlay_path + '/' + zeros(ov) + '.png');
        loader.append(obj);
    });
    $('body').append(loader);
}

if (navigator.userAgent.match('Chrome')) {
    addJQuery(translate);
} else {
    $(document).ready(translate);
}

