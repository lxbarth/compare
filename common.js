L.Google.prototype.addTo =
L.Yandex.prototype.addTo =
function(map) {
    map.addLayer(this);
    return this;
};
L.Yandex.prototype.getContainer =
L.Google.prototype.getContainer = function() {
    return this._container;
};

L.mapbox.accessToken = 'pk.eyJ1IjoibHhiYXJ0aCIsImEiOiJFVXdYcUlvIn0.bbaHTEWlnAwGgyVwJngMdQ';

var addLayer = function(layerid, map) {
    var split = layerid.split('.');
    var layer = null;
    switch(split[0]) {
        case 'bing':
            layer = new L.BingLayer('AjCTNNlzpfcDOc0G58A4Hzx1N0OGrO8IXpFj1TVqlPG7sUxc8LqXbClnVK9RLk4q');
            break;
        case 'google':
            // split[1] can be one of:
            // ROADMAP
            // SATELLITE
            // HYBRID
            // TERRAIN
            layer = new L.Google(split[1] || 'ROADMAP');
            break;
        case 'yandex':
            layer = new L.Yandex();
            break;
        case 'osm':
            map.attributionControl.addAttribution('<a href="http://openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>');
            layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            break;
        default:
            layer = L.mapbox.tileLayer(layerid);
            break;
    }
    // Remove classes Google.js adds.
    var children = map.getContainer().children;
    for (var i = 0; i < children.length; i++) {
        children[i].className = children[i].className.replace(/\bleaflet-top\b/,'').replace(/\bleaflet-left\b/,'');
    }
    return layer.addTo(map);
};

var getLayerIds = function() {
    if (!location.search) {
        return null;
    }
    return (location.search.split('?')[1] || '')
        .split('/')[0]
        .split('&');
};
