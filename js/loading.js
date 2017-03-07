define(function(){

var base = '../img/';
var arr = [
    'cover-btm.jpg',
    'age-bg.png',
    'phone-btm.png',
    'rs2-bg.jpg',
    'rs4-arm.png'
];

var html = '';
$.each( arr, function( i, n ){
	var src = base + n;
	html += '<img class="preload" src="" data-src="'+ src +'">';
});
$('.ld-pic').append( html );

var img = $('.preload');
var len = img.length;
var loaded = 0;
img
	.on("load", function(e){
        loaded++;
       	process();
        if( loaded == len ) done();
    })
    .on("error", function(e){
        loaded++;
        error( this );
        if( loaded == len ) done();
    })
    .each(function(i){
        $(this).attr({ src : $(this).attr("data-src") });
    });
function process(){
	var ratio = Math.round( loaded / len * 100 ) + "%";
	$('.ld-num').text( ratio );
}
function error( img ){
	var src = $( img ).attr("data-src");
	console.log( "Load resource fail : " + src ); 
}
function done(){
	$('.loading').addClass('hide');
}

});