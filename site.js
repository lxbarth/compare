(function() {

var mapids = (location.search.split('?')[1] || '')
    .split('/')[0]
    .split('&');

L.mapbox.accessToken = 'pk.eyJ1IjoiYW5kcmVhc3ZpZ2xha2lzIiwiYSI6IlVremRqN0kifQ.CFFJsLuWWyuhgsZTb51jWg';
// Instead of our usual one map, we will create two in this example to make
// things interesting.
var map1 = L.mapbox.map('map1', mapids[0])
    .setView([40, -74.50], 9);
var map2 = L.mapbox.map('map2', mapids[1]) // '?strava.lxhqto6r&strava.map-0c7vme7s'
    .setView([40, -74.50], 9);

L.hash(map1);

// when either map finishes moving, trigger an update on the other one.
map1.on('moveend', follow).on('zoomend', follow);
map2.on('moveend', follow).on('zoomend', follow);

// quiet is a cheap and dirty way of avoiding a problem in which one map
// syncing to another leads to the other map syncing to it, and so on
// ad infinitum. this says that while we are calling sync, do not try to 
// loop again and sync other maps
var quiet = false;
function follow(e) {
    if (quiet) return;
    quiet = true;
    if (e.target === map1) sync(map2, e);
    if (e.target === map2) sync(map1, e);
    quiet = false;
}

// sync simply steals the settings from the moved map (e.target)
// and applies them to the other map.
function sync(map, e) {
    map.setView(e.target.getCenter(), e.target.getZoom(), {
        animate: false,
        reset: true
    });
}

})();
