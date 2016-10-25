(function(){

	"use strict";
	var app = {

		init : function(){
			this.getArticle();
			this.getMenu();
		},
		
		// Pour récupérer et convertir article Alice :

		getArticle : function() {
			$.ajax('http://192.168.1.21:1337/alice.md')
			.done(this.getArticleDone)
			.fail(this.requestFail)
			.always(this.requestAlways)
		},

		getArticleDone : function(articleAlice) {
			var converter = new showdown.Converter();
			var articleHtml = converter.makeHtml(articleAlice);
			$("#md").html(articleHtml);
		},

		// Pour récupérer menu :

		getMenu : function() {
			$.ajax('http://192.168.1.21:1337/menu.json')
			.done(this.getMenuDone)
			.fail(this.requestFail)
			.always(this.requestAlways)
		},

		getMenuDone : function(response) {
			console.log(response.menu[0])
			var len = response.menu.length;

			for (var i = 0; i < len; i++) {
				$("#menu").append('<h4> <a href="' + response.menu[i].path + '">' + response.menu[i].title + '</a></h4>');
			}
		},

		// Fonctions communes requêtes :

		requestFail : function() {
			alert("fail");
		},

		requestAlways : function() {
			console.log("complete");
		}

	};





	$(document).ready(function(){
		app.init();
	});

})();