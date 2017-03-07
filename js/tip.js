define(function(){

return function( t ){
	var html =
	'<div class="tip-box full">'
	+'	<div class="center"><span>'+ t +'</span></div>'
	+'</div>';
	$( document.body ).append( html );

	var box = $('.tip-box');
	var timer = setTimeout(function(){
		box.remove();
	}, 1500);
	box.on('click', function(){
		box.remove();
		clearTimeout( timer );
	});
};

});