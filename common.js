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
