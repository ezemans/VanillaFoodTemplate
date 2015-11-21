(function(){
		
		document.addEventListener('DOMContentLoaded', onDOMLoad);

		function onDOMLoad(){
		var loadCSS = require('./lib/loadCSS');

		loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css');
		loadCSS('https://fonts.googleapis.com/css?family=Open+Sans:400,600,300');

		var mList = document.getElementById("navbarMenu");
		var mButton = document.getElementById("menuClick");
		mButton.addEventListener('click', onClickMenu);
		function onClickMenu(){
			mList.classList.toggle('header__menu__list--show');
		};
	};
}());