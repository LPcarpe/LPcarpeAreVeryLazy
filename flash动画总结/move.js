// 运动框架
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}

function startMove(obj, attr, iTarget){
	clearInterval(obj.timer)

	obj.timer=setInterval(function(){//定时器漏写
		if(attr == 'opacity'){
			acur = Math.round(parseFloat(getStyle(obj, attr))*100);
		}
		else{
			acur = parseInt(getStyle(obj, attr));
		}

		var speed = (iTarget-acur)/8;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);

		if(acur == iTarget){
			clearInterval(obj.timer);
		}
		else{
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:'+(acur+speed)+')';
				obj.style.opacity = (acur+speed)/100;
			}
			else{
				obj.style[attr] = acur+speed+'px';
			}
		}
	},30)
}