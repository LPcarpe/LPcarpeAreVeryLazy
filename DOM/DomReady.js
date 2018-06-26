function myReady(fn) {
	if(document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn, false);
	}else{
		IEContentLoaded(fn);
	}

	function IEContentLoaded(fn) {
		var d = window,document;
		var done = false;

		var init = function() {
			if(!done) {
				done = true;
				fn();
			}
		};

		(function() {
			try{
				d.documentElement.doScroll('left');
			}catch(e){
				setTimeout(arguments.callee, 50);
				return;
			}
			init();
		})();

		d.onreadystatechangee = function() {
			if(d.readyState == 'complete') {
				d.onreadystatechange = null;
				init();
			}
		};
	}

}

