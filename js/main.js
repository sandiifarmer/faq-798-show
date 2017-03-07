require([
	'tip',
	'phone',
	'loading',
	'size'
], function(
	tip,
	phone
){

var swiper = new Swiper('.swiper-box', {
	onSlideChangeEnd : function( swiper ){
		if( swiper.activeIndex > 0 && swiper.activeIndex < 16 ){
			swiper.lockSwipes();
		}else{
			swiper.unlockSwipes();
			swiper.lockSwipeToPrev();
		}
		silence();
	},
	initialSlide : 0,
	direction : 'vertical'
});

//age
$('.age-submit').on('click', function(){
	var MIN = 3;
	var MAX = 14;
	var input = $('.age-input');
	var val = parseInt( $.trim( input.val() ) ) || '';
	if( !val || val < MIN || val > MAX ){
		tip('年龄范围为3-14');
		val = '';
	}else{
		swiper.slideNext();
	}
	input.val( val );
});

//en
$('.en-skip').on('click', function(){
	swiper.slideTo( $('.art1').index() );
});
$('.en-submit').on('click', function( e ){
	var lis = $( e.currentTarget ).siblings('.en-ul').children('li');
	for( var i = 0; i < lis.length; i++ ){
		if( lis.eq( i ).children('.checked').length ) continue;
		tip('请完成选择');
		return;
	}
	swiper.slideNext();
});
$('.en-one').on('click', function( e ){
	var self = $( e.currentTarget );
	if( self.is('.checked') ) return;
	self.siblings('.checked').removeClass('checked');
	self.addClass('checked');
});

//art
$('.art-li').on('click', function( e ){
	var self = $( e.currentTarget );
	if( self.is('.checked') ) return;
	self.siblings('.checked').removeClass('checked');
	self.addClass('checked');
});
$('.art-submit').on('click', function( e ){
	var ul = $( e.currentTarget ).siblings('.art-ul');
	if( !ul.children('.checked').length ){
		tip('请完成选择');
		return;
	}
	swiper.slideNext();
});

//phone
phone( swiper );

//audio
$('.en-player').on('click', function( e ){
	var self = $( e.currentTarget );
	var audio = self.children('audio')[ 0 ];
	self.toggleClass('playing');
	if( self.is('.playing') ){
		audio.play();
	}else{
		audio.pause();
	}
});
$('audio').on('ended', function( e ){
	var self = $( e.currentTarget );
	self.parent().removeClass('playing');
});
function silence(){
	$('audio').each(function(){
		this.pause();
	});
	$('.en-player').removeClass('playing');
}


});