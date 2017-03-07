define(['ajax','tip'],function(ajax,tip){

var send = $('.phone-send');
var reg = /^((0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8})|((0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
var map = ['A','B','C','D'];

return function( swiper ){
	bindSend();
	bindSubmit( swiper );
};
function bindSend(){
	send.on('click', function(){
		var phone = $.trim( $('.phone-num').val() );
		if( !phone ){
			tip('请输入您的电话号码');
			return;
		}
		if( !phone.match( reg ) ){
			tip('电话格式不正确');
			return;
		}
		if( send.hasClass('gray') ){
			return;
		}
		send.addClass('gray');

		getCode( phone );
	});
}
function getCode( mobile ){
	var url = ajax.getCode;
	var param = {};
	param.mobile = mobile;
	$.get( url, param, function( data ){
		if( data.code === 200 ){
			count();
		}else{
			tip( data.message );
		}
	}, 'json');
}
function count(){
	var timer = 60;
	var flag = setInterval(function(){
		if( !timer ){
			send.removeClass('gray').text('获取验证码');
			clearInterval( flag );
		}else{
			send.text( timer + ' 秒' );
			timer--;
		}	
	}, 1000);
}
function bindSubmit( swiper ){
	$('.phone-submit').on('click', function(){
		var phone = $.trim( $('.phone-num').val() );
		if( !phone ){
			tip('请输入您的电话号码');
			return;
		}
		if( !phone.match( reg ) ){
			tip('电话格式不正确');
			return;
		}
		var code = $.trim( $('.phone-code').val() );
		if( !code ){
			tip('请输入验证码');
			return;
		}
		saveResult( phone, code, swiper );
	});
}
function saveResult( mobile, code, swiper ){
	var url = ajax.saveResult;
	var param = getSaveParam( mobile, code );
	$.get( url, param, function( data ){
		if( data.code === 200 ){
			tip('提交成功');
			setTimeout(function(){
				swiper.slideNext();
			}, 1500);
		}else{
			tip( data.message );
		}
	}, 'json');
}
function getSaveParam( mobile, code ){
	var param = {};
	param.mobile = mobile;
	param.code = code;
	param.type = 1;
	param.age = $('.age-input').val() || 3;
	param.englishAnswer = getEnglishAnswer();
	param.artAnswer = getArtAnswer();
	param.comment = getComment();
	return param;
}
function getEnglishAnswer(){
	var rs = '';
	$('.en-li').each(function(){
		var checked = $( this ).children('.checked');
		if( !checked.length ) return;
		var i = checked.index();
		rs += map[ i ];
	});
	return rs;
}
function getArtAnswer(){
	var rs = '';
	$('.art-ul').each(function(){
		var checked = $( this ).children('.checked');
		if( !checked.length ) return;
		var i = checked.index();
		rs += map[ i ];
	});
	return rs;
}
function getComment( artAnswer ){
	var index = 0;
	var comment = '';
	var commentList = [
		'宝贝兼具理性和感性的审美诉求，对持久、精细的创作颇有兴趣，有点完美主义创作风格哦。色彩、素描及雕塑一类的传统艺术创作很适合Ta哦！',
		'宝贝非常有实验精神，也许你是未来美学大师哦！酷爱创新、经常有独 特的见解，面对复杂的视觉世界，用愉快的心情享受创作的过程。多尝试创意材料、数字艺术、装置艺术等先锋体验会让他们感觉更爽 !',
		'宝贝心里住着一个大导演，更偏爱具有故事背景的创作，喜欢作品背后所赋予、关联的更深含义。带有知识性、社交感、演讲特质的创作更适合Ta ！这是一个艺术情商（Art EQ）高的娃娃，美国的当代艺术展览也许符合 Ta 的品味。',
		'宝贝看起来很偏好古典传统美学，经常带Ta去欣赏写实艺术或许更符合 Ta 的气质，有机会去看看欧洲的展览都是不错的选择哦~ 可以去尝试一下世界流行文 化艺术创作，以及世界著名艺术作品赏析类的艺术创意活动，会全面提升Ta的综合素质。'
	];
	var stat = [ 0, 0, 0, 0 ];
	$('.art-ul').each(function(){
		var checked = $( this ).children('.checked');
		if( !checked.length ) return;
		var i = checked.index();
		stat[ i ]++;
	});
	var max = Math.max.apply( null, stat );
	stat.forEach(function( v, k ){
		if( v === max ){
			index = k;
			comment = commentList[ k ];
		}
	});
	renderRs( index );
	return comment;
}
function renderRs( i ){
	var klass = 'rs'+ ( i + 1 );
	var htmlList = [];
	htmlList[ 0 ] =
		'<div class="rs1-butterfly"></div>'
		+'<div class="rs1-t1">'
		+'	<p>宝贝兼具理性和感</p>'
		+'	<p>性的审美诉求，对持久、精细的创作颇</p>'
		+'	<p>有兴趣，有点完美主义创作风格哦。色彩、</p>'
		+'	<p>素描及雕塑一类的传统艺术创作很适合Ta哦！</p>'
		+'</div>'
		+'<div class="rs1-t2">想连线Real适合你的那枚国际艺术家？查收短信通知，获取公开课打开方式 即刻开启儿“MOOC”之旅</div>'
		+'<div class="rs1-t3">Art+798 国际艺术教育中心出品</div>'
		+'<div class="rs1-plus animated infinite bounce"></div>';
	htmlList[ 1 ] =
		'<div class="rs2-eye roll"></div>'
		+'<div class="rs2-eye roll"></div>'
		+'<div class="rs2-t1">'
		+'	<p>宝贝非常有实验精神，也许</p>'
		+'	<p>你是未来美学大师哦！酷爱创</p>'
		+'	<p>新、经常有独 特的见解，面对复</p>'
		+'	<p>杂的视觉世界，用愉快的心情享受</p>'
		+'	<p>创作的过程。多尝试创意材料、数字</p>'
		+'	<p>艺术、装置艺术等先锋体验会让他们感</p>'
		+'	<p>觉更爽 !</p>'
		+'</div>'
		+'<div class="rs2-t2">'
		+'	<p>想连线  Real  适合你的那枚国际艺术</p>'
		+'	<p>家?  查收短信通知，免费获取公</p>'
		+'	<p>开课打开方式，即刻开启儿</p>'
		+'	<p>童“MOOC”之旅</p>'
		+'</div>'
		+'<div class="rs2-t3">'
		+'	<p>Art+798 国际艺术</p>'
		+'	<p>教育中心出品</p>'
		+'</div>';
	htmlList[ 2 ] =
		'<div class="rs3-square"></div>'
		+'<div class="rs3-ball"></div>'
		+'<div class="rs3-bat"></div>'
		+'<div class="rs3-t1">'
		+'	<p>宝贝心里住着一个大导演，更偏爱具有故事背景的</p>'
		+'	<p>创作，喜欢作品背后所赋予、关联的更深含义。</p>'
		+'	<p>带有知识性、社交感、演讲特质的创作更适合</p>'
		+'	<p>Ta ！这是一个艺术情商（Art EQ）高的</p>'
		+'	<p>娃娃，美国的当代艺术展览也许符合 Ta </p>'
		+'	<p>的品味。</p>'
		+'</div>'
		+'<div class="rs3-t2">'
		+'	<p>想连线 Real 适合你的那枚国际</p>'
		+'	<p>艺术家? 查收短信通知，免费</p>'
		+'	<p>获取公开课打开方式，即</p>'
		+'	<p>刻开启儿童“MOOC”</p>'
		+'	<p>之旅。</p>'
		+'</div>';
	htmlList[ 3 ] =
		'<div class="rs4-android">'
		+'	<div class="rs4-eye roll"></div>'
		+'	<div class="rs4-eye roll"></div>'
		+'	<div class="rs4-arm"></div>'
		+'</div>'
		+'<div class="rs4-t1">'
		+'	<p>宝贝看起来很偏好古典传统美学，经常带Ta去欣</p>'
		+'	<p>赏写实艺术或许更符合 Ta 的气质，有机会去看</p>'
		+'	<p>看欧洲的展览都是不错的选择哦~ 可以去尝</p>'
		+'	<p>试一下世界流行文 化艺术创作，以及世界</p>'
		+'	<p>著名艺术作品赏析类的艺术创意活动，会</p>'
		+'	<p>全面提升Ta的综合素质。</p>'
		+'</div>'
		+'<div class="rs4-t2">'
		+'	<p>想连线 Real 适合你的那枚国际</p>'
		+'	<p>艺术家? 查收短信通知，免费</p>'
		+'	<p>获取公开课打开方式，即</p>'
		+'	<p>刻开启儿童“MOOC”</p>'
		+'	<p>之旅。</p>'
		+'</div>'
		+'<div class="rs4-t3">'
		+'	<p>Art+798 国际艺术</p>'
		+'	<p>教育中心出品</p>'
		+'</div>';
	$('.rs-box')
		.html('')
		.addClass( klass )
		.append( htmlList[ i ] );
}

});