(function($){
	var defaults = {
		'container' : '.st-scroll',//容器
		'sections' : '.st-panel',//子容器
		'easing' : 'ease',//特效方式，ease-in,ease-out,linear
		'duration' : 1000,//每次动画执行的时间
		'pagination' : true,//是否显示分页
		'loop' : false,//是否循环
		'keyboard' : true,//是否支持键盘
		'direction' : 'vertical',//滑动的方向 horizontal,vertical,
		'onpageSwitch' : function(pagenum){}
	};

	var win = $(window),
		container,sections;

	var opts = {},
		canScroll = true;

	var iIndex = 0;

	var arrElement = [];

	var SP = $.fn.switchPage = function(options){
		opts = $.extend({}, defaults , options||{});

		container = $(opts.container),
		sections = container.find(opts.sections);
		controls = $(".st-container :radio")

		sections.each(function(){
			arrElement.push($(this));
		});
		return this.each(function(){
			if(opts.keyboard){
				keyDown();
			}
		});
	}

	//滚轮向上滑动事件
	SP.moveSectionUp = function(){
		if(iIndex){
			iIndex--;
		}else if(opts.loop){
			iIndex = arrElement.length-1;
		}
		scrollPage(arrElement[iIndex],iIndex);
	};

	//滚轮向下滑动事件
	SP.moveSectionDown = function(){
		if(iIndex<(arrElement.length-1)){
			iIndex++;
		}else if(opts.loop){
			iIndex = 0;
		}
		scrollPage(arrElement[iIndex],iIndex);
	};

	//私有方法
	//页面滚动事件
	function scrollPage(element,index){
		if(typeof index === 'undefined'){ return; }
		initEffects(index,element);
		canScroll = true;
	}

	//重写鼠标滑动事件
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if (delta < 0) {
				SP.moveSectionDown();
			}else {
				SP.moveSectionUp();
			}
		}
		return false;
	}

	//是否支持css的某个属性
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}

	//渲染效果
	function initEffects(dest,element){
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
			transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

		canScroll = false;
		if(isSuportCss(transform) && isSuportCss(transition)){
			controls[dest].checked = "true";
		}else{
			var cssObj = (opts.direction == "horizontal")?{left: -dest.left}:{top: -dest.top};
			container.animate(cssObj, opts.duration, function(){
				canScroll = true;
			});
		}
		element.addClass("active").siblings().removeClass("active");
	}

	//窗口Resize
	var resizeId;
	win.resize(function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(function(){
			reBuild();
		},500);
	});

	function reBuild(){
		var currentHeight = win.height(),
			currentWidth = win.width();

		var element = arrElement[iIndex];
		if(opts.direction == "horizontal"){
			var offsetLeft = element.offset().left;
			if(Math.abs(offsetLeft)>currentWidth/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
			}
		}else{
			var offsetTop = element.offset().top;
			if(Math.abs(offsetTop)>currentHeight/2 && iIndex <(arrElement.length-1)){
				iIndex ++;
			}
		}
		if(iIndex){
			var cuerrentElement = arrElement[iIndex],
				dest = cuerrentElement.position();
			//initEffects(dest,cuerrentElement);
			initEffects(iIndex,cuerrentElement);
		}
	}

	//绑定键盘事件
	function keyDown(){
		var keydownId;
		win.keydown(function(e){
			clearTimeout(keydownId);
			keydownId = setTimeout(function(){
				var keyCode = e.keyCode;
				if(keyCode == 37||keyCode == 38){
					SP.moveSectionUp();
				}else if(keyCode == 39||keyCode == 40){
					SP.moveSectionDown();
				}
			},150);
		});
	}
})(jQuery);

$(function(){
	$("#container").switchPage({
		'loop' : true,
		'keyboard' : true,
		'direction' : 'horizontal'
	});
});

$(document).ready(function() {
  $('#st-panel-3').particleground({
    dotColor: '#e23a6e',
    lineColor: '#fa96b5'
  });
});