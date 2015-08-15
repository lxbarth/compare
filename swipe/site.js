(function() {
    var layerids = getLayerIds();
    if (!layerids) {
        location.replace('..');
        return;
    }

    var map = L.mapbox.map('map', null, {
        center: [0, 0],
        zoom: 3
    });
    L.hash(map);

    var left = addLayer(layerids[0], map);
    var right = addLayer(layerids[1], map);

    // Clip as you move map or range slider.
    var range = document.getElementById('range');
    function clip() {
        var nw = map.containerPointToLayerPoint([0, 0]),
            se = map.containerPointToLayerPoint(map.getSize()),
            clipX = nw.x + (se.x - nw.x) * range.value;
        var elem = left.getContainer()
        elem.style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
        elem.style.display='none';
        elem.offsetHeight;
        elem.style.display='';
        var elem = right.getContainer()
        elem.style.clip = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)';
        elem.style.display='none';
        elem.offsetHeight;
        elem.style.display='';
    }
    clip();
    range['oninput' in range ? 'oninput' : 'onchange'] = clip;
    map.on('move', clip);

    var down = false;
    document.getElementById('range').onmousedown = function() { down = true; };
    document.getElementById('range').onmouseup = function() { down = false; };
    document.getElementById('range').onmousemove = function(e) {
        if (down) {
            // console.log(document.getElementById('range').style.top = "10px");
            document.getElementById('range').style.top = (e.screenY - 120) + "px";
        };
    };
})();
