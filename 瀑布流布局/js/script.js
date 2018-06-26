window.onload = function() {
	waterfall('main', 'box');
	var dataInt = {data:[{"src": "0.jpg"},{"src": "9.jpg"},{"src": "10.jpg"},{"src": "1.jpg"},{"src": "2.jpg"},{"src": "3.jpg"},{"src": "4.jpg"},{"src": "5.jpg"},{"src": "6.jpg"},{"src": "7.jpg"},{"src": "8.jpg"}]};
	window.onscroll = function() {
		if(checkScollSlide()){
			var oParent = document.getElementById('main');
			for(var i=0; i<dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = 'images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main', 'box');
		}
		
	}
}

function waterfall(parent, box) {
	var oParent = document.getElementById('main');

	var oBoxs = getChildNodes(oParent, box);
	var oBoxw = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / oBoxw);

	oParent.style.cssText = 'width:'+oBoxw*cols+'px;margin:0 auto';
	var hArr =[];

	for(var i=0; i<oBoxs.length; i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}
		else{
			var mHeight = Math.min.apply(null, hArr);
			var index = getMinIndex(hArr,mHeight);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = mHeight + 'px';
			oBoxs[i].style.left = index * oBoxw + 'px';
			hArr[index] += oBoxs[i].offsetHeight;

		}
	}
	
}

function getChildNodes(parent, Name){
	var boxArr = new Array();
	var oElements = parent.getElementsByTagName('*');

	for (var i=0; i<oElements.length; i++){
		if(oElements[i].className == Name){
			boxArr.push(oElements[i]);
		}
	}

	return boxArr;
}

function getMinIndex(arr, val) {
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

function checkScollSlide() {
	var oParent = document.getElementById('main');
	var oBoxs = getChildNodes(oParent, 'box');
	var lastPicHeight = oBoxs[oBoxs.length-1].offsetTop + oBoxs[oBoxs.length-1].offsetHeight/2;
	var scorllTop = document.documentElement.scrollTop || document.body.scrollTop;
	var height = document.documentElement.clientHeight || document.body.clientHeight;

	return (lastPicHeight <= scorllTop+height) ? true : false; 
}