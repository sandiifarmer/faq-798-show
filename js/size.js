define(function(){
    
window.onresize = resizeNew;

var html = $('html');
var body = $('body');
var main = $('.main');
var _d   = document.documentElement;
var ratio= 640 / 1008;

resizeNew();
function resizeNew() {
    if( _d.clientWidth / _d.clientHeight < ratio ) {
        var width     = _d.clientWidth;
        var height    = _d.clientWidth / ratio;
        var marginLeft= 0;
        var marginTop = ( _d.clientHeight - _d.clientWidth / ratio ) / 2;
        var rem       = _d.clientWidth / 360 * 15;
    }
    else{
        var width     = _d.clientHeight * ratio;
        var height    = _d.clientHeight;
        var marginTop = 0;
        var marginLeft= ( _d.clientWidth - _d.clientHeight * ratio ) / 2;
        var rem       = _d.clientHeight / 504 * 10;
    }
    
    main.css({
        width     : width,
        height    : height,
        marginLeft: marginLeft,
        marginTop : marginTop
    });
    html.css({ fontSize : rem });
    body.css({ fontSize : rem });   
}

});