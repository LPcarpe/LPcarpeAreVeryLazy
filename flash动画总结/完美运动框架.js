function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, fn) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function () {

		var flag = true;
		for (var attr in json) {
			var iCur = 0;
			if (attr == 'opacity') {
				iCur = Math.round(parseFloat(getStyle(obj, attr) * 100))
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			var iSpeed = (json[attr] - iCur) / 8;
			var speed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			if (iCur != json[attr]) {
				flag = false;
			}
			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (iCur + speed) + ')';
				obj.style.opacity = (iCur + speed) / 100;
			} else {
				obj.style[attr] = iCur + speed + 'px';
			}

			if (flag) {
				clearInterval(obj.timer);
				if (fn) {
					fn();
				}
			}
		}

	}, 30)
}